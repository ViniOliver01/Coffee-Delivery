import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const CartBox = styled.div`
  width: fit-content;
  height: 38px;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${defaultTheme["yellow-light"]};
  color: ${defaultTheme["yellow-dark"]};

  text-decoration: none;
  position: relative;
  cursor: pointer;
`;
export const CountItens = styled.div`
  width: 20px;
  height: 20px;
  font-size: 0.75rem;

  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme["yellow-dark"]};
  color: white;

  user-select: none;
`;
