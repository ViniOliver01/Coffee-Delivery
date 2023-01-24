import { MapPin } from "phosphor-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext/CartContext";
import Avatar from "../Avatar/Avatar";
import { Cart } from "../Cart/Cart";

import {
  Container,
  HeaderContainer,
  LocationIcon,
  LoginButton,
  LogoArea,
} from "./Header.styles";

export function Header() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { ItensAmount } = useContext(CartContext);

  useEffect(() => {}, []);

  const navigation = useNavigate();

  function GoToHome() {
    navigation("/");
  }

  function GoToLogin() {
    navigation("/login");
  }

  return (
    <HeaderContainer>
      <Container>
        <LogoArea onClick={GoToHome}>
          <img src={logo} />
        </LogoArea>

        <LocationIcon>
          <MapPin size={24} weight="fill" />
          <p>Porto Alegre, RS</p>
        </LocationIcon>
      </Container>
      <Container>
        {isAuthenticated ? (
          <Avatar name={user.name} avatar_url={user.avatar_url} />
        ) : (
          <LoginButton onClick={GoToLogin}>Entrar</LoginButton>
        )}
        <Cart itens={ItensAmount} />
      </Container>
    </HeaderContainer>
  );
}
