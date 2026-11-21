// Merge a lesson's head + parts into content/<lang>/<NNN>.yaml and print checks.
// usage: node tools/merge-lesson.mjs kannada 2
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const [lang, numArg] = process.argv.slice(2);
const num = String(numArg).padStart(3, '0');
const dir = path.join('content', lang, '_parts');
const head = yaml.load(fs.readFileSync(path.join(dir, `${num}-head.yaml`), 'utf8'));
const parts = fs.readdirSync(dir).filter(f => new RegExp(`^${num}-p\\d+\\.yaml$`).test(f)).sort();
head.lines = parts.flatMap(f => yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')).lines);

const spoken = head.lines.filter(l => l.who);
const unknown = [...new Set(spoken.map(l => l.who))].filter(w => !head.speakers[w]);
const incomplete = spoken.filter(l => !(l.t && l.tr && l.en));
if (unknown.length || incomplete.length) {
  console.error('unknown speakers:', unknown, 'incomplete lines:', incomplete.length);
  process.exit(1);
}
fs.writeFileSync(path.join('content', lang, `${num}.yaml`),
  `# ${lang} — Lesson ${Number(numArg)} (merged from ${parts.join(', ')})\n` + yaml.dump(head, { lineWidth: -1, quotingType: '"' }));

// stats: reuse of earlier lessons' vocabulary vs new words
const words = ls => new Set(ls.flatMap(l => l.t.replace(/[!?.,…‘’“”—:;()"']/g, ' ').split(/\s+/).filter(Boolean)));
const prev = new Set();
for (let n = 1; n < Number(numArg); n++) {
  const f = path.join('content', lang, `${String(n).padStart(3, '0')}.yaml`);
  if (fs.existsSync(f)) for (const w of words(yaml.load(fs.readFileSync(f, 'utf8')).lines.filter(l => l.who))) prev.add(w);
}
const cur = words(spoken);
const reused = [...cur].filter(w => prev.has(w)).length;
console.log(`parts ${parts.length} · spoken ${spoken.length} · chapters ${head.lines.filter(l => l.chapter).length} · sections ${head.lines.filter(l => l.section).length}`);
console.log(`word forms ${cur.size} · reused from earlier lessons ${reused} · new ${cur.size - reused} · total known after this lesson ${new Set([...prev, ...cur]).size}`);
