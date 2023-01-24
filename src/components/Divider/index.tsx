import { ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

interface DividerProps {
  children: ReactNode;
}

export default function Divider({ children }: DividerProps) {
  const Line = styled.div`
    background-color: ${defaultTheme["base-hover"]};
    height: 2px;
    width: 100%;
    margin-block: auto;
  `;

  const Container = styled.div`
    display: flex;
    width: 100%;
    gap: 0.2rem;
  `;

  return (
    <>
      <Container>
        <Line />
        <p>{children}</p>
        <Line />
      </Container>
    </>
  );
}
