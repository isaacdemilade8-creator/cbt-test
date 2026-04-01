import { Navigate, Route, Routes } from 'react-router-dom';
import { studentSessionStore } from './shared/api/mockApi';
import AdminPage from './admin/pages/AdminPage';
import ExamPage from './studentview/pages/ExamPage';
import LoginPage from './studentview/pages/LoginPage';

const ProtectedExamRoute = () => {
  const session = studentSessionStore.get();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <ExamPage />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/exam" element={<ProtectedExamRoute />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
