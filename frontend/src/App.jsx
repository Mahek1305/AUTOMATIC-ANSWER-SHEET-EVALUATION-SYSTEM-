import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import UploadAnswersPage from "./pages/UploadAnswersPage.jsx";
import EvaluationResultsPage from "./pages/EvaluationResultsPage.jsx";
import NewLoginPage from "./pages/NewLoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { EvaluationProvider } from "./context/EvaluationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect, useRef } from "react";

function App() {
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent React Strict Mode from running this twice in development
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch('/api/wakeup').catch(err => console.error(err));
  }, []);
  return (
    <AuthProvider>
      <EvaluationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<NewLoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute><UploadPage /></ProtectedRoute>
            } />
            <Route path="/review" element={
              <ProtectedRoute><ReviewPage /></ProtectedRoute>
            } />
            <Route path="/evaluation/upload" element={
              <ProtectedRoute><UploadAnswersPage /></ProtectedRoute>
            } />
            <Route path="/evaluation/results" element={
              <ProtectedRoute><EvaluationResultsPage /></ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </EvaluationProvider>
    </AuthProvider>
  );
}

export default App;
