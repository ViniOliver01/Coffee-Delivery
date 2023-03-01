import { Container, Title } from "./styles";
import VerifyLabel from "./VerifyLabel";

interface VerifyPasswordProps {
  check: {
    min_characters: boolean;
    min_uppercase: boolean;
    min_lowercase: boolean;
    min_numbers: boolean;
  };
}

export default function VerifyPassword({ check }: VerifyPasswordProps) {
  return (
    <Container>
      <Title>A senha deve conter no mínimo:</Title>

      <VerifyLabel isCheck={check.min_characters}>8 caracteres</VerifyLabel>

      <VerifyLabel isCheck={check.min_uppercase}>1 letra maiúscula</VerifyLabel>

      <VerifyLabel isCheck={check.min_lowercase}>1 letra minuscula</VerifyLabel>

      <VerifyLabel isCheck={check.min_numbers}>1 número</VerifyLabel>
    </Container>
  );
}
