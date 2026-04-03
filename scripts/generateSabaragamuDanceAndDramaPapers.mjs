// Generator to create Grade 6 Sabaragamu Dance and Drama papers.
//
// Output:
// - 40 files: src/data/grade6/sabaragamudancepaper1.js ... sabaragamudancepaper40.js
// - 40 files: src/data/grade6/dramapaper1.js ... dramapaper40.js
// - Each file exports exactly 40 question objects in the form:
//     { question, options: [4], answer: 0..3, explanation }
//
// Constraints enforced by generator:
// - question: never ends with trailing digits
// - options always exactly 4 strings
// - answer always index of correct option within options (0..3)
// - no duplicate question strings across all 3200 questions

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'grade6');

const totalPapers = 40;
const perPaper = 40;
const target = totalPapers * perPaper; // 1600 each stream

const questionTemplates = [
  (b) => `${b} යනු කුමක්ද?`,
  (b) => `මෙහි ${b} පිළිබඳව නිවැරදි පිළිතුර කුමක්ද?`,
  (b) => `නිවැරදි පිළිතුර ${b} සම්බන්ධයෙන් කුමක්ද?`,
  (b) => `${b} ලෙස හඳුන්වන්නේ කුමන අංගයද?`,
  (b) => `${b} දක්වන්නේ කෙසේද?`,
  (b) => `${b} සඳහා නිවැරදි අර්ථය තෝරන්න.`,
  (b) => `${b} සඳහා ගැලපෙන පිළිතුර කුමක්ද?`,
  (b) => `${b} අදාළ නිවැරදි විස්තරය කුමක්ද?`,
  (b) => `නිවැරදි පිළිතුර ලෙස ${b} සලකන්නේ කෙසේද?`,
  (b) => `${b} නිවැරදිව තෝරන්නේ කෙසේද?`,
  (b) => `පිළිතුර ලෙස ${b} තෝරන්න.`,
  (b) => `${b} සම්බන්ධව සත්‍යය කුමක්ද?`,
  (b) => `${b} ගැන ඇති නිවැරදි දැනුම කුමක්ද?`,
  (b) => `${b} සඳහා වැදගත් වන කරුණ කුමක්ද?`,
  (b) => `${b} යනුවෙන් අදහස් කරන්නේ කුමක්ද?`,
  (b) => `${b} යොදා ගන්නේ කුමන අවස්ථාවටද?`,
  (b) => `${b} සමඟ ගැලපෙන අංගය කුමක්ද?`,
  (b) => `${b} පිළිබඳව නිවැරදි අර්ථය කුමක්ද?`,
  (b) => `${b} කුමන නර්තන අංගයක්ද?`,
  (b) => `${b} සම්බන්ධ නිවැරදි කරුණ කුමක්ද?`,
];

const variantsPerFact = questionTemplates.length; // 20

function rotate(arr, by) {
  const a = [...arr];
  const n = a.length;
  const k = ((by % n) + n) % n;
  return a.slice(k).concat(a.slice(0, k));
}

function pickWrongChoices(correct, pool, count, variantIndex) {
  const filtered = pool.filter((x) => x !== correct);
  if (filtered.length < count) throw new Error('Not enough wrong choices');
  const rotated = rotate(filtered, variantIndex);
  return rotated.slice(0, count);
}

function buildOptions(correct, wrongPool, variantIndex) {
  const wrong = pickWrongChoices(correct, wrongPool, 3, variantIndex);
  const all = [correct, ...wrong];
  return rotate(all, variantIndex + correct.length);
}

function escapeForTemplateLiteral(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

function sanitizeQuestionText(s) {
  // Remove trailing ASCII digits only (if any).
  return String(s).replace(/[0-9]+$/g, '').trim();
}

function validateQuestion(q) {
  if (typeof q.question !== 'string') return 'question-not-string';
  if (/[0-9]+$/.test(q.question)) return 'question-trailing-digits';
  if (!Array.isArray(q.options) || q.options.length !== 4) return 'options-invalid';
  for (const opt of q.options) {
    if (typeof opt !== 'string') return 'option-not-string';
  }
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) return 'answer-invalid';
  if (q.options[q.answer] !== q.correct) return 'answer-mismatch';
  return null;
}

