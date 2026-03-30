// Generator for Grade 6 Maths PRO MODE Levels H31-H40
// Progression: Level 1 (H31) = 3 questions, Level 2 (H32) = 5 questions, etc. (+2 each level)

const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const gcd = (a, b) => {
  let x = Math.abs(Number(a));
  let y = Math.abs(Number(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
};

const makeMCQ = ({ id, paperId, level, question, options, answer, explanation, svg }) => {
  return {
    id,
    subject: "G6M",
    paperId,
    level,
    question,
    options: options.map(String),
    answer,
    marks: 2.5,
    explanation: explanation || `නිවැරදි පිළිතුර ${options[answer]} වේ.`,
    ...(svg && { svg })
  };
};

const topics = [
  "සංඛ්‍යා සහ ස්ථානීය අගය",
  "මූලික ගණිත කර්ම (+, -, ×, ÷)",
  "භාග සහ දශම",
  "මිනුම් (දිග, බර, කාලය, ධාරිතාව)",
  "ජ්‍යාමිතිය (කෝණ, රූප, පරිමිතිය, වර්ගඵලය)",
  "දත්ත නිරූපණය සහ විශ්ලේෂණය"
];

export const genProLevels = () => {
  const allQuestions = [];
  let questionCounter = 1;
  
  for (let lvl = 31; lvl <= 40; lvl++) {
    const paperId = `H${lvl}`;
    const numQuestions = 3 + (lvl - 31) * 2; // Level 31=3, 32=5, ...
    
    const topicOcc = Array(topics.length).fill(0);
    for (let i = 1; i <= numQuestions; i++) {
      const id = 6000000 + lvl * 100 + i;
      const topicIndex = i % topics.length;
      const occ = topicOcc[topicIndex]++;
      
      let qData = {};
      // Advanced Level Questions
      if (topicIndex === 0) {
        const n = lvl * 10 + i;
        qData = {
          question: `${n} හි සාධක (Factors) අතරින් විශාලම සාධකය කුමක්ද?`,
          options: [n, 1, Math.floor(n/2), 2],
          answer: 0,
          explanation: "ඕනෑම සංඛ්‍යාවක විශාලම සාධකය එම සංඛ්‍යාවමය."
        };
      } else if (topicIndex === 1) {
        const x = lvl * 5;
        const y = i * 4;
        qData = {
          question: `( ${x} + ${y} ) × 2 = ?`,
          options: [(x + y) * 2, x + y * 2, x * 2 + y, x + y + 2],
          answer: 0,
          explanation: "පළමුව වරහන් ඇතුළත සුළු කර ඉන්පසු ගුණ කරන්න."
        };
      } else if (topicIndex === 2) {
        // Make the decimal value (and hence the question text) unique per paper + per occurrence.
        const den = 4 + ((lvl + occ) % 6); // 4..9
        const numRaw = 1 + ((lvl * 2 + occ * 3) % Math.max(1, den - 1)); // 1..den-1
        const g = gcd(numRaw, den);
        const sn = numRaw / g;
        const sd = den / g;
        const dec = (sn / sd).toFixed(2);
        const correctOption = `${sn}/${sd}`;

        const reduceFrac = (n, d) => {
          const gg = gcd(n, d);
          return [n / gg, d / gg];
        };

        const candidates = [
          reduceFrac(sn, sd + 1),
          reduceFrac(sn + 1, sd),
          reduceFrac(Math.max(1, sn - 1), sd + 2),
          reduceFrac(sn + 2, sd + 1),
        ].map(([n, d]) => `${n}/${d}`);

        const distractors = [];
        for (const opt of candidates) {
          if (opt === correctOption) continue;
          if (distractors.includes(opt)) continue;
          distractors.push(opt);
          if (distractors.length >= 3) break;
        }
        while (distractors.length < 3) {
          const n2 = (sn + distractors.length + 1);
          const d2 = sd + distractors.length + 1;
          const [rn2, rd2] = reduceFrac(n2, d2);
          const opt = `${rn2}/${rd2}`;
          if (opt !== correctOption && !distractors.includes(opt)) distractors.push(opt);
        }

        qData = {
          question: `${dec} ට සමාන සරලම භාගය කුමක්ද?`,
          options: [correctOption, ...distractors.slice(0, 3)],
          answer: 0,
          explanation: `${dec} = ${correctOption}.`
        };
      } else if (topicIndex === 3) {
        // Make meters value unique per paper + occurrence.
        const meters = 0.75 + ((lvl + occ) % 7) * 0.25; // 0.75, 1.00, 1.25, ...
        const cm = meters * 100; // multiples of 25 => integer
        const metersStr = Number(meters.toFixed(2)).toString();
        qData = {
          question: `මීටර් ${metersStr} ක් සෙන්ටිමීටර් වලින් කීයද?`,
          options: [`${cm}cm`, `${cm / 10}cm`, `${cm * 10}cm`, `${metersStr}cm`],
          answer: 0,
          explanation: `${metersStr}m = ${cm}cm.`
        };
      } else if (topicIndex === 4) {
        // Make radius unique per occurrence within the paper.
        const r = lvl % 10 + 5 + occ;
        qData = {
          question: `වෘත්තයක අරය ${r}cm නම් එහි විෂ්කම්භය කීයද?`,
          options: [r * 2 + "cm", r + "cm", r / 2 + "cm", r * 4 + "cm"],
          answer: 0,
          explanation: "විෂ්කම්භය යනු අරය මෙන් දෙගුණයකි."
        };
      } else {
        // Make the average value unique per occurrence within the paper.
        const avg = lvl + occ;
        qData = {
          question: `සංඛ්‍යා 5 ක සාමාන්‍යය ${avg} නම්, එම සංඛ්‍යා වල එකතුව කීයද?`,
          options: [avg * 5, avg + 5, avg / 5, avg * 10],
          answer: 0,
          explanation: "එකතුව = සාමාන්‍යය × සංඛ්‍යා ගණන."
        };
      }
      
      allQuestions.push(makeMCQ({ id, paperId, level: "hard", ...qData }));
    }
  }
  
  return allQuestions;
};

export const grade6MathsPro31to40Bank = genProLevels();
