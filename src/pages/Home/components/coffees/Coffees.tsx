import { useMediaQuery } from "@chakra-ui/react";
import { Check, Minus, Plus, ShoppingCartSimple } from "phosphor-react";
import { useContext, useState } from "react";
import Button from "../../../../components/Form/Button/Button";
import { CartContext } from "../../../../context/CartContext";
import { formatCurrency } from "../../../../utils/format";
import { imgDefault } from "../../../../utils/imgDefault";
import { Container, ItensCount, Price, ShopSection } from "./Coffees.styles";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishLoading, setIsFinishLoading] = useState(false);

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

  function AddItemToCart() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFinishLoading(true);
      addItem();
      setTimeout(() => {
        setIsFinishLoading(false);
      }, 1500);
    }, 800);
  }

  function addItem() {
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

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  if (isMobile) {
    return (
      <Container>
        <img src={img} alt="" />

        <ShopSection>
          <h2>{name}</h2>
          <Price>
            <span>{formatCurrency(price / 100)}</span>
          </Price>
        </ShopSection>

        <div>
          <Button
            onClick={AddItemToCart}
            isDisabled={isLoading || isFinishLoading}
            color={isFinishLoading ? "green" : "purple"}
            isLoading={isLoading}
            loadingText=""
            fontSize="0.85rem"
          >
            {isFinishLoading ? (
              <Check size={22} weight="bold" />
            ) : (
              <ShoppingCartSimple size={18} weight="fill" />
            )}
          </Button>
        </div>
      </Container>
    );
  } else {
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
              <span>{formatCurrency(price / 100)}</span>
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

          <Button
            onClick={AddItemToCart}
            rightIcon={
              isFinishLoading ? (
                <Check size={22} weight="bold" />
              ) : (
                <ShoppingCartSimple size={18} weight="fill" />
              )
            }
            isDisabled={isLoading || isFinishLoading}
            color={isFinishLoading ? "green" : "purple"}
            isLoading={isLoading}
            loadingText=""
            fontSize="0.85rem"
          >
            {isFinishLoading ? "ADICIONADO AO CARRINHO" : "ADICIONAR AO CARRINHO"}
          </Button>
        </ShopSection>
      </Container>
    );
  }
}
