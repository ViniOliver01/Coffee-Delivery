import { ShoppingCart } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { CartBox, Container, CountItens } from "./Cart.styles";

interface CartProps {
  itens: number;
}

export function Cart({ itens }: CartProps) {
  const navigate = useNavigate();

  function GoToCart() {
    navigate("/checkout");
  }

  return (
    <Container>
      <CartBox onClick={GoToCart}>
        <ShoppingCart size={22} weight="fill" />
        <CountItens>{itens}</CountItens>
      </CartBox>
      <div>
        <p>Total</p>
        <p>R$ 12,25</p>
      </div>
    </Container>
  );
}
