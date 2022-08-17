import { Container, CountItens } from "./Cart.styles";
import { ShoppingCart } from 'phosphor-react';
import { useNavigate } from "react-router-dom";

interface CartProps {
    itens: number;
}

export function Cart({itens}: CartProps){
  const navigate = useNavigate();

  function GoToCart(){
    navigate('/checkout');
  }

  return (
    <Container onClick={GoToCart}>
        <p>Meu Carrinho</p>
        <ShoppingCart size={22} weight="fill"/>
        <CountItens>{itens}</CountItens>
    </Container>
  );
}