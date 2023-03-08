import { Check, X } from "phosphor-react";
import { ReactNode } from "react";
import { LabelContainer } from "./styles";

interface VerifyLabelProps {
  children?: ReactNode;
  showError?: boolean;
  isCheck: boolean;
}

export default function VerifyLabel({ children, isCheck, showError }: VerifyLabelProps) {
  return (
    <LabelContainer isCheck={isCheck} showError={showError}>
      <p>{children}</p>
      {isCheck ? <Check size={20} weight="bold" /> : showError ? <X size={20} /> : null}
    </LabelContainer>
  );
}
