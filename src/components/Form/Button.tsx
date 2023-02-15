import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  color?: "purple" | "gray" | "green" | "green-light" | "red";
}

export default function Button({
  children,
  variant = "solid",
  isLoading,
  isDisabled,
  leftIcon,
  color,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) {
  function handleBackgroundColor(backgroundColor: string) {
    switch (backgroundColor) {
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

  function fontColor(fontColor: string) {
    switch (fontColor) {
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

  const Container = styled.div`
    width: 100%;
    button {
      background-color: ${handleBackgroundColor(color)};
      color: ${fontColor(color)};

      &:hover,
      &:hover:disabled,
      &:disabled {
        opacity: 0.75;
        background-color: ${handleBackgroundColor(color)};
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

  return (
    <Container>
      <ChakraButton
        variant={variant}
        isDisabled={isDisabled}
        isLoading={isLoading}
        loadingText={loadingText}
        width="100%"
        marginTop={0}
        leftIcon={leftIcon}
        {...props}
      >
        {children}
      </ChakraButton>
    </Container>
  );
}
