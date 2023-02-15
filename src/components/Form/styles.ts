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
