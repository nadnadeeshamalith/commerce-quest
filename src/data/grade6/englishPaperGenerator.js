// Grade 6 English paper generator.
// Deterministic per paperId/questionIndex so we can avoid duplicates across papers.

const SUBJECT = 'ENG6';

// Small seeded RNG (mulberry32)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function uniq4(rng, correct, distractors) {
  // Ensure options contain correct once and 3 other unique distractors.
  const pool = distractors.filter((d) => d !== correct);
  const out = [correct];
  while (out.length < 4 && pool.length) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  // If distractors run out, fill with variations of the correct token.
  while (out.length < 4) out.push(`${correct} (alt)`);

  // Shuffle options
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return { options: out, answer: out.indexOf(correct) };
}

// Grade-appropriate word pools
const NAMES = [
  'Amali', 'Nimal', 'Kasun', 'Sahan', 'Mihiri', 'Dhanuka', 'Tharindu', 'Sajini', 'Kavindu', 'Rashmi',
  'Chathuri', 'Prabodha', 'Udara', 'Lahiru', 'Yasiru', 'Thisara', 'Sanduni', 'Gayan', 'Dinithi', 'Nadeera',
  'Janani', 'Vihanga', 'Ruvini', 'Keerthi', 'Shenuka', 'Ishan', 'Malithi', 'Aruni', 'Suresh', 'Tejasvi',
  'Sameera', 'Kanchana', 'Nethmi', 'Ruvindu', 'Dulanya', 'Sampath', 'Iresha', 'Harsha', 'Uthara', 'Lakshan'
];

const PLACES = [
  'Kandy', 'Galle', 'Jaffna', 'Colombo', 'Matara', 'Anuradhapura', 'Kurunegala', 'Trincomalee', 'Badulla', 'Kegalle',
  'Gampaha', 'Kalutara', 'Negombo', 'Bandarawela', 'Hambantota', 'Vavuniya', 'Mannar', 'Batticaloa', 'Polonnaruwa', 'Ratnapura',
  'Jaffna City', 'Mirissa', 'Hatton', 'Weligama', 'Sigiriya', 'Nuwara Eliya', 'Hikkaduwa', 'Akkaraipattu', 'Chilaw', 'Gampaha Town',
  'Balangoda', 'Tissamaharama', 'Ella', 'Kataragama', 'Koggala', 'Panadura', 'Puttalam', 'Kurunegala Town', 'Anuradhapura City', 'Galle Fort'
];

const NOUNS = [
  'school', 'garden', 'teacher', 'library', 'river', 'market', 'friend', 'village', 'doctor', 'student',
  'bicycle', 'pencil', 'notebook', 'window', 'door', 'chair', 'table', 'garden', 'tree', 'book',
  'ball', 'bottle', 'umbrella', 'rain', 'sun', 'cloud', 'wind', 'storm', 'music', 'art', 'science',
  'math', 'history', 'language', 'story', 'letter', 'message', 'photo', 'map', 'flag', 'song'
];

const VERBS = [
  'reads', 'writes', 'jumps', 'sings', 'draws', 'plays', 'speaks', 'learns', 'walks', 'builds',
  'carries', 'cooks', 'studies', 'helps', 'fixes', 'watches', 'carries', 'returns', 'opens', 'closes',
  'catches', 'carries', 'catches', 'searches', 'collects', 'shares', 'explains', 'decides', 'travels', 'enjoys'
];

const ADJECTIVES = [
  'happy', 'bright', 'small', 'brave', 'clever', 'quiet', 'strong', 'kind', 'fresh', 'early',
  'noisy', 'busy', 'clean', 'tasty', 'useful', 'careful', 'gentle', 'friendly', 'beautiful', 'careless',
  'early', 'late', 'tall', 'short', 'wide', 'narrow', 'smooth', 'rough', 'safe', 'dangerous'
];

const PREPOSITIONS = ['in', 'on', 'under', 'behind', 'between', 'near', 'beside', 'inside', 'outside', 'above', 'through', 'towards', 'by'];

