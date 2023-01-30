import { ReactNode } from "react";
import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

interface NavLinkProps {
  link: string;
  active?: boolean;
  onClick?: (event: any) => void;
  children: ReactNode;
}

interface LinkProps {
  active?: boolean;
}

const Container = styled.button`
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    color: ${(props: LinkProps) =>
      props.active ? defaultTheme.purple : defaultTheme["base-text"]};
  }
`;

export default function NavLink({
  link,
  active = false,
  children,
  onClick,
}: NavLinkProps) {
  return (
    <Container active={active} onClick={onClick}>
      <a href={`/account/${link}`}>{children}</a>
    </Container>
  );
}
