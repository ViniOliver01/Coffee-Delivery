import { AiOutlineUser } from "react-icons/ai";
import { AvatarImage, AvatarLogo } from "./Avatar.styles";

interface AvatarProps {
  name: string;
  avatar_url: string;
}

export default function Avatar({ name, avatar_url }: AvatarProps) {
  return (
    <>
      {!!avatar_url ? (
        <AvatarImage src={avatar_url} />
      ) : (
        <AvatarLogo>
          <AiOutlineUser />
        </AvatarLogo>
      )}

      <div>
        <p>Olá, {name}</p>
        <a href="">Minha conta</a>
      </div>
    </>
  );
}