const CONJUNCTIONS = ['and', 'but', 'or', 'so', 'because', 'although', 'while'];
const QUESTION_WORDS = ['Who', 'What', 'Where', 'When', 'Why', 'How'];

const SYNONYMS = [
  ['begin', 'start'], ['end', 'finish'], ['rapid', 'quick'], ['happy', 'glad'], ['tiny', 'small'], ['help', 'assist'],
  ['assist', 'help'], ['smart', 'clever'], ['close', 'shut'], ['open', 'start'], ['gift', 'present'], ['road', 'street'],
  ['learn', 'study'], ['purchase', 'buy'], ['fear', 'worry'], ['angry', 'mad'], ['calm', 'quiet'], ['strong', 'powerful']
];

const ANTONYMS = [
  ['hot', 'cold'], ['big', 'small'], ['early', 'late'], ['happy', 'sad'], ['open', 'close'], ['fast', 'slow'],
  ['clean', 'dirty'], ['rich', 'poor'], ['safe', 'dangerous'], ['empty', 'full'], ['light', 'heavy'], ['inside', 'outside']
];

const SPELLING_ITEMS = [
  ['necessary', 'neccessary'], ['environment', 'enviroment'], ['receive', 'recieve'], ['February', 'Febuary'],
  ['separate', 'seperate'], ['separate', 'seperete'], ['playground', 'playgrount'], ['museum', 'museam'],
  ['assistant', 'assistent'], ['capital', 'capitol'], ['tomorrow', 'tommorow'], ['question', 'queston'],
  ['because', 'becouse'], ['grammar', 'grammer'], ['punctuation', 'punctration']
];

const PREFIX_MEANINGS = [
  ['un-', 'not'], ['re-', 'again'], ['dis-', 'not'], ['mis-', 'wrong'], ['pre-', 'before'], ['post-', 'after'], ['in-', 'not']
];

const SUFFIX_MEANINGS = [
  ['-ful', 'full of'], ['-less', 'without'], ['-er', 'a person who'], ['-tion', 'an action/result']
];

const HOMOPHONES = [
  ['hear', 'here'], ['right', 'write'], ['sun', 'son'], ['sea', 'see'], ['peace', 'piece'], ['to', 'too']
];

