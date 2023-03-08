import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Container } from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  color?: "purple" | "gray" | "green" | "green-light" | "red";
  fontSize?: string;
}

/**
 * @param fontSize value in pixels, rem or em
 * @returns button component
 */

export default function Button({
  children,
  variant = "solid",
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  color,
  loadingText = "Carregando...",
  fontSize = "1rem",
  ...props
}: ButtonProps) {
  return (
    <Container color={color}>
      <ChakraButton
        variant={variant}
        isDisabled={isDisabled}
        isLoading={isLoading}
        loadingText={loadingText}
        width="100%"
        marginTop={0}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        fontSize={fontSize}
        _hover={{ transform: "scale(1.05)" }}
        {...props}
      >
        {children}
      </ChakraButton>
    </Container>
  );
}
