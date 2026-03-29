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
    
    for (let i = 1; i <= numQuestions; i++) {
      const id = 6000000 + lvl * 100 + i;
      const topicIndex = i % topics.length;
      
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
        qData = {
          question: `0.75 ට සමාන සරලම භාගය කුමක්ද?`,
          options: ["3/4", "1/4", "1/2", "3/5"],
          answer: 0,
          explanation: "0.75 = 75/100 = 3/4."
        };
      } else if (topicIndex === 3) {
        qData = {
          question: `මීටර් 1.25 ක් සෙන්ටිමීටර් වලින් කීයද?`,
          options: ["125cm", "12.5cm", "1250cm", "1.25cm"],
          answer: 0,
          explanation: "1m = 100cm බැවින් 1.25m = 125cm."
        };
      } else if (topicIndex === 4) {
        const r = lvl % 10 + 5;
        qData = {
          question: `වෘත්තයක අරය ${r}cm නම් එහි විෂ්කම්භය කීයද?`,
          options: [r * 2 + "cm", r + "cm", r / 2 + "cm", r * 4 + "cm"],
          answer: 0,
          explanation: "විෂ්කම්භය යනු අරය මෙන් දෙගුණයකි."
        };
      } else {
        qData = {
          question: `සංඛ්‍යා 5 ක සාමාන්‍යය ${lvl} නම්, එම සංඛ්‍යා වල එකතුව කීයද?`,
          options: [lvl * 5, lvl + 5, lvl / 5, lvl * 10],
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
