import { seedDatabase } from '../data/seed';
import type { AppDatabase, ExamResult, Question, Student, StudentSession } from '../types/app.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';
const STORAGE_KEY = 'cbt-app-db';
const SESSION_KEY = 'cbt-student-session';

const cloneDb = (db: AppDatabase): AppDatabase => JSON.parse(JSON.stringify(db));

const readLocalDb = (): AppDatabase => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDatabase));
    return cloneDb(seedDatabase);
  }

  try {
    return JSON.parse(stored) as AppDatabase;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDatabase));
    return cloneDb(seedDatabase);
  }
};

const writeLocalDb = (db: AppDatabase) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const getNextId = (items: Array<{ id: number }>) => {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
};

export const studentSessionStore = {
  get() {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as StudentSession;
    } catch {
      return null;
    }
  },
  set(session: StudentSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
};

export const appApi = {
  async getStudents() {
    try {
      return await fetchJson<Student[]>('/students');
    } catch {
      return readLocalDb().students;
    }
  },

  async createStudent(student: Omit<Student, 'id' | 'registeredAt'>) {
    const payload = {
      ...student,
      registeredAt: new Date().toISOString(),
    };

    try {
      return await fetchJson<Student>('/students', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const db = readLocalDb();
      const createdStudent: Student = {
        id: getNextId(db.students),
        ...payload,
      };
      db.students.push(createdStudent);
      writeLocalDb(db);
      return createdStudent;
    }
  },

  async deleteStudent(id: number) {
    try {
      await fetchJson<void>(`/students/${id}`, { method: 'DELETE' });
      return;
    } catch {
      const db = readLocalDb();
      db.students = db.students.filter((student) => student.id !== id);
      writeLocalDb(db);
    }
  },

  async findStudentByCredentials(studentId: string, name: string) {
    const students = await appApi.getStudents();
    const normalizedName = name.trim().toLowerCase();
    const normalizedStudentId = studentId.trim().toLowerCase();

    return (
      students.find(
        (student) =>
          student.studentId.trim().toLowerCase() === normalizedStudentId &&
          student.name.trim().toLowerCase() === normalizedName,
      ) ?? null
    );
  },

  async getQuestions() {
    try {
      return await fetchJson<Question[]>('/questions');
    } catch {
      return readLocalDb().questions;
    }
  },

  async createQuestion(question: Omit<Question, 'id'>) {
    try {
      return await fetchJson<Question>('/questions', {
        method: 'POST',
        body: JSON.stringify(question),
      });
    } catch {
      const db = readLocalDb();
      const createdQuestion: Question = {
        id: getNextId(db.questions),
        ...question,
      };
      db.questions.push(createdQuestion);
      writeLocalDb(db);
      return createdQuestion;
    }
  },

  async deleteQuestion(id: number) {
    try {
      await fetchJson<void>(`/questions/${id}`, { method: 'DELETE' });
      return;
    } catch {
      const db = readLocalDb();
      db.questions = db.questions.filter((question) => question.id !== id);
      writeLocalDb(db);
    }
  },

  async getResults() {
    try {
      return await fetchJson<ExamResult[]>('/results?_sort=submittedAt&_order=desc');
    } catch {
      return readLocalDb().results.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    }
  },

  async createResult(result: Omit<ExamResult, 'id' | 'submittedAt'>) {
    const payload = {
      ...result,
      submittedAt: new Date().toISOString(),
    };

    try {
      return await fetchJson<ExamResult>('/results', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const db = readLocalDb();
      const createdResult: ExamResult = {
        id: getNextId(db.results),
        ...payload,
      };
      db.results.unshift(createdResult);
      writeLocalDb(db);
      return createdResult;
    }
  },
};
