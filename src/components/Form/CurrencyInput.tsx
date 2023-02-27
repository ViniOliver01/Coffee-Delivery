import { Input as ChakraInput } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CurrencyInputBox } from "./styles";

interface CurrencyInputProps {
  setValue: (value: number) => void;
  defaultValue: number;
  error: (message: string) => void;
}

export default function CurrencyInput({
  setValue,
  defaultValue = 0,
  error = null,
}: CurrencyInputProps) {
  const [price, setPrice] = useState(
    `${formatPrice((defaultValue / 100).toFixed(2), "String")}`
  );

  const [isFocus, setIsFocus] = useState(false);

  function formatPrice(price: string, format?: "Number" | "String") {
    switch (format) {
      case "Number":
        return Number(price.replace(",", "."));
      case "String":
        return String(price.replace(".", ","));
      default:
        return Number(price.replace(",", "."));
    }
  }

  function handleSetPrice(price: string) {
    if (price.includes(".") || price.split(",").length - 1 > 1) {
      price = price.substring(0, price.length - 1);
    } else if (
      formatPrice(price, "Number") === 0 ||
      formatPrice(price, "Number") === null
    ) {
      error("Preço obrigatório");
    } else {
      error(null);
    }

    setPrice(price);
  }

  function handleOnBlur() {
    setValue(Number(formatPrice(price, "Number")));
  }

  useEffect(() => {
    setValue(Number(formatPrice(price, "Number")));
  }, []);

  return (
    <>
      <CurrencyInputBox className={isFocus ? "focus" : null}>
        <p>R$</p>
        <ChakraInput
          color="black"
          variant="unstyled"
          value={price}
          onChange={(e) => handleSetPrice(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            handleOnBlur();
            setIsFocus(false);
          }}
        />
      </CurrencyInputBox>
      {/* {error && <InputError message={error} />} */}
    </>
  );
}
