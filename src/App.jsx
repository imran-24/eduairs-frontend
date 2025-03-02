import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";
import HomePage from "./page";
import DashboardPage from "./dashboard/page";
import { useAuth } from "../hooks/use-auth";
import Spiner from "./components/spiner";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spiner />; // Show a loading indicator while checking auth

  return (
    <Router>
      <Routes>
        {/* Redirect authenticated users to /dashboard */}
        {isAuthenticated ? <Route path="/" element={<Navigate to="/dashboard" />} /> : null}

        {/* Public routes (accessible only if NOT authenticated) */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Private route (redirects to login if not authenticated) */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
