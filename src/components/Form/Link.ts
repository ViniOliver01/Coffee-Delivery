import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface LinkProps {
  hasIcon?: boolean;
}

export const Link = styled.a`
  color: ${defaultTheme.purple};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;

  border-bottom: 1px solid transparent;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: ${defaultTheme["purple-light"]};

    border-bottom: 1px solid
      ${(props: LinkProps) =>
        props.hasIcon ? defaultTheme["purple-dark"] : "transparent"};
  }
`;
