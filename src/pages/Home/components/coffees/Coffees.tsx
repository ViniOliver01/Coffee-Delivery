import { CartButton, Container, ItensCount, ShopSection, Price, IconCartButton } from "./Coffees.styles";
import { Plus, Minus, ShoppingCartSimple} from 'phosphor-react'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../context/CartContext/CartContext";

interface CoffeesProps{
    id: number
    type: string[]
    name: string
    img: string
    description: string
    price: number
    children?: React.ReactNode
}
const URLImg = '../src/assets/CoffeeTypes/'

export function Coffees({id, type, name, img, description, price}: CoffeesProps){
  const [itensCount, setItensCount] = useState(1);
  const [efect, setEfect] = useState(false)
  const [textCartAddButton, setTextCartAddButton] = useState('Adicionar ao carrinho')

  const triggerEfect = () => {
    setEfect(true)
    setTextCartAddButton('Adicionado com sucesso')
    setTimeout(() => setEfect(false), 2000);
    setTimeout(() => setTextCartAddButton('Adicionar ao carrinho'), 2000);
    
  }

  const {
    ItensAmount,
    ItensObject,
    handleSetTotalAmount,
    handleAddItensToCart,
    handleSetTotalPrice,
    handleCheckObjectsState
    } = useContext(CartContext)
  

  function MinusItem(){
    if (itensCount!=1) {
      setItensCount(state => state-1);
    }
  }
  function PlusItem(){
    setItensCount(state => state+1);
  }
  function AddItemToCart(e: any){
    triggerEfect()

    let amount = itensCount;
    handleSetTotalPrice(price*amount)
    const newAmount = handleCheckObjectsState({id, name, img, price, amount})
    handleSetTotalAmount(amount)
    amount = newAmount+amount
    handleAddItensToCart({id, name, img, price, amount})
    setItensCount(1);
  }
  const FormatedPriceToBrazilianReal = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits : 2
    }).format(price);
    
  return (
    <Container>
        <img src={URLImg+img+'.png'} alt="" />
        <ul>
          {type.map(item => {
            return(
              <li key={item}>{item}</li>
            )
          })}
        </ul>
        <h2>{name}</h2>
        <h3>{description}</h3>
        <ShopSection>
          <Price><p>R$<span>{FormatedPriceToBrazilianReal}</span></p></Price>
          
          <ItensCount>
            <a onClick={MinusItem}><Minus size={16} weight="bold"/></a>
            {itensCount}
            <a onClick={PlusItem}><Plus size={16} weight="bold" /></a>
          </ItensCount>

          <CartButton 
            onClick={AddItemToCart} 
            onAnimationEnd={triggerEfect} 
            className={efect ? 'addCartEfect' : ''}>
            <p>{textCartAddButton}</p>

            <IconCartButton>
              <span> {efect ? <Plus size={10}/> : ''} </span>
              <ShoppingCartSimple size={16} weight='fill'></ShoppingCartSimple>
            </IconCartButton>
  
          </CartButton>
        </ShopSection>
    </Container>
  );
}