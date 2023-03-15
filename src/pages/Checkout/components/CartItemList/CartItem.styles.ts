import styled from "styled-components";
import defaultTheme from "./../../../../styles/themes/Default";

export const Container = styled.li`
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme["base-button"]};
  display: flex;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  @media only screen and (max-width: 380px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

export const CenterDiv = styled.div`
  margin-left: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 1.125rem;
    font-weight: bold;
    font-family: "Baloo 2", cursive;
  }
`;

export const RemoveItemButton = styled.div`
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 0.5rem;
  gap: 0.5rem;
  color: ${defaultTheme.white};
  background-color: ${defaultTheme.red};
  transition: all 0.2s;

  cursor: pointer;
  p {
    color: ${defaultTheme.white};
    font-size: 0.75rem;
  }
  &:hover {
    background-color: ${defaultTheme["red-light"]};
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 380px) {
    margin-top: 1rem;
  }
`;

export const PriceDisplay = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;

  color: ${(props) => props.theme["base-text"]};
  font-weight: bold;
  font-size: 1rem;
`;

export const ItensCountCart = styled.div`
  width: 4.5rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;

  align-items: center;
  user-select: none;
  border-radius: 6px;
  background-color: ${(props) => props.theme["base-button"]};
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme["purple"]};
  }
  a:hover {
    color: ${(props) => props.theme["purple-dark"]};
    cursor: pointer;
  }
`;