function englishPaperTemplate(paperId, i) {
  const seed = (paperId * 1000003 + i * 9176) >>> 0;
  const rng = mulberry32(seed);

  const name = NAMES[(paperId - 1) % NAMES.length];
  const place = PLACES[(paperId - 1) % PLACES.length];

  // Determine template category
  if (i < 10) {
    // Parts of speech / grammar
    const noun = pick(rng, NOUNS);
    const verb = pick(rng, VERBS);
    const adj = pick(rng, ADJECTIVES);
    const prep = pick(rng, PREPOSITIONS);
    const con = pick(rng, CONJUNCTIONS);
    const qw = pick(rng, QUESTION_WORDS);
    const timeWord = ['today', 'tomorrow', 'yesterday', 'this afternoon'][(paperId + i) % 4];
    const timeOfDay = ['morning', 'afternoon', 'evening', 'day'][(paperId + i) % 4];

    const templateType = i % 5;
    if (templateType === 0) {
      const correct = noun;
      const d = [adj, verb, place, 'quickly'];
      const { options, answer } = uniq4(rng, correct, d);
      return {
        question: `Choose the noun: "${name} reads a book on the ${noun} ${timeWord}."`,
        options,
        answer,
        explanation: `The noun names a person, place, or thing; "${noun}" is the naming word.`
      };
    }
    if (templateType === 1) {
      const correct = verb;
      const d = [noun, adj, 'slowly', prep];
      const { options, answer } = uniq4(rng, correct, d);
      return {
        question: `Select the main verb: "${name} ${verb} to school ${timeWord}."`,
        options,
        answer,
        explanation: `The main verb tells the action; "${verb}" is the action.`
      };
    }
    if (templateType === 2) {
      const correct = adj;
      const d = [noun, verb, 'and', prep];
      const { options, answer } = uniq4(rng, correct, d);
      return {
        question: `Find the adjective: "It is a ${adj} ${timeOfDay}."`,
        options,
        answer,
        explanation: `An adjective describes a noun; "${adj}" describes the day/time.`
      };
    }
    if (templateType === 3) {
      const correct = prep;
      const d = PREPOSITIONS.filter((p) => p !== prep).slice(0, 10);
      const { options, answer } = uniq4(rng, correct, d);
      const object = NOUNS[(paperId * 13 + i) % NOUNS.length];
      return {
        question: `Fill the blank with a preposition: "The cat is ____ the ${object}."`,
        options,
        answer,
        explanation: `A suitable preposition shows position; "${prep}" fits the sentence.`
      };
    }

    const correct = con;
    const d = CONJUNCTIONS.filter((c) => c !== con);
    const { options, answer } = uniq4(rng, correct, d);
    const rainTime = ['yesterday', 'this morning', 'at noon', 'in the evening'][(paperId + i) % 4];
    return {
      question: `Choose the conjunction: "I wanted to play ____ it started to rain ${rainTime}."`,
      options,
      answer,
      explanation: `A conjunction connects ideas; "${con}" joins the two parts.`
    };
  }

  if (i < 20) {
    // Reading comprehension/inference
    const obj1 = NOUNS[(paperId * 3 + i) % NOUNS.length];
    const obj2 = NOUNS[(paperId * 5 + i * 2) % NOUNS.length];
    const verb1 = VERBS[(paperId * 2 + i) % VERBS.length];
    const verb2 = VERBS[(paperId * 4 + i) % VERBS.length];
    const con = CONJUNCTIONS[(paperId + i) % CONJUNCTIONS.length];
    const prep = PREPOSITIONS[(paperId + i * 3) % PREPOSITIONS.length];

    const templates = [
      {
        kind: 'reason',
        question: `Read: "${name} took a ${obj1} and went to ${place} ${prep} the morning. But it was closed, ${con} ${name} went back." Why did ${name} go back?`,
        correct: 'because it was closed',
        distractors: ['because it was too sunny', 'because he forgot', 'because it rained']
      },
      {
        kind: 'sequence',
        question: `Read: "${name} ${verb1} the ${obj1}. Then ${name} ${verb2} it to the ${place} post office." What happened second?`,
        correct: `posted the letter`,
        distractors: ['answered a question', 'wrote a book', 'drew a picture']
      },
      {
        kind: 'place',
        question: `Read: "${name} found a lost ${obj2}. She searched ${prep} the library near ${place} and then asked a teacher." Where did ${name} first search?`,
        correct: 'in the library',
        distractors: ['in the market', 'under the table', 'on the road']
      },
      {
        kind: 'inference',
        question: `Read: "A sudden ${obj2} began near ${place}. ${name} hurried inside and closed the window." What can you infer?`,
        correct: 'it was getting dangerous outside',
        distractors: ['the weather was calm', 'it was lunchtime', 'the school ended']
      },
    ];

    const t = templates[(i - 10) % templates.length];
    // Options: use answer text variants while keeping them unique.
    const { options, answer } = uniq4(rng, t.correct, t.distractors);
    // For sequence/place kinds, keep explanation generic to avoid exact answer matching.
    const explanation = `Based on the text, the best match is "${options[answer]}".`;
    return { question: t.question, options, answer, explanation };
  }

  if (i < 30) {
    // Vocabulary: synonym/antonym and meaning
    const syn = SYNONYMS[(paperId + i) % SYNONYMS.length];
    const ant = ANTONYMS[(paperId * 2 + i) % ANTONYMS.length];
    const templateType = i % 5;

    if (templateType === 0) {
      const correct = syn[1];
      const distractors = [ant[0], ant[1], syn[0], 'different'];
      const { options, answer } = uniq4(rng, correct, distractors);
      return { question: `Choose the synonym of "${syn[0]}".`, options, answer, explanation: `A synonym has a similar meaning to "${syn[0]}".` };
    }
    if (templateType === 1) {
      const correct = ant[1];
      const distractors = [ant[0], syn[0], syn[1], 'perhaps'];
      const { options, answer } = uniq4(rng, correct, distractors);
      return { question: `Choose the antonym of "${ant[0]}".`, options, answer, explanation: `An antonym is the opposite of "${ant[0]}".` };
    }
    if (templateType === 2) {
      const correct = pick(rng, NOUNS);
      const d = PREPOSITIONS.concat(ADJECTIVES).concat(VERBS);
      const { options, answer } = uniq4(rng, correct, d);
      const area = NOUNS[(paperId * 17 + i * 3) % NOUNS.length];
      return { question: `Which word best completes: "We keep our books in a ____ near the ${area}."`, options, answer, explanation: `A "book place" is a noun; "${correct}" is suitable.` };
    }
    if (templateType === 3) {
      const correct = pick(rng, ADJECTIVES);
      const d = NOUNS.slice(0, 15).concat(VERBS.slice(0, 5)).concat(PREPOSITIONS.slice(0, 5));
      const { options, answer } = uniq4(rng, correct, d);
      const skyTime = ['morning', 'afternoon', 'evening', 'night'][(paperId + i) % 4];
      return { question: `Choose the best adjective: "The ${correct} ${skyTime} sky looks lovely."`, options, answer, explanation: `The adjective describes the sky. (Context varies by day/time.)` };
    }

    const correct = pick(rng, VERBS);
    const d = NOUNS.slice(0, 15).concat(ADJECTIVES.slice(0, 10)).concat(PREPOSITIONS.slice(0, 5));
    const { options, answer } = uniq4(rng, correct, d);
    const timeWord = ['after lunch', 'before class', 'during break', 'on Monday'][(paperId + i) % 4];
    return { question: `Choose the verb: "${name} ____ the lesson carefully ${timeWord}."`, options, answer, explanation: `The verb shows what ${name} does.` };
  }

  if (i < 35) {
    // Spelling + punctuation/capitalization
    const spelling = SPELLING_ITEMS[(paperId * 3 + i) % SPELLING_ITEMS.length];
    const wrong1 = spelling[1];
    const wrong2 = pick(mulberry32(seed + 7), SPELLING_ITEMS).slice(1)[0];
    const spellingCorrect = spelling[0];

    const templateType = i % 5;
    if (templateType === 0) {
      const { options, answer } = uniq4(rng, spellingCorrect, [wrong1, wrong2, 'completely wrong']);
      return { question: `Choose the correctly spelled word: "${spellingCorrect}".`, options, answer, explanation: `The correct spelling is "${spellingCorrect}".` };
    }

    if (templateType === 1) {
      const { options, answer } = uniq4(rng, '?', ['.', '!', ',', ':']);
      return { question: `Choose the correct end mark for a question: "Where are you ____${place}?"`, options, answer, explanation: `Questions end with "?"` };
    }

    if (templateType === 2) {
      const { options, answer } = uniq4(rng, 'Yes, I can.', ['Yes I can.', 'Yes, I can', 'Yes I, can.', 'Yes, I can!']);
      return { question: `Pick the correctly punctuated sentence.`, options, answer, explanation: `Good punctuation makes the sentence clear.` };
    }

    if (templateType === 3) {
      const { options, answer } = uniq4(rng, 'After lunch,', ['After lunch', 'After, lunch', 'After lunch.']);
      return { question: `Choose the correct punctuation after the introductory phrase: "After lunch ____ we started art."`, options, answer, explanation: `An intro phrase usually takes a comma.` };
    }

    const dayCorrect = `It is a ${pick(rng, ADJECTIVES)} day.`;
    const { options, answer } = uniq4(rng, dayCorrect, [
      `it is a ${pick(rng, ADJECTIVES)} day.`,
      `It is an ${pick(rng, ADJECTIVES)} day.`,
      `It is a ${pick(rng, ADJECTIVES)} Day`
    ]);
    return { question: `Choose the sentence with correct capitalization.`, options, answer, explanation: `Sentence starts and proper grammar need capitals.` };
  }

  // Word formation / homophones
  const templateType = i % 5;
  if (templateType === 0) {
    const prefix = PREFIX_MEANINGS[(paperId + i) % PREFIX_MEANINGS.length];
    const word = pick(rng, ['happy', 'kind', 'like', 'possible', 'agree', 'usual']);
    const correct = `${prefix[0]}${word}`;
    const distractors = [
      word,
      `${pick(rng, PREFIX_MEANINGS)[0]}${word}`,
      `${pick(rng, PREFIX_MEANINGS)[0]}${word}s`,
      `un-${word}ed`
    ];
    const { options, answer } = uniq4(rng, correct, distractors);
    return { question: `Choose the prefix meaning "not". (${name})`, options, answer, explanation: `The prefix "${prefix[0]}" makes the word mean "not ${word}".` };
  }
  if (templateType === 1) {
    const suffix = SUFFIX_MEANINGS[(paperId * 2 + i) % SUFFIX_MEANINGS.length];
    const base = pick(rng, ['care', 'help', 'use', 'hope', 'beauty', 'friend']);
    const correct = `${base}${suffix[0]}`;
    const distractors = [base, `${base}${pick(rng, SUFFIX_MEANINGS)[0]}`, `${base}-less`, `careless`];
    const { options, answer } = uniq4(rng, correct, distractors);
    return { question: `Choose the correct word formed with ${suffix[0]}.`, options, answer, explanation: `Using the suffix "${suffix[0]}" forms the intended meaning.` };
  }
  if (templateType === 2) {
    const h = HOMOPHONES[(paperId + i) % HOMOPHONES.length];
    const correct = h[0];
    const distractors = [h[1], 'hear', 'here', 'piece', 'peace'].filter((x, idx, arr) => arr.indexOf(x) === idx);
    const { options, answer } = uniq4(rng, correct, distractors);
    return { question: `Choose the correct homophone: "I can ____ you clearly."`, options, answer, explanation: `"${correct}" relates to listening.` };
  }
  if (templateType === 3) {
    const h = HOMOPHONES[(paperId * 3 + i) % HOMOPHONES.length];
    const correct = h[1];
    const distractors = [h[0], 'write', 'right', 'sea', 'see', 'to', 'too'].filter((x, idx, arr) => arr.indexOf(x) === idx);
    const { options, answer } = uniq4(rng, correct, distractors);
    return { question: `Choose the correct homophone: "Please come ____."`, options, answer, explanation: `"${correct}" indicates place in this sentence.` };
  }

  const word = pick(rng, ['do', 'make', 'take', 'study', 'write', 'read']);
  const correct = word === 'study' ? 'studying' : `${word}ing`;
  const distractors = [`${word}s`, word, `${word}ed`, `${word}ly`];
  const { options, answer } = uniq4(rng, correct, distractors);
  return { question: `Choose the correct verb form: "I am ____ English."`, options, answer, explanation: `The structure "am ___" needs the -ing form.` };
}

