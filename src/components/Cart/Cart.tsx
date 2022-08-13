import { Container, CountItens } from "./Cart.styles";
import { ShoppingCart } from 'phosphor-react';

interface CartProps {
    itens: number;
}

export function Cart({itens}: CartProps){
  return (
    <Container>
        <ShoppingCart size={22} weight="fill"/>
        <CountItens>{itens}</CountItens>
    </Container>
  );
}