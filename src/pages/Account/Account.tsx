import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Container } from "./Account.styles";

import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

export default function Account() {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [button, setButton] = useState("MyAccount");
  const callback = (page: string | undefined) => {
    setButton(page);
  };

  return (
    <Container>
      <Sidebar onClick={callback} />

      <Outlet />
    </Container>
  );
}
