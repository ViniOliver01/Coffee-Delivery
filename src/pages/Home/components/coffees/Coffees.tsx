import { CartButton, Container, ItensCount, ShopSection, Price } from "./Coffees.styles";
import { Plus, Minus, ShoppingCartSimple} from 'phosphor-react'
import { useState } from "react";

interface CoffeesProps{
    id: number
    type: string[]
    name: string
    img: string
    description: string
    price: number
    children?: React.ReactNode
}
const URLImg = '../../../../src/assets/CoffeeTypes/'

export function Coffees({id, type, name, img, description, price}: CoffeesProps){
  const [itensCount, setItensCount] = useState(1);
  

  function MinusItem(){
    setItensCount(itensCount-1);
  }
  function PlusItem(){
    setItensCount(itensCount+1);
  }
  function AddItemToCart(){
    console.log("cafe: "+id+" quantidade: "+itensCount);
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
              <li>{item}</li>
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

          <CartButton onClick={AddItemToCart}>
            <ShoppingCartSimple size={22} weight='fill' />
          </CartButton>
        </ShopSection>
    </Container>
  );
}