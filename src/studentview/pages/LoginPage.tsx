import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appApi, studentSessionStore } from '../../shared/api/mockApi';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const student = await appApi.findStudentByCredentials(studentId, name);

    if (!student) {
      setError('No student record matched that student ID and name. Check with the admin.');
      setIsSubmitting(false);
      return;
    }

    studentSessionStore.set({
      studentId: student.studentId,
      name: student.name,
    });

    navigate('/exam');
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroCard}>
        <div className={styles.copyBlock}>
          <span className={styles.eyebrow}>Student access</span>
          <h1 className={styles.title}>Sign in to your exam session</h1>
          <p className={styles.description}>
            Use the student ID and exact full name registered by the admin to start your exam.
          </p>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Student ID</span>
            <input
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="e.g. STU-1001"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Adaeze Okonkwo"
              required
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.primaryAction} disabled={isSubmitting}>
            {isSubmitting ? 'Checking record...' : 'Start exam'}
          </button>

          <Link className={styles.secondaryLink} to="/admin">
            Go to admin workspace
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