function generateStreamPapers({
  streamName,
  paperVarPrefix,
  facts,
  wrongPoolDefinitions,
  globalSeen,
}) {
  if (facts.length < 80) {
    throw new Error(`facts for ${streamName} must be at least 80, got ${facts.length}`);
  }

  // We use exactly 80 facts to produce 80 * 20 = 1600 unique questions.
  const questions = [];

  for (let factIndex = 0; factIndex < 80; factIndex += 1) {
    const f = facts[factIndex];
    for (let v = 0; v < variantsPerFact; v += 1) {
      if (questions.length >= target) break;

      const templateIndex = v % questionTemplates.length;
      const rawQuestion = questionTemplates[templateIndex](f.base);
      const question = sanitizeQuestionText(rawQuestion);

      if (globalSeen.has(question)) {
        // Ensure global uniqueness; if collision occurs (should be rare), skip this question.
        continue;
      }

      const options = buildOptions(f.correct, wrongPoolDefinitions, factIndex * variantsPerFact + v);
      const answer = options.indexOf(f.correct);
      if (answer < 0) throw new Error('answer not found');

      const explanation = sanitizeQuestionText(f.explanation);

      globalSeen.add(question);
      questions.push({ question, options, answer, correct: f.correct, explanation });
    }
    if (questions.length >= target) break;
  }

  if (questions.length !== target) {
    throw new Error(`Generated ${questions.length} questions for ${streamName}, expected ${target}`);
  }

  for (let paper = 1; paper <= totalPapers; paper += 1) {
    const start = (paper - 1) * perPaper;
    const end = start + perPaper;
    const questionsForPaper = questions.slice(start, end);

    const varName = `${paperVarPrefix}${paper}`;
    const fileName = path.join(OUTPUT_DIR, `${varName}.js`);

    const bodyLines = questionsForPaper.map((q) => {
      const escapedQuestion = escapeForTemplateLiteral(q.question);
      const escapedOptions = q.options.map((opt) => escapeForTemplateLiteral(opt));
      const escapedExplanation = escapeForTemplateLiteral(q.explanation);
      return `  {\n    question: \`${escapedQuestion}\`,\n    options: [\`${escapedOptions[0]}\`, \`${escapedOptions[1]}\`, \`${escapedOptions[2]}\`, \`${escapedOptions[3]}\`],\n    answer: ${q.answer},\n    explanation: \`${escapedExplanation}\`,\n  }`;
    });

    const fileContents = `export const ${varName} = [\n${bodyLines.join(',\n')}\n];\n`;
    fs.writeFileSync(fileName, fileContents, 'utf8');
    console.log(`Wrote ${fileName}`);
  }

  console.log(`Done generating ${streamName} papers.`);
}

function makeFactsFromConcepts(categoryLabel, concepts) {
  const suffixes = ['අර්ථය', 'මූලික අංගය', 'භාවිතය', 'වැදගත්කම'];

  const facts = [];
  for (const c of concepts) {
    for (const suffix of suffixes) {
      const base = `${categoryLabel} ${c.concept} ${suffix}`;
      // correct option uses the concept-specific definition (no digits).
      const correct = c.correct;
      const explanation = `${correct} යනු ${categoryLabel} නර්තන/රංගනයට අදාළ සංකල්පයකි.`;
      facts.push({ base, correct, explanation });
    }
  }
  return facts;
}

