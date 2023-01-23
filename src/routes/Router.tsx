import { Route, Routes } from "react-router-dom";
import SingUp from "../pages/SingUp/SingUp";
import { DefaultLayout } from "./../components/DefaultLayout/DefaultLayout";
import { Checkout } from "./../pages/Checkout/Checkout";
import { Home } from "./../pages/Home/Home";
import Login from "./../pages/Login/Login";
import { Success } from "./../pages/Success/Success";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
}
