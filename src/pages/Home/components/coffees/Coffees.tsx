import { Minus, Plus, ShoppingCartSimple } from "phosphor-react";
import { useContext, useState } from "react";
import { CartContext } from "../../../../context/CartContext";
import { formatCurrency } from "../../../../utils/format";
import { imgDefault } from "../../../../utils/imgDefault";
import {
  CartButton,
  Container,
  IconCartButton,
  ItensCount,
  Price,
  ShopSection,
} from "./Coffees.styles";

interface CoffeesProps {
  id: string;
  specifications: {
    id: string;
    name: string;
    created_at: Date;
  }[];
  name: string;
  img: string;
  description: string;
  price: number;
  children?: React.ReactNode;
}

export function Coffees({
  id,
  specifications,
  name,
  img,
  description,
  price,
}: CoffeesProps) {
  const [itensCount, setItensCount] = useState(1);
  const [effect, setEffect] = useState(false);
  const [textCartAddButton, setTextCartAddButton] = useState("Adicionar ao carrinho");

  const triggerEffect = () => {
    setEffect(true);
    setTextCartAddButton("Adicionado com sucesso");
    setTimeout(() => setEffect(false), 2000);
    setTimeout(() => setTextCartAddButton("Adicionar ao carrinho"), 2000);
  };

  const {
    handleSetProductsAmount,
    handleAddItensToCart,
    handleSetProductsPrice,
    handleCheckObjectsState,
  } = useContext(CartContext);

  function MinusItem() {
    if (itensCount != 1) {
      setItensCount((state) => state - 1);
    }
  }

  function PlusItem() {
    setItensCount((state) => state + 1);
  }

  function AddItemToCart(e: any) {
    triggerEffect();

    let amount = itensCount;
    handleSetProductsPrice(price * amount);
    const newAmount = handleCheckObjectsState({ id, name, img, price, amount });
    handleSetProductsAmount(amount);
    amount = newAmount + amount;
    handleAddItensToCart({ id, name, img, price, amount });
    setItensCount(1);
  }

  if (img === null) {
    img = imgDefault({ type: "Coffee" });
  }

  return (
    <Container>
      <img src={img} alt="" />
      <ul>
        {specifications.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <h2>{name}</h2>
      <h3>{description}</h3>
      <ShopSection>
        <Price>
          <p>
            R$<span>{formatCurrency(price / 100)}</span>
          </p>
        </Price>

        <ItensCount>
          <a onClick={MinusItem}>
            <Minus size={16} weight="bold" />
          </a>
          {itensCount}
          <a onClick={PlusItem}>
            <Plus size={16} weight="bold" />
          </a>
        </ItensCount>

        <CartButton
          onClick={AddItemToCart}
          onAnimationEnd={triggerEffect}
          className={effect ? "addCartEfect" : ""}
        >
          <p>{textCartAddButton}</p>

          <IconCartButton>
            <span> {effect ? <Plus size={10} /> : ""} </span>
            <ShoppingCartSimple size={16} weight="fill"></ShoppingCartSimple>
          </IconCartButton>
        </CartButton>
      </ShopSection>
    </Container>
  );
}
