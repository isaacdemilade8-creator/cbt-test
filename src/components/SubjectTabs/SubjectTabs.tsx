import type { CSSProperties } from 'react';
import type { SubjectTabsProps } from '../../types/exam.types';
import styles from './SubjectTabs.module.scss';

const SubjectTabs = ({ subjects, activeSubject, onSubjectChange }: SubjectTabsProps) => {
  return (
    <div className={styles.tabsBar}>
      {subjects.map((subject) => {
        const isActive = activeSubject === subject.key;
        const tabStyle = isActive
          ? ({ '--subj-color': subject.color } as CSSProperties)
          : undefined;

        return (
          <button
            key={subject.key}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onSubjectChange(subject)}
            style={tabStyle}
          >
            <span className={styles.dot} style={{ backgroundColor: subject.color }} />
            <span className={styles.label}>{subject.label}</span>
            <span className={styles.count}>{subject.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SubjectTabs;
