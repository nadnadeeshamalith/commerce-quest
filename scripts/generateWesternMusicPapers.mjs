// Generator to create Grade 6 Western Music papers.
//
// Output:
// - 40 files: src/data/grade6/westernmusicpaper1.js ... westernmusicpaper40.js
// - Each file exports: `export const westernmusicpaperN = [ ... ]`
// - Exactly 40 question objects per file (total 1600).
//
// Notes:
// - Does NOT append numeric IDs to the END of `question` strings.
// - Generates Sinhala text-based multiple choice questions.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------------

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'grade6');

function rotate(arr, by) {
  const a = [...arr];
  const n = a.length;
  const k = ((by % n) + n) % n;
  return a.slice(k).concat(a.slice(0, k));
}

function pickWrongChoices(correct, pool, count, variantIndex) {
  const filtered = pool.filter((x) => x !== correct);
  const rotated = rotate(filtered, variantIndex);
  return rotated.slice(0, count);
}

function buildOptions(correct, wrongPool, variantIndex) {
  const wrong = pickWrongChoices(correct, wrongPool, 3, variantIndex);
  const all = [correct, ...wrong];
  // Deterministic shuffle/rotation to vary the correct option index.
  const rotated = rotate(all, variantIndex + correct.length);
  return rotated;
}

