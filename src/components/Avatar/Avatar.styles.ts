import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const AvatarInfo = styled.div`
  a {
    cursor: pointer;

    &:hover {
      background-color: ${defaultTheme["purple-light"]};
      text-decoration: underline;
    }
  }
`;
