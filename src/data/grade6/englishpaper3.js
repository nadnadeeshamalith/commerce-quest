import { generateEnglishPaper } from './englishPaperGenerator.js';

const SUBJECT = 'ENG6';
const PAPER_ID = 3;

const rows = [
  ['Choose the correct spelling.', ['seperate', 'separate', 'separete', 'seperete'], 1, '"Separate" is the correct spelling.'],
  ['Choose the correctly spelled word for "receive".', ['recieve', 'receive', 'receeve', 'receve'], 1, '"Receive" is correct.'],
  ['Pick the correctly spelled month name.', ['Febuary', 'February', 'Februrary', 'Febrary'], 1, '"February" is the correct form.'],
  ['Choose the correct spelling of the color.', ['purpul', 'purpel', 'purple', 'perple'], 2, '"Purple" is correctly spelled.'],
  ['Pick the correctly spelled school subject.', ['science', 'sciense', 'sience', 'scince'], 0, '"Science" is correct.'],
  ['Choose the right word: "Please ____ the door quietly."', ['close', 'cloze', 'closs', 'clozee'], 0, '"Close" is the correct verb spelling.'],
  ['Choose the right word: "The baby is ____."', ['asleep', 'a sleep', 'sleepyed', 'slepting'], 0, '"Asleep" is the correct adjective form here.'],
  ['Pick the correct word: "My mother is a ____."', ['techer', 'teacher', 'teachar', 'teecher'], 1, '"Teacher" is correctly spelled.'],
  ['Choose the right spelling: "We visited the ____."', ['museam', 'museum', 'musem', 'muzeum'], 1, '"Museum" is the correct spelling.'],
  ['Pick the correct spelling of the place.', ['playground', 'playgrount', 'playgrond', 'pleyground'], 0, '"Playground" is correct.'],

  ['Choose the sentence with correct capitalization.', ['the principal spoke to us.', 'The principal spoke to us.', 'The Principal spoke to us.', 'the Principal spoke to us.'], 1, 'A sentence should begin with a capital letter.'],
  ['Pick the correctly capitalized sentence.', ['we celebrate vesak in may.', 'We celebrate Vesak in May.', 'We celebrate vesak in may.', 'we celebrate Vesak in May.'], 1, 'Names of festivals and months are capitalized.'],
  ['Choose the sentence with correct punctuation.', ['My brother, likes football.', 'My brother likes football.', 'My brother likes football,', 'My brother likes football!'], 1, 'A normal statement ends with a full stop.'],
  ['Pick the sentence that needs a colon.', ['I bought: apples, oranges, and mangoes.', 'I bought apples: oranges and mangoes.', 'I bought three fruits: apples, oranges, and mangoes.', 'I bought three fruits apples, oranges, and mangoes:'], 2, 'Use a colon before a listed set after an introductory clause.'],
  ['Choose the correct use of apostrophe.', ['These are the girls books.', "These are the girl's books.", "These are the girls' books.", "These are the girls's books."], 2, 'Plural possessive takes apostrophe after s: "girls\'".'],
  ['Select the correctly punctuated direct speech.', ['Rani said, "I will come early."', 'Rani said "I will come early."', 'Rani said, I will come early.', 'Rani said: "I will come early".'], 0, 'Comma + quotation marks are required for direct speech.'],
  ['Choose the correct end mark: "How old are you__"', ['.', '!', '?', ','], 2, 'A direct question ends with "?".'],
  ['Pick the sentence with proper comma use.', ['After lunch we had art.', 'After lunch, we had art.', 'After, lunch we had art.', 'After lunch we, had art.'], 1, 'Comma follows introductory phrase "After lunch".'],
  ['Choose the correct punctuation for surprise.', ['Oh no.', 'Oh no?', 'Oh no!', 'Oh, no,'], 2, 'Exclamation mark shows strong feeling.'],
  ['Pick the sentence that is punctuated correctly.', ['Its a sunny day.', "It's a sunny day.", 'Its, a sunny day.', "It's a sunny day"], 1, '"It\'s" is the contraction of "it is".'],

  ['Choose the prefix that means "again".', ['un-', 're-', 'dis-', 'mis-'], 1, '"Re-" means again.'],
  ['Pick the word with suffix "-less".', ['careful', 'careless', 'carefuly', 'caring'], 1, '"Careless" contains "-less".'],
  ['Identify the root word in "unhappiness".', ['happy', 'unhappy', 'happi', 'happiness'], 0, 'The root/base is "happy".'],
  ['Choose the synonym of "assist".', ['help', 'delay', 'hide', 'refuse'], 0, '"Assist" means help.'],
  ['Choose the antonym of "borrow".', ['keep', 'lend', 'bring', 'carry'], 1, 'The opposite relationship is lend vs borrow.'],
  ['Pick the best word to complete: "The path was very ____ after rain."', ['slippery', 'sweet', 'sharp', 'silent'], 0, '"Slippery" best describes a wet path.'],
  ['Choose the suitable word: "The king wore a golden ____."', ['crown', 'crowd', 'clown', 'cream'], 0, '"Crown" is the correct noun for a king.'],
  ['Choose the homophone that fits: "I can ____ the birds singing."', ['hear', 'here', 'hair', 'hare'], 0, '"Hear" relates to listening.'],
  ['Choose the homophone that fits: "Please come ____."', ['hear', 'hare', 'here', 'hero'], 2, '"Here" indicates place.'],
  ['Select the compound word.', ['rain', 'bow', 'rainbow', 'rained'], 2, '"Rainbow" combines two words: rain + bow.'],

  ['Arrange the words to form a correct sentence: "every / reads / she / night"', ['She reads every night.', 'Every reads she night.', 'Reads she every night.', 'She every night reads.'], 0, 'Subject + verb + time phrase is correct here.'],
  ['Choose the best reply to: "May I open the window?"', ['Yes, please do.', 'I am a window.', 'Open is good.', 'The window blue.'], 0, 'It is a polite and appropriate response.'],
  ['Pick the sentence that gives advice.', ['You must drink clean water daily.', 'I drank water yesterday.', 'Water is in the bottle.', 'Do you drink water?'], 0, 'This sentence advises a good habit.'],
  ['Choose the sentence in passive voice.', ['The chef cooked the meal.', 'The meal was cooked by the chef.', 'The chef is cooking the meal.', 'The chef cooks meals.'], 1, 'Passive voice focuses on the object receiving action.'],
  ['Pick the sentence in active voice.', ['The match was won by our team.', 'Our team won the match.', 'The match is being won by our team.', 'The match had been won by our team.'], 1, 'Active voice has subject doing the action directly.'],
  ['Choose the correct tag question: "You are ready, ____?"', ["aren't you", "don't you", "isn't it", "won't you"], 0, 'For "You are", use "aren\'t you?"'],
  ['Choose the correct conditional sentence.', ['If it rains, we will stay indoors.', 'If it rained, we stayed indoors tomorrow.', 'If it raining, we will stayed indoors.', 'If rains, we will indoors stay.'], 0, 'This is a correct first conditional pattern.'],
  ['Pick the sentence with the correct modal verb.', ['You must to wear a helmet.', 'You must wear a helmet.', 'You must wearing a helmet.', 'You must wore a helmet.'], 1, 'Modal "must" is followed by base verb.'],
  ['Choose the best sentence for a notice about cleanliness.', ['Keep the classroom clean and use bins properly.', 'I like clean places.', 'Classrooms are rooms.', 'Bin is a word.'], 0, 'It is clear, instructive, and suitable for a notice.'],
  ['Select the best final line for a speech on kindness.', ['Thank you for listening.', 'My bag is heavy.', 'Kind people are tall.', 'Yesterday was Tuesday.'], 0, 'A speech usually ends with a courteous closing line.']
];

export const englishpaper3 = generateEnglishPaper(3);

if (englishpaper3.length !== 40) throw new Error(`englishpaper3 must contain 40 questions, got ${englishpaper3.length}`);
