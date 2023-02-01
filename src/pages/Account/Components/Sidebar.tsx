import { ClipboardText, IdentificationCard, Key, Truck } from "phosphor-react";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NavLink from "../../../components/Form/NavLink";
import { AuthContext } from "../../../context/AuthContext";
import defaultTheme from "../../../styles/themes/Default";

interface SidebarProps {
  onClick: (page: string | undefined) => void;
}

const Link = styled.li`
  list-style-type: none;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  width: fit-content;
  margin-top: 4rem;
  height: fit-content;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.5rem;

  h2 {
    margin-top: 0.5rem;
    color: ${defaultTheme["base-label"]};
    font-size: 1rem;

    a {
      color: ${defaultTheme.purple};
      font-size: 1rem;
    }
  }
`;

export default function Sidebar({ onClick }: SidebarProps) {
  const [button, setButton] = useState("MyAccount");
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [, path] = pathname.toLowerCase().split("/account");

  return (
    <Card>
      <div>
        <h2>Bem vindo(a)</h2>
        <h2>{user.name}</h2>
      </div>
      <Nav>
        <Link>
          <NavLink link={""} active={(path === "/" || path === "") && true}>
            <IdentificationCard size={32} weight="fill" />
            Minha conta
          </NavLink>
        </Link>
        <Link>
          <NavLink link={"changepassword"} active={path === "/changepassword" && true}>
            <Key size={32} weight="fill" />
            Alterar senha
          </NavLink>
        </Link>
        <Link>
          <NavLink link={"address"} active={path === "/address" && true}>
            <Truck size={32} weight="fill" />
            Endereços de entrega
          </NavLink>
        </Link>
        <Link>
          <NavLink link={"purchases"} active={path === "/purchases" && true}>
            <ClipboardText size={32} weight="fill" />
            Meus pedidos
          </NavLink>
        </Link>
      </Nav>
    </Card>
  );
}
