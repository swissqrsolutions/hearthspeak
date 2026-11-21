"""Generate all MP3s for one lesson, 100% free and local (CPU is enough).

usage:  .venv/Scripts/python gen.py ../../content/kannada/001.yaml

Voices
  English narrator : Kokoro-82M (Apache-2.0)
  Kannada          : Meta MMS-TTS kan (CC-BY-NC-4.0, personal use OK) - prototype voice;
                     upgrade path: AI4Bharat Indic Parler-TTS (needs free HF login).
Outputs -> site/<lang>/<num>/audio/*.mp3
"""
import sys, os, hashlib, pathlib, re
import numpy as np, yaml, soundfile as sf, lameenc, librosa

SR = 24000
ROOT = pathlib.Path(__file__).resolve().parents[2]
CACHE = pathlib.Path(__file__).resolve().parent / ".cache"
CACHE.mkdir(exist_ok=True)

# ---------- engines (lazy) ----------
_kokoro = {}
def english(text, voice="bf_emma", speed=0.86):
    from kokoro import KPipeline
    lc = voice[0]
    if lc not in _kokoro:
        _kokoro[lc] = KPipeline(lang_code=lc, repo_id="hexgrad/Kokoro-82M")
    chunks = [a.numpy() if hasattr(a, "numpy") else a for _, _, a in _kokoro[lc](text, voice=voice, speed=speed)]
    return np.concatenate(chunks).astype(np.float32)  # 24 kHz

_mms = {}
def mms(text, lang="kan"):
    import torch
    from transformers import VitsModel, AutoTokenizer
    if lang not in _mms:
        name = f"facebook/mms-tts-{lang}"
        _mms[lang] = (VitsModel.from_pretrained(name), AutoTokenizer.from_pretrained(name))
    model, tok = _mms[lang]
    torch.manual_seed(0)
    with torch.no_grad():
        wav = model(**tok(text, return_tensors="pt")).waveform[0].numpy()
    return librosa.resample(wav.astype(np.float32), orig_sr=model.config.sampling_rate, target_sr=SR)

def target(text, lang, voice):
    # Latin-only words (e.g. "Switzerland") are spelled in script in content, so text goes straight in.
    wav = mms(text, {"kannada": "kan"}[lang])
    if voice == "female":
        wav = librosa.effects.pitch_shift(wav, sr=SR, n_steps=3.0)
    return wav

def cached(kind, text, fn):
    h = hashlib.sha1(f"{kind}|{text}".encode()).hexdigest()[:16]
    p = CACHE / f"{h}.npy"
    if p.exists():
        return np.load(p)
    wav = fn()
    peak = np.abs(wav).max() or 1
    wav = (wav / peak * 0.89).astype(np.float32)
    np.save(p, wav)
    return wav

def silence(sec): return np.zeros(int(SR * sec), np.float32)

def mp3(wav, path):
    enc = lameenc.Encoder()
    enc.set_bit_rate(40); enc.set_in_sample_rate(SR); enc.set_channels(1); enc.set_quality(2)
    pcm = (np.clip(wav, -1, 1) * 32767).astype("<i2").tobytes()
    path.write_bytes(enc.encode(pcm) + enc.flush())

# ---------- main ----------
def main(yaml_path):
    L = yaml.safe_load(open(yaml_path, encoding="utf8"))
    lang = L["lang"]
    out = ROOT / "site" / lang / f"{L['num']:03d}" / "audio"
    out.mkdir(parents=True, exist_ok=True)
    voice_of = {k: v["voice"] for k, v in L["speakers"].items()}
    narr_voice = L.get("narrator_voice", "bf_emma")

    T = lambda text, v="male": cached(f"{lang}-{v}", text, lambda: target(text, lang, v))
    E = lambda text: cached(f"en-{narr_voice}", text, lambda: english(text, narr_voice))

    # 1. dialogue lines
    lines = []
    for i, l in enumerate(L["lines"], 1):
        w = T(l["t"], voice_of[l["who"]]); lines.append(w)
        mp3(w, out / f"line-{i}.mp3"); print("line", i)
    # 2. build-up chains
    for ci, chain in enumerate(L.get("buildup", []), 1):
        for si, s in enumerate(chain, 1):
            mp3(T(s["t"]), out / f"build-{ci}-{si}.mp3")
    # 3. remix
    for ri, r in enumerate(L.get("remix", []), 1):
        mp3(T(r["t"]), out / f"remix-{ri}.mp3")
    print("buildup+remix done")
    # 4. narrator (English + spliced target clips)
    parts = []
    for seg in L.get("ajji", []):
        if "en" in seg: parts += [E(seg["en"]), silence(0.45)]
        elif "t" in seg: parts += [silence(0.2), T(seg["t"], "female"), silence(0.6)]
        elif "pause" in seg: parts.append(silence(float(seg["pause"])))
    narr = np.concatenate(parts); mp3(narr, out / "narrator.mp3"); print("narrator", round(len(narr)/SR), "s")
    # 5. walk mode: dialogue -> narrator -> role-play with pauses
    you = L["you"]
    walk = [E(f"Lesson {L['num']}. {L['title']['en']}. Just listen."), silence(0.8)]
    for w in lines: walk += [w, silence(0.7)]
    walk += [silence(1.0), narr, silence(1.0), E(f"Now it's your turn. You are {L['speakers'][you]['name']}. After each English prompt, say the line, then listen to check."), silence(1.0)]
    for l, w in zip(L["lines"], lines):
        if l["who"] == you:
            walk += [E(l["en"]), silence(len(w) / SR * 1.8 + 1.5), w, silence(1.0)]
        else:
            walk += [w, silence(0.8)]
    walk += [E("Well done. See you tomorrow.")]
    walk = np.concatenate(walk); mp3(walk, out / "walk.mp3"); print("walk", round(len(walk)/SR), "s")

if __name__ == "__main__":
    main(sys.argv[1])
