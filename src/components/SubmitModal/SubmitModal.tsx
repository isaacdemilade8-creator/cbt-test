import type { MouseEvent } from 'react';
import type { SubmitModalProps } from '../../types/exam.types';
import styles from './SubmitModal.module.scss';

const SubmitModal = ({ isOpen, stats, onCancel, onConfirm }: SubmitModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.icon}>!</div>
        <h2 className={styles.title}>Submit your exam?</h2>
        <p className={styles.description}>
          Once submitted, you cannot return to answer or change any question.
          Review your progress before you continue.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={`${styles.statVal} ${styles.green}`}>{stats.answered}</span>
            <span className={styles.statLabel}>Answered</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statVal} ${styles.amber}`}>{stats.flagged}</span>
            <span className={styles.statLabel}>Flagged</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statVal} ${styles.red}`}>{stats.unanswered}</span>
            <span className={styles.statLabel}>Unanswered</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
            Continue exam
          </button>
          <button type="button" className={`${styles.btn} ${styles.confirm}`} onClick={onConfirm}>
            Submit now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
