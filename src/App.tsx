import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import InvoicesPage from "./pages/InvoicesPage";
import PaymentsPage from "./pages/PaymentsPage";
import SupportPage from "./pages/SupportPage";
import LayoutShell from "./components/layout/LayoutShell";

const App = () => (
  <LayoutShell>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/documents" element={<InvoicesPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  </LayoutShell>
);

export default App;
