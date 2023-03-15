import styled from "styled-components";

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
`;
export const CenterDiv = styled.div`
  margin-left: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const RemoveItemButton = styled.div`
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 0.5rem;
  color: ${(props) => props.theme["purple"]};
  background-color: ${(props) => props.theme["base-button"]};
  cursor: pointer;
  p {
    color: ${(props) => props.theme["base-text"]};
    font-size: 0.75rem;
  }
  &:hover {
    color: ${(props) => props.theme["purple-dark"]};
    background-color: ${(props) => props.theme["base-hover"]};
  }
  &:hover p {
    color: ${(props) => props.theme["base-subtitle"]};
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
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
