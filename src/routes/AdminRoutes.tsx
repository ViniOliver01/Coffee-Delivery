import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import { PrivateRoutes } from "./PrivateRoutes";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route path="/*" element={<PrivateRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
