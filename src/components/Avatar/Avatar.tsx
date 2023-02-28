import { Avatar as ChakraAvatar, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AvatarContainer,
  AvatarInfo,
  AvatarPopoverStack,
  BackgroundOpacity,
} from "./Avatar.styles";

import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ArrowSquareOut, CaretDown, SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "./../Form/Button";
import { Link } from "./../Form/Link";

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
    signOut();
    onClose();
    window.location.reload();
  }

  return (
    <>
      <BackgroundOpacity isActive={isOpen} />
      <Popover isOpen={isOpen} onClose={onClose}>
        <AvatarContainer>
          <ChakraAvatar src={avatar_url} w={"48px"} />
          <AvatarInfo>
            <p>Olá, {firstName}</p>
            <Link onClick={onToggle}>
              Minha conta <CaretDown weight="bold" />
            </Link>
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
          </AvatarInfo>
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
