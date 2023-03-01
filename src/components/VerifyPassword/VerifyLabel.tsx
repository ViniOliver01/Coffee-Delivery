import { Check } from "phosphor-react";
import { ReactNode } from "react";
import { LabelContainer } from "./styles";

interface VerifyLabelProps {
  children?: ReactNode;
  isCheck: boolean;
}

export default function VerifyLabel({ children, isCheck }: VerifyLabelProps) {
  return (
    <LabelContainer isCheck={isCheck}>
      <p>{children}</p>
      {isCheck && <Check size={20} weight="bold" />}
    </LabelContainer>
  );
}
