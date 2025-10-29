import { useMemo, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import InvoicesPage from "./pages/InvoicesPage";
import PaymentsPage from "./pages/PaymentsPage";
import SupportPage from "./pages/SupportPage";
import LayoutShell from "./components/layout/LayoutShell";
import LoginPage from "./pages/LoginPage";

const AUTH_STORAGE_KEY = "aurora-customer-email";

const App = () => {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(AUTH_STORAGE_KEY);
  });
  const isAuthenticated = useMemo(() => Boolean(userEmail), [userEmail]);

  const handleLogin = (email: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, email);
    }
    setUserEmail(email);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setUserEmail(null);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        element={
          <ProtectedLayout
            isAuthenticated={isAuthenticated}
            userEmail={userEmail ?? undefined}
            onLogout={handleLogout}
          />
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/documents" element={<InvoicesPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

type ProtectedLayoutProps = {
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => void;
};

const ProtectedLayout = ({ isAuthenticated, userEmail, onLogout }: ProtectedLayoutProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <LayoutShell userEmail={userEmail} onLogout={onLogout}>
      <Outlet />
    </LayoutShell>
  );
};
