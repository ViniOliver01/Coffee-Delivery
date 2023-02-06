import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface ContainerProps {
  login?: boolean;
}
const Container = styled.button`
  background-color: ${(props: ContainerProps) =>
    props.login ? defaultTheme.purple : defaultTheme["base-button"]};

  color: ${(props: ContainerProps) =>
    props.login ? defaultTheme.white : defaultTheme["base-text"]};
  border: none;
  width: 100%;
  padding: 0.625rem;
  border-radius: 6px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.25rem;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "outline";
}

export default function Button({ children, variant = "solid" }: ButtonProps) {
  return <ChakraButton variant={variant}> {children} </ChakraButton>;
}
