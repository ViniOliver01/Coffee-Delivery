import { createContext, ReactNode, useEffect, useState } from "react";
import { FormInputs } from "../../pages/Checkout/Checkout";

export const CartContext = createContext({} as CartContextType);

interface CartContextType {
  ItensAmount: number;
  handleSetTotalAmount: (amount: number) => void;
  ItensObject: CartObjectType[];
  addItensToCart: ({ id, name, img, price }: CartObjectType) => void;
  handleAddItensToCart: ({ id, name, img, price, amount }: CartObjectType) => void;
  handleSetTotalPrice: (amount: number) => void;
  ItensPrice: number;
  handleRemoveItensToCart: ({ id, name, img, price, amount }: CartObjectType) => void;
  handleCheckObjectsState: ({ id, name, img, price, amount }: CartObjectType) => number;
  handleSetFormData: ({
    cep,
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    paymethodSelect,
  }: FormInputs) => void;
  FormItens: FormInputs | undefined;
  handleFinishBuy: () => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

interface CartObjectType {
  id: number;
  name: string;
  img: string;
  price: number;
  amount: number;
}
export const deliveryValue = 3.5;

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [ItensObject, setItensObject] = useState<CartObjectType[]>([]);
  const [ItensAmount, setItensAmount] = useState(0);
  const [ItensPrice, setItensPrice] = useState(0);
  const [FormItens, setFormItens] = useState<FormInputs>();

  function handleCheckObjectsState({ id, name, img, price, amount }: CartObjectType) {
    let newAmount: number;
    newAmount = 0;
    ItensObject.map((item) => {
      item.id == id ? (newAmount = item.amount) : 0;
    });
    return newAmount;
  }

  function handleAddItensToCart({ id, name, img, price, amount }: CartObjectType) {
    ItensObject.map((item) => {
      if (item.id == id) {
        ItensObject.splice(ItensObject.indexOf(item), 1);
      }
    });
    addItensToCart({ id, name, img, price, amount });
  }

  function handleRemoveItensToCart({ id, name, img, price, amount }: CartObjectType) {
    handleSetTotalPrice(-price * amount);
    setItensObject((state) =>
      state.filter((ItensObject) => {
        return ItensObject.id !== id;
      })
    );
  }

  function handleSetTotalPrice(newPrice: number) {
    setItensPrice(ItensPrice + newPrice);
  }
  function handleSetTotalAmount(amount: number) {
    setItensAmount(ItensAmount + amount);
  }

  function addItensToCart({ id, name, img, price, amount }: CartObjectType) {
    setItensObject((state) =>
      [...state, { id, name, img, price, amount }].sort((a, b) => a.id - b.id)
    );
  }

  function handleSetFormData({
    cep,
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    paymethodSelect,
  }: FormInputs) {
    setFormItens({ cep, rua, numero, complemento, bairro, cidade, uf, paymethodSelect });
  }

  function handleFinishBuy() {
    setItensObject([]);
    setItensAmount(0);
    setItensPrice(0);
  }
  useEffect(() => {});

  return (
    <CartContext.Provider
      value={{
        ItensAmount,
        handleSetTotalAmount,
        ItensObject,
        addItensToCart,
        handleAddItensToCart,
        handleSetTotalPrice,
        ItensPrice,
        handleRemoveItensToCart,
        handleCheckObjectsState,
        handleSetFormData,
        FormItens,
        handleFinishBuy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
