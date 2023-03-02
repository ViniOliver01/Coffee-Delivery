import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SendEmailResetPassword from "../pages/ResetPassword/SendEmailResetPassword";
import SingUp from "../pages/SingUp/SingUp";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="singup" element={<SingUp />} />
      <Route path="resetpassword/:reset_token" element={<ResetPassword />} />
      <Route path="resetpassword" element={<SendEmailResetPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
