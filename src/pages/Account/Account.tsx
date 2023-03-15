import { useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Container } from "./Account.styles";
import Sidebar from "./Components/Sidebar";

export default function Account() {
  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Container>
      {!isMobile && <Sidebar />}
      <Outlet />
    </Container>
  );
}
