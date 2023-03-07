import { Outlet } from "react-router-dom";
import { Container } from "./Account.styles";
import Sidebar from "./Components/Sidebar";

export default function Account() {
  return (
    <Container>
      <Sidebar />
      <Outlet />
    </Container>
  );
}
