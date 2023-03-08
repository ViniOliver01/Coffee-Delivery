import { ReactNode } from "react";
import { NavLinkContainer } from "./Button.styles";

interface NavLinkProps {
  link: string;
  active?: boolean;
  onClick?: (event: any) => void;
  children: ReactNode;
}

export default function NavLink({
  link,
  active = false,
  children,
  onClick,
}: NavLinkProps) {
  return (
    <NavLinkContainer active={active} onClick={onClick}>
      <a href={`/account/${link}`}>{children}</a>
    </NavLinkContainer>
  );
}
