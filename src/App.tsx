import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GatewayPage from './pages/GatewayPage';

// Lazy-loaded so the heavy three.js/react-three-fiber scene bundle only
// downloads when a visitor actually navigates to the academia route.
const AcademiaPage = lazy(() => import('./pages/AcademiaPage'));
const ComingSoonPage = lazy(() =>
  import('./pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage }))
);

const RouteFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#040507]">
    <div className="w-10 h-10 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<GatewayPage />} />
      <Route
        path="/academia/*"
        element={
          <Suspense fallback={<RouteFallback />}>
            <AcademiaPage />
          </Suspense>
        }
      />
      <Route
        path="/philosophy"
        element={
          <Suspense fallback={<RouteFallback />}>
            <ComingSoonPage variant="philosophy" />
          </Suspense>
        }
      />
      <Route
        path="/industry"
        element={
          <Suspense fallback={<RouteFallback />}>
            <ComingSoonPage variant="industry" />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
