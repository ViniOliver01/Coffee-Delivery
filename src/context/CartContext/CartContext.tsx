import { createContext, ReactNode, useState } from "react";

export const CartContext = createContext({} as CartContextType)

interface CartContextType {
    ItensAmount: number
    addItensToCart: (itens:number) => void
}


interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({children}: CartContextProviderProps){
    const [ItensAmount, setItensAmount] = useState(5);

    function addItensToCart(itens:number){
        setItensAmount(itens);
    }

  return (
    <CartContext.Provider value={{
        ItensAmount,
        addItensToCart
        }}>
            {children}
    </CartContext.Provider>
  )
}