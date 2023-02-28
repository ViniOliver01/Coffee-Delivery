import { Check } from "phosphor-react";
import { ReactNode } from "react";
import { VerifyLabelContainer } from "./styles";

interface VerifyLabelProps {
  children?: ReactNode;
  isCheck: boolean;
}

export default function VerifyLabel({ children, isCheck }: VerifyLabelProps) {
  return (
    <VerifyLabelContainer>
      <p>{children}</p>
      {isCheck && <Check size={20} weight="bold" />}
    </VerifyLabelContainer>
  );
}
