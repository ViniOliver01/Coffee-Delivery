import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonContainer } from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;

  //styles
  variant?: "solid" | "outline";
  color?: "purple" | "gray" | "green" | "green-light" | "red";
  fontSize?: string;
  paddingInline?: string;
  paddingBlock?: string;
}

/**
 * @param fontSize value in pixels, rem or em
 * @param paddingInline value in pixels, rem or em
 * @param paddingBlock value in pixels, rem or em
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
  paddingInline = "",
  paddingBlock = "",
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
        fontSize={fontSize}
        paddingBlock={paddingBlock}
        paddingInline={paddingInline}
        _hover={{ transform: "scale(1.05)" }}
        {...props}
      >
        {children}
      </ChakraButton>
    </ButtonContainer>
  );
}
