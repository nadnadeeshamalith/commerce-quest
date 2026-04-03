const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data', 'grade6');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Data Sets
const notes = [
  { name: "සෙමි බ්‍රීව්", v: 4 },
  { name: "මිනිම්", v: 2 },
  { name: "ක්‍රොචට්", v: 1 },
  { name: "ක්වේවර්", v: 0.5 },
  { name: "සෙමි ක්වේවර්", v: 0.25 }
];

const rests = [
  { name: "සෙමි බ්‍රීව් විරාමය", v: 4 },
  { name: "මිනිම් විරාමය", v: 2 },
  { name: "ක්‍රොචට් විරාමය", v: 1 },
  { name: "ක්වේවර් විරාමය", v: 0.5 },
  { name: "සෙමි ක්වේවර් විරාමය", v: 0.25 }
];

const valToStr = {
  4: "බීට් 4",
  2: "බීට් 2",
  1: "බීට් 1",
  0.5: "බීට් 1/2",
  0.25: "බීට් 1/4",
  3: "බීට් 3",
  5: "බීට් 5",
  6: "බීට් 6",
  8: "බීට් 8",
  1.5: "බීට් 1 1/2",
  0.75: "බීට් 3/4",
  1.25: "බීට් 1 1/4"
};

const instruments = [
  { name: "පියානෝව", cat: "යතුරු පුවරු" },
  { name: "ඕගනය", cat: "යතුරු පුවරු" },
  { name: "එකෝඩියන්", cat: "යතුරු පුවරු" },
  { name: "වයලීනය", cat: "තත්" },
  { name: "ගිටාරය", cat: "තත්" },
  { name: "සෙලෝව", cat: "තත්" },
  { name: "ඩබල් බේස්", cat: "තත්" },
  { name: "හාප්", cat: "තත්" },
  { name: "ට්‍රම්පට්", cat: "සුළං" },
  { name: "ෆ්ලූට්", cat: "සුළං" },
  { name: "ක්ලැරිනට්", cat: "සුළං" },
  { name: "සැක්සෆෝන්", cat: "සුළං" },
  { name: "ට්‍රොම්බෝන්", cat: "සුළං" },
  { name: "ඩ්‍රම්ස්", cat: "අවනද්ධ" },
  { name: "කසල්", cat: "අවනද්ධ" },
  { name: "ටිම්පනි", cat: "අවනද්ධ" },
  { name: "සයිලෆෝන්", cat: "අවනද්ධ" }
];

const cats = [...new Set(instruments.map(i => i.cat))];

const composers = [
  { name: "බීතෝවන්", country: "ජර්මනිය", period: "ක්ලැසිකල්" },
  { name: "මොසාර්ට්", country: "ඔස්ට්‍රියාව", period: "ක්ලැසිකල්" },
  { name: "බාක්", country: "ජර්මනිය", period: "බැරොක්" },
  { name: "ෂොපින්", country: "පෝලන්තය", period: "රොමෑන්ටික්" },
  { name: "හේඩ්න්", country: "ඔස්ට්‍රියාව", period: "ක්ලැසිකල්" },
  { name: "විවාල්ඩි", country: "ඉතාලිය", period: "බැරොක්" }
];

const terms = [
  { sym: "p (පියානෝ)", mean: "මෘදුව වාදනය කිරීම" },
  { sym: "f (ෆෝටේ)", mean: "හඬ නඟා වාදනය කිරීම" },
  { sym: "crescendo (ක්‍රෙසෙන්ඩෝ)", mean: "ක්‍රමයෙන් හඬ වැඩි කිරීම" },
  { sym: "diminuendo (ඩිමිනුවෙන්ඩෝ)", mean: "ක්‍රමයෙන් හඬ අඩු කිරීම" },
  { sym: "staccato (ස්ටකාටෝ)", mean: "කෙටියෙන් වාදනය කිරීම" },
  { sym: "legato (ලෙගාටෝ)", mean: "සුමටව එක දිගට වාදනය කිරීම" },
  { sym: "mp (මෙට්සෝ පියානෝ)", mean: "සාමාන්‍ය මෘදු හඬින්" },
  { sym: "mf (මෙට්සෝ ෆෝටේ)", mean: "සාමාන්‍ය උස් හඬින්" }
];

