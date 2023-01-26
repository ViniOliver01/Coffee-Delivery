import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { useContext } from "react";
import coverimage from "../../assets/home-cover.png";
import { CartContext } from "../../context/CartContext/CartContext";
import { coffeesList } from "../../context/CartContext/CoffesList";
import { Coffees } from "./components/coffees/Coffees";
import {
  CoffeesList,
  Container,
  CoverArea,
  CoverImage,
  IconImage,
  IconItem,
  IconsArea,
  ListMap,
  TextArea,
} from "./Home.styles";

export default function Home() {
  const { ItensObject } = useContext(CartContext);

  return (
    <Container>
      <CoverArea>
        <TextArea>
          <h1>
            Encontre o café perfeito <br /> para qualquer hora do dia
          </h1>
          <h2>
            Com o Coffee Delivery você recebe seu café onde estiver, a<br />
            qualquer hora
          </h2>
          <IconsArea>
            <IconItem>
              <IconImage id="orange">
                <ShoppingCart size={16} weight="fill" />
              </IconImage>
              <p>Compra simples e segura</p>
            </IconItem>

            <IconItem>
              <IconImage id="dark">
                <Package size={16} weight="fill" />
              </IconImage>
              <p>Embalagem mantém o café intacto</p>
            </IconItem>

            <IconItem>
              <IconImage id="yellow">
                <Timer size={16} weight="fill" />
              </IconImage>
              <p>Entrega rápida e rastreada</p>
            </IconItem>

            <IconItem>
              <IconImage id="purple">
                <Coffee size={16} weight="fill" />
              </IconImage>
              <p>O café chega fresquinho até você</p>
            </IconItem>
          </IconsArea>
        </TextArea>
        <CoverImage src={coverimage} />
      </CoverArea>

      <CoffeesList>
        <h1>Nossos cafés</h1>
        <ListMap>
          {coffeesList.map((item) => {
            return (
              <Coffees
                key={item.id}
                id={item.id}
                type={item.type}
                name={item.name}
                img={item.image}
                description={item.description}
                price={item.price}
              />
            );
          })}
        </ListMap>
      </CoffeesList>
    </Container>
  );
}
