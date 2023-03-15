import { Minus, Plus, Trash } from "phosphor-react";
import { useContext, useState } from "react";
import { CartContext } from "../../../../context/CartContext";
import { formatCurrency } from "../../../../utils/format";
import {
  Buttons,
  CenterDiv,
  Container,
  ItensCountCart,
  PriceDisplay,
  RemoveItemButton,
} from "./CartItem.styles";

interface CartItemProps {
  id: string;
  name: string;
  img: string;
  price: number;
  amount: number;
}

export function CartItem({ id, name, img, price, amount }: CartItemProps) {
  const {
    handleAddItensToCart,
    handleSetProductsAmount,
    handleSetProductsPrice,
    handleRemoveItensToCart,
  } = useContext(CartContext);
  const [amountItens, setAmountItens] = useState(amount);
  const totalPrice = (price / 100) * amount;

  function handleAdd() {
    setAmountItens(amountItens + 1);
    const amount = amountItens + 1;
    handleSetProductsAmount(+1);
    handleSetProductsPrice(+price);
    handleAddItensToCart({ id, name, img, price, amount });
  }

  function handleMinus() {
    setAmountItens(amountItens - 1);
    const amount = amountItens - 1;
    if (amount == 0) {
      handleRemoveItensToCart({ id, name, img, price, amount });
    } else {
      handleAddItensToCart({ id, name, img, price, amount });
    }
    handleSetProductsAmount(-1);
    handleSetProductsPrice(-price);
  }

  function handleRemove() {
    handleSetProductsAmount(-amount);
    handleSetProductsPrice(-price * amount);
    handleRemoveItensToCart({ id, name, img, price, amount });
  }

  return (
    <Container>
      <img src={img} alt="" />
      <CenterDiv>
        <h2>{name}</h2>
        <Buttons>
          <ItensCountCart>
            <a onClick={handleMinus}>
              <Minus size={16} weight="bold" />
            </a>
            {amountItens}
            <a onClick={handleAdd}>
              <Plus size={16} weight="bold" />
            </a>
          </ItensCountCart>

          <RemoveItemButton onClick={handleRemove}>
            <Trash size={16} weight="bold" />
            <p>REMOVER</p>
          </RemoveItemButton>
        </Buttons>
      </CenterDiv>
      <PriceDisplay>{formatCurrency(totalPrice)}</PriceDisplay>
    </Container>
  );
}
