export interface Question {
  id: number;
  text: string;
  options: string[];
  subject: string;
  correctAnswer: number;
}

export interface Subject {
  key: string;
  label: string;
  startIndex: number;
  count: number;
  color: string;
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  registeredAt: string;
}

export interface ExamResult {
  id: number;
  studentId: string;
  studentName: string;
  score: number;
  total: number;
  percentage: number;
  submittedAt: string;
  answers: Array<number | null>;
}

export interface AppDatabase {
  students: Student[];
  questions: Question[];
  results: ExamResult[];
}

export interface ExamStats {
  answered: number;
  flagged: number;
  unanswered: number;
  percentComplete: number;
}

export type Answers = Array<number | null>;
export type Flagged = boolean[];

export interface StudentSession {
  studentId: string;
  name: string;
}

export interface TopBarProps {
  totalSeconds: number;
  totalDuration: number;
  studentName: string;
  studentId: string;
  onSubmitClick: () => void;
}

export interface QuestionPanelProps {
  questions: Question[];
  subjects: Subject[];
  currentIndex: number;
  activeSubjectKey: string;
  answers: Answers;
  flagged: Flagged;
  onSubjectChange: (subject: Subject) => void;
  onAnswer: (optionIndex: number) => void;
  onClearAnswer: () => void;
  onToggleFlag: () => void;
  onNavigate: (index: number) => void;
}

export interface NavigatorProps {
  subjects: Subject[];
  answers: Answers;
  flagged: Flagged;
  currentIndex: number;
  stats: ExamStats;
  onGoTo: (index: number) => void;
}

export interface SubjectTabsProps {
  subjects: Subject[];
  activeSubject: string;
  onSubjectChange: (subject: Subject) => void;
}

export interface SubmitModalProps {
  isOpen: boolean;
  stats: ExamStats;
  onCancel: () => void;
  onConfirm: () => void;
}
