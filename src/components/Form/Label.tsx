import { ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

const LabelText = styled.label`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${defaultTheme["base-title"]};

  span {
    font-size: 0.875rem;
    font-weight: 500;
    font-style: italic;
    color: ${defaultTheme["base-label"]};
  }
`;

interface LabelProps {
  children: ReactNode;
  opcional?: boolean;
}

export default function Label({ children, opcional = false }: LabelProps) {
  return (
    <LabelText>
      {children}
      {opcional && <span> - Opcional</span>}
    </LabelText>
  );
}