const tSigs = [
  { sig: "2/4", meaning: "බාර් එකකට ක්‍රොචට් 2ක් දැක්වේ", beats: "බීට් 2" },
  { sig: "3/4", meaning: "බාර් එකකට ක්‍රොචට් 3ක් දැක්වේ", beats: "බීට් 3" },
  { sig: "4/4", meaning: "බාර් එකකට ක්‍රොචට් 4ක් දැක්වේ", beats: "බීට් 4" },
  { sig: "6/8", meaning: "බාර් එකකට ක්වේවර් 6ක් දැක්වේ", beats: "බීට් 3 (ස්පන්දන 2යි)" }
];

const clefsStr = [
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි ප්‍රථම (1)", a: "ඊ (E)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි දෙවන (2)", a: "ජී (G)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි තෙවන (3)", a: "බී (B)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි සිව්වන (4)", a: "ඩී (D)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි පස්වන (5)", a: "එෆ් (F)" },
  
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි පළමු අවකාශයේ (Space 1)", a: "එෆ් (F)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි දෙවන අවකාශයේ (Space 2)", a: "ඒ (A)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි තෙවන අවකාශයේ (Space 3)", a: "සී (C)" },
  { p: "ට්‍රෙබල් ක්ලෙෆ් හි සිව්වන අවකාශයේ (Space 4)", a: "ඊ (E)" },

  { p: "බේස් ක්ලෙෆ් හි ප්‍රථම (1)", a: "ජී (G)" },
  { p: "බේස් ක්ලෙෆ් හි දෙවන (2)", a: "බී (B)" },
  { p: "බේස් ක්ලෙෆ් හි තෙවන (3)", a: "ඩී (D)" },
  { p: "බේස් ක්ලෙෆ් හි සිව්වන (4)", a: "එෆ් (F)" },
  { p: "බේස් ක්ලෙෆ් හි පස්වන (5)", a: "ඒ (A)" },

  { p: "බේස් ක්ලෙෆ් හි පළමු අවකාශයේ (Space 1)", a: "ඒ (A)" },
  { p: "බේස් ක්ලෙෆ් හි දෙවන අවකාශයේ (Space 2)", a: "සී (C)" },
  { p: "බේස් ක්ලෙෆ් හි තෙවන අවකාශයේ (Space 3)", a: "ඊ (E)" },
  { p: "බේස් ක්ලෙෆ් හි සිව්වන අවකාශයේ (Space 4)", a: "ජී (G)" }
];

const allLetters = ["ඒ (A)", "බී (B)", "සී (C)", "ඩී (D)", "ඊ (E)", "එෆ් (F)", "ජී (G)"];

const setOfQs = new Set();
const outArr = [];

function addQ(q, a, w1, w2, w3) {
  if (setOfQs.has(q)) return;
  setOfQs.add(q);
  
  const opts = [a, w1, w2, w3];
  opts.sort(() => Math.random() - 0.5);
  const ansIdx = opts.indexOf(a) + 1;
  outArr.push({ question: q, options: opts, answer: ansIdx });
}

function getRandomExcept(arr, val, count=3) {
  let f = arr.filter(x => x !== val);
  f.sort(() => Math.random() - 0.5);
  return f.slice(0, count);
}
function getRandomExceptVals(arr, vals, count=3) {
  let f = arr.filter(x => !vals.includes(x));
  f.sort(() => Math.random() - 0.5);
  // Just in case we don't have enough, fill with arbitrary strings
  let res = f.slice(0, count);
  let ext = ["කිසිවක් නොවේ", "වෙනත්", "අනිශ්චිතයි"];
  while(res.length < count) res.push(ext.pop());
  return res;
}

