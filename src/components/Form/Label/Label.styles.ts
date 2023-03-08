import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const LabelText = styled.label`
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
