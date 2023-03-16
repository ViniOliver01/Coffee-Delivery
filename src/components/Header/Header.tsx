import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";

import {
  ClipboardText,
  House,
  IdentificationCard,
  Key,
  List,
  MapPin,
  ShoppingCart,
  SignOut,
  Truck,
  X,
} from "phosphor-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Avatar from "../Avatar/Avatar";
import { Cart } from "../Cart/Cart";
import Button from "../Form/Button/Button";
import { Link } from "../Form/Button/Link";

import Divider from "./../Divider/index";
import {
  Container,
  HeaderBody,
  HeaderBox,
  LinkWithIcon,
  LocationIcon,
  LogoArea,
  PageLinks,
  VerifyEmail,
} from "./Header.styles";

export function Header() {
  let { pathname } = useLocation();
  const [, subpath] = pathname.toLowerCase().split("/account");
  pathname = pathname.split("/")[1];

  const toast = useToast();
  const { isAuthenticated, user, reeSendConfirmEmail, signOut } = useContext(AuthContext);
  const { products_amount, products_value } = useContext(CartContext);
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {}, []);

  const navigation = useNavigate();

  function GoToHome() {
    navigation("/");
  }

  function GoToLogin() {
    navigation("/login");
  }

  function GoTo(page: string) {
    navigation(page);
    onClose();
  }

  function handleSignOut() {
    googleLogout();
    signOut();
    onClose();
    window.location.reload();
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
    if (isAuthenticated && user?.email_is_verified == false) {
      setIsEmailVerified(false);
    }
    if (pathname === "confirmemail") {
      setIsEmailVerified(true);
    }
  }, [user]);

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  const [isDesktop] = useMediaQuery("(min-width: 701px)", {
    ssr: true,
    fallback: false,
  });

  if (isMobile) {
    return (
      <HeaderBody>
        <HeaderBox>
          <List size={32} weight="fill" onClick={onOpen} ref={btnRef} />
          <Cart totalItens={products_amount} totalPrice={products_value / 100} />
        </HeaderBox>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody paddingBlock={"3rem"}>
              {isAuthenticated ? (
                <div
                  onClick={() => {
                    isMobile ? GoTo("/account") : null;
                  }}
                >
                  <Avatar name={user.name} avatar_url={user.avatar_url} />
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => GoTo("/login")}
                    fontSize="1.15rem"
                    paddingInline="1.5rem"
                  >
                    Entrar
                  </Button>
                </>
              )}

              <PageLinks isAuthenticated={isAuthenticated}>
                <LinkWithIcon isActive={pathname === ""} onClick={() => GoTo("/")}>
                  <House size={32} weight="fill" />
                  <h2>Página inicial</h2>
                </LinkWithIcon>

                <LinkWithIcon
                  isActive={pathname === "checkout"}
                  onClick={() => GoTo("/checkout")}
                >
                  <ShoppingCart size={32} weight="fill" />
                  <h2>Carrinho de compras</h2>
                </LinkWithIcon>

                {isAuthenticated && (
                  <>
                    <Divider />

                    <LinkWithIcon
                      isActive={pathname === "account" && subpath === ""}
                      onClick={() => GoTo("/account")}
                    >
                      <IdentificationCard size={32} weight="fill" />
                      <h2>Minha Conta</h2>
                    </LinkWithIcon>

                    <LinkWithIcon
                      isActive={subpath === "/changepassword"}
                      onClick={() => GoTo("/account/changepassword")}
                    >
                      <Key size={32} weight="fill" />
                      <h2>Alterar senha</h2>
                    </LinkWithIcon>

                    <LinkWithIcon
                      isActive={subpath === "/address"}
                      onClick={() => GoTo("/account/address")}
                    >
                      <Truck size={32} weight="fill" />
                      <h2>Meus endereços</h2>
                    </LinkWithIcon>

                    <LinkWithIcon
                      isActive={subpath === "/purchases"}
                      onClick={() => GoTo("/account/purchases")}
                    >
                      <ClipboardText size={32} weight="fill" />
                      <h2>Meus pedidos</h2>
                    </LinkWithIcon>

                    <LinkWithIcon onClick={handleSignOut}>
                      <SignOut size={32} weight="fill" />
                      <h2>Sair</h2>
                    </LinkWithIcon>
                  </>
                )}
              </PageLinks>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HeaderBody>
    );
  } else if (isDesktop) {
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
              <p>São Paulo, SP</p>
              {/* No futuro adicionar uma lista de cidades disponíveis para seleção */}
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
}
