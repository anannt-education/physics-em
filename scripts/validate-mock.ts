import { MOCK1_PUBLIC } from "../src/content/mocks/form1-public";
import { MOCK1_KEYS } from "../src/content/mocks/form1-keys";
import { MOCK1_FRQS, MOCK_FORMS } from "../src/content/mocks";
import { ACTIVE_EXAM_PROFILE, MOCK_MCQ_ALLOCATION_2027 } from "../src/content/exam-profile";

const errors: string[] = [];
const check = (ok: unknown, message: string) => { if (!ok) errors.push(message); };
const validText = (s: string) => !!s?.trim() && !/\b(?:placeholder|lorem ipsum|todo|tbd|undefined|null)\b/i.test(s);
check(MOCK1_PUBLIC.length === ACTIVE_EXAM_PROFILE.mcqCount, "MCQ count");
check(MOCK1_FRQS.length === ACTIVE_EXAM_PROFILE.frqCount, "FRQ count");
check(new Set(MOCK1_PUBLIC.map(q => q.id)).size === MOCK1_PUBLIC.length, "duplicate MCQ IDs");
check(Object.keys(MOCK1_KEYS).length === MOCK1_PUBLIC.length, "key count");
for (const [unit, count] of Object.entries(MOCK_MCQ_ALLOCATION_2027)) check(MOCK1_PUBLIC.filter(q => q.unit === Number(unit)).length === count, `unit ${unit} count`);
for (const q of MOCK1_PUBLIC) {
  check(validText(q.stem), `${q.id} stem`);
  check(q.choices.length === 4 && new Set(q.choices.map(c => c.id)).size === 4, `${q.id} choice IDs/count`);
  check(q.choices.every(c => validText(c.text)) && new Set(q.choices.map(c => c.text.trim().toLowerCase())).size === 4, `${q.id} empty/duplicate choices`);
  check(typeof MOCK1_KEYS[q.id]?.correct === "string" && q.choices.filter(c => c.id === MOCK1_KEYS[q.id].correct).length === 1, `${q.id} key`);
  check(validText(MOCK1_KEYS[q.id]?.explanation), `${q.id} explanation`);
}
const maxima = [10, 12, 10, 8];
for (const [i, f] of MOCK1_FRQS.entries()) {
  check(f.category === ACTIVE_EXAM_PROFILE.frqCategories[i] && f.totalPoints === maxima[i], `${f.id} blueprint`);
  check(validText(f.modelSolution) && f.parts.every(p => validText(p.prompt)), `${f.id} text`);
  check(f.rubric.length > 0 && f.rubric.every(r => validText(r.earns) && r.points > 0), `${f.id} rubric`);
  check(new Set(f.rubric.map(r => r.id)).size === f.rubric.length, `${f.id} duplicate rubric IDs`);
  check(f.parts.reduce((n,p) => n+p.points,0) === f.totalPoints && f.rubric.reduce((n,r) => n+r.points,0) === f.totalPoints, `${f.id} points`);
  for (const part of f.parts) check(f.rubric.filter(r => r.id.startsWith(part.id) && /^\d+$/.test(r.id.slice(part.id.length))).reduce((n,r) => n+r.points,0) === part.points, `${f.id}/${part.id} rubric ownership/points`);
  check(f.rubric.every(r => f.parts.some(p => r.id.startsWith(p.id) && /^\d+$/.test(r.id.slice(p.id.length)))), `${f.id} orphan rubric`);
}
for (const f of MOCK_FORMS) check(f.mcqIds.length === 42 && new Set(f.mcqIds).size === 42 && f.mcqIds.every(id => MOCK1_PUBLIC.some(q => q.id === id)) && f.frqIds.length === 4 && new Set(f.frqIds).size === 4 && f.frqIds.every(id => MOCK1_FRQS.some(q => q.id === id)), `${f.id} form contents`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Mock validation passed: 42 MCQs, 4 FRQs, 40 rubric points.");
