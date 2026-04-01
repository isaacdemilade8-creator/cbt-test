import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appApi, studentSessionStore } from '../../shared/api/mockApi';
import { buildSubjects, calculateScore } from '../../shared/utils/exam';
import type { Answers, ExamStats, Flagged, Question, Subject } from '../../shared/types/app.types';
import Navigator from '../components/Navigator/Navigator';
import QuestionPanel from '../components/QuestionPanel/QuestionPanel';
import SubmitModal from '../components/SubmitModal/SubmitModal';
import TopBar from '../components/TopBar/TopBar';
import styles from './ExamPage.module.scss';

const TOTAL_DURATION = 90 * 60;

const ExamPage = () => {
  const navigate = useNavigate();
  const session = studentSessionStore.get();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);
  const [flagged, setFlagged] = useState<Flagged>([]);
  const [totalSeconds, setTotalSeconds] = useState(TOTAL_DURATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const subjects = useMemo(() => buildSubjects(questions), [questions]);

  const activeSubjectKey = useMemo(() => {
    const activeSubject = subjects.find(
      (subject) =>
        currentIndex >= subject.startIndex &&
        currentIndex < subject.startIndex + subject.count,
    );

    return activeSubject?.key ?? subjects[0]?.key ?? '';
  }, [currentIndex, subjects]);

  const stats = useMemo<ExamStats>(() => {
    const answered = answers.filter((answer) => answer !== null).length;
    const flaggedCount = flagged.filter(Boolean).length;
    const unanswered = questions.length - answered;
    const percentComplete = questions.length
      ? Math.round((answered / questions.length) * 100)
      : 0;

    return { answered, flagged: flaggedCount, unanswered, percentComplete };
  }, [answers, flagged, questions.length]);

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true });
      return;
    }

    const loadQuestions = async () => {
      const nextQuestions = await appApi.getQuestions();
      setQuestions(nextQuestions);
      setAnswers(new Array(nextQuestions.length).fill(null));
      setFlagged(new Array(nextQuestions.length).fill(false));
      setCurrentIndex(0);
      setIsLoading(false);
    };

    void loadQuestions();
  }, [navigate, session]);

  const handleSubmit = useCallback(async () => {
    if (!session || questions.length === 0) {
      return;
    }

    const score = calculateScore(questions, answers);
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    await appApi.createResult({
      studentId: session.studentId,
      studentName: session.name,
      score,
      total,
      percentage,
      answers,
    });

    studentSessionStore.clear();
    setIsModalOpen(false);
    window.alert(`Exam submitted successfully. Your score is ${score}/${total}.`);
    navigate('/login', { replace: true });
  }, [answers, navigate, questions, session]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }

    if (totalSeconds <= 0) {
      void handleSubmit();
      return;
    }

    const timerId = setTimeout(() => setTotalSeconds((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timerId);
  }, [handleSubmit, questions.length, totalSeconds]);

  const handleNavigate = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
      }
    },
    [questions.length],
  );

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

  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingCard}>
          <h1>Preparing exam workspace</h1>
          <p>Loading your registered questions and exam profile.</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingCard}>
          <h1>No questions available</h1>
          <p>The admin has not published any questions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appShell}>
      <TopBar
        totalSeconds={totalSeconds}
        totalDuration={TOTAL_DURATION}
        studentName={session.name}
        studentId={session.studentId}
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
        onConfirm={() => void handleSubmit()}
      />
    </div>
  );
};

export default ExamPage;
