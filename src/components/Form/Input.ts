import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface InputProps {
  error?: boolean;
}

export const Input = styled.input`
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid
    ${({ error }: InputProps) => (error ? defaultTheme.red : defaultTheme.purple)};
  border-radius: 6px;
  height: 2.2rem;
  padding: 0.5rem;
  width: 100%;

  font-size: 1.125rem;
  color: ${defaultTheme["base-text"]};

  &:focus {
    border: 2px solid ${defaultTheme.purple};
    outline: 2px solid
      ${({ error }: InputProps) => (error ? defaultTheme.purple : defaultTheme.purple)};
  }
`;
