import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { IMaskInput } from "react-imask";
import { MaskedInputBox } from "./Input.styles";

interface MaskedInputProps extends ChakraInputProps {
  mask: string;
  placeholder: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, MaskedInputProps> = (
  { name, mask, placeholder, defaultValue, onValueChange, ...rest },
  ref
) => {
  const [focus, setFocus] = useState(false);
  return (
    <MaskedInputBox
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      isFocus={focus}
    >
      <IMaskInput
        mask={mask}
        placeholderChar={placeholder}
        ref={ref}
        value={defaultValue}
        onAccept={(value, mask) => onValueChange(mask.unmaskedValue)}
        {...rest}
      />
    </MaskedInputBox>
  );
};

export const MaskedInput = forwardRef(InputBase);
