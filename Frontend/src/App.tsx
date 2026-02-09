import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FileComplaintPage from './pages/FileComplaintPage';
import HomePage from './pages/HomePage';
import TrackComplaintPage from './pages/TrackComplaintPage';

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/file-complaint" element={<FileComplaintPage />} />
          <Route path="/track-complaint" element={<TrackComplaintPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
