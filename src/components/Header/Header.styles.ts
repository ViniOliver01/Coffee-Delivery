import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-block: 2rem;
  height: 10vh;
  gap: 2rem;
`;

export const LogoArea = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 90px;
    height: 40px;
    cursor: pointer;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  margin-inline: 10rem;
  justify-content: space-between;
`;
export const LocationIcon = styled.div`
  display: flex;
  align-items: center;

  border-radius: 8px;
  padding: 0.5rem;
  gap: 0.25rem;
  background-color: ${(props) => props.theme["purple-light"]};
  color: ${(porps) => porps.theme["purple"]};

  p {
    color: ${(props) => props.theme["purple-dark"]};
  }
`;

export const LoginButton = styled.button`
  background-color: ${defaultTheme.purple};
  color: ${defaultTheme.white};
  font-weight: bold;
  font-size: 1.125rem;
  padding-inline: 1.5rem;
  padding-block: 0.4rem;
  border-radius: 8px;
`;
