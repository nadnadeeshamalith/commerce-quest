// Data Banks
import { grade5QuestionBank as g5 } from '../grade5/questions.js';
import { grade6MathsBank as grade6MathsAllBank } from '../grade6/ganithaya_paper1.js';
export const grade6MathsBank = grade6MathsAllBank || [];
import { grade6EasternMusicBank } from '../grade6/eastern_music.js';

export const westernMusicBank = [];
const g6OrientalMusic = [
  ...(grade6EasternMusicBank || [])
];

// ==========================================
// 1. COMMERCE QUESTION BANK (Minimal Stable)
// ==========================================
export const commerceQuestionBank = [
  { paperId: 1, id: 1, subject: "BS", question: "ව්‍යාපාරයක මූලික ආර්ථික පරමාර්ථය කුමක්ද?", options: ["සමාජ සේවය කිරීම", "ලාභ උපරිම කිරීම", "රැකියා සම්පාදනය", "රජයට බදු ගෙවීම"], answer: 1, explanation: "ඕනෑම ලාභ අරමුණු කරගත් ව්‍යාපාරයක මූලික ආර්ථික පරමාර්ථය වන්නේ ලාභ උපරිම කිරීමයි." },
  { paperId: 1, id: 2, subject: "BS", question: "බාහිර ව්‍යාපාරික පරිසරයට අයත් නොවන්නේ කුමක්ද?", options: ["සැපයුම්කරුවන්", "තරගකරුවන්", "සේවකයින්", "ආර්ථික තත්ත්වය"], answer: 2, explanation: "සේවකයින් යනු ව්‍යාපාරයේ අභ්‍යන්තර පරිසරයට අයත් පාර්ශ්වයකි." },
  { paperId: 1, id: 3, subject: "BS", question: "සීමිත වගකීමක් සහිත ව්‍යාපාර සංවිධාන වර්ගය කුමක්ද?", options: ["තනි පුද්ගල ව්‍යාපාර", "හවුල් ව්‍යාපාර", "සීමිත පොදු සමාගම්", "අවිධිමත් ව්‍යාපාර"], answer: 2, explanation: "සමාගමක කොටස්කරුවන්ගේ වගකීම ඔවුන් යෙදවූ ප්‍රාග්ධනයට පමණක් සීමා වේ." },
  { paperId: 1, id: 4, subject: "BS", question: "කළමනාකරණයේ මූලික කාර්යයන් නිවැරදිව පෙළගස්වා ඇති පිළිතුර තෝරන්න.", options: ["සැළසුම්කරණය, සංවිධානය, මෙහෙයවීම, පාලනය", "පාලනය, මෙහෙයවීම, සංවිධානය, සැළසුම්කරණය", "සැළසුම්කරණය, පාලනය, සංවිධානය, මෙහෙයවීම", "සංවිධානය, සැළසුම්කරණය, පාලනය, මෙහෙයවීම"], answer: 0, explanation: "කළමනාකරණ ක්‍රියාවලිය සෑම විටම ආරම්භ වන්නේ සැළසුම්කරණයෙන් වන අතර අවසන් වන්නේ පාලනයෙනි." },
  { paperId: 1, id: 5, subject: "BS", question: "ශ්‍රී ලංකා මහ බැංකුවේ ප්‍රධාන කාර්යයක් නොවන්නේ කුමක්ද?", options: ["මුදල් නිකුත් කිරීම", "වාණිජ බැංකු නියාමනය කිරීම", "මහජනතාවට ණය ලබා දීම", "රජයේ බැංකුවකරු ලෙස ක්‍රියා කිරීම"], answer: 2, explanation: "මහ බැංකුව සෘජුවම සාමාන්‍ය මහජනතාව සමග ගනුදෙනු නොකරයි." },
];

export const fullCommerceBank = commerceQuestionBank;

// ==========================================
// 2. SCIENCE QUESTION BANK (Imported)
// ==========================================
import { newBiologyQuestions as bioBank } from './biology_data.js';
import { grade6SciencePaper1Bank } from '../grade6/vidyava_paper1.js';
import { grade6SciencePaper2Bank } from '../grade6/vidyava_paper2.js';
import { grade6SciencePapers3to10Bank, grade6SciencePapers11to20Bank } from '../grade6/vidyava_papers_3_20.js';
import { grade6SciencePapers21to30Bank, grade6SciencePapers31to40Bank } from '../grade6/vidyava_papers_21_40.js';

export const fullScienceBank = bioBank || [];
export const fullGrade6ScienceBank = [
  ...(grade6SciencePaper1Bank || []),
  ...(grade6SciencePaper2Bank || []),
  ...(grade6SciencePapers3to10Bank || []),
  ...(grade6SciencePapers11to20Bank || []),
  ...(grade6SciencePapers21to30Bank || []),
  ...(grade6SciencePapers31to40Bank || [])
];

// ==========================================
// 3. GRADE 6 MUSIC BANK (Imported)
// ==========================================
export const fullGrade6OrientalMusicBank = g6OrientalMusic;

export const fullGrade6WesternMusicBank = westernMusicBank || [];

// ==========================================
// GRADE 6 සිංහල
// ==========================================
export { grade6SinhalaBank as fullGrade6SinhalaBank } from '../grade6/sinhala.js';

// ==========================================
// 4. GRADE 5 BANK
// ==========================================
export const fullGrade5Bank = (g5 || []).map((q, i) => ({ 
  ...q, 
  paperId: Math.floor(i / 40) + 1 
}));

// Fallbacks and Additional Exports required by App.jsx
export const fullMediaBank = [];
export const fullChemistryBank = [];
export const fullPhysicsBank = [];
export const fullAgriBank = [];
export const fullGrade6MathsBank = grade6MathsBank || [];
export const chemistryQuestionBank = [];
export const physicsQuestionBank = [];
