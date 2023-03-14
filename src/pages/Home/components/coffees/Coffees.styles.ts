import styled from "styled-components";

export const Container = styled.div`
  width: 16rem;
  height: fit-content;
  background-color: ${(props) => props.theme["base-card"]};
  border-radius: 6px 36px 6px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 20px;
  padding-bottom: 20px;

  img {
    width: 120px;
    height: 120px;
    position: relative;
    top: -20px;
    filter: drop-shadow(12px 12px 12px #222);
  }

  ul {
    gap: 0.25rem;
    display: flex;
    margin-bottom: 1rem;
  }

  li {
    list-style-type: none;
    border-radius: 100px;
    background-color: ${(props) => props.theme["yellow-light"]};
    color: ${(props) => props.theme["yellow-dark"]};

    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;

    padding-inline: 0.5rem;
    padding-block: 0.25rem;
  }

  h2 {
    font-size: 1.125rem;
    font-family: "Baloo 2", cursive;
    color: ${(props) => props.theme["base-subtitle"]};
    text-align: center;
    padding-inline: 0.5rem;
  }

  h3 {
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: ${(props) => props.theme["base-label"]};
    text-align: center;
    justify-self: flex-start;
    flex: 1;
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    max-width: 370px;
    display: flex;
    flex-direction: row;
    margin-top: 0;
    padding-block: 1rem;
    filter: drop-shadow(4px 4px 4px rgba(34, 34, 34, 0.15));

    img {
      width: 64px;
      height: 64px;
      position: static;
      top: -20px;
      filter: drop-shadow(12px 12px 12px #222);
    }
  }
`;

export const ShopSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  /* Add Iten Efect on CartButton */
  .addCartEffect {
    background-color: ${(props) => props.theme["green"]};
    font-size: 0.8rem;
    transition: 0.3s;

    &:hover {
      background-color: ${(props) => props.theme["green"]};
      font-size: 0.8rem;
    }
  }
  @media only screen and (max-width: 700px) {
    gap: 0rem;
  }
`;
export const Price = styled.div`
  flex: 1;
  color: ${(props) => props.theme["black"]};

  span {
    font-size: 1.25rem;
    font-family: "Baloo 2", cursive;
    padding-inline: 0.25rem;
  }

  @media only screen and (max-width: 700px) {
  }
`;

export const ItensCount = styled.div`
  width: 100%;
  height: 2.375rem;
  display: flex;
  justify-content: space-between;

  align-items: center;
  user-select: none;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme["base-button"]};

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    width: 2.375rem;
    height: 2.375rem;
    color: ${(props) => props.theme["purple"]};
    background-color: ${(props) => props.theme["white"]};
    transition: all 0.2s;
  }
  a:hover {
    color: ${(props) => props.theme["purple-dark"]};
    background-color: ${(props) => props.theme["base-hover"]};
    cursor: pointer;
    transform: scale(1.1);
  }
`;
