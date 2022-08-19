import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { FormInputs } from "../../pages/Checkout/Checkout";

export const CartContext = createContext({} as CartContextType)

interface CartContextType {
    ItensAmount: number
    handleSetTotalAmount: (amount:number) => void
    ItensObject: {}
    addItensToCart: ({id, name, img, price}: CartObjectType) => void
    handleAddItensToCart: ({id, name, img, price, amount}: CartObjectType) => void
    handleSetTotalPrice: (amount:number) => void
    ItensPrice: number
    handleRemoveItensToCart: ({id, name, img, price, amount}: CartObjectType) => void
    handleCheckObjectsState: ({id, name, img, price, amount}: CartObjectType) => number
    handleSetFormData: ({cep, rua, numero, complemento, bairro, cidade, uf, paymethodSelect}: FormInputs) => void
    FormItens: FormInputs | undefined
    handleFinishBuy: () => void
  }


interface CartContextProviderProps {
    children: ReactNode
}

interface CartObjectType{
    id: number
    name: string
    img: string
    price: number
    amount: number
}
export const deliveryValue = 3.5

export const coffeesList = [
    {
      id: 0,
      type: ['tradicional'],
      name: 'Expresso Tradicional',
      image: 'expresso-tradicional',
      description: "O tradicional café feito com água quente e grãos moídos",
      price: 9.90,
    },
    {
      id: 1,
      type: ['tradicional'],
      name: 'Expresso Americano',
      image: 'expresso-americano',
      description: "Expresso diluído, menos intenso que o tradicional",
      price: 9.90,
    },
    {
      id: 2,
      type: ['tradicional'],
      name: 'Expresso Cremoso',
      image: 'expresso-cremoso',
      description: "Café expresso tradicional com espuma cremosa",
      price: 9.90,
    },
    {
      id: 3,
      type: ['tradicional', 'gelado'],
      name: 'Expresso Gelado',
      image: 'expresso-gelado',
      description: "Bebida preparada com café expresso e cubos de gelo",
      price: 9.90,
    },
    {
      id: 4,
      type: ['tradicional', 'com leite'],
      name: 'Café com Leite',
      image: 'cafe-com-leite',
      description: "Meio a meio de expresso tradicional com leite vaporizado",
      price: 9.90,
    },
    {
      id: 5,
      type: ['tradicional', 'com leite'],
      name: 'Latte',
      image: 'latte',
      description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
      price: 9.90,
    },
    {
      id: 6,
      type: ['tradicional', 'com leite'],
      name: 'Capuccino',
      image: 'capuccino',
      description: "Bebida com canela feita de doses iguais de café, leite e espuma",
      price: 9.90,
    },
    {
      id: 7,
      type: ['tradicional', 'com leite'],
      name: 'Macchiato',
      image: 'macchiato',
      description: "Café expresso misturado com um pouco de leite quente e espuma",
      price: 9.90,
    },
    {
      id: 8,
      type: ['tradicional', 'com leite'],
      name: 'Mocaccino',
      image: 'mocaccino',
      description: "Café expresso com calda de chocolate, pouco leite e espuma",
      price: 9.90,
    },
    {
      id: 9,
      type: ['especial', 'com leite'],
      name: 'Chocolate Quente',
      image: 'chocolate-quente',
      description: "Bebida feita com chocolate dissolvido no leite quente e café",
      price: 9.90,
    },
    {
      id: 10,
      type: ['especial', 'alcoólico', 'gelado'],
      name: 'Cubano',
      image: 'cubano',
      description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
      price: 9.90,
    },
    {
      id: 11,
      type: ['especial'],
      name: 'Havaiano',
      image: 'havaiano',
      description: "Bebida adocicada preparada com café e leite de coco",
      price: 9.90,
    },
    {
      id: 12,
      type: ['especial'],
      name: 'Árabe',
      image: 'arabe',
      description: "Bebida preparada com grãos de café árabe e especiarias",
      price: 9.90,
    },
    {
      id: 13,
      type: ['especial', 'alcoólico'],
      name: 'Irlandês',
      image: 'irlandes',
      description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
      price: 9.90,
    },
  ]


export function CartContextProvider({children}: CartContextProviderProps){
    const [ItensObject, setItensObject] = useState<CartObjectType[]>([]);
    const [ItensAmount, setItensAmount] = useState(0);
    const [ItensPrice, setItensPrice] = useState(0);
    const [FormItens, setFormItens] = useState<FormInputs>()

    function handleCheckObjectsState({id, name, img, price, amount}: CartObjectType){
      let newAmount: number
      newAmount=0
      ItensObject.map(item=> {
        item.id == id ? newAmount=item.amount : 0
      })
      return newAmount
    }

    
    function handleAddItensToCart({id, name, img, price, amount}: CartObjectType){
      
      ItensObject.map(item => {
        if (item.id == id) {
          ItensObject.splice(ItensObject.indexOf(item), 1)
        }
      })
      addItensToCart({id, name, img, price, amount})
    }

   
    function handleRemoveItensToCart({id, name, img, price, amount}: CartObjectType){
      handleSetTotalPrice(-price*amount)
      setItensObject(state => state.filter(ItensObject => {return ItensObject.id !== id}))
    }

    function handleSetTotalPrice(newPrice: number){
      setItensPrice(ItensPrice+newPrice)
    }
    function handleSetTotalAmount(amount: number){
      setItensAmount(ItensAmount+amount)
    }

    function addItensToCart({id, name, img, price, amount}: CartObjectType){
      setItensObject(state => [...state,{id, name, img, price, amount}].sort((a, b) => a.id - b.id));
    }

    function handleSetFormData({cep, rua, numero, complemento, bairro, cidade, uf, paymethodSelect}: FormInputs){
      setFormItens({cep, rua, numero, complemento, bairro, cidade, uf, paymethodSelect});
    }

    function handleFinishBuy(){
      setItensObject([])
      setItensAmount(0)
      setItensPrice(0)
    }
    useEffect(() => {
        // console.log("Form ERROR: "+formError);
        // console.log(paymethodSelect);
        console.log(FormItens);
      });

  return (
    <CartContext.Provider value={{
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
        handleFinishBuy
        }}>
            {children}
    </CartContext.Provider>
  )
}