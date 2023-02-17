import { ReactNode } from "react";
import { Container, Line } from "./styles";

interface DividerProps {
  children?: ReactNode;
}

export default function Divider({ children }: DividerProps) {
  return (
    <>
      <Container>
        <Line />
        {children && <p>{children}</p>}

        <Line />
      </Container>
    </>
  );
}
