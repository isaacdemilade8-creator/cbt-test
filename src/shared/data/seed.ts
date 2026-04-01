import type { AppDatabase, Question } from '../types/app.types';

const seedQuestions: Question[] = [
  {
    id: 1,
    text: 'If 2x + 3y = 12 and x - y = 1, find the value of x + y.',
    options: ['5', '4', '3', '7'],
    subject: 'Mathematics',
    correctAnswer: 2,
  },
  {
    id: 2,
    text: 'Simplify: log10 8 + log10 125 - log10 10.',
    options: ['1', '2', '3', '0'],
    subject: 'Mathematics',
    correctAnswer: 0,
  },
  {
    id: 3,
    text: 'A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of picking a ball that is not red?',
    options: ['1/2', '3/10', '1/5', '1/2'],
    subject: 'Mathematics',
    correctAnswer: 0,
  },
  {
    id: 4,
    text: 'What is the gradient of the line passing through the points (2, 3) and (5, 9)?',
    options: ['1', '2', '3', '4'],
    subject: 'Mathematics',
    correctAnswer: 1,
  },
  {
    id: 5,
    text: "In the sentence 'The committee has reached its decision', the word 'committee' is a:",
    options: ['Proper noun', 'Collective noun', 'Abstract noun', 'Common noun'],
    subject: 'English Language',
    correctAnswer: 1,
  },
  {
    id: 6,
    text: 'Choose the word that is closest in meaning to LOQUACIOUS.',
    options: ['Reserved', 'Taciturn', 'Talkative', 'Ambitious'],
    subject: 'English Language',
    correctAnswer: 2,
  },
  {
    id: 7,
    text: 'Select the option that best completes the sentence: The students ______ already left before the teacher arrived.',
    options: ['have', 'had', 'has', 'were'],
    subject: 'English Language',
    correctAnswer: 1,
  },
  {
    id: 8,
    text: 'A body of mass 5 kg moves with a velocity of 10 m/s. What is its kinetic energy?',
    options: ['50 J', '100 J', '250 J', '500 J'],
    subject: 'Physics',
    correctAnswer: 2,
  },
  {
    id: 9,
    text: 'Which of the following is a scalar quantity?',
    options: ['Velocity', 'Acceleration', 'Force', 'Speed'],
    subject: 'Physics',
    correctAnswer: 3,
  },
  {
    id: 10,
    text: 'The frequency of a wave is 500 Hz and its wavelength is 0.6 m. What is the speed of the wave?',
    options: ['200 m/s', '300 m/s', '400 m/s', '600 m/s'],
    subject: 'Physics',
    correctAnswer: 1,
  },
  {
    id: 11,
    text: 'What is the IUPAC name of CH3CH2OH?',
    options: ['Methanol', 'Propanol', 'Ethanol', 'Butanol'],
    subject: 'Chemistry',
    correctAnswer: 2,
  },
  {
    id: 12,
    text: 'Which of the following is a noble gas?',
    options: ['Chlorine', 'Nitrogen', 'Argon', 'Hydrogen'],
    subject: 'Chemistry',
    correctAnswer: 2,
  },
  {
    id: 13,
    text: 'Calculate the molar mass of CaCO3. Use Ca = 40, C = 12, O = 16.',
    options: ['80 g/mol', '100 g/mol', '120 g/mol', '140 g/mol'],
    subject: 'Chemistry',
    correctAnswer: 1,
  },
];

export const seedDatabase: AppDatabase = {
  students: [
    {
      id: 1,
      studentId: 'STU-1001',
      name: 'Adaeze Okonkwo',
      registeredAt: '2026-04-01T08:00:00.000Z',
    },
    {
      id: 2,
      studentId: 'STU-1002',
      name: 'Daniel Yusuf',
      registeredAt: '2026-04-01T08:10:00.000Z',
    },
  ],
  questions: seedQuestions,
  results: [
    {
      id: 1,
      studentId: 'STU-1002',
      studentName: 'Daniel Yusuf',
      score: 9,
      total: 13,
      percentage: 69,
      submittedAt: '2026-04-01T10:30:00.000Z',
      answers: [2, 0, 0, 1, 1, 2, 1, 2, 3, 1, 2, 2, 1],
    },
  ],
};