// 1. Notes Values
const qPh1 = [
  "ස්වරයට හිමි කාල වටිනාකම කොපමණද?",
  "නම් ස්වරයේ ගණිතමය වටිනාකම කීයද?",
  "ස්වරයේ වටිනාකම කීයද?",
  "ස්වරය සඳහා බීට් කීයක් ලැබේද?",
  "ස්වරයක් සඳහා කොපමණ කාලයක් පවතීද?",
  "ස්වරයේ සම්මත වටිනාකම කුමක්ද?",
  "ස්වරය කොපමණ බීට් ගණනකට සමානද?",
  "යන ස්වරයේ කාලය කෙසේ දැක්වේද?",
  "ස්වරය වෙනුවෙන් පවතින බීට් වටිනාකම කුමක්ද?",
  "ස්වරයට අදාළව ඇත්තේ බීට් කීයක්ද?"
];

notes.forEach(n => {
  qPh1.forEach(ph => {
    let wrong = Object.values(valToStr).filter(v => v !== valToStr[n.v]).sort(()=>Math.random()-0.5).slice(0, 3);
    addQ(`'${n.name}' ${ph}`, valToStr[n.v], wrong[0], wrong[1], wrong[2]);
  });
});

// 2. Rests Values
rests.forEach(n => {
  qPh1.forEach(ph => {
    let wrong = Object.values(valToStr).filter(v => v !== valToStr[n.v]).sort(()=>Math.random()-0.5).slice(0, 3);
    addQ(`'${n.name}' ${ph.replace('ස්වර', 'විරාම')}`, valToStr[n.v], wrong[0], wrong[1], wrong[2]);
  });
});

// 3. Values to Notes
const qPh2 = [
  "වටිනාකම ඇති ස්වරය කුමක්ද?",
  "කාලයක් ලැබෙන ස්වරයේ නම කුමක්ද?",
  "සමඟ සමාන වන ස්වරය මින් කවරේද?",
  "කාලයකින් යුක්ත වූ ස්වරය කුමක්ද?",
  "ලබා දෙන ස්වරය කුමක් ලෙස හැඳින්වේද?"
];
qPh2.forEach(ph => {
  notes.forEach(n => {
    let wrong = getRandomExcept(notes.map(x=>x.name), n.name);
    addQ(`${valToStr[n.v]} ${ph}`, n.name, wrong[0], wrong[1], wrong[2]);
  });
  rests.forEach(n => {
    let wrong = getRandomExcept(rests.map(x=>x.name), n.name);
    addQ(`${valToStr[n.v]} ${ph.replace('ස්වරය', 'විරාමය')}`, n.name, wrong[0], wrong[1], wrong[2]);
  });
});

// 4. How many smaller notes in larger
const qPh3 = [
  "ස්වරයකට {y} ස්වර කීයක් ඇතුළත් වේද?",
  "ස්වරයක් සමාන වන්නේ {y} ස්වර කීයකටද?",
  "ස්වරයකට සමතුලිත වීමට {y} ස්වර කීයක් අවශ්‍යද?",
  "ස්වරයෙහි {y} ස්වර කීයක් ගැබ් වී ඇත්ද?",
  "ස්වරයක දැකිය හැකි {y} ස්වර ගණන කීයද?",
  "ස්වරයක් වෙනුවට {y} ස්වර කීයක් භාවිත කළ හැකිද?"
];
for(let i=0; i<notes.length; i++) {
  for(let j=i+1; j<notes.length; j++) {
    let count = notes[i].v / notes[j].v;
    qPh3.forEach(ph => {
      let qq = `එක් '${notes[i].name}' ` + ph.replace('{y}', `'${notes[j].name}'`);
      let wrongs = getRandomExceptVals(["1", "2", "3", "4", "6", "8", "16", "32"], [count.toString()]);
      addQ(qq, count.toString(), wrongs[0], wrongs[1], wrongs[2]);
    });
    // rests
    qPh3.forEach(ph => {
      let qq = `එක් '${rests[i].name}' ` + ph.replace('{y}', `'${rests[j].name}'`).replace(/ස්වර/g, 'විරාම');
      let wrongs = getRandomExceptVals(["1", "2", "3", "4", "6", "8", "16", "32"], [count.toString()]);
      addQ(qq, count.toString(), wrongs[0], wrongs[1], wrongs[2]);
    });
  }
}

