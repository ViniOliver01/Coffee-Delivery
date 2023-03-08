import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

interface LinkProps {
  hasIcon?: boolean;
}

export const Link = styled.a`
  color: ${defaultTheme.purple};
  background-color: ${defaultTheme["purple-light"]};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  padding: 0.1rem 0.3rem;
  border-radius: 8px;
  transition: all 0.2s;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: ${defaultTheme.purple};
    color: ${defaultTheme.white};
  }
`;
