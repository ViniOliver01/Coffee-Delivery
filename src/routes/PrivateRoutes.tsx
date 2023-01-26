import { Navigate, Route, Routes } from "react-router-dom";
import { Checkout } from "../pages/Checkout/Checkout";
import { Success } from "../pages/Success/Success";

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="checkout" element={<Checkout />} />
      <Route path="success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
