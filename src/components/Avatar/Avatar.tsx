import { Avatar as ChakraAvatar } from "@chakra-ui/react";

interface AvatarProps {
  name: string;
  avatar_url: string;
}

export default function Avatar({ name, avatar_url }: AvatarProps) {
  const [firstName] = name.split(" ");

  return (
    <>
      <ChakraAvatar src={avatar_url} w={"48px"} />
      <div>
        <p>Olá, {firstName}</p>
        <a href="/account">Minha conta</a>
      </div>
    </>
  );
}
