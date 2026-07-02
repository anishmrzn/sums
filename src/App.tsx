import { Routes, Route, Navigate } from 'react-router-dom';
import GatewayPage from './pages/GatewayPage';
import AcademiaPage from './pages/AcademiaPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GatewayPage />} />
      <Route path="/academia/*" element={<AcademiaPage />} />
      <Route path="/philosophy" element={<ComingSoonPage variant="philosophy" />} />
      <Route path="/industry" element={<ComingSoonPage variant="industry" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
