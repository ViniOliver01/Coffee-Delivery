import { Center, Spinner, useMediaQuery } from "@chakra-ui/react";
import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import coverImage from "../../assets/home-cover.png";
import { ICoffeeListResponse, ShoppingContext } from "./../../context/ShoppingContext";
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
  const { getCoffees } = useContext(ShoppingContext);
  const [coffeesList, setCoffeesList] = useState<ICoffeeListResponse[]>([]);

  useEffect(() => {
    async function getCoffeeList() {
      try {
        const response = await getCoffees();
        setCoffeesList(response);
      } catch (error) {
        console.warn("🚀 / getCoffeeList / error", error);
      }
    }
    getCoffeeList();
  }, []);

  if (coffeesList.length === 0) {
    setTimeout(() => {
      return (
        <Center>
          <Spinner size="xl" />
        </Center>
      );
    }, 250);
  }

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  const [isDesktop] = useMediaQuery("(min-width: 701px)", {
    ssr: true,
    fallback: false,
  });

  if (isMobile) {
    return (
      <Container>
        <TextArea>
          <h1>
            Encontre o café perfeito <br /> para qualquer hora do dia
          </h1>
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

        <CoffeesList>
          <h1>Nossos cafés</h1>
          <ListMap>
            {coffeesList.length !== 0 ? (
              coffeesList.map((item) => {
                return (
                  <Coffees
                    key={item.id}
                    id={item.id}
                    specifications={item.specifications}
                    name={item.name}
                    img={item.image_url}
                    description={item.description}
                    price={item.price}
                  />
                );
              })
            ) : (
              <Spinner size="xl" />
            )}
          </ListMap>
        </CoffeesList>
      </Container>
    );
  } else if (isDesktop) {
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
          <CoverImage>
            <img src={coverImage} alt="" />
          </CoverImage>
        </CoverArea>

        <CoffeesList>
          <h1>Nossos cafés</h1>
          <ListMap>
            {coffeesList.length !== 0 ? (
              coffeesList.map((item) => {
                return (
                  <Coffees
                    key={item.id}
                    id={item.id}
                    specifications={item.specifications}
                    name={item.name}
                    img={item.image_url}
                    description={item.description}
                    price={item.price}
                  />
                );
              })
            ) : (
              <Spinner size="xl" />
            )}
          </ListMap>
        </CoffeesList>
      </Container>
    );
  }
}