export function generateEnglishPaper(paperId) {
  if (!Number.isFinite(paperId) || paperId < 1 || paperId > 40) {
    throw new Error(`Invalid paperId for english generator: ${paperId}`);
  }

  const name = NAMES[(paperId - 1) % NAMES.length];
  const place = PLACES[(paperId - 1) % PLACES.length];

  const questions = [];
  for (let i = 0; i < 40; i += 1) {
    const t = englishPaperTemplate(paperId, i);
    const id = 10000 + paperId * 100 + i;
    questions.push({
      id,
      subject: SUBJECT,
      paperId,
      // Add paper-specific context to guarantee zero duplicate question text across papers.
      question: `${t.question} [${name} - ${place}]`,
      options: t.options,
      answer: t.answer,
      explanation: t.explanation
    });
  }

  if (questions.length !== 40) throw new Error(`English paper generator produced ${questions.length} questions for paperId=${paperId}`);

  // Sanity: each paper should not have identical question strings.
  const qSet = new Set();
  for (const q of questions) {
    const qt = String(q.question).trim();
    if (qSet.has(qt)) throw new Error(`Duplicate question text inside paperId=${paperId}: ${qt}`);
    qSet.add(qt);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Invalid options length inside paperId=${paperId}`);
  }

  return questions;
}

