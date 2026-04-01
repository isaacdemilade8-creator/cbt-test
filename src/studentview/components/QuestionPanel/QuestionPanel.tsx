import type { QuestionPanelProps } from '../../../shared/types/app.types';
import SubjectTabs from '../SubjectTabs/SubjectTabs';
import styles from './QuestionPanel.module.scss';

const optionKeys = ['A', 'B', 'C', 'D'] as const;

const QuestionPanel = ({
  questions,
  subjects,
  currentIndex,
  activeSubjectKey,
  answers,
  flagged,
  onSubjectChange,
  onAnswer,
  onClearAnswer,
  onToggleFlag,
  onNavigate,
}: QuestionPanelProps) => {
  const question = questions[currentIndex];
  const questionNumber = currentIndex + 1;
  const totalQuestions = questions.length;
  const selectedAnswer = answers[currentIndex];
  const isFlagged = flagged[currentIndex];
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className={styles.panel}>
      <SubjectTabs
        subjects={subjects}
        activeSubject={activeSubjectKey}
        onSubjectChange={onSubjectChange}
      />

      <div className={styles.qMeta}>
        <span className={styles.qNumberBadge}>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={styles.qSubjectTag}>{question.subject}</span>
        <button
          type="button"
          className={`${styles.flagBtn} ${isFlagged ? styles.flagged : ''}`}
          onClick={onToggleFlag}
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          {isFlagged ? 'Flagged' : 'Flag for review'}
        </button>
      </div>

      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <div>
            <p className={styles.progressEyebrow}>Exam progress</p>
            <h2 className={styles.progressTitle}>{progressPercent}% covered</h2>
          </div>
          <p className={styles.progressCopy}>Answer carefully and keep moving through the paper.</p>
        </div>

        <div className={styles.progressTrack}>
          <span className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className={styles.questionContent}>
        <div className={styles.questionCard}>
          <p className={styles.questionEyebrow}>Current prompt</p>
          <p className={styles.questionText}>{question.text}</p>
          <p className={styles.instruction}>Choose the most correct answer from the options below.</p>
        </div>

        <ul className={styles.optionsList}>
          {question.options.map((option, index) => (
            <li
              key={`${question.id}-${index}`}
              className={`${styles.option} ${selectedAnswer === index ? styles.selected : ''}`}
              onClick={() => onAnswer(index)}
            >
              <div className={styles.optionMain}>
                <span className={styles.optionKey}>{optionKeys[index]}</span>
                <span className={styles.optionText}>{option}</span>
              </div>
              <span className={styles.optionIndicator} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.navButtons}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.secondaryBtn}`}
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.ghostBtn}`}
          onClick={onClearAnswer}
          disabled={selectedAnswer === null}
        >
          Clear Answer
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.primaryBtn}`}
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={currentIndex === totalQuestions - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
