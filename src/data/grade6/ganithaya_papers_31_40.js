// Generator for Grade 6 Maths Papers 31-40
// Each paper has 40 questions

const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const makeMCQ = ({ id, paperId, level, question, correct, distractors, explanation, svg }) => {
  const options = shuffle([correct, ...distractors]);
  return {
    id,
    subject: "G6M",
    paperId,
    level,
    question,
    options: options.map(String),
    answer: options.indexOf(correct),
    marks: 2.5,
    explanation: explanation || `නිවැරදි පිළිතුර ${correct} වේ.`,
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

export const genAdvancedPapers = (startPaperId, endPaperId) => {
  const allQuestions = [];
  
  for (let paperId = startPaperId; paperId <= endPaperId; paperId++) {
    const paperQuestions = [];
    const topicOcc = Array(topics.length).fill(0);
    
    for (let i = 1; i <= 40; i++) {
      const id = paperId * 1000 + i;
      const topicIndex = i % topics.length;
      const occ = topicOcc[topicIndex]++;
      const topic = topics[topicIndex];
      const level = i <= 24 ? "easy" : (i <= 36 ? "normal" : "hard");
      
      let qData = {};
      
      // Topic based question generation logic
      if (topicIndex === 0) { // Numbers
        const num = paperId * 1000 + i * 123;
        qData = {
          question: `${num} සංඛ්‍යාවේ දහස් ස්ථානයේ ඇති ඉලක්කම කුමක්ද?`,
          correct: Math.floor((num / 1000) % 10),
          distractors: [Math.floor((num / 100) % 10), Math.floor((num / 10) % 10), Math.floor(num % 10)],
          explanation: "සංඛ්‍යාවක ස්ථානීය අගයන් දකුණේ සිට වමට: ඒකක, දශක, සියක, දහස්... ලෙස ගණන් කරනු ලැබේ."
        };
      } else if (topicIndex === 1) { // Operations
        const x = paperId * 2 + i;
        const y = i + 5;
        const op = i % 4;
        if (op === 0) {
          qData = { question: `${x} + ${y} = ?`, correct: x + y, distractors: [x + y + 1, x + y - 1, x + y + 10] };
        } else if (op === 1) {
          qData = { question: `${x + y} - ${x} = ?`, correct: y, distractors: [y + 1, y - 1, y + 5] };
        } else if (op === 2) {
          qData = { question: `${x} × ${y} = ?`, correct: x * y, distractors: [x * y + x, x * y - y, x * y + 10] };
        } else {
          qData = { question: `${x * y} ÷ ${x} = ?`, correct: y, distractors: [y + 1, y - 1, 2] };
        }
      } else if (topicIndex === 2) { // Fractions/Decimals
        // Ensure uniqueness within the paper by using an occurrence counter.
        // Also include paperId in parameters so questions don't repeat across different paperIds.
        const den = 2 + ((paperId + occ) % 8); // 2..9
        const num = 1 + ((paperId * 2 + occ * 3) % Math.max(1, den - 1)); // 1..den-1
        const correct = (num / den).toFixed(2);
        // Keep distractors different from correct (avoid same value after rounding).
        const d1 = (num / (den + 1)).toFixed(2);
        const d2 = ((num + 1) / den).toFixed(2);
        const d3 = (num / (den + 2)).toFixed(2);
        const distractorsBase = [d1, d2, d3].filter((d) => d !== correct);
        const distractors = distractorsBase.length >= 3
          ? distractorsBase.slice(0, 3)
          : [
            ...distractorsBase,
            (num / (den + 3)).toFixed(2),
            (num / (den + 4)).toFixed(2),
          ].filter((d) => d !== correct).slice(0, 3);
        qData = {
          question: `භාගය ${num}/${den} දශමයක් ලෙස දැක්වූ විට:`,
          correct,
          distractors,
          explanation: "භාගයක් දශමයක් කිරීමට ලවය හරයෙන් බෙදන්න."
        };
      } else if (topicIndex === 3) { // Measurements
        const val = paperId + i;
        const mode = i % 3;
        if (mode === 0) {
          qData = { question: `${val}m සෙන්ටිමීටර් වලින් කීයද?`, correct: val * 100 + "cm", distractors: [val * 10 + "cm", val * 1000 + "cm", val + "cm"] };
        } else if (mode === 1) {
          qData = { question: `${val}kg ග්‍රෑම් වලින් කීයද?`, correct: val * 1000 + "g", distractors: [val * 100 + "g", val * 10 + "g", val + "g"] };
        } else {
          qData = { question: `පැය ${val % 5 + 1} මිනිත්තු වලින් කීයද?`, correct: (val % 5 + 1) * 60 + " min", distractors: [(val % 5 + 1) * 30 + " min", (val % 5 + 1) * 100 + " min", "60 min"] };
        }
      } else if (topicIndex === 4) { // Geometry
        // Make side/shape depend on both paperId and occurrence to avoid repeated question text.
        const side = 3 + ((paperId * 2 + occ) % 10); // 3..12
        const isSquare = occ % 2 === 0;
        const shape = isSquare ? "සමචතුරස්‍රයක" : "සමපාද ත්‍රිකෝණයක";
        const perim = isSquare ? side * 4 : side * 3;
        qData = {
          question: `පැත්තක දිග ${side}cm වූ ${shape} පරිමිතිය කීයද?`,
          correct: perim + "cm",
          distractors: [perim + 2 + "cm", perim - 2 + "cm", side * side + "cm"],
          explanation: "පරිමිතිය යනු වටේ ඇති සියලුම පැති වල එකතුවයි."
        };
      } else { // Data
        const tally = 1 + ((paperId * 3 + occ) % 10); // 1..10
        const distractors = [];
        const tryAdd = (v) => {
          if (v === tally) return;
          if (distractors.includes(v)) return;
          distractors.push(v);
        };
        tryAdd(tally + 1);
        tryAdd(tally - 1 < 1 ? tally + 2 : tally - 1);
        tryAdd(5 === tally ? 6 : 5);
        while (distractors.length < 3) tryAdd(tally + 2 + distractors.length);
        qData = {
          question: `ටැලි සටහන් (Tally marks) ${tally} ක් නිරූපණය කිරීමට ඉරි කීයක් ඇඳිය යුතුද?`,
          correct: tally,
          distractors,
          explanation: "සෑම 5 වන ඉරම හරස් ඉරක් ලෙස ඇඳේ."
        };
      }
      
      paperQuestions.push(makeMCQ({ id, paperId, level, ...qData }));
    }
    allQuestions.push(...paperQuestions);
  }
  
  return allQuestions;
};

export const grade6MathsPapers31to40Bank = genAdvancedPapers(31, 40);
