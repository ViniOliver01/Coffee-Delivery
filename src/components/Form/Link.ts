import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Link = styled.a`
  color: ${defaultTheme.purple};
  cursor: pointer;

  &:hover {
    background-color: ${defaultTheme["purple-light"]};
  }
`;