// -------------------------
// Sabaragamu Dance facts
// -------------------------
const sabaragamuConcepts = [
  { concept: 'නර්තන සම්ප්‍රදාය', correct: 'සබරගමු නර්තන සම්ප්‍රදාය යනු දේශීය චාරිත්‍ර හා බෙර රිද්මයට ගැලපෙන නර්තන විලාසයයි.' },
  { concept: 'දවුල', correct: 'දවුල යනු උඩරට/සබරගමු රිද්මය පවත්වාගන්නා ප්‍රධාන වාද්‍ය සහ සංගති අංගයකි.' },
  { concept: 'මූලික පියවර', correct: 'මූලික පියවර යනු නර්තනයට ආරම්භයේ පුහුණු කරන මූලික චලන පියවරයි.' },
  { concept: 'පා සරඹය', correct: 'පා සරඹය යනු පා පියවර ප්‍රධාන කරගෙන තාලයට ගැලපෙන ලෙස කරන චලනයකි.' },
  { concept: 'ගොඩ සරඹය', correct: 'ගොඩ සරඹය යනු බිමට/ස්ථානයට සම්බන්ධව පියවර තාලයට ගැලපෙන ලෙස කරන චලනයකි.' },
  { concept: 'අඩව්', correct: 'අඩව් යනු සබරගමු නර්තනයේ පදනම වන මූලික අංග එකතුවයි.' },
  { concept: 'තාලානුකූල පියවර', correct: 'තාලානුකූල පියවර යනු බෙර තාලයට අනුව නිවැරදිව තබන පියවරයි.' },
  { concept: 'අත් අභිනය', correct: 'අත් අභිනය යනු අත් චලනයන් මගින් අර්ථය හා හැඟීම පෙන්වන අංගයයි.' },
  { concept: 'නෙත් අභිනය', correct: 'නෙත් අභිනය යනු දෑස් යොමු කරමින් නර්තනයේ අර්ථය පෙන්වීමේ අංගයයි.' },
  { concept: 'ශරීර ඉරියව්', correct: 'ශරීර ඉරියව් යනු චලනයට සමඟ ශරීරය නිවැරදිව තබා පවත්වාගැනීමයි.' },
  { concept: 'වේග පාලනය', correct: 'වේග පාලනය යනු තාලයට අනුව වේගය නිවැරදිව පවත්වාගැනීමයි.' },
  { concept: 'අංග සමබරතාව', correct: 'අංග සමබරතාව යනු අත්, පා, ශරීර චලනයන් එකිනෙකට ගැලපී පවත්වාගැනීමයි.' },
  { concept: 'ශාන්තිකර්මය', correct: 'ශාන්තිකර්මය යනු සුවපත් වීම/අසුභතා දුරු කිරීම සඳහා සිදු කරන චාරිත්‍රය හා බැඳුණු අංගයකි.' },
  { concept: 'මහ සමන් දේවාල පෙරහැර', correct: 'මහ සමන් දේවාල පෙරහැර යනු සබරගමු සම්ප්‍රදායේ ප්‍රධාන චාරිත්‍රමය නර්තන අංග සමඟින් ඉදිරිපත් වන පෙරහැරකි.' },
  { concept: 'දවුල රිද්මය', correct: 'දවුල රිද්මය යනු දවුල වාදනයට ගැලපෙන ලෙස නර්තනයේ තාලය තීරණය කරන රිද්මයකි.' },
  { concept: 'අත් පා ගැලපීම', correct: 'අත් පා ගැලපීම යනු අත් අභිනය සහ පා පියවර එකට ගැලපෙන පරිදි ඉදිරිපත් කිරීමයි.' },
  { concept: 'අංග අතර මාරුව', correct: 'අංග අතර මාරුව යනු එක අංගයෙන් තවත් අංගයකට යාම තාලයට ගැලපෙන ලෙස කිරීමයි.' },
  { concept: 'පියවර මතකය', correct: 'පියවර මතකය යනු නියමිත අනුපිළිවෙල මතක තබාගෙන ඉදිරිපත් කිරීමයි.' },
  { concept: 'ඉදිරිපත් කිරීම', correct: 'ඉදිරිපත් කිරීම යනු සංගීතය හා තාලයට ගැලපෙන ලෙස නර්තනය දර්ශනයට ඉදිරිපත් කිරීමයි.' },
  { concept: 'දේශීය නර්තන කලාව', correct: 'දේශීය නර්තන කලාව යනු අපේ සංස්කෘතියට අයත් චාරිත්‍ර හා අභිනය මූලික කරගත් නර්තන කලා විලාසයකි.' },
];

if (sabaragamuConcepts.length !== 20) {
  // We need 20 concepts -> 20 * 4 suffixes = 80 facts.
  throw new Error('sabaragamuConcepts must be exactly 20');
}

const sabWrongPool = sabaragamuConcepts.map((c) => c.correct);
const sabFacts = makeFactsFromConcepts('සබරගමු', sabaragamuConcepts);

