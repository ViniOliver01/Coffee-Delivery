import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/Account/Account";
import Address from "../pages/Account/pages/Address";
import ChangePassword from "../pages/Account/pages/ChangePassword";
import MyAccount from "../pages/Account/pages/MyAccount";
import Purchases from "../pages/Account/pages/Purchases";
import { Checkout } from "../pages/Checkout/Checkout";
import { Success } from "../pages/Success/Success";

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="account" element={<Account />}>
        <Route path="/account" element={<MyAccount />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="address" element={<Address />} />
        <Route path="purchases" element={<Purchases />} />
      </Route>
      <Route path="checkout" element={<Checkout />} />
      <Route path="success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
