import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./auth-pages/register-page/RegisterPage";
import LoginPage from "./auth-pages/login-page/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
        </Routes>
      </BrowserRouter>
      <AlertNotification />
    </>
  );
}
export default App;