// 5. Instruments to Categories
const qPh4 = [
  "නම් වාද්‍ය භාණ්ඩය අයත් වන කාණ්ඩය කුමක්ද?",
  "අයත් වන්නේ කුමන පවුලකටද?",
  "යනු කුමන කාණ්ඩයේ වාද්‍ය භාණ්ඩයක්ද?",
  "කුමන පන්තියට අයත් වේද?"
];
instruments.forEach(ins => {
  qPh4.forEach(ph => {
    let wrong = getRandomExcept(cats, ins.cat);
    addQ(`'${ins.name}' ${ph}`, ins.cat, wrong[0], wrong[1], wrong[2]);
  });
});

// 6. Identify instrument by Category
const qPh5 = [
  "පහත දැක්වෙන ඒවායින් '{c}' භාණ්ඩය කුමක්ද?",
  "මින් '{c}' කාණ්ඩයට අයත් වන්නේ කුමක්ද?",
  "දක්වා ඇති භාණ්ඩ අතුරින් '{c}' පවුලේ භාණ්ඩය කුමක්ද?",
  "'{c}' භාණ්ඩයක් ලෙස හඳුනාගත හැක්කේ කුමක්ද?",
  "'{c}' පන්තියේ වාද්‍ය භාණ්ඩය තෝරන්න."
];
cats.forEach(c => {
  let rights = instruments.filter(i => i.cat === c).map(i=>i.name);
  let wrongAll = instruments.filter(i => i.cat !== c).map(i=>i.name);
  rights.forEach(r => {
    qPh5.forEach(ph => {
      let wrong = getRandomExcept(wrongAll, r);
      addQ(ph.replace('{c}', c), r, wrong[0], wrong[1], wrong[2]);
    });
  });
});

// 7. Composers
const qPh6 = [
  "නම් සුප්‍රසිද්ධ සංගීතඥයා අයත් වන්නේ කුමන රටකටද?",
  "ගේ උපන් රට කුමක්ද?",
  "නම් රචකයා බිහිවූ රට කුමක්ද?",
  "යන සංගීතඥයා අයත් රජ්‍යය කුමක්ද?",
  "කවර රටක උපත ලැබුවේද?"
];
const qPh7 = [
  "නම් අග්‍රගණ්‍ය සංගීතඥයා අයත් වන්නේ කුමන යුගයකටද?",
  "සංගීත ඉතිහාසයේ කුමන යුගයක් නියෝජනය කරයිද?",
  "ගේ නිර්මාණ අයත් වන ප්‍රධාන යුගය කුමක්ද?",
  "යන රචකයා අයත් යුගය වන්නේ,"
];
const allCountries = [...new Set(composers.map(c=>c.country)), "ප්‍රංශය", "එංගලන්තය", "රුසියාව"];
const allPeriods = [...new Set(composers.map(c=>c.period)), "මොඩර්න්", "රෙනේසන්ස්", "මධ්‍යකාලීන"];
composers.forEach(c => {
  qPh6.forEach(ph => {
    let wrong = getRandomExcept(allCountries, c.country);
    addQ(`'${c.name}' ${ph}`, c.country, wrong[0], wrong[1], wrong[2]);
  });
  qPh7.forEach(ph => {
    let wrong = getRandomExcept(allPeriods, c.period);
    addQ(`'${c.name}' ${ph}`, c.period, wrong[0], wrong[1], wrong[2]);
  });
});