function escapeForTemplateLiteral(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

// Some accidental non-Sinhala characters may appear in instrument names.
// Keep question/option text clean for the UI.
const TELUGU_TUBA = '\u0C24\u0C2C\u0C3E'; // "టబా" (Telugu)
function sanitizeSinhalaText(s) {
  return String(s).split(TELUGU_TUBA).join('ටූබා');
}

// -----------------------------------------------------------------------------------
// Question generation
// -----------------------------------------------------------------------------------

function generateAll() {
  const totalPapers = 40;
  const perPaper = 40;
  const target = totalPapers * perPaper; // 1600

  const questionTemplates = [
    (base) => `${base} කුමක්ද?`,
    (base) => `${base} පිළිතුර කුමක්ද?`,
    (base) => `නිවැරදි පිළිතුර ${base} ද?`,
    (base) => `${base} ලෙස හඳුන්වන්නේ කුමක්ද?`,
    (base) => `මෙහි ${base} පිළිතුර කුමක්ද?`,
    (base) => `${base} තෝරන්න, කුමක්ද?`,
    (base) => `${base} ගැලපෙන පිළිතුර කුමක්ද?`,
    (base) => `${base} නිවැරදි පිළිතුර කුමක්ද?`,
    (base) => `${base} කුමන නමකින්ද?`,
    (base) => `පිළිතුර ලෙස ${base} තෝරන්නේ කෙසේද?`,
    (base) => `${base} සම්බන්ධ නිවැරදි පිළිතුර කුමක්ද?`,
    (base) => `${base} ගැන නිවැරදි දැනුම කුමක්ද?`,
    (base) => `${base} දක්වන්නේ කුමක්ද?`,
    (base) => `${base} කුමන එකක්ද?`,
    (base) => `${base} නම් මොන එකක්ද?`,
    (base) => `${base} පිළිබඳව සත්‍යය කුමක්ද?`,
    (base) => `${base} කුමක් ලෙසද?`,
    (base) => `${base} මොන වර්ගයටද?`,
  ];

  const questions = [];
  const seen = new Set();

  function addQuestion({ base, correct, wrongPool, explanation, variantIndex }) {
    const templateIndex = variantIndex % questionTemplates.length;
    const question = questionTemplates[templateIndex](base);
    if (seen.has(question)) return false;

    const options = buildOptions(correct, wrongPool, variantIndex);
    const answer = options.indexOf(correct);
    if (answer === -1) return false;

    seen.add(question);
    questions.push({ question, options, answer, explanation });
    return true;
  }

  function addFactVariants(facts, wrongPoolByFact, explainByFact, buildBaseByFact, optionsCorrectByFact, variantsPerFact) {
    for (let factIndex = 0; factIndex < facts.length; factIndex += 1) {
      const f = facts[factIndex];
      const correct = optionsCorrectByFact(f);
      const wrongPool = wrongPoolByFact(f);
      const explanation = explainByFact(f);
      const base = buildBaseByFact(f);

      for (let v = 0; v < variantsPerFact; v += 1) {
        if (questions.length >= target) return;
        addQuestion({ base, correct, wrongPool, explanation, variantIndex: factIndex * variantsPerFact + v });
      }
      if (questions.length >= target) return;
    }
  }

  const pushUntil = () => {
    if (questions.length >= target) return;
  };

  // Variants per fact: tuned so total >= 1600.
  const variantsPerFact = 18;

  // 1) Clef note mapping facts (Treble + Bass, 9 positions each => 18 facts)
  const ordLine = ['පළමු', 'දෙවන', 'තුන්වන', 'හතරවන', 'පස්වන'];
  const ordSpace = ['පළමු ඉඩ', 'දෙවන ඉඩ', 'තුන්වන ඉඩ', 'හතරවන ඉඩ'];

  const trebleLines = ['E', 'G', 'B', 'D', 'F']; // bottom -> top
  const trebleSpaces = ['F', 'A', 'C', 'E']; // bottom -> top
  const bassLines = ['G', 'B', 'D', 'F', 'A']; // bottom -> top
  const bassSpaces = ['A', 'C', 'E', 'G']; // bottom -> top

  const notePool = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const clefFacts = [];
  for (let i = 0; i < trebleLines.length; i += 1) {
    clefFacts.push({
      clef: 'ට්‍රෙබල් ක්ලෙෆ්',
      posType: 'රේඛාව',
      posText: ordLine[i],
      note: trebleLines[i],
      clefHint: 'ට්‍රෙබල් ක්ලෙෆ් පටිත්තෙහි රේඛා අනුපිළිවෙල'
    });
  }
  for (let i = 0; i < trebleSpaces.length; i += 1) {
    clefFacts.push({
      clef: 'ට්‍රෙබල් ක්ලෙෆ්',
      posType: 'ඉඩ',
      posText: ordSpace[i],
      note: trebleSpaces[i],
      clefHint: 'ට්‍රෙබල් ක්ලෙෆ් පටිත්තෙහි ඉඩ අනුපිළිවෙල'
    });
  }
  for (let i = 0; i < bassLines.length; i += 1) {
    clefFacts.push({
      clef: 'බාස් ක්ලෙෆ්',
      posType: 'රේඛාව',
      posText: ordLine[i],
      note: bassLines[i],
      clefHint: 'බාස් ක්ලෙෆ් පටිත්තෙහි රේඛා අනුපිළිවෙල'
    });
  }
  for (let i = 0; i < bassSpaces.length; i += 1) {
    clefFacts.push({
      clef: 'බාස් ක්ලෙෆ්',
      posType: 'ඉඩ',
      posText: ordSpace[i],
      note: bassSpaces[i],
      clefHint: 'බාස් ක්ලෙෆ් පටිත්තෙහි ඉඩ අනුපිළිවෙල'
    });
  }

  // Base text without ending '?' so templates can append different phrasing.
  addFactVariants(
    clefFacts,
    () => notePool,
    (f) => `${f.clef} හි ${f.posText} මත නිවැරදි ස්වරය ${f.note} ලෙස සලකුණු වේ.`,
    (f) => `${f.clef} එකේ ${f.posText} මත ඇති ස්වරය`,
    (f) => f.note,
    variantsPerFact
  );

  // 2) Note durations in 4/4
  const durationFacts = [
    { noteName: 'Quarter note', base: 'ක්වාටර් නෝට්', beats: 'එක beat එකක්', correctBeats: 'එක beat එකක්' },
    { noteName: 'Half note', base: 'හෆ් නෝට්', beats: 'දෙක beat', correctBeats: 'දෙක beat' },
    { noteName: 'Whole note', base: 'වෝල් නෝට්', beats: 'හතර beat', correctBeats: 'හතර beat' },
    { noteName: 'Eighth note', base: 'එයිත් නෝට්', beats: 'අඩ beat එකක්', correctBeats: 'අඩ beat එකක්' },
    { noteName: 'Sixteenth note', base: 'සික්ස්ටීන්ත් නෝට්', beats: 'හතරෙන් එක beat', correctBeats: 'හතරෙන් එක beat' },
  ];

  const beatsPool = ['එක beat එකක්', 'දෙක beat', 'හතර beat', 'අඩ beat එකක්', 'හතරෙන් එක beat', 'තුන beat'];

  addFactVariants(
    durationFacts,
    (f) => beatsPool,
    (f) => `හතර/හතර (4/4) කාලයකදී ${f.base} සඳහා ${f.correctBeats} ගණන් වේ.`,
    (f) => `හතර/හතර කාල සංකේතයේදී ${f.base} එකක් සඳහා beat කීයක්`,
    (f) => f.correctBeats,
    variantsPerFact
  );

  // 3) Time signature facts (beat count and note value gets beat)
  const timeSignatures = [
    { sig: 'දෙක/හතර', beats: 'දෙක', beatUnit: 'Quarter note' },
    { sig: 'තුන/හතර', beats: 'තුන', beatUnit: 'Quarter note' },
    { sig: 'හතර/හතර', beats: 'හතර', beatUnit: 'Quarter note' },
    { sig: 'තුන/අට', beats: 'තුන', beatUnit: 'Eighth note' },
    { sig: 'හය/අට', beats: 'හය', beatUnit: 'Eighth note' },
    { sig: 'නව/අට', beats: 'නවය', beatUnit: 'Eighth note' },
    { sig: 'දෙක/දෙක', beats: 'දෙක', beatUnit: 'Half note' },
    { sig: 'පහ/හතර', beats: 'පහ', beatUnit: 'Quarter note' },
  ];

  const beatsCountPool = ['දෙක', 'තුන', 'හතර', 'පහ', 'හය', 'නවය', 'අට'];
  const beatUnitPool = ['Quarter note', 'Half note', 'Eighth note', 'Whole note'];

  const timeBeatFacts = [];
  const timeUnitFacts = [];
  for (const ts of timeSignatures) {
    timeBeatFacts.push({ type: 'beats', sig: ts.sig, beats: ts.beats });
    timeUnitFacts.push({ type: 'unit', sig: ts.sig, beatUnit: ts.beatUnit });
  }

  addFactVariants(
    timeBeatFacts,
    (f) => beatsCountPool,
    (f) => `${f.sig} කාල සංකේතයේ එක් මිනුමක beat ගණන ${f.beats} වේ.`,
    (f) => `${f.sig} කාල සංකේතයේ එක් මිනුමක beat කීයක්`,
    (f) => f.beats,
    variantsPerFact
  );

  addFactVariants(
    timeUnitFacts,
    (f) => beatUnitPool,
    (f) => `${f.sig} කාල සංකේතයේ පහළ අංකය අනුව beat එක ගන්නේ ${f.beatUnit} යන්නයි.`,
    (f) => `${f.sig} කාල සංකේතයේදී beat එක ගන්නේ කුමන නෝට් එකද?`,
    (f) => f.beatUnit,
    variantsPerFact
  );

  // 4) Accidentals
  const accidentalFacts = [
    { symbolName: 'ෂාර්ප්', effect: 'අර්ධ ස්වරයෙන් උස් කරයි', correct: 'අර්ධ ස්වරයෙන් උස් කරයි' },
    { symbolName: 'ෆ්ලැට්', effect: 'අර්ධ ස්වරයෙන් පහළට දමයි', correct: 'අර්ධ ස්වරයෙන් පහළට දමයි' },
    { symbolName: 'නැචුරල්', effect: 'පැරණි අනතුර (sharp/flat) අවලංගු කර නැවත ශුද්ධ ස්වරයට ගෙනේ', correct: 'ශුද්ධ ස්වරයට නැවත ගෙනේ' },
  ];
  const accidentalPool = ['අර්ධ ස්වරයෙන් උස් කරයි', 'අර්ධ ස්වරයෙන් පහළට දමයි', 'ශුද්ධ ස්වරයට නැවත ගෙනේ', 'නාදය නැති කරයි', 'වේගය වැඩි කරයි'];

  addFactVariants(
    accidentalFacts,
    (f) => accidentalPool,
    (f) => `${f.symbolName} සංකේතය යොදා ගත් විට ${f.effect}.`,
    (f) => `${f.symbolName} සංකේතය යොදාගත් විට ස්වරය කෙසේ වෙනස් වේද`,
    (f) => f.correct,
    variantsPerFact
  );

  // 5) Rests in 4/4
  const restFacts = [
    { rest: 'Whole rest', name: 'වෝල් රෙස්ට්', beats: 'හතර beat', correct: 'හතර beat' },
    { rest: 'Half rest', name: 'හෆ් රෙස්ට්', beats: 'දෙක beat', correct: 'දෙක beat' },
    { rest: 'Quarter rest', name: 'ක්වාටර් රෙස්ට්', beats: 'එක beat එකක්', correct: 'එක beat එකක්' },
    { rest: 'Eighth rest', name: 'එයිත් රෙස්ට්', beats: 'අඩ beat එකක්', correct: 'අඩ beat එකක්' },
  ];
  addFactVariants(
    restFacts,
    (f) => beatsPool,
    (f) => `හතර/හතර කාලයේදී ${f.name} සඳහා ${f.correct} ගණන් වේ.`,
    (f) => `හතර/හතර කාලයේදී ${f.name} එකකට beat කීයක්`,
    (f) => f.correct,
    variantsPerFact
  );

  // 6) Dynamics / tempo markings
  const dynamicsFacts = [
    { term: 'Forte', meaning: 'ඉතා හයියෙන් (ලවුඩ්) නාදය දෙයි', correct: 'ලවුඩ්' },
    { term: 'Piano', meaning: 'මෘදු ලෙස (සොෆ්ට්) නාදය දෙයි', correct: 'සොෆ්ට්' },
    { term: 'Mezzo-piano', meaning: 'මධ්‍යම මෘදු ලෙස නාදය දෙයි', correct: 'මධ්‍යම මෘදු' },
    { term: 'Mezzo-forte', meaning: 'මධ්‍යම හයියෙන් නාදය දෙයි', correct: 'මධ්‍යම හයියෙන්' },
    { term: 'Crescendo', meaning: 'අලූවෙන් අලූවට හයිය වැඩි වේ', correct: 'ක්‍රමයෙන් හයිය වැඩි' },
    { term: 'Diminuendo', meaning: 'ක්‍රමයෙන් මෘදු වෙයි', correct: 'ක්‍රමයෙන් මෘදු' },
    { term: 'Allegro', meaning: 'වේගවත් tempo එකක්', correct: 'වේගවත්' },
    { term: 'Adagio', meaning: 'සෙම tempo එකක්', correct: 'සෙම' },
    { term: 'Andante', meaning: 'මධ්‍යම tempo එකක්', correct: 'මධ්‍යම' },
    { term: 'Moderato', meaning: 'පාලිත මධ්‍යම tempo එකක්', correct: 'මධ්‍යම පාලිත' },
    { term: 'Presto', meaning: 'ඉතා වේගවත් tempo එකක්', correct: 'ඉතා වේගවත්' },
    { term: 'Largo', meaning: 'ඉතා සෙම tempo එකක්', correct: 'ඉතා සෙම' },
  ];
  const dynamicsPool = ['ලවුඩ්', 'සොෆ්ට්', 'මධ්‍යම මෘදු', 'මධ්‍යම හයියෙන්', 'ක්‍රමයෙන් හයිය වැඩි', 'ක්‍රමයෙන් මෘදු', 'වේගවත්', 'සෙම', 'මධ්‍යම', 'ඉතා වේගවත්', 'ඉතා සෙම', 'මධ්‍යම පාලිත'];
  addFactVariants(
    dynamicsFacts,
    (f) => dynamicsPool,
    (f) => `${f.term} යනු ${f.meaning} බව වේ. `,
    (f) => `${f.term} සංගීත සලකුණේ අදහස`,
    (f) => f.correct,
    variantsPerFact
  );

  // 7) Instrument families
  const instrumentFacts = [
    { instrument: 'පියානෝව', family: 'Keyboard' },
    { instrument: 'වයලීනය (Violin)', family: 'String' },
    { instrument: 'සෙලෝව (Cello)', family: 'String' },
    { instrument: 'ගිටාර්ව (Guitar)', family: 'String' },
    { instrument: 'හර්ප්ව (Harp)', family: 'String' },
    { instrument: 'ෆ්ලූට්ව (Flute)', family: 'Woodwind' },
    { instrument: 'ක්ලැරිනට්ව (Clarinet)', family: 'Woodwind' },
    { instrument: 'ඔබෝව (Oboe)', family: 'Woodwind' },
    { instrument: 'සැක්සෝෆෝන්ව (Saxophone)', family: 'Woodwind' },
    { instrument: 'ට්‍රම්පට්ව (Trumpet)', family: 'Brass' },
    { instrument: 'ට්‍රොම්බෝන්ව (Trombone)', family: 'Brass' },
    { instrument: 'ෆ්‍රෙන්ච් හෝන්ව (French horn)', family: 'Brass' },
    { instrument: 'టබා (Tuba)', family: 'Brass' },
    { instrument: 'ඩ්රම් (Drum)', family: 'Percussion' },
    { instrument: 'ෂයිලෝෆෝන් (Xylophone)', family: 'Percussion' },
    { instrument: 'කේට්ල් ඩ්‍රම් (Kettle drum)', family: 'Percussion' },
  ];
  const familyPool = ['String', 'Woodwind', 'Brass', 'Percussion', 'Keyboard'];
  addFactVariants(
    instrumentFacts,
    (f) => familyPool,
    (f) => `${f.instrument} වාද්‍ය භාණ්ඩය වර්ගය ${f.family} වේ.`,
    (f) => `${f.instrument} වාද්‍ය භාණ්ඩයේ වර්ගය`,
    (f) => f.family,
    variantsPerFact
  );

  // 8) Composer countries
  const composerFacts = [
    { composer: 'Beethoven', country: 'Germany' },
    { composer: 'Mozart', country: 'Austria' },
    { composer: 'Bach', country: 'Germany' },
    { composer: 'Handel', country: 'Germany' },
    { composer: 'Haydn', country: 'Austria' },
    { composer: 'Schubert', country: 'Austria' },
    { composer: 'Brahms', country: 'Germany' },
    { composer: 'Tchaikovsky', country: 'Russia' },
    { composer: 'Vivaldi', country: 'Italy' },
    { composer: 'Verdi', country: 'Italy' },
    { composer: 'Debussy', country: 'France' },
    { composer: 'Chopin', country: 'Poland' },
    { composer: 'Liszt', country: 'Hungary' },
    { composer: 'Dvorak', country: 'Czech Republic' },
    { composer: 'Grieg', country: 'Norway' },
    { composer: 'Saint-Saens', country: 'France' },
  ];

  const countryPool = ['Germany', 'Austria', 'Italy', 'France', 'Russia', 'Poland', 'Hungary', 'Czech Republic', 'Norway'];
  addFactVariants(
    composerFacts,
    (f) => countryPool,
    (f) => `${f.composer} සංගීතඥයා ${f.country} රටට අයත්ය.`,
    (f) => `${f.composer} සංගීතඥයා කුමන රටකට අයත්ද?`,
    (f) => f.country,
    variantsPerFact
  );

  if (questions.length < target) {
    throw new Error(`Generated only ${questions.length} questions, but need ${target}.`);
  }

  const questionsFinal = questions.slice(0, target);

  for (let paper = 1; paper <= totalPapers; paper += 1) {
    const start = (paper - 1) * perPaper;
    const end = start + perPaper;
    const questionsForPaper = questionsFinal.slice(start, end);

    if (questionsForPaper.length !== perPaper) {
      throw new Error(`Paper ${paper} expected ${perPaper} questions, got ${questionsForPaper.length}.`);
    }

    const varName = `westernmusicpaper${paper}`;
    const fileName = path.join(OUTPUT_DIR, `${varName}.js`);

    const bodyLines = questionsForPaper.map((q) => {
      const escapedQuestion = escapeForTemplateLiteral(sanitizeSinhalaText(q.question));
      const escapedOptions = q.options.map((opt) => escapeForTemplateLiteral(sanitizeSinhalaText(opt)));
      const escapedExplanation = escapeForTemplateLiteral(sanitizeSinhalaText(q.explanation ?? ''));
      return `  {\n    question: \`${escapedQuestion}\`,\n    options: [\`${escapedOptions[0]}\`, \`${escapedOptions[1]}\`, \`${escapedOptions[2]}\`, \`${escapedOptions[3]}\`],\n    answer: ${q.answer},\n    explanation: \`${escapedExplanation}\`,\n  }`;
    });

    const fileContents = `export const ${varName} = [\n${bodyLines.join(',\n')}\n];\n`;
    fs.writeFileSync(fileName, fileContents, 'utf8');
    console.log(`Wrote ${fileName}`);
  }

  console.log('Done. All westernmusicpaper1–40 files generated.');
}

try {
  generateAll();
} catch (err) {
  console.error('Generation failed:', err.message);
  process.exitCode = 1;
}

