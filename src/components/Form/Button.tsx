import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

const Container = styled.div`
  button {
    background-color: ${(props: ButtonProps) => {
      switch (props.color) {
        case "purple":
          return defaultTheme.purple;
        case "gray":
          return defaultTheme["base-input"];
        default:
          return defaultTheme.purple;
      }
    }};
    color: ${(props: ButtonProps) => {
      switch (props.color) {
        case "purple":
          return defaultTheme.white;
        case "gray":
          return defaultTheme["base-input"];
        default:
          return defaultTheme.white;
      }
    }};

    &:hover,
    &:hover:disabled,
    &:disabled {
      opacity: 0.75;
      background-color: ${(props: ButtonProps) => {
        switch (props.color) {
          case "purple":
            return defaultTheme.purple;
          case "gray":
            return defaultTheme["base-input"];
          default:
            return defaultTheme.purple;
        }
      }};
    }

    border: none;
    width: 100%;
    border-radius: 6px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    font-size: 1.25rem;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  color?: "purple" | "gray";
}

export default function Button({
  children,
  variant = "solid",
  isLoading,
  isDisabled,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) {
  return (
    <Container>
      <ChakraButton
        variant={variant}
        isLoading={isLoading}
        loadingText={loadingText}
        width="100%"
        marginTop={0}
        isDisabled={isDisabled}
        {...props}
      >
        {children}
      </ChakraButton>
    </Container>
  );
}
