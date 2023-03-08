import { ReactNode } from "react";
import { LabelText } from "./Label.styles";

interface LabelProps {
  children: ReactNode;
  opcional?: boolean;
}

export default function Label({ children, opcional = false }: LabelProps) {
  return (
    <LabelText>
      {children}
      {opcional && <span> - Opcional</span>}
    </LabelText>
  );
}
