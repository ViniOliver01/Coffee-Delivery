import { Avatar as ChakraAvatar, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AvatarContainer, AvatarPopoverStack, BackgroundOpacity } from "./Avatar.styles";

import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";
import { ArrowSquareOut, CaretDown, SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Form/Button/Button";
import { Link } from "../Form/Button/Link";

interface AvatarProps {
  name: string;
  avatar_url: string;
}

export default function Avatar({ name, avatar_url }: AvatarProps) {
  const { isAuthenticated, user, isAdmin, signOut } = useContext(AuthContext);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [firstName] = name.split(" ");

  const navigation = useNavigate();

  function GoToMyAccount() {
    navigation("/account");
    onClose();
  }

  function GoToAdmin() {
    navigation("/admin");
    onClose();
  }

  function handleSignOut() {
    googleLogout();
    signOut();
    onClose();
    window.location.reload();
  }

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <>
      <BackgroundOpacity isActive={isOpen} />
      <Popover isOpen={isOpen} onClose={onClose}>
        <AvatarContainer>
          <ChakraAvatar src={avatar_url} w={"48px"} />
          <div>
            <p>Olá, {firstName}</p>

            {isMobile ? (
              <span>{user.email}</span>
            ) : (
              <>
                <Link onClick={onToggle}>
                  Minha conta <CaretDown weight="bold" />
                </Link>
                <PopoverTrigger>
                  <div></div>
                </PopoverTrigger>
              </>
            )}
          </div>
        </AvatarContainer>

        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <AvatarPopoverStack>
              <Button
                color="purple"
                rightIcon={<ArrowSquareOut weight="bold" />}
                onClick={GoToMyAccount}
              >
                Ir para minha conta
              </Button>
              {isAdmin && (
                <Button
                  color="purple"
                  rightIcon={<ArrowSquareOut weight="bold" />}
                  onClick={GoToAdmin}
                >
                  Painel de Administrador
                </Button>
              )}
              <Button
                id="SignOut"
                color="red"
                rightIcon={<SignOut weight="bold" />}
                onClick={handleSignOut}
              >
                Sair
              </Button>
            </AvatarPopoverStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
