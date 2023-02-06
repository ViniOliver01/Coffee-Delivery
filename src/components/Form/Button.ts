import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface ButtonProps {
  login?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.login ? defaultTheme.purple : defaultTheme["base-button"]};

  color: ${(props: ButtonProps) =>
    props.login ? defaultTheme.white : defaultTheme["base-text"]};
  border: none;
  width: 100%;
  padding: 0.625rem;
  border-radius: 6px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.25rem;
  }
`;
