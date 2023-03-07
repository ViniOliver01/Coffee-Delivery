import { Container, Title } from "./styles";
import VerifyLabel from "./VerifyLabel";

interface VerifyPasswordProps {
  check: {
    min_characters: boolean;
    min_uppercase: boolean;
    min_lowercase: boolean;
    min_numbers: boolean;
  };
  redErrorMessage?: boolean;
}

export default function VerifyPassword({ check, redErrorMessage }: VerifyPasswordProps) {
  console.log("🚀 / VerifyPassword / error:", redErrorMessage);

  return (
    <Container>
      <Title>A senha deve conter no mínimo:</Title>

      <VerifyLabel isCheck={check.min_characters} showError={redErrorMessage}>
        8 caracteres
      </VerifyLabel>

      <VerifyLabel isCheck={check.min_uppercase} showError={redErrorMessage}>
        1 letra maiúscula
      </VerifyLabel>

      <VerifyLabel isCheck={check.min_lowercase} showError={redErrorMessage}>
        1 letra minuscula
      </VerifyLabel>

      <VerifyLabel isCheck={check.min_numbers} showError={redErrorMessage}>
        1 número
      </VerifyLabel>
    </Container>
  );
}
