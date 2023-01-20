import { MapPin } from "phosphor-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { CartContext } from "../../context/CartContext/CartContext";
import Avatar from "../Avatar/Avatar";
import { Cart } from "../Cart/Cart";
import { HeaderContainer, LocationIcon, LogoArea } from "./Header.styles";

export function Header() {
  const { ItensAmount } = useContext(CartContext);

  const navigation = useNavigate();

  function GoToHome() {
    navigation("/");
  }

  return (
    <HeaderContainer>
      <LogoArea onClick={GoToHome}>
        <img src={logo} />
      </LogoArea>

      <LocationIcon>
        <MapPin size={24} weight="fill" />
        <p>Porto Alegre, RS</p>
      </LocationIcon>
      <Avatar name="Vinicius" avatar_url="https://github.com/ViniOliver01.png" />
      <Cart itens={ItensAmount} />
    </HeaderContainer>
  );
}
