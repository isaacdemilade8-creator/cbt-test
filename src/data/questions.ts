import type { Question, Subject } from '../types/exam.types';

export const questions: Question[] = [
  {
    id: 0,
    text: 'If 2x + 3y = 12 and x - y = 1, find the value of x + y.',
    options: ['A. 5', 'B. 4', 'C. 3', 'D. 7'],
    subject: 'Mathematics',
  },
  {
    id: 1,
    text: 'Simplify: log10 8 + log10 125 - log10 10',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 0'],
    subject: 'Mathematics',
  },
  {
    id: 2,
    text: 'A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of picking a ball that is not red?',
    options: ['A. 1/2', 'B. 3/10', 'C. 1/5', 'D. 7/10'],
    subject: 'Mathematics',
  },
  {
    id: 3,
    text: 'Find the value of x if 3^(2x-1) = 27.',
    options: ['A. 1', 'B. 2', 'C. 3/2', 'D. 5/2'],
    subject: 'Mathematics',
  },
  {
    id: 4,
    text: 'The sum of the interior angles of a polygon is 1080 degrees. How many sides does it have?',
    options: ['A. 6', 'B. 7', 'C. 8', 'D. 9'],
    subject: 'Mathematics',
  },
  {
    id: 5,
    text: 'What is the gradient of the line passing through the points (2, 3) and (5, 9)?',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
    subject: 'Mathematics',
  },
  {
    id: 6,
    text: 'If the roots of x^2 + px + q = 0 are 3 and -5, find the values of p and q.',
    options: ['A. p = 2, q = -15', 'B. p = -2, q = -15', 'C. p = 2, q = 15', 'D. p = -2, q = 15'],
    subject: 'Mathematics',
  },
  {
    id: 7,
    text: 'A man walks 3 km due north and then 4 km due east. What is the shortest distance from his starting point?',
    options: ['A. 3 km', 'B. 4 km', 'C. 5 km', 'D. 7 km'],
    subject: 'Mathematics',
  },
  {
    id: 8,
    text: 'Evaluate: integral of (4x^3 - 6x + 1) dx',
    options: ['A. x^4 - 3x^2 + x + c', 'B. 12x^2 - 6 + c', 'C. 4x^4 - 6x^2 + x + c', 'D. x^4 - 6x^2 + c'],
    subject: 'Mathematics',
  },
  {
    id: 9,
    text: 'A circle has equation x^2 + y^2 - 4x + 6y - 12 = 0. Find the radius.',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 7'],
    subject: 'Mathematics',
  },
  {
    id: 10,
    text: "In the sentence 'The committee has reached its decision', the word 'committee' is a:",
    options: ['A. Proper noun', 'B. Collective noun', 'C. Abstract noun', 'D. Common noun'],
    subject: 'English Language',
  },
  {
    id: 11,
    text: 'Choose the word that is closest in meaning to LOQUACIOUS.',
    options: ['A. Reserved', 'B. Taciturn', 'C. Talkative', 'D. Ambitious'],
    subject: 'English Language',
  },
  {
    id: 12,
    text: 'Select the option that best completes the sentence: The students _______ already left before the teacher arrived.',
    options: ['A. have', 'B. had', 'C. has', 'D. were'],
    subject: 'English Language',
  },
  {
    id: 13,
    text: "Identify the figure of speech in: 'The wind whispered through the trees'.",
    options: ['A. Simile', 'B. Metaphor', 'C. Personification', 'D. Hyperbole'],
    subject: 'English Language',
  },
  {
    id: 14,
    text: 'Choose the option nearest in meaning to EPHEMERAL.',
    options: ['A. Long-lasting', 'B. Short-lived', 'C. Everlasting', 'D. Seasonal'],
    subject: 'English Language',
  },
  {
    id: 15,
    text: 'A body of mass 5 kg moves with a velocity of 10 m/s. What is its kinetic energy?',
    options: ['A. 50 J', 'B. 100 J', 'C. 250 J', 'D. 500 J'],
    subject: 'Physics',
  },
  {
    id: 16,
    text: 'Which of the following is a scalar quantity?',
    options: ['A. Velocity', 'B. Acceleration', 'C. Force', 'D. Speed'],
    subject: 'Physics',
  },
  {
    id: 17,
    text: 'An object is thrown vertically upward with an initial velocity of 20 m/s. How long does it take to reach maximum height if g = 10 m/s^2?',
    options: ['A. 1 s', 'B. 2 s', 'C. 3 s', 'D. 4 s'],
    subject: 'Physics',
  },
  {
    id: 18,
    text: 'The frequency of a wave is 500 Hz and its wavelength is 0.6 m. What is the speed of the wave?',
    options: ['A. 200 m/s', 'B. 300 m/s', 'C. 400 m/s', 'D. 600 m/s'],
    subject: 'Physics',
  },
  {
    id: 19,
    text: 'Which law states that the pressure of a fixed mass of gas is inversely proportional to its volume at constant temperature?',
    options: ["A. Charles's Law", "B. Avogadro's Law", "C. Boyle's Law", "D. Gay-Lussac's Law"],
    subject: 'Physics',
  },
  {
    id: 20,
    text: 'What is the IUPAC name of CH3CH2OH?',
    options: ['A. Methanol', 'B. Propanol', 'C. Ethanol', 'D. Butanol'],
    subject: 'Chemistry',
  },
  {
    id: 21,
    text: 'Which of the following is a noble gas?',
    options: ['A. Chlorine', 'B. Nitrogen', 'C. Argon', 'D. Hydrogen'],
    subject: 'Chemistry',
  },
  {
    id: 22,
    text: 'Calculate the molar mass of CaCO3. Use Ca = 40, C = 12, O = 16.',
    options: ['A. 80 g/mol', 'B. 100 g/mol', 'C. 120 g/mol', 'D. 140 g/mol'],
    subject: 'Chemistry',
  },
  {
    id: 23,
    text: 'In the electrolysis of dilute H2SO4, which gas is produced at the cathode?',
    options: ['A. Oxygen', 'B. Sulphur dioxide', 'C. Hydrogen', 'D. Carbon dioxide'],
    subject: 'Chemistry',
  },
  {
    id: 24,
    text: 'Which type of bond is formed between sodium and chlorine in sodium chloride?',
    options: ['A. Covalent bond', 'B. Metallic bond', 'C. Ionic bond', 'D. Hydrogen bond'],
    subject: 'Chemistry',
  },
];

export const subjects: Subject[] = [
  { key: 'math', label: 'Mathematics', startIndex: 0, count: 10, color: '#3b6bff' },
  { key: 'english', label: 'English Language', startIndex: 10, count: 5, color: '#22d47e' },
  { key: 'physics', label: 'Physics', startIndex: 15, count: 5, color: '#f5a623' },
  { key: 'chemistry', label: 'Chemistry', startIndex: 20, count: 5, color: '#a855f7' },
];

export const initialAnswers: Array<number | null> = (() => {
  const answers = new Array<number | null>(questions.length).fill(null);
  answers[0] = 0;
  answers[1] = 1;
  answers[2] = 3;
  answers[3] = 2;
  answers[5] = 1;
  answers[10] = 1;
  answers[11] = 2;
  answers[15] = 2;
  answers[20] = 2;
  return answers;
})();

export const initialFlagged: boolean[] = (() => {
  const flagged = new Array<boolean>(questions.length).fill(false);
  flagged[2] = true;
  flagged[9] = true;
  flagged[13] = true;
  return flagged;
})();
