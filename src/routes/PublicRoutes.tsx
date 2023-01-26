import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SingUp from "../pages/SingUp/SingUp";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="singup" element={<SingUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
