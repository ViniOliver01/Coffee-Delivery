import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AvatarInfo } from "./Avatar.styles";

interface AvatarProps {
  name: string;
  avatar_url: string;
}

export default function Avatar({ name, avatar_url }: AvatarProps) {
  const [firstName] = name.split(" ");

  const navigation = useNavigate();

  function GoToMyAccount() {
    navigation("/account");
  }

  return (
    <>
      <ChakraAvatar src={avatar_url} w={"48px"} />
      <AvatarInfo>
        <p>Olá, {firstName}</p>
        <a onClick={GoToMyAccount}>Minha conta</a>
      </AvatarInfo>
    </>
  );
}
