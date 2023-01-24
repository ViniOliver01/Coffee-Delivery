import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const AvatarImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
`;

export const AvatarLogo = styled.div`
  width: 48px;
  height: 48px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${defaultTheme["base-card"]};
`;
