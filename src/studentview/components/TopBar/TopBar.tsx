import { useEffect, useRef } from 'react';
import type { TopBarProps } from '../../../shared/types/app.types';
import styles from './TopBar.module.scss';

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
};

const TopBar = ({
  totalSeconds,
  totalDuration,
  studentName,
  studentId,
  onSubmitClick,
}: TopBarProps) => {
  const ringRef = useRef<SVGCircleElement>(null);
  const fraction = totalSeconds / totalDuration;
  const timerClass =
    fraction < 0.1 ? styles.danger : fraction < 0.25 ? styles.warning : styles.normal;
  const ringColor = fraction < 0.1 ? '#ff4d4d' : fraction < 0.25 ? '#f5a623' : '#22d47e';

  useEffect(() => {
    if (!ringRef.current) {
      return;
    }

    ringRef.current.style.strokeDashoffset = String(100 - fraction * 100);
    ringRef.current.style.stroke = ringColor;
  }, [fraction, ringColor]);

  const initials = studentName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <header className={styles.topbar}>
      <div className={styles.brandCluster}>
        <div className={styles.logoMark}>
          <div className={styles.logoIcon}>E</div>
          <div className={styles.logoCopy}>
            <span className={styles.logoText}>ExamPro</span>
            <span className={styles.logoSubtext}>Computer-Based Testing Suite</span>
          </div>
        </div>

        <div className={styles.examInfo}>
          <div className={styles.examMetaRow}>
            <span className={styles.liveBadge}>Live Session</span>
            <span className={styles.examMeta}>Registered student exam</span>
          </div>
          <p className={styles.examTitle}>Practice examination workspace</p>
          <p className={styles.examSubtitle}>Student ID: {studentId}</p>
        </div>
      </div>

      <div className={styles.actionsCluster}>
        <div className={styles.timerWrap}>
          <div className={styles.timerIntro}>
            <span className={styles.timerLabel}>Time left</span>
            <span className={styles.timerHint}>Auto-submit at 00:00:00</span>
          </div>
          <div className={styles.timerCard}>
            <svg className={styles.timerRing} viewBox="0 0 36 36">
              <circle className={styles.track} cx="18" cy="18" r="15.9" />
              <circle ref={ringRef} className={styles.progress} cx="18" cy="18" r="15.9" />
            </svg>
            <span className={`${styles.timer} ${timerClass}`}>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        <div className={styles.candidatePill}>
          <div className={styles.avatar}>{initials || 'ST'}</div>
          <div className={styles.candidateInfo}>
            <span className={styles.candidateLabel}>Candidate</span>
            <span className={styles.candidateName}>{studentName}</span>
          </div>
        </div>

        <button type="button" className={styles.submitBtn} onClick={onSubmitClick}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Submit Exam
        </button>
      </div>
    </header>
  );
};

export default TopBar;
