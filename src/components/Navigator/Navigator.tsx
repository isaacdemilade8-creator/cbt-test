import type { NavigatorProps } from '../../types/exam.types';
import styles from './Navigator.module.scss';

const legendItems = [
  { className: 'legendAnswered', label: 'Answered' },
  { className: 'legendFlagged', label: 'Flagged' },
  { className: 'legendCurrent', label: 'Current' },
  { className: 'legendUnvisited', label: 'Not visited' },
] as const;

const Navigator = ({
  subjects,
  answers,
  flagged,
  currentIndex,
  stats,
  onGoTo,
}: NavigatorProps) => {
  const getCellClassName = (index: number) => {
    if (index === currentIndex) return styles.current;
    if (flagged[index]) return styles.flaggedCell;
    if (answers[index] !== null) return styles.answered;
    return styles.unanswered;
  };

  return (
    <aside className={styles.navigator}>
      <div className={styles.navHeader}>
        <h3 className={styles.navTitle}>Question Navigator</h3>

        <div className={styles.progressSummary}>
          <div className={styles.progStat}>
            <span className={`${styles.progVal} ${styles.green}`}>{stats.answered}</span>
            <span className={styles.progLabel}>Answered</span>
          </div>
          <div className={styles.progStat}>
            <span className={`${styles.progVal} ${styles.amber}`}>{stats.flagged}</span>
            <span className={styles.progLabel}>Flagged</span>
          </div>
          <div className={styles.progStat}>
            <span className={`${styles.progVal} ${styles.muted}`}>{stats.unanswered}</span>
            <span className={styles.progLabel}>Remaining</span>
          </div>
        </div>

        <div className={styles.overallBar}>
          <div className={styles.overallFill} style={{ width: `${stats.percentComplete}%` }} />
        </div>
      </div>

      <div className={styles.legend}>
        {legendItems.map((item) => (
          <div key={item.label} className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles[item.className]}`} />
            {item.label}
          </div>
        ))}
      </div>

      <div className={styles.gridScroll}>
        {subjects.map((subject) => (
          <section key={subject.key} className={styles.gridSection}>
            <p className={styles.gridSectionTitle}>{subject.label}</p>

            <div className={styles.grid}>
              {Array.from({ length: subject.count }, (_, offset) => {
                const questionIndex = subject.startIndex + offset;

                return (
                  <button
                    key={questionIndex}
                    type="button"
                    className={`${styles.cell} ${getCellClassName(questionIndex)}`}
                    onClick={() => onGoTo(questionIndex)}
                  >
                    {questionIndex + 1}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
};

export default Navigator;
