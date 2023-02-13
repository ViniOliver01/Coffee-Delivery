import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const TextArea = styled.textarea`
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;

  font-size: 1.125rem;
  color: ${defaultTheme["base-text"]};

  &:focus {
    outline: 2px solid ${defaultTheme.purple};
  }
`;
