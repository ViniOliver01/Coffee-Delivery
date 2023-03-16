import { useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Container } from "./Account.styles";
import Sidebar from "./Components/Sidebar";

export default function Account() {
  const [isDesktop] = useMediaQuery("(min-width: 701px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Container>
      {isDesktop && <Sidebar />}
      <Outlet />
    </Container>
  );
}
