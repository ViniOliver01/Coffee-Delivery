import { ShoppingCart } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import { CartBox, Container, CountItens } from "./Cart.styles";

interface CartProps {
  totalItens: number;
  totalPrice: number;
}

export function Cart({ totalItens, totalPrice }: CartProps) {
  const navigate = useNavigate();

  function GoToCart() {
    navigate("/checkout");
  }

  return (
    <Container>
      <CartBox onClick={GoToCart}>
        <ShoppingCart size={22} weight="fill" />
        <CountItens>{totalItens}</CountItens>
      </CartBox>
      <div>
        <p>Total</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </Container>
  );
}