// 8. Terms to meaning
const qPh8 = [
  "ලකුණෙහි අර්ථය කුමක්ද?",
  "යන්නෙහි සංගීතමය තේරුම කුමක්ද?",
  "කෙරෙන් දැක්වෙන්නේ කුමක්ද?",
  "යන සංගීතගතික පදයේ තේරුම කුමක්ද?",
  "මඟින් අදහස් කෙරෙන්නේ,"
];
const allMeans = terms.map(t=>t.mean);
terms.forEach(t => {
  qPh8.forEach(ph => {
    let wrong = getRandomExcept(allMeans, t.mean);
    addQ(`'${t.sym}' ${ph}`, t.mean, wrong[0], wrong[1], wrong[2]);
  });
  // Reverse
  qPh8.forEach(ph => {
    let wrong = getRandomExcept(terms.map(x=>x.sym), t.sym);
    addQ(`'${t.mean}' ${ph.replace("ලකුණෙහි අර්ථය", "ලකුණ").replace("තේරුම", "ලකුණ")}`, t.sym, wrong[0], wrong[1], wrong[2]);
  });
});

// 9. Time Signatures
const qPh9 = [
  "කාල මානයේ අර්ථය කුමක්ද?",
  "යන කාල මානයෙන් හැඟවෙන්නේ කුමක්ද?",
  "මඟින් දැක්වෙන නිවැරදි අදහස තෝරන්න."
];
tSigs.forEach(t => {
  qPh9.forEach(ph => {
    let wrong = getRandomExcept(tSigs.map(x=>x.meaning), t.meaning);
    addQ(`'${t.sig}' ${ph}`, t.meaning, wrong[0], wrong[1], wrong[2]);
  });
});

// 10. Clefs Lines / Spaces
const qPh10 = [
  "රේඛාවේ පිහිටන ස්වරය කුමක්ද?",
  "රේඛාව මත ලියැවෙන ස්වරය කුමක්ද?",
  "රේඛාවේ ඇති නෝට්ටුව කුමක්ද?"
];
clefsStr.forEach(c => {
  qPh10.forEach(ph => {
    let wrong = getRandomExcept(allLetters, c.a);
    addQ(`${c.p} ${ph}`, c.a, wrong[0], wrong[1], wrong[2]);
  });
});

// 11. Addition of notes
// we will generate purely mathematical questions
const qPh11 = [
  "එකතුවට සමාන බීට් ගණන කීයද?",
  "සම්පූර්ණ වටිනාකම බීට් කීයද?",
  "යන දෙකෙහි එකතුව කීයද?"
];
for(let i=0; i<notes.length; i++) {
  for(let j=0; j<notes.length; j++) {
    let val = notes[i].v + notes[j].v;
    let strVal = valToStr[val] || `බීට් ${val}`;
    qPh11.forEach(ph => {
      let wrongVals = [val+1, val-0.5, val+0.5].map(v => valToStr[v] || `බීට් ${v}`);
      if(val-0.5 <=0) wrongVals[1] = "බීට් 10";
      addQ(`${notes[i].name} + ${notes[j].name} : ${ph}`, strVal, wrongVals[0], wrongVals[1], wrongVals[2]);
    });
  }
}

// Ensure 1600 total questions exactly
const finalQs = Array.from(outArr);
// Shuffle finalQs properly
for (let i = finalQs.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [finalQs[i], finalQs[j]] = [finalQs[j], finalQs[i]];
}

if (finalQs.length < 1600) {
  console.log(`Not enough questions: generated ${finalQs.length}, need 1600! Fix the generator.`);
  process.exit(1);
}

// Write to 40 files
for(let paperId = 1; paperId <= 40; paperId++) {
  let slice = finalQs.slice((paperId - 1) * 40, paperId * 40);
  
  let content = `export const westernmusicpaper${paperId} = [\n`;
  slice.forEach(q => {
    content += `  {\n`;
    content += `    question: "${q.question}",\n`;
    content += `    options: [\n`;
    content += `      "${q.options[0]}",\n`;
    content += `      "${q.options[1]}",\n`;
    content += `      "${q.options[2]}",\n`;
    content += `      "${q.options[3]}"\n`;
    content += `    ],\n`;
    content += `    answer: ${q.answer}\n`;
    content += `  },\n`;
  });
  content += `];\n`;

  fs.writeFileSync(path.join(outDir, `westernmusicpaper${paperId}.js`), content, 'utf8');
}

console.log("Successfully generated all 40 files!");
