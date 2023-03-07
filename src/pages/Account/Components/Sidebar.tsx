import { ClipboardText, IdentificationCard, Key, Truck } from "phosphor-react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "../../../components/Form/NavLink";
import { AuthContext } from "../../../context/AuthContext";
import { SideBarCard, SideBarLink, SideBarNav } from "./StyledComponents";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [, path] = pathname.toLowerCase().split("/account");

  return (
    <SideBarCard>
      <div>
        <h2>Bem vindo(a)</h2>
        <h1>{user.name}</h1>
      </div>
      <SideBarNav>
        <SideBarLink>
          <NavLink link={""} active={(path === "/" || path === "") && true}>
            <IdentificationCard size={32} weight="fill" />
            Minha conta
          </NavLink>
        </SideBarLink>
        <SideBarLink>
          <NavLink link={"changepassword"} active={path === "/changepassword" && true}>
            <Key size={32} weight="fill" />
            Alterar senha
          </NavLink>
        </SideBarLink>
        <SideBarLink>
          <NavLink link={"address"} active={path === "/address" && true}>
            <Truck size={32} weight="fill" />
            Endereços de entrega
          </NavLink>
        </SideBarLink>
        <SideBarLink>
          <NavLink link={"purchases"} active={path === "/purchases" && true}>
            <ClipboardText size={32} weight="fill" />
            Meus pedidos
          </NavLink>
        </SideBarLink>
      </SideBarNav>
    </SideBarCard>
  );
}
