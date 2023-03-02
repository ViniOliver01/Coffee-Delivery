import { MapPin, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Avatar from "../Avatar/Avatar";
import { Cart } from "../Cart/Cart";
import { Link } from "../Form/Link";

import {
  Container,
  HeaderBody,
  HeaderBox,
  LocationIcon,
  LoginButton,
  LogoArea,
  VerifyEmail,
} from "./Header.styles";

export function Header() {
  const { isAuthenticated, user, reeSendConfirmEmail } = useContext(AuthContext);
  const { products_amount, products_value } = useContext(CartContext);
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  useEffect(() => {}, []);

  const navigation = useNavigate();

  function GoToHome() {
    navigation("/");
  }

  function GoToLogin() {
    navigation("/login");
  }

  function ResendEmail() {
    const { name, email } = user;
    reeSendConfirmEmail({ name, email });
    setIsEmailVerified(true);
  }

  useEffect(() => {
    if (isAuthenticated && !user.email_is_verified) {
      setIsEmailVerified(false);
    }
  }, [user]);

  return (
    <HeaderBody>
      {!isEmailVerified && (
        <VerifyEmail>
          <div>
            <p>
              Seu e-mail ainda não foi verificado, caso não tenha recebido o email de
              verificação, clique em
            </p>
            <Link onClick={ResendEmail}>Reenviar email</Link>
          </div>

          <button onClick={() => setIsEmailVerified(true)}>
            <X size={18} weight="bold" />
          </button>
        </VerifyEmail>
      )}

      <HeaderBox>
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
            <>
              <Avatar name={user.name} avatar_url={user.avatar_url} />
              <Cart totalItens={products_amount} totalPrice={products_value / 100} />
            </>
          ) : (
            <>
              <LoginButton onClick={GoToLogin}>Entrar</LoginButton>
            </>
          )}
        </Container>
      </HeaderBox>
    </HeaderBody>
  );
}
