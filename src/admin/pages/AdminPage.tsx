import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { appApi } from '../../shared/api/mockApi';
import type { ExamResult, Question, Student } from '../../shared/types/app.types';
import styles from './AdminPage.module.scss';

const emptyQuestionForm = {
  subject: 'Mathematics',
  text: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswer: '0',
};

const AdminPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [questionForm, setQuestionForm] = useState(emptyQuestionForm);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdminData = async () => {
    setIsLoading(true);
    const [nextStudents, nextQuestions, nextResults] = await Promise.all([
      appApi.getStudents(),
      appApi.getQuestions(),
      appApi.getResults(),
    ]);
    setStudents(nextStudents);
    setQuestions(nextQuestions);
    setResults(nextResults);
    setIsLoading(false);
  };

  useEffect(() => {
    void loadAdminData();
  }, []);

  const averageScore = useMemo(() => {
    if (!results.length) return 0;
    return Math.round(
      results.reduce((total, result) => total + result.percentage, 0) / results.length,
    );
  }, [results]);

  const handleStudentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await appApi.createStudent({
      studentId: studentId.trim(),
      name: studentName.trim(),
    });

    setStudentId('');
    setStudentName('');
    await loadAdminData();
  };

  const handleQuestionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await appApi.createQuestion({
      subject: questionForm.subject,
      text: questionForm.text.trim(),
      options: [
        questionForm.optionA.trim(),
        questionForm.optionB.trim(),
        questionForm.optionC.trim(),
        questionForm.optionD.trim(),
      ],
      correctAnswer: Number(questionForm.correctAnswer),
    });

    setQuestionForm(emptyQuestionForm);
    await loadAdminData();
  };

  const handleDeleteStudent = async (id: number) => {
    await appApi.deleteStudent(id);
    await loadAdminData();
  };

  const handleDeleteQuestion = async (id: number) => {
    await appApi.deleteQuestion(id);
    await loadAdminData();
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Admin workspace</span>
            <h1>Manage students, questions, and results</h1>
            <p>Student login uses registered student ID and full name. No password is required in this version.</p>
          </div>

          <Link className={styles.backLink} to="/login">
            Open student login
          </Link>
        </header>

        <section className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <span>Total students</span>
            <strong>{students.length}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Total questions</span>
            <strong>{questions.length}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Submitted results</span>
            <strong>{results.length}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Average score</span>
            <strong>{averageScore}%</strong>
          </article>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Register students</h2>
              <p>Create student records for exam login.</p>
            </div>

            <form className={styles.form} onSubmit={handleStudentSubmit}>
              <label className={styles.field}>
                <span>Student ID</span>
                <input
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  placeholder="STU-1003"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Full name</span>
                <input
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                  placeholder="New student"
                  required
                />
              </label>

              <button type="submit" className={styles.primaryAction}>
                Register student
              </button>
            </form>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>
                        <button type="button" onClick={() => void handleDeleteStudent(student.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Set questions</h2>
              <p>Add exam questions and specify the correct answer.</p>
            </div>

            <form className={styles.form} onSubmit={handleQuestionSubmit}>
              <label className={styles.field}>
                <span>Subject</span>
                <select
                  value={questionForm.subject}
                  onChange={(event) =>
                    setQuestionForm((current) => ({ ...current, subject: event.target.value }))
                  }
                >
                  <option>Mathematics</option>
                  <option>English Language</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </label>

              <label className={styles.field}>
                <span>Question</span>
                <textarea
                  value={questionForm.text}
                  onChange={(event) =>
                    setQuestionForm((current) => ({ ...current, text: event.target.value }))
                  }
                  rows={4}
                  required
                />
              </label>

              <div className={styles.optionGrid}>
                <label className={styles.field}>
                  <span>Option A</span>
                  <input
                    value={questionForm.optionA}
                    onChange={(event) =>
                      setQuestionForm((current) => ({ ...current, optionA: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Option B</span>
                  <input
                    value={questionForm.optionB}
                    onChange={(event) =>
                      setQuestionForm((current) => ({ ...current, optionB: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Option C</span>
                  <input
                    value={questionForm.optionC}
                    onChange={(event) =>
                      setQuestionForm((current) => ({ ...current, optionC: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Option D</span>
                  <input
                    value={questionForm.optionD}
                    onChange={(event) =>
                      setQuestionForm((current) => ({ ...current, optionD: event.target.value }))
                    }
                    required
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span>Correct option</span>
                <select
                  value={questionForm.correctAnswer}
                  onChange={(event) =>
                    setQuestionForm((current) => ({
                      ...current,
                      correctAnswer: event.target.value,
                    }))
                  }
                >
                  <option value="0">Option A</option>
                  <option value="1">Option B</option>
                  <option value="2">Option C</option>
                  <option value="3">Option D</option>
                </select>
              </label>

              <button type="submit" className={styles.primaryAction}>
                Add question
              </button>
            </form>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Question</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.subject}</td>
                      <td>{question.text}</td>
                      <td>
                        <button type="button" onClick={() => void handleDeleteQuestion(question.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Student scores</h2>
            <p>Review total scores from completed exams.</p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.studentName}</td>
                    <td>{result.studentId}</td>
                    <td>
                      {result.score}/{result.total}
                    </td>
                    <td>{result.percentage}%</td>
                    <td>{new Date(result.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!results.length && !isLoading ? (
              <div className={styles.emptyState}>No exam results have been submitted yet.</div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
