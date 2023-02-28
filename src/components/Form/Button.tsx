import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  color?: "purple" | "gray" | "green" | "green-light" | "red";
}

export default function Button({
  children,
  variant = "solid",
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  color,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer color={color}>
      <ChakraButton
        variant={variant}
        isDisabled={isDisabled}
        isLoading={isLoading}
        loadingText={loadingText}
        width="100%"
        marginTop={0}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      >
        {children}
      </ChakraButton>
    </ButtonContainer>
  );
}
