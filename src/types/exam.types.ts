export interface Question {
  id?: number;
  text: string;
  options: string[];
  subject: string;
}

export interface Subject {
  key: string;
  label: string;
  startIndex: number;
  count: number;
  color: string;
}

export interface ExamStats {
  answered: number;
  flagged: number;
  unanswered: number;
  percentComplete: number;
}

export type Answers = Array<number | null>;
export type Flagged = boolean[];

export interface TopBarProps {
  totalSeconds: number;
  totalDuration: number;
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
