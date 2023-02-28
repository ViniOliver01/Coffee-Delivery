import {
  Avatar as ChakraAvatar,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AvatarInfo } from "./Avatar.styles";

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
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverCloseButton />
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

        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Link onClick={GoToMyAccount} hasIcon>
              Ir para minha conta <ArrowSquareOut />
            </Link>
            {isAdmin && (
              <Link onClick={GoToAdmin} hasIcon>
                Painel de Administrador <ArrowSquareOut />
              </Link>
            )}
            <Button
              color="red"
              rightIcon={<SignOut weight="bold" />}
              onClick={handleSignOut}
            >
              Sair
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
