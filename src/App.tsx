import { useCallback, useEffect, useMemo, useState } from 'react';
import Navigator from './components/Navigator/Navigator';
import QuestionPanel from './components/QuestionPanel/QuestionPanel';
import SubmitModal from './components/SubmitModal/SubmitModal';
import TopBar from './components/TopBar/TopBar';
import { initialAnswers, initialFlagged, questions, subjects } from './data/questions';
import type { Answers, ExamStats, Flagged, Subject } from './types/exam.types';
import styles from './App.module.scss';

const TOTAL_DURATION = 90 * 60;
const INITIAL_SECONDS = 5324;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(6);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [flagged, setFlagged] = useState<Flagged>(initialFlagged);
  const [totalSeconds, setTotalSeconds] = useState(INITIAL_SECONDS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeSubjectKey = useMemo(() => {
    const activeSubject = subjects.find(
      (subject) =>
        currentIndex >= subject.startIndex &&
        currentIndex < subject.startIndex + subject.count,
    );

    return activeSubject?.key ?? subjects[0].key;
  }, [currentIndex]);

  const stats = useMemo<ExamStats>(() => {
    const answered = answers.filter((answer) => answer !== null).length;
    const flaggedCount = flagged.filter(Boolean).length;
    const unanswered = questions.length - answered;
    const percentComplete = Math.round((answered / questions.length) * 100);

    return { answered, flagged: flaggedCount, unanswered, percentComplete };
  }, [answers, flagged]);

  const handleNavigate = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      setAnswers((currentAnswers) => {
        const nextAnswers = [...currentAnswers];
        nextAnswers[currentIndex] = optionIndex;
        return nextAnswers;
      });
    },
    [currentIndex],
  );

  const handleClearAnswer = useCallback(() => {
    setAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers];
      nextAnswers[currentIndex] = null;
      return nextAnswers;
    });
  }, [currentIndex]);

  const handleToggleFlag = useCallback(() => {
    setFlagged((currentFlags) => {
      const nextFlags = [...currentFlags];
      nextFlags[currentIndex] = !nextFlags[currentIndex];
      return nextFlags;
    });
  }, [currentIndex]);

  const handleSubjectChange = useCallback((subject: Subject) => {
    setCurrentIndex(subject.startIndex);
  }, []);

  const handleSubmit = useCallback(() => {
    setIsModalOpen(false);
    alert('Exam submitted. Redirecting to results page...');
  }, []);

  useEffect(() => {
    if (totalSeconds <= 0) {
      handleSubmit();
      return;
    }

    const timerId = setTimeout(() => setTotalSeconds((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timerId);
  }, [totalSeconds, handleSubmit]);

  return (
    <div className={styles.appShell}>
      <TopBar
        totalSeconds={totalSeconds}
        totalDuration={TOTAL_DURATION}
        onSubmitClick={() => setIsModalOpen(true)}
      />

      <div className={styles.mainContainer}>
        <div className={styles.examBody}>
          <QuestionPanel
            questions={questions}
            subjects={subjects}
            currentIndex={currentIndex}
            activeSubjectKey={activeSubjectKey}
            answers={answers}
            flagged={flagged}
            onSubjectChange={handleSubjectChange}
            onAnswer={handleAnswer}
            onClearAnswer={handleClearAnswer}
            onToggleFlag={handleToggleFlag}
            onNavigate={handleNavigate}
          />

          <Navigator
            subjects={subjects}
            answers={answers}
            flagged={flagged}
            currentIndex={currentIndex}
            stats={stats}
            onGoTo={handleNavigate}
          />
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        stats={stats}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default App;
