import { useToast } from "@chakra-ui/react";
import { MapPin, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Avatar from "../Avatar/Avatar";
import { Cart } from "../Cart/Cart";
import Button from "../Form/Button/Button";
import { Link } from "../Form/Button/Link";

import {
  Container,
  HeaderBody,
  HeaderBox,
  LocationIcon,
  LogoArea,
  VerifyEmail,
} from "./Header.styles";

export function Header() {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[1];

  const toast = useToast();
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

  async function ResendEmail() {
    const { name, email } = user;

    try {
      const response = await reeSendConfirmEmail({ name, email });

      if (response.status === 200) {
        toast({
          title: "Email enviado",
          description: "Confirmação de email enviado. Favor verifique sua caixa de email",
          status: "success",
          duration: 10000,
        });
      }

      if (response.status === 400) {
        toast({
          title: "Erro",
          description:
            "Erro ao enviar confirmação de email. Favor entre em contato com um administrador",
          status: "error",
          duration: 10000,
        });
      }
    } catch (error) {}

    setIsEmailVerified(true);
  }

  useEffect(() => {
    if (isAuthenticated && !user.email_is_verified) {
      setIsEmailVerified(false);
    }
    if (pathname === "confirmemail") {
      setIsEmailVerified(true);
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
              <Button onClick={GoToLogin} fontSize="1.15rem" paddingInline="1.5rem">
                Entrar
              </Button>
            </>
          )}
        </Container>
      </HeaderBox>
    </HeaderBody>
  );
}
