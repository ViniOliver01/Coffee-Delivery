import { AvatarImage } from "./Avatar.styles";

interface AvatarProps {
  name: string;
  avatar_url: string;
}

export default function Avatar({ name, avatar_url }: AvatarProps) {
  return (
    <>
      <AvatarImage src={avatar_url} />
      <div>
        <p>Olá, {name}</p>
        <a href="">Minha conta</a>
      </div>
    </>
  );
}
