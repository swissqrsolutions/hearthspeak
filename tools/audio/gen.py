"""Generate the MP3s for one episode (free, no account needed).

usage:  .venv/Scripts/python gen.py ../../content/kannada/001.yaml

Voices: Microsoft Edge neural voices via the open-source `edge-tts` tool (free, online only at
build time; the phone just plays the finished MP3s offline). Each character gets its own
voice / pitch / speed from the YAML `speakers` block.

Outputs -> site/<lang>/<num>/audio/line-N.mp3  (one per spoken line)
           site/<lang>/<num>/audio/episode.mp3 (whole story, scene captions in English)
"""
import sys, asyncio, hashlib, pathlib, io
import numpy as np, yaml, soundfile as sf, lameenc, edge_tts

SR = 24000
ROOT = pathlib.Path(__file__).resolve().parents[2]
CACHE = pathlib.Path(__file__).resolve().parent / ".cache"
CACHE.mkdir(exist_ok=True)
NARRATOR = dict(voice="en-GB-RyanNeural", pitch="+0Hz", rate="-8%")

async def tts(text, voice, pitch="+0Hz", rate="+0%"):
    """Return MP3 bytes, cached by content."""
    key = hashlib.sha1(f"{voice}|{pitch}|{rate}|{text}".encode()).hexdigest()[:16]
    p = CACHE / f"{key}.mp3"
    if not p.exists():
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(p))
                break
            except Exception as e:
                print("  retry", attempt + 1, e); await asyncio.sleep(2 + attempt * 3)
    return p.read_bytes()

def decode(mp3):
    wav, sr = sf.read(io.BytesIO(mp3), dtype="float32")
    if wav.ndim > 1: wav = wav.mean(1)
    assert sr == SR, sr
    return wav

def silence(sec): return np.zeros(int(SR * sec), np.float32)

def encode(wav, path):
    enc = lameenc.Encoder()
    enc.set_bit_rate(40); enc.set_in_sample_rate(SR); enc.set_channels(1); enc.set_quality(2)
    path.write_bytes(enc.encode((np.clip(wav, -1, 1) * 32767).astype("<i2").tobytes()) + enc.flush())

async def main(yaml_path):
    L = yaml.safe_load(open(yaml_path, encoding="utf8"))
    out = ROOT / "site" / L["lang"] / f"{L['num']:03d}" / "audio"
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.mp3"): old.unlink()
    S = L["speakers"]

    episode = [decode(await tts(f"Episode {L['num']}. {L['title']['en']}.", **NARRATOR)), silence(1.0)]
    n = 0
    for item in L["lines"]:
        if "part" in item:
            episode += [silence(1.2), decode(await tts(item["part"].replace("·", ",").replace("—", "."), **NARRATOR)), silence(1.2)]
            continue
        if "scene" in item:
            episode += [silence(0.6), decode(await tts(item["scene"], **NARRATOR)), silence(0.9)]
            continue
        n += 1
        s = S[item["who"]]
        mp3 = await tts(item["t"], s["voice"], s.get("pitch", "+0Hz"), s.get("rate", "+0%"))
        wav = decode(mp3)
        encode(wav, out / f"line-{n}.mp3")
        episode += [wav, silence(0.75)]
        print(f"line {n:2d} {item['who']}")
    ep = np.concatenate(episode)
    encode(ep, out / "episode.mp3")
    print(f"episode: {len(ep)/SR/60:.1f} min, {n} lines")

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1]))
