import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

function handleBackgroundColor({ color }: ButtonContainerProps) {
  switch (color) {
    case "purple":
      return `${defaultTheme.purple}`;
    case "gray":
      return `${defaultTheme["base-button"]}`;
    case "green":
      return `${defaultTheme.green}`;
    case "green-light":
      return `${defaultTheme["green-light"]}`;
    case "red":
      return `${defaultTheme.red}`;
    default:
      return `${defaultTheme.purple}`;
  }
}

function fontColor({ color }: ButtonContainerProps) {
  switch (color) {
    case "purple":
      return `${defaultTheme.white}`;
    case "gray":
      return `${defaultTheme["base-text"]}`;
    case "green":
      return `${defaultTheme.white}`;
    case "green-light":
      return `${defaultTheme.white}`;
    case "red":
      return `${defaultTheme.white}`;
    default:
      return `${defaultTheme.white}`;
  }
}

interface ButtonContainerProps {
  color: "purple" | "gray" | "green" | "green-light" | "red";
}

export const ButtonContainer = styled.div`
  width: 100%;
  button {
    background-color: ${(props: ButtonContainerProps) => handleBackgroundColor(props)};
    color: ${(props: ButtonContainerProps) => fontColor(props)};

    &:hover,
    &:hover:disabled,
    &:disabled {
      opacity: 0.75;
      background-color: ${(props: ButtonContainerProps) => handleBackgroundColor(props)};
    }
    border: none;
    width: 100%;
    border-radius: 6px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CurrencyInputBox = styled.label`
  display: flex;
  flex-direction: row;
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  height: fit-content;
  padding: 0.5rem;
  width: 35%;

  font-size: 1.125rem;
  color: ${defaultTheme["base-text"]};
  gap: 0.3rem;

  font-size: 1.125rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  position: relative;

  input {
    font-size: 1.125rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: ${defaultTheme["base-text"]};
    border-radius: 0px;
    text-align: center;
    position: absolute;
  }

  &.focus {
    outline: 2px solid ${defaultTheme.purple};
  }
`;
