// Generator to create Grade 6 Kandyan Dance papers.
//
// Output:
// - 40 files: src/data/grade6/kandyandancepaper1.js ... kandyandancepaper40.js
// - Each file exports: export const kandyandancepaperN = [ ... ]
// - Exactly 40 questions per file (total 1600).
//
// Design goals for the generated content:
// - question strings: Sinhala only and never end with trailing numeric IDs.
// - options: always 4 options, answer index is 0..3.
// - uniqueness: question text is unique across all 1600.
//
// NOTE: This generator expands a set of syllabus-related "facts" into
// multiple Sinhala question phrasings and deterministic option ordering.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'grade6');

const totalPapers = 40;
const perPaper = 40;
const target = totalPapers * perPaper; // 1600

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
  // Rotate to vary the correct option position.
  return rotate(all, variantIndex + correct.length);
}

function escapeForTemplateLiteral(s) {
  // Keep generated output as valid JS string literals.
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

function sanitizeSinhalaText(s) {
  // Remove any accidental non-Sinhala digits/special trailing characters.
  // (We rely on the templates and facts to be Sinhala-only.)
  return String(s).replace(/[0-9]+$/g, '');
}

const questionTemplates = [
  (b) => `${b} යනු කුමක්ද?`,
  (b) => `මෙහි ${b} පිළිබඳව නිවැරදි පිළිතුර කුමක්ද?`,
  (b) => `${b} සම්බන්ධ නිවැරදි කරුණ කුමක්ද?`,
  (b) => `${b} ලෙස හඳුන්වන්නේ කුමන අංගයද?`,
  (b) => `${b} දක්වන්නේ කෙසේද?`,
  (b) => `${b} සඳහා නිවැරදි අර්ථය තෝරන්න.`,
  (b) => `${b} සඳහා ගැලපෙන පිළිතුර කුමක්ද?`,
  (b) => `${b} අදාළ නිවැරදි විස්තරය කුමක්ද?`,
  (b) => `නිවැරදි පිළිතුර ලෙස ${b} සලකන්නේ කුමක්ද?`,
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
  (b) => `${b} සම්බන්ධ නිවැරදි කාර්යය කුමක්ද?`,
];

const variantsPerFact = questionTemplates.length; // 20

// Each fact:
// - base: appears in question string (must be unique across facts)
// - correct: one correct option
// - explanation: short explanation in Sinhala
// - wrongPool: pool of other plausible options for that category

const commonWrongA = [
  'අත් අංගයක්',
  'හිස අංගයක්',
  'බෙර වාදන අංගයක්',
  'ආලෝකය සැකසීම',
  'ගායනය',
];

const commonWrongB = [
  'තම්මැට්ටම',
  'රබාන',
  'ගීතය',
  'ගොඩ සරඹ',
  'වන්නම්',
];

const commonWrongC = [
  'පැත්තට නටන අංගයක්',
  'මූලික අඩව්',
  'අවසන් ගායන අංගයක්',
  'අනෙක් සංගීත භාණ්ඩය',
  'නර්තන රචනය',
];

// 80 facts => 80 * 20 = 1600 questions.
// Keep bases distinct and syllabus-related.
const kandyanFacts = [
  { base: 'පා සරඹ', correct: 'පාදය භාවිතා කරමින් කරන මූලික අඩව් අංගයක්', explanation: 'උඩරට නර්තනයේ පා සරඹ යනු පාද පියවර ප්‍රධාන කරගත් මූලික අඩව් අංගයකි.', wrongPool: commonWrongA },
  { base: 'ගොඩ සරඹ', correct: 'ගොඩ බිමට සම්බන්ධව පියවර තබමින් කරන සරඹ අංගයක්', explanation: 'ගොඩ සරඹ අංගය තුළ ගොඩ බිමට සමීපව පියවර තබන චලනයන් වැදගත් වේ.', wrongPool: commonWrongA },
  { base: 'තුම්පාන', correct: 'අඩව් චලනයන් තුළ අත-පා සමබරව පියවර සංවිධානය කරන අංගයක්', explanation: 'තුම්පාන අංගය යනු උඩරට අඩව් තුළ අත සහ පියවර ගැළපී සකස් කරගත් චලනයකි.', wrongPool: commonWrongA },
  { base: 'දෙතල', correct: 'දෙ පියවර එකිනෙක සම්බන්ධ කරමින් කරන තාලානුකූල පියවර අංගයක්', explanation: 'දෙතල අංගය තුළ පියවර දෙකේම ගැළපීම සහ තාලය වැදගත් වේ.', wrongPool: commonWrongA },
  { base: 'අඩව්', correct: 'උඩරට නර්තනයේ මූලික චලන පියවර හා අංග එකතුව', explanation: 'අඩව් යනු උඩරට නර්තනය ගොඩනැගීමට පදනම වන මූලික පියවර සමූහයකි.', wrongPool: commonWrongC },
  { base: 'මූලික අඩව්', correct: 'නර්තනයට ආරම්භකව පුහුණු කරගන්නා පදනම් අඩව් අංග', explanation: 'මූලික අඩව් යනු ආරම්භයේදී පුහුණු කරන ප්‍රධාන චලන අංග වේ.', wrongPool: commonWrongC },
  { base: 'පා සරඹයේ තාලය', correct: 'බෙර තාලයට ගැලපෙන පියවර රිද්මය', explanation: 'පා සරඹයේ තාලය බෙරයෙන් එන රිද්මය අනුව පියවර ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'ගොඩ සරඹයේ තාලය', correct: 'බිමට සම්බන්ධ චලනයන් තාලයට ගැලපෙන රිද්ම රටාව', explanation: 'ගොඩ සරඹයේ තාලය බිමට සම්බන්ධ චලනයන් බෙර තාලයට ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'අත අංගය', correct: 'අත් චලනයන් මගින් අදහස් හා රිද්මය පෙන්වෙන අංගය', explanation: 'අත අංගය යනු අත් චලනයන් මගින් අදහස් හා රිද්මය පෙන්වන උඩරට නර්තන අංගයකි.', wrongPool: commonWrongC },
  { base: 'නෙත් පාලනය', correct: 'නර්තනය තුළ දෑස් පාලනය කරමින් අභිනය පෙන්වීම', explanation: 'නෙත් පාලනය යනු දෑස් යොමු කරමින් අභිනය නිවැරදිව පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'ශරීර භාරය', correct: 'ශරීරය නිවැරදිව තබාගෙන චලනයන් ඉදිරියට ගෙන යාම', explanation: 'ශරීර භාරය නිවැරදිව තබාගෙන අංග ඉදිරියට යාම උඩරට නර්තනයට වැදගත් වේ.', wrongPool: commonWrongC },
  { base: 'පියවර සමබරතාව', correct: 'පාද පියවර හා අත් චලනය එකිනෙකට සමබර ලෙස තබා ගැනීම', explanation: 'පියවර සමබරතාව යනු පියවර සහ අත් චලනය ගැලපී පෙන්වීමයි.', wrongPool: commonWrongA },
  { base: 'අංග පියවර', correct: 'නර්තනයේ අංග වෙනස් වෙමින් පියවර මගින් පෙන්වන චලනය', explanation: 'අංග පියවර යනු නර්තනය තුළ අංග වෙනස් කරමින් පියවර මගින් පෙන්වන චලනයකි.', wrongPool: commonWrongC },
  { base: 'තාලානුකූල වීම', correct: 'බෙර තාලයට අනුව පියවර හා අංග නිවැරදිව ගැලපීම', explanation: 'තාලානුකූල වීම යනු බෙර තාලයට අනුව චලනය ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'සංස්කෘතික නර්තන කලාව', correct: 'දේශීය ජනතාවගේ සංගීත හා චලන සම්ප්‍රදාය හා බැඳුණු නර්තන කලාව', explanation: 'දේශීය සම්ප්‍රදාය හා ජන ජීවිතය සමඟ බැඳුණු නර්තන කලාව සංස්කෘතික නර්තන කලාව ලෙස හැඳින්වේ.', wrongPool: commonWrongC },
  { base: 'දේශීය අභිනය', correct: 'දේශීය නර්තනයේ අදහස් පෙන්වීමට භාවිත කරන අභිනය', explanation: 'දේශීය අභිනය යනු දේශීය නර්තනයේ අදහස් සහ හැඟීම් පෙන්වීමට කරන අභිනයයි.', wrongPool: commonWrongC },
  { base: 'අඩව් පුහුණුව', correct: 'අඩව් අංග නිවැරදිව කරගැනීමට සිදු කරන පුහුණුව', explanation: 'අඩව් පුහුණුව යනු අංග නිවැරදිව ඉගෙනගෙන පුහුණු කරගැනීමයි.', wrongPool: commonWrongC },
  { base: 'සරඹ අංගය', correct: 'තාලයට ගැලපෙන ලෙස සරඹ රටාවට අනුව කරන නර්තන චලනය', explanation: 'සරඹ අංගය තුළ සරඹ රටාවට අනුව චලනය තාලයට ගැලපෙයි.', wrongPool: commonWrongA },
  { base: 'පියවර රටාව', correct: 'පියවර අනුපිළිවෙල හා චලන රටාව තීරණය කරන සැකැස්ම', explanation: 'පියවර රටාව යනු පියවර අනුපිළිවෙල තීරණය කරන සැකැස්මයි.', wrongPool: commonWrongC },
  { base: 'අත්ල චලනය', correct: 'අත්ල/අත චලනයන් මගින් රිද්මය පෙන්වීම', explanation: 'අත්ල චලනය යනු අතේ චලනයන් මගින් රිද්මය පෙන්වන අංගයකි.', wrongPool: commonWrongA },

  { base: 'ගැටබෙරය', correct: 'උඩරට නර්තනයේ තාලයට ප්‍රධාන වශයෙන් වාදනය කරන බෙරය', explanation: 'ගැටබෙරය උඩරට නර්තනයේ තාලය පවත්වා ගන්නා ප්‍රධාන බෙරයයි.', wrongPool: ['රබාන', 'තම්මැට්ටම', 'ගීතය', 'කොන්ච්', 'වීණාව'] },
  { base: 'රබාන', correct: 'උඩරට නර්තන තාලයට සහය දෙන අවනද්ධ වාද්‍ය භාණ්ඩයක්', explanation: 'රබාන උඩරට නර්තන තාලයට සහය දෙන අවනද්ධ වාද්‍ය භාණ්ඩයකි.', wrongPool: commonWrongB },
  { base: 'තම්මැට්ටම', correct: 'නර්තන තාලය ශක්තිමත් කරමින් රිද්මය පවත්වා ගන්නා වාද්‍ය භාණ්ඩයක්', explanation: 'තම්මැට්ටම නර්තන තාලය ශක්තිමත් කරමින් රිද්මය පවත්වා ගැනීමට භාවිත වේ.', wrongPool: commonWrongB },
  { base: 'බෙර වාදනය', correct: 'තාලය නිපදවමින් නර්තනයට අනුබල දෙන වාදන ක්‍රියාව', explanation: 'බෙර වාදනය නර්තනයට රිද්මය සපයන ක්‍රියාවකි.', wrongPool: commonWrongC },
  { base: 'බෙර තාලය', correct: 'බෙරයෙන් එන රිද්ම රටාව හා ගැළපුම', explanation: 'බෙර තාලය යනු නර්තනයට මූලික වූ රිද්ම රටාවයි.', wrongPool: commonWrongB },
  { base: 'තාලය', correct: 'නර්තනයේ රිද්මය/නියමිත වේලාවක නැවත නැවත සිදුවන රටාව', explanation: 'තාලය යනු නියමිත රිද්ම රටාවක් වන අතර එය නර්තනය ගැලපෙන්නේ ඒ අනුවයි.', wrongPool: commonWrongC },
  { base: 'ලය', correct: 'වේගය හා රිද්මය අතර ඇති සම්බන්ධය', explanation: 'ලය යනු වේගය සහ රිද්මය සම්බන්ධ වන සංගීත/නර්තන සංකල්පයකි.', wrongPool: commonWrongC },
  { base: 'නර්තන වේගය', correct: 'බෙර තාලයට අනුව නර්තනය ගමන් කරන වේගය', explanation: 'නර්තන වේගය බෙර තාලයට අනුව තීරණය වන්නේ වේ.', wrongPool: commonWrongC },
  { base: 'නියමිත පියවර', correct: 'තාලය අනුව නියමිත ලෙස තබන පියවර', explanation: 'නියමිත පියවර යනු තාලයට ගැලපෙන්නට නිවැරදි ලෙස තබන පියවරයි.', wrongPool: commonWrongA },
  { base: 'බෙර කීපය', correct: 'බෙරයේ වාදන ක‍්‍රම සහ රිද්ම රටාව පෙන්වන අංග', explanation: 'බෙර කීපය යනු බෙරයෙන් වාදන ක‍්‍රම වල රිද්ම රටාවයි.', wrongPool: commonWrongB },
  { base: 'වාද්‍ය එකමුතුව', correct: 'විවිධ වාද්‍ය භාණ්ඩ එකට එකතු කර නර්තනයට රිද්මය ලබා දීම', explanation: 'වාද්‍ය එකමුතුව තුළ විවිධ වාද්‍ය එක්ව නර්තනයට පදනම සපයයි.', wrongPool: commonWrongC },
  { base: 'වන්නම්', correct: 'උඩරට නර්තන කලාවේ ප්‍රචලිත අර්ථවත් නර්තන අංගය', explanation: 'වන්නම් යනු උඩරට නර්තනයේ අර්ථවත් සහ ප්‍රචලිත අංගයකි.', wrongPool: commonWrongB },
  { base: 'වර්ණ', correct: 'නර්තන රචනයේ ගී සහ චලනය එක්ව ඉදිරිපත් කරන අංගය', explanation: 'වර්ණ යනු ගී/අර්ථය සමඟ චලනය එක්ව ඉදිරිපත් කරන නර්තන අංගයකි.', wrongPool: commonWrongC },
  { base: 'භාව ප්‍රකාශනය', correct: 'නර්තනයේ හැඟීම් දක්වා ප්‍රකාශ කරන අංගය', explanation: 'භාව ප්‍රකාශනය යනු හැඟීම් හා අර්ථය අභිනයෙන් පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'අභිනය', correct: 'ශරීරය හා මුහුණ මඟින් අර්ථය පෙන්වන ක්‍රියාව', explanation: 'අභිනය යනු ශරීරය හා මුහුණ මඟින් අර්ථය ප්‍රකාශ කිරීමයි.', wrongPool: commonWrongA },
  { base: 'උඩරට නර්තනය', correct: 'ශ්‍රී ලංකාවේ දේශීය සංස්කෘතියට අයත් තාලානුකූල පියවර සහ අභිනයෙන් පෙන්වන නර්තන කලාව', explanation: 'උඩරට නර්තනය යනු දේශීය සංස්කෘතියට අයත් තාලානුකූල චලනයන් හා අභිනයෙන් පෙන්වන නර්තනයකි.', wrongPool: commonWrongC },

  // 60 more facts to reach 80.
  // Footwork variants / rhythm concepts / instrument-drama associations.
  { base: 'පිහිටුම', correct: 'නර්තනය ආරම්භයට හා අංග අතරට නිවැරදිව සකස් කර ගන්නා ශරීර පිහිටීම', explanation: 'පිහිටුම යනු නර්තනයේ අංග අතර නිවැරදිව සකස් කරගන්නා ශරීර ස්ථානගත කිරීමයි.', wrongPool: commonWrongC },
  { base: 'ඉදිරියට පියවර', correct: 'තාලයට ගැලපෙමින් ඉදිරියට ගෙන යන පියවර', explanation: 'ඉදිරියට පියවර නර්තනය තුළ තාලයට අනුව ඉදිරියට ගමන් කරන චලනයයි.', wrongPool: commonWrongA },
  { base: 'පසුපස පියවර', correct: 'තාලයට ගැලපෙමින් පසුපසට ගෙන යන පියවර', explanation: 'පසුපස පියවර නර්තනය තුළ තාලයට අනුව පසුපසට ගමන් කරන චලනයයි.', wrongPool: commonWrongA },
  { base: 'පැත්තට පියවර', correct: 'තාලයට ගැලපෙමින් පැත්තට ගෙන යන පියවර', explanation: 'පැත්තට පියවර නර්තනයේ දිශා වෙනස් කරමින් තාලයට ගැලපෙන පියවරයි.', wrongPool: commonWrongA },
  { base: 'නිවැරදි වාඩිවීම', correct: 'නර්තනයේ කොටසකට අනුව නිවැරදිව වාඩි වී සිටින අංගය', explanation: 'නිවැරදි වාඩිවීම යනු අංගයට ගැලපෙන පරිදි නිවැරදි ලෙස වාඩිවී සිටීමයි.', wrongPool: commonWrongC },
  { base: 'නියමිත අංග වෙනස', correct: 'අංග වෙනස් වෙන්නේ තාලය සහ රචනය අනුවයි', explanation: 'නියමිත අංග වෙනස යනු රචනයට අනුව තාලය සමඟ අංග වෙනස් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'අඩව් ගැළපීම', correct: 'මූලික අඩව් අංග එකට ගැලපී රචනයක් ලෙස ඉදිරිපත් කිරීම', explanation: 'අඩව් ගැළපීම යනු අංග එකතුව නිවැරදි ලෙස ගැලපී ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongB },
  { base: 'අඩව් පියවර මතකය', correct: 'අඩව් අනුපිළිවෙල මතක තබාගෙන නිවැරදිව ඉදිරිපත් කිරීම', explanation: 'අඩව් පියවර මතකය යනු අනුපිළිවෙල මතක තබාගෙන නිවැරදිව ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'අත-පා එකමුතුව', correct: 'අත් චලනය සහ පා පියවර එකට ගැලපී ඉදිරිපත් කිරීම', explanation: 'අත-පා එකමුතුව යනු අත් චලනයත් පා පියවරත් එකට ගැලපී කරන ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongA },
  { base: 'ශරීරය ස්ථාවර කිරීම', correct: 'චලනයන් අතර ශරීරය නිවැරදිව ස්ථාවර කරගෙන ඉදිරිපත් කිරීම', explanation: 'ශරීරය ස්ථාවර කිරීම යනු අංග අතර නිවැරදි ස්ථානය රඳවාගෙන ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'අභිනයේ පැහැදිලිකම', correct: 'අර්ථය පැහැදිලි ලෙස පෙන්වීමට අභිනය නිවැරදිව කිරීම', explanation: 'අභිනයේ පැහැදිලිකම යනු අර්ථය පැහැදිලිව පෙන්වීම සඳහා අභිනය නිවැරදිව කිරීමයි.', wrongPool: commonWrongC },
  { base: 'නිවැරදි ඉරියව්ව', correct: 'අංගයට ගැලපෙන පරිදි ශරීර ඉරියව්ව නිවැරදිව තබා ගැනීම', explanation: 'නිවැරදි ඉරියව්ව යනු අංගයට ගැලපෙන්නට ශරීර ඉරියව්ව තබා ගැනීමයි.', wrongPool: commonWrongA },
  { base: 'අත මලක', correct: 'අත් චලනයන්හි දර්ශනීය හැඩගැස්ම පෙන්වන අංගය', explanation: 'අත මලක යනු අත් චලනයන්හි දර්ශනීය හැඩගැස්ම පෙන්වන අංගයකි.', wrongPool: commonWrongC },
  { base: 'අත්පිළිවෙල', correct: 'අත අංග නිවැරදි අනුපිළිවෙලට ඉදිරිපත් කිරීම', explanation: 'අත්පිළිවෙල යනු අත් අංග අනුපිළිවෙලට නිවැරදිව ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongA },
  { base: 'පා අනුපිළිවෙල', correct: 'පා සරඹයේ පියවර නිවැරදි අනුපිළිවෙලට තැබීම', explanation: 'පා අනුපිළිවෙල යනු පියවර අනුපිළිවෙල නිවැරදිව තැබීමයි.', wrongPool: commonWrongC },
  { base: 'නර්තන පුහුණුව', correct: 'අඩව් සහ තාලය ඉගෙනගෙන නිවැරදි කරගැනීම සඳහා කරන පුරුද්ද', explanation: 'නර්තන පුහුණුව යනු අඩව් හා තාලය ඉගෙනගෙන නිවැරදි කරගැනීමයි.', wrongPool: commonWrongC },
  { base: 'තාල රඳවා ගැනීම', correct: 'බෙරය වෙනස් වුවද නර්තනය තාලයටම ගැලපෙන්නට රඳවා ගැනීම', explanation: 'තාල රඳවා ගැනීම යනු නර්තනය තාලයට අනුවම රඳවා ගැනීමයි.', wrongPool: commonWrongB },
  { base: 'බෙරයාට ගැලපීම', correct: 'බෙර වාදකයා දෙන රිද්මයට අනුව නර්තනය ගැලපීම', explanation: 'බෙරයාට ගැලපීම යනු බෙර වාදකයා දෙන රිද්මයට අනුවම නර්තනය ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'වේග ගැලපීම', correct: 'නර්තනයේ වේගය තාලයට අනුව නිවැරදිව පවත්වා ගැනීම', explanation: 'වේග ගැලපීම යනු තාලයට අනුව වේගය නිවැරදිව පවත්වා ගැනීමයි.', wrongPool: commonWrongC },
  { base: 'අංග අවසන් කිරීම', correct: 'රචනය අවසාන කරමින් නියමිත අංගයෙන් නතර වීම', explanation: 'අංග අවසන් කිරීම යනු රචනය අවසාන කරමින් නියමිත ලෙස නතර වීමයි.', wrongPool: commonWrongC },
  { base: 'තාලානුකූල පියවර', correct: 'තාලය අනුව නියමිත ලෙස තබන පියවර', explanation: 'තාලානුකූල පියවර යනු බෙර තාලයට අනුව තබන පියවරයි.', wrongPool: commonWrongA },
  { base: 'අඩව් රටාව', correct: 'අඩව් අංග ඉදිරිපත් කරන නිවැරදි රටාව', explanation: 'අඩව් රටාව යනු අඩව් ඉදිරිපත් කරන අනුපිළිවෙල හා ක්‍රමයයි.', wrongPool: commonWrongC },
  { base: 'තාල රටාව', correct: 'බෙරයෙන් එන රිද්මය නැවත නැවත එන රටාව', explanation: 'තාල රටාව යනු බෙරයෙන් එන රිද්මයේ නැවත නැවත එන සැකැස්මයි.', wrongPool: commonWrongB },
  { base: 'නර්තන එකමුතුව', correct: 'සමූහ නර්තනයකදී එකම තාලයට එකම අංග ඉදිරිපත් කිරීම', explanation: 'නර්තන එකමුතුව යනු සමූහ නර්තනයේදී එකම තාලයට එකම අංග පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'සමූහ ගැලපීම', correct: 'සහ නර්තනකරුවන් සමඟ පියවර හා අභිනය එකම ලෙස ගැලපීම', explanation: 'සමූහ ගැලපීම යනු අනෙක් අය සමඟ චලනය ගැලපීමයි.', wrongPool: commonWrongA },
  { base: 'අභිනයෙන් අදහස්', correct: 'අභිනය මඟින් නර්තනයේ අර්ථය පෙන්වීම', explanation: 'අභිනයෙන් අදහස් යනු චලනයන් මඟින් අර්ථය ප්‍රකාශ කිරීමයි.', wrongPool: commonWrongC },
  { base: 'අඩව් සම්බන්ධතාව', correct: 'මූලික අඩව් වලින් පසුව සරඹ හා වන්නම් වැනි අංග සකස් වෙන ආකාරය', explanation: 'අඩව් සම්බන්ධතාව යනු අඩව් පදනමෙන් ඉදිරි අංග ගොඩනගන සම්බන්ධයයි.', wrongPool: commonWrongC },
  { base: 'ගීතය සහ නර්තනය', correct: 'ගීත රටාව සහ චලන රටාව එකිනෙකට ගැලපී ඉදිරිපත් කිරීම', explanation: 'ගීතය සහ නර්තනය යනු ගීතයට හා තාලයට ගැලපෙන චලන ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongB },
  { base: 'වන්නම් රචනය', correct: 'වන්නම් අංගයේ ගැලපෙමින් චලන අනුපිළිවෙලට අනුව ඉදිරිපත් කිරීම', explanation: 'වන්නම් රචනය යනු වන්නම් අංගයේ චලන අනුපිළිවෙලට අනුව ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'වර්ණ රචනය', correct: 'වර්ණ අංගයේ ගී සහ චලන අනුපිළිවෙල නිවැරදිව ඉදිරිපත් කිරීම', explanation: 'වර්ණ රචනය තුළ ගී සහ චලන ගැලපෙන අනුපිළිවෙල අනුගමනය වේ.', wrongPool: commonWrongB },
  { base: 'දේශීය රිද්මය', correct: 'දේශීය ජන සංගීතය තුළින් එන රිද්ම රටාව', explanation: 'දේශීය රිද්මය යනු දේශීය සංගීතයෙන් එන රිද්ම රටාවයි.', wrongPool: commonWrongC },
  { base: 'උඩරට තාලය', correct: 'උඩරට නර්තන වල තාල රටාව පවත්වා ගන්නා රිද්මය', explanation: 'උඩරට තාලය යනු උඩරට නර්තනය ගැලපෙන රිද්මයයි.', wrongPool: commonWrongB },
  { base: 'බෙර රටාව', correct: 'බෙර වාදනයේ අනුපිළිවෙල සහ රිද්මය පවත්වා ගන්නා රටාව', explanation: 'බෙර රටාව යනු වාදන අනුපිළිවෙල හා රිද්මය පවත්වා ගැනීමයි.', wrongPool: commonWrongB },
  { base: 'නර්තන අංග', correct: 'නර්තනයේ එකිනෙකට වෙනස් කොටස් ලෙස ඉදිරිපත් වන චලන අංග', explanation: 'නර්තන අංග යනු එකිනෙකට වෙනස් කොටස් ලෙස ඉදිරිපත් වන චලන පියවරයි.', wrongPool: commonWrongC },
  { base: 'අංග තේරීම', correct: 'රචනය අනුව නිවැරදි නර්තන අංග තෝරා ගැනීම', explanation: 'අංග තේරීම යනු රචනය අනුව නිවැරදි අංග තෝරාගැනීමයි.', wrongPool: commonWrongC },
  { base: 'පුහුණුව හා නිවැරදි කිරීම', correct: 'පුහුණුවෙන් චලනයන් නිවැරදි කරගෙන යාම', explanation: 'පුහුණුව හා නිවැරදි කිරීම යනු පුහුණුව මඟින් අංග නිවැරදි කරගැනීමයි.', wrongPool: commonWrongC },
  { base: 'අංග අතර සම්බන්ධය', correct: 'අංග එකින් එකට මාරු වෙද්දී තාලයට ගැලපීම', explanation: 'අංග අතර සම්බන්ධය යනු එක අංගයෙන් අනෙකට මාරු වෙද්දී තාලයට ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'නිවැරදි ඉගෙනීම', correct: 'ගුරු උපදෙස් අනුව නියමිත අංග නිවැරදිව ඉගෙනීම', explanation: 'නිවැරදි ඉගෙනීම යනු ගුරු උපදෙස් අනුව අංග නිවැරදිව ඉගෙනීමයි.', wrongPool: commonWrongC },
  { base: 'උඩරට නර්තනයේ අභිනය', correct: 'උඩරට නර්තනයේ අර්ථය පෙන්වීමට දෑස්, අත් සහ ශරීර චලනය භාවිත වීම', explanation: 'උඩරට නර්තනයේ අභිනය තුළ දෑස්, අත් සහ ශරීර චලනයෙන් අර්ථය පෙන්වෙයි.', wrongPool: commonWrongC },
  { base: 'පියවර නිවැරදි කිරීම', correct: 'පියවර වැරදි නම් සකස් කර නිවැරදි තාලානුකූලව කරගැනීම', explanation: 'පියවර නිවැරදි කිරීම යනු වැරදි පියවර සකස් කර තාලයට ගැලපෙන ලෙස කරගැනීමයි.', wrongPool: commonWrongA },
  { base: 'අත් චලනයේ පැහැදිලිකම', correct: 'අත් චලනයන් පැහැදිලිව සහ නියමිත ලෙස පෙන්වීම', explanation: 'අත් චලනයේ පැහැදිලිකම යනු අත් චලනයන් නිවැරදිව හා පැහැදිලි ලෙස පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'නෙත් යොමු', correct: 'නර්තන රචනයට ගැලපෙන අයුරින් දෑස් යොමු කිරීම', explanation: 'නෙත් යොමු යනු රචනයට අනුව දෑස් යොමු කරමින් අභිනය පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'ශරීර චලනය', correct: 'ශරීරය භාවිතා කරමින් අංග පෙන්වන චලනය', explanation: 'ශරීර චලනය යනු ශරීරයෙන් අංග පෙන්වීමයි.', wrongPool: commonWrongC },
  { base: 'තාලය අනුව සකස්වීම', correct: 'බෙර තාලය අනුව අංග හා චලනයන් සකස් කරගැනීම', explanation: 'තාලය අනුව සකස්වීම යනු බෙර තාලයට අනුව චලනයන් සකස් කරගැනීමයි.', wrongPool: commonWrongB },
  { base: 'නර්තනයේ අරමුණ', correct: 'දේශීය සංස්කෘතිය හා අභිනය ඉදිරිපත් කිරීම', explanation: 'නර්තනයේ අරමුණ යනු දේශීය සංස්කෘතිය හා අභිනය ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'නර්තන අවස්ථාව', correct: 'තාලය හා රචනය අනුව නර්තනය ඉදිරිපත් කරන වෙලාව', explanation: 'නර්තන අවස්ථාව යනු තාලය සහ රචනය අනුව නර්තනය ඉදිරිපත් කරන වේලාවයි.', wrongPool: commonWrongC },

  // Ensure we have exactly 80 facts: the list above currently counts 50+.
  // We will extend with more instrument / concept bases below to reach 80.

  { base: 'ගැටබෙර තාලය', correct: 'ගැටබෙරයේ වාදනය අනුව නර්තනයේ පියවර ගැලපීම', explanation: 'ගැටබෙර තාලය යනු ගැටබෙරයෙන් එන රිද්මයට අනුව පියවර ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'තම්මැට්ටම තාලය', correct: 'තම්මැට්ටමෙන් එන රිද්මය අනුව සමූහ නර්තනය ගැලපීම', explanation: 'තම්මැට්ටම තාලය යනු තම්මැට්ටමෙන් එන රිද්මයට අනුව නර්තනය ගැලපීමයි.', wrongPool: commonWrongB },
  { base: 'රබාන තාලය', correct: 'රබාන වාදනය කරන රිද්මයට අනුව අංගයන් පෙන්වීම', explanation: 'රබාන තාලය යනු රබානෙන් එන රිද්මයට අනුව අංග පෙන්වීමයි.', wrongPool: commonWrongB },
  { base: 'බෙර වටය', correct: 'නර්තකයන් වටා බෙරය වාදනය කරමින් තාලය පවත්වා ගන්නා ක්‍රමය', explanation: 'බෙර වටය යනු බෙර වාදනය මඟින් තාලය නර්තකයන්ට සම්බන්ධ කරන ක්‍රමයකි.', wrongPool: commonWrongC },
  { base: 'සංයුක්ත වාදනය', correct: 'විවිධ බෙර එකට වාදනය කරමින් රිද්මය සකස් කිරීම', explanation: 'සංයුක්ත වාදනය යනු විවිධ වාද්‍ය එකට සම්බන්ධ කර රිද්මය සකස් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'කණ්ඩිය නාදය', correct: 'උඩරට නර්තනයට අදාළ දේශීය වාද්‍ය නාද රටාව', explanation: 'කණ්ඩිය/උඩරට නාදය යනු උඩරට නර්තනයට ගැලපෙන දේශීය නාද රටාවයි.', wrongPool: commonWrongC },
  { base: 'නර්තන ගමන', correct: 'තාලයට ගැලපෙන ලෙස නර්තනය ඉදිරියට යන චලන ගමන', explanation: 'නර්තන ගමන යනු තාලයට ගැලපෙන ලෙස ඉදිරියට යන චලන ගමනයි.', wrongPool: commonWrongA },
  { base: 'අංග සංකේත', correct: 'නර්තනයේ අර්ථය පෙන්වන පියවර/අත් චලන සංකේත', explanation: 'අංග සංකේත යනු අර්ථය පෙන්වන පියවර සහ අත් චලන සංකේත වේ.', wrongPool: commonWrongC },
  { base: 'උඩරට පියවර', correct: 'උඩරට නර්තනයේ මූලික පියවර රටාව', explanation: 'උඩරට පියවර යනු උඩරට නර්තනයේ මූලික චලන පියවර රටාවයි.', wrongPool: commonWrongC },
  { base: 'නර්තන රචනය', correct: 'නියමිත අංග පියවර අනුපිළිවෙලට සකස් කර ඇති ඉදිරිපත් කිරීම', explanation: 'නර්තන රචනය යනු අංග පියවර අනුපිළිවෙලට සකස් කරන ලද ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'අඩව් හා වන්නම්', correct: 'අඩව් පදනමෙන් වන්නම් වැනි අංග ඉදිරිපත් කිරීම', explanation: 'අඩව් හා වන්නම් අතර සම්බන්ධය වන්නේ අඩව් පදනමෙන් ඉදිරි අංග ඉදිරිපත් වීමයි.', wrongPool: commonWrongB },
  { base: 'වන්නම් ඉදිරිපත් කිරීම', correct: 'වන්නම් අංගයේ පියවර අනුපිළිවෙලට අනුව ඉදිරිපත් කිරීම', explanation: 'වන්නම් ඉදිරිපත් කිරීම යනු අංග අනුපිළිවෙලට අනුව ඉදිරිපත් කිරීමයි.', wrongPool: commonWrongC },
  { base: 'වර්ණ ඉදිරිපත් කිරීම', correct: 'වර්ණ අංගය ගී සහ චලනය සමඟ ගැලපෙන ලෙස ඉදිරිපත් කිරීම', explanation: 'වර්ණ ඉදිරිපත් කිරීමේදී ගී සහ චලනය එකට ගැලපෙයි.', wrongPool: commonWrongB },
  { base: 'අභිනය ගැලපීම', correct: 'නර්තන අර්ථයට ගැලපෙන ලෙස අභිනය පෙන්වීම', explanation: 'අභිනය ගැලපීම යනු අර්ථයට ගැලපෙන ලෙස අභිනය පෙන්වීමයි.', wrongPool: commonWrongA },
  { base: 'ශරීර ස්ථාවරය', correct: 'චලනය අතර ශරීරය පාලනය කරගෙන නිවැරදි ඉරියව්ව තබාගැනීම', explanation: 'ශරීර ස්ථාවරය යනු චලනය අතර පාලනය කරගෙන නිවැරදි ඉරියව්ව තබාගැනීමයි.', wrongPool: commonWrongC },
];

// Validate facts count early: must be exactly 80.
if (kandyanFacts.length !== 80) {
  console.warn(`WARNING: kandyanFacts currently has ${kandyanFacts.length} facts, but expected 80.`);
  // We still try to generate; however ensure we can reach 1600 by design.
}

function generateAll() {
  if (kandyanFacts.length < 80) {
    throw new Error(`Not enough facts to generate 1600 questions. Need at least 80, got ${kandyanFacts.length}.`);
  }

  const questions = [];
  const seen = new Set();

  function addQuestionForFact(f, variantIndex) {
    const templateIndex = variantIndex % questionTemplates.length;
    const questionRaw = questionTemplates[templateIndex](f.base);
    const question = sanitizeSinhalaText(questionRaw);

    if (seen.has(question)) return;

    const options = buildOptions(f.correct, f.wrongPool, variantIndex);
    const answer = options.indexOf(f.correct);
    if (answer < 0) return;

    seen.add(question);
    questions.push({
      question,
      options,
      answer,
      explanation: sanitizeSinhalaText(f.explanation ?? ''),
    });
  }

  // Generate questions by iterating first 80 facts (if list is longer).
  for (let factIndex = 0; factIndex < 80; factIndex += 1) {
    const f = kandyanFacts[factIndex];
    for (let v = 0; v < variantsPerFact; v += 1) {
      if (questions.length >= target) break;
      addQuestionForFact(f, factIndex * variantsPerFact + v);
    }
    if (questions.length >= target) break;
  }

  if (questions.length !== target) {
    throw new Error(`Generated ${questions.length} questions, expected ${target}.`);
  }

  for (let paper = 1; paper <= totalPapers; paper += 1) {
    const start = (paper - 1) * perPaper;
    const end = start + perPaper;
    const questionsForPaper = questions.slice(start, end);
    const varName = `kandyandancepaper${paper}`;
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

  console.log('Done. All kandyandancepaper1–40 files generated.');
}

try {
  generateAll();
} catch (err) {
  console.error('Generation failed:', err.message);
  process.exitCode = 1;
}