// -------------------------
// Drama facts
// -------------------------
const dramaConcepts = [
  { concept: 'නාට්‍ය කලාව', correct: 'නාට්‍ය කලාව යනු අනුකරණය, රංගනය සහ වේදිකා ඉදිරිපත් කිරීම මඟින් අදහස් ප්‍රකාශ කරන කලා විලාසයකි.' },
  { concept: 'රංගනය', correct: 'රංගනය යනු භූමිකාවකට අනුව අභිනයෙන් සහ ක්‍රියාවෙන් කතාව ඉදිරිපත් කිරීමයි.' },
  { concept: 'ආංගික අභිනය', correct: 'ආංගික අභිනය යනු ශරීර චලනයන් මඟින් අදහස් පෙන්වන අභිනයයි.' },
  { concept: 'වාචික අභිනය', correct: 'වාචික අභිනය යනු වචන, උච්චාරණ හා කටහඬ මඟින් අර්ථය පෙන්වන අභිනයයි.' },
  { concept: 'සාත්ත්වික අභිනය', correct: 'සාත්ත්වික අභිනය යනු භූමිකාවට ගැලපෙන ලෙස හැඟීම් විශ්වාසව පෙන්වන අභිනයයි.' },
  { concept: 'ආහාර්ය', correct: 'ආහාර්ය යනු ඇඳුම්, උපාංග, වේශ හා රංග භාණ්ඩ වගේ දෘශ්‍ය අංගයි.' },
  { concept: 'වේදිකාව', correct: 'වේදිකාව යනු නාට්‍ය ඉදිරිපත් කිරීමට සකස් කරන ස්ථානයයි.' },
  { concept: 'රංග භාණ්ඩ', correct: 'රංග භාණ්ඩ යනු භූමිකාවට ගැලපෙමින් භාවිතා කරන ද්‍රව්‍ය/උපාංගයි.' },
  { concept: 'නර්තන පදනම', correct: 'නර්තන පදනම යනු රංගනයේ චලන සහ අභිනය එකට ගැලපෙන ලෙස කරගැනීමයි.' },
  { concept: 'අභිනය', correct: 'අභිනය යනු අදහස් ප්‍රකාශ කරගැනීමට ශරීරය හා කටහඬ භාවිතා කිරීමයි.' },
  { concept: 'සංවාද', correct: 'සංවාද යනු චරිත දෙකක් අතර හුවමාරු වන වචන/වචන සම්ප්‍රේෂණයයි.' },
  { concept: 'පිටපත', correct: 'පිටපත යනු නාට්‍යයේ සිදුවීම් අනුපිළිවෙල ලියන ලද ලේඛනයයි.' },
  { concept: 'දර්ශනය', correct: 'දර්ශනය යනු නාට්‍යයේ කට්ටියක් ලෙස දර්ශනයට ගෙන එන කොටසයි.' },
  { concept: 'චරිතය', correct: 'චරිතය යනු භූමිකාවක් භාර ගෙන නාට්‍යයේ සිදුවීම් ඉදිරිපත් කරන පුද්ගලයා/පಾತ್ರයයි.' },
  { concept: 'වේදිකා ආලෝකය', correct: 'වේදිකා ආලෝකය යනු දර්ශනය පැහැදිලි කර පසුබිමට උචිතව සකස් කරන ආලෝකයයි.' },
  { concept: 'අභිනයේ පැහැදිලිකම', correct: 'අභිනයේ පැහැදිලිකම යනු ප්‍රේක්ෂකයාට අර්ථය පැහැදිලිව පෙන්වන ලෙස අභිනය කිරීමයි.' },
  { concept: 'උච්චාරණය', correct: 'උච්චාරණය යනු වචන නිවැරදිව හා පැහැදිලිව උච්චාරණය කිරීමයි.' },
  { concept: 'භූමිකාව', correct: 'භූමිකාව යනු නාට්‍යයේ චරිතයට අයත් කාර්යය සහ හැසිරීමයි.' },
  { concept: 'වේදිකා සැකසුම', correct: 'වේදිකා සැකසුම යනු දර්ශනයට ගැලපෙන ලෙස වේදිකාව සහ රංග භාණ්ඩ සකස් කිරීමයි.' },
  { concept: 'රංගනයේ ආරම්භය', correct: 'රංගනයේ ආරම්භය යනු දර්ශනයට අදාළ ලෙස පළමු චලනයෙන් නාට්‍යය ආරම්භ කිරීමයි.' },
];

if (dramaConcepts.length !== 20) {
  throw new Error('dramaConcepts must be exactly 20');
}

const dramaWrongPool = dramaConcepts.map((c) => c.correct);
const dramaFacts = makeFactsFromConcepts('නාට්‍ය', dramaConcepts);

// -------------------------
// Generate both streams and enforce global uniqueness.
// -------------------------
const globalSeen = new Set();

// Sabaragamu
generateStreamPapers({
  streamName: 'සබරගමු නර්තනය',
  paperVarPrefix: 'sabaragamudancepaper',
  facts: sabFacts,
  wrongPoolDefinitions: sabWrongPool,
  globalSeen,
});

// Drama
generateStreamPapers({
  streamName: 'නාට්‍ය හා රංග කලාව',
  paperVarPrefix: 'dramapaper',
  facts: dramaFacts,
  wrongPoolDefinitions: dramaWrongPool,
  globalSeen,
});

