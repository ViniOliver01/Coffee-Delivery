import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Input = styled.input`
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  height: 2.2rem;
  padding: 0.5rem;

  font-size: 1.125rem;
  color: ${defaultTheme["base-text"]};

  &:focus {
    outline: 2px solid ${defaultTheme.purple};
  }
`;
