import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/Account/Account";
import { Checkout } from "../pages/Checkout/Checkout";
import { Success } from "../pages/Success/Success";

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="account" element={<Account />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
