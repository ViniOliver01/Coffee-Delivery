import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Line = styled.div`
  background-color: ${defaultTheme["base-hover"]};
  height: 2px;
  width: 100%;
  margin-block: auto;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  p {
    padding-inline: 0.2rem;
  }
`;
