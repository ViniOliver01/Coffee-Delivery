import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 5rem;
  margin-inline: auto;
  width: 100%;
  max-width: 1400px;
  padding-inline: 2rem;

  @media only screen and (max-width: 700px) {
    margin-top: 2rem;
    margin-bottom: 5rem;
    padding-inline: 0.5rem;
  }
`;

export const CoverArea = styled.div`
  height: fit-content;
  padding-block: 5.75rem;
  display: flex;
  gap: 3.5rem;
  justify-content: space-between;
  position: relative;
`;

export const TextArea = styled.div`
  h1 {
    color: ${(props) => props.theme["base-title"]};
    font-family: "Baloo 2", cursive;
    font-weight: bold;
    font-size: 3rem;
    line-height: 130%;
    margin-bottom: 1rem;
  }
  h2 {
    color: ${(props) => props.theme["base-subtitle"]};
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    font-size: 1.25rem;
    line-height: 130%;
  }

  @media only screen and (max-width: 1160px) {
    margin: auto;
  }

  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      text-align: center;
      font-size: 1.5rem;
    }
  }
`;
export const IconsArea = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 1.25rem;
  column-gap: 2.5rem;
  margin-top: 4.125rem;

  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`;

export const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  #orange {
    background-color: ${(props) => props.theme["yellow-dark"]};
  }
  #yellow {
    background-color: ${(props) => props.theme["yellow"]};
  }
  #dark {
    background-color: ${(props) => props.theme["base-text"]};
  }
  #purple {
    background-color: ${(props) => props.theme["purple"]};
  }
`;

export const IconImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  color: white;
`;

export const CoverImage = styled.div`
  @media only screen and (max-width: 1160px) {
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    opacity: 0.2;
    z-index: -1;
    position: absolute;

    img {
      margin: auto;
    }
  }
`;

export const CoffeesList = styled.div`
  margin-top: 2rem;
  h1 {
    margin-bottom: 3.375rem;
    color: ${(props) => props.theme["base-title"]};
    font-family: "Baloo 2", cursive;
    font-weight: bold;
    font-size: 2rem;
    line-height: 130%;

    @media only screen and (max-width: 700px) {
      text-align: center;
      margin-bottom: 1rem;
    }
  }
`;

export const ListMap = styled.div`
  display: grid;
  row-gap: 4rem;
  grid-template-columns: repeat(4, 1fr);
  div {
    margin: auto;
  }
  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
