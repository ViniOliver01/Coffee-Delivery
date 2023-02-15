import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const Container = styled.div`
  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;

    button {
      font-size: 1.75rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;
      padding: 0.5rem 2rem;
    }
    button.active {
      background-color: ${defaultTheme["base-button"]};
      border-radius: 30px 30px 0px 0px;
      text-decoration: underline ${defaultTheme.purple} solid;
      text-decoration-thickness: 3px;
    }
  }
`;

export const CoffeeListItem = styled.div`
  background-color: ${defaultTheme["base-button"]};
  margin-inline: 2rem;
  padding-block: 1rem;
  border-radius: 6px 44px 6px 44px;
`;

export const AdminCoffeeItem = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin: 1rem;
  border-radius: 8px;
  background-color: ${defaultTheme.white};

  div.noImageFound {
    margin: 0.5rem;
    border-radius: 30px;
    background-color: ${defaultTheme["base-input"]};
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    justify-content: center;
    align-items: center;
    text-align: center;

    .error {
      color: ${defaultTheme.red};
    }
    .success {
      color: ${defaultTheme.green};
    }

    h2 {
      font-size: 1rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;
    }
    span {
      border-radius: 45px;
      padding-inline: 1rem;
    }

    span.success {
      color: ${defaultTheme.white};
      background-color: ${defaultTheme.green};
    }
    span.error {
      color: ${defaultTheme.white};
      background-color: ${defaultTheme.red};
    }

    span.tag {
      font-weight: bold;
      color: ${defaultTheme["yellow-dark"]};
      background-color: ${defaultTheme["yellow-light"]};
      margin-bottom: 0.3rem;
    }
  }
  div > button {
    width: fit-content;
  }
`;

export const AdminCoffeeModal = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border-radius: 8px;
  background-color: ${defaultTheme.white};

  div {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    justify-content: center;
    align-items: center;
    text-align: center;

    .error {
      color: ${defaultTheme.red};
    }
    .success {
      color: ${defaultTheme.green};
    }

    h2 {
      font-size: 1rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;
    }

    span.success {
      color: ${defaultTheme.white};
      background-color: ${defaultTheme.green};
    }
    span.error {
      color: ${defaultTheme.white};
      background-color: ${defaultTheme.red};
    }

    span.tag {
      border-radius: 45px;
      padding-inline: 1rem;
      font-weight: bold;
      color: ${defaultTheme["yellow-dark"]};
      background-color: ${defaultTheme["yellow-light"]};
      margin-bottom: 0.3rem;
    }
  }
  div > button {
    width: fit-content;
  }
`;

export const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: red;
  width: 100%;
  height: 100%;

  padding: 1rem;
  border-radius: 30px;
  background-color: ${defaultTheme["base-input"]};

  input[type="file"] {
    display: none;
  }
`;

export const SpecList = styled.div`
  background-color: ${defaultTheme["base-button"]};
  margin-inline: 2rem;
  padding-block: 1rem;
  border-radius: 6px 44px 6px 44px;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: center;
  margin-inline: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${defaultTheme.white};

  div > button {
    width: fit-content;
  }

  div {
    width: fit-content;
    text-align: center;
    margin-inline: 1rem;
    width: 100%;

    &:last-child {
      width: fit-content;
    }

    h2 {
      font-size: 1rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;
    }
  }
`;