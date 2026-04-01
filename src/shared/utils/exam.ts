import type { Question, Subject } from '../types/app.types';

const subjectColors: Record<string, string> = {
  mathematics: '#3b6bff',
  englishlanguage: '#22d47e',
  physics: '#f5a623',
  chemistry: '#a855f7',
};

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export const buildSubjects = (questions: Question[]): Subject[] => {
  const order: string[] = [];
  const counts = new Map<string, number>();

  questions.forEach((question) => {
    const key = normalizeKey(question.subject);
    if (!counts.has(key)) {
      order.push(key);
      counts.set(key, 0);
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  let startIndex = 0;

  return order.map((key) => {
    const firstQuestion = questions.find((question) => normalizeKey(question.subject) === key);
    const label = firstQuestion?.subject ?? key;
    const count = counts.get(key) ?? 0;
    const subject: Subject = {
      key,
      label,
      startIndex,
      count,
      color: subjectColors[key] ?? '#59a1ff',
    };
    startIndex += count;
    return subject;
  });
};

export const calculateScore = (questions: Question[], answers: Array<number | null>) => {
  return questions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
};
