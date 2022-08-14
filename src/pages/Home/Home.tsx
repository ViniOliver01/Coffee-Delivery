import { Coffees } from "./components/coffees/Coffees";
import { CoffeesList, Container, CoverArea, CoverImage, IconImage, IconItem, IconsArea, ListMap, TextArea } from "./Home.styles";
import coverimage from "../../assets/home-cover.png"
import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";

const coffeesList = [
  {
    id: 0,
    type: ['tradicional'],
    name: 'Expresso Tradicional',
    image: 'expresso-tradicional',
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 9.90,
  },
  {
    id: 1,
    type: ['tradicional'],
    name: 'Expresso Americano',
    image: 'expresso-americano',
    description: "Expresso diluído, menos intenso que o tradicional",
    price: 9.90,
  },
  {
    id: 2,
    type: ['tradicional'],
    name: 'Expresso Cremoso',
    image: 'expresso-cremoso',
    description: "Café expresso tradicional com espuma cremosa",
    price: 9.90,
  },
  {
    id: 3,
    type: ['tradicional', 'gelado'],
    name: 'Expresso Gelado',
    image: 'expresso-gelado',
    description: "Bebida preparada com café expresso e cubos de gelo",
    price: 9.90,
  },
  {
    id: 4,
    type: ['tradicional', 'com leite'],
    name: 'Café com Leite',
    image: 'cafe-com-leite',
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    price: 9.90,
  },
  {
    id: 5,
    type: ['tradicional', 'com leite'],
    name: 'Latte',
    image: 'latte',
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    price: 9.90,
  },
  {
    id: 6,
    type: ['tradicional', 'com leite'],
    name: 'Capuccino',
    image: 'capuccino',
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    price: 9.90,
  },
  {
    id: 7,
    type: ['tradicional', 'com leite'],
    name: 'Macchiato',
    image: 'macchiato',
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    price: 9.90,
  },
  {
    id: 8,
    type: ['tradicional', 'com leite'],
    name: 'Mocaccino',
    image: 'mocaccino',
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    price: 9.90,
  },
  {
    id: 9,
    type: ['especial', 'com leite'],
    name: 'Chocolate Quente',
    image: 'chocolate-quente',
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    price: 9.90,
  },
  {
    id: 10,
    type: ['especial', 'alcoólico', 'gelado'],
    name: 'Cubano',
    image: 'cubano',
    description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
    price: 9.90,
  },
  {
    id: 11,
    type: ['especial'],
    name: 'Havaiano',
    image: 'havaiano',
    description: "Bebida adocicada preparada com café e leite de coco",
    price: 9.90,
  },
  {
    id: 12,
    type: ['especial'],
    name: 'Árabe',
    image: 'arabe',
    description: "Bebida preparada com grãos de café árabe e especiarias",
    price: 9.90,
  },
  {
    id: 13,
    type: ['especial', 'alcoólico'],
    name: 'Irlandês',
    image: 'irlandes',
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    price: 9.90,
  },
]

export function Home(){
  const {
    ItensAmount
  } = useContext(CartContext)
  
  return (
    <Container>
      <CoverArea>
        <TextArea>
          <h1>Encontre o café perfeito <br /> para qualquer hora do dia</h1>
          <h2>Com o Coffee Delivery você recebe seu café onde estiver, a<br />qualquer hora</h2>
          <IconsArea>
            <IconItem>
              <IconImage id="orange"><ShoppingCart size={16} weight='fill'/></IconImage>
              <p>Compra simples e segura</p>
            </IconItem>

            <IconItem>
              <IconImage id="dark"><Package size={16} weight='fill'/></IconImage>
              <p>Embalagem mantém o café intacto</p>
            </IconItem>

            <IconItem>
              <IconImage id="yellow"><Timer size={16} weight='fill'/></IconImage>
              <p>Entrega rápida e rastreada</p>
            </IconItem>

            <IconItem>
              <IconImage id="purple"><Coffee size={16} weight='fill'/></IconImage>
              <p>O café chega fresquinho até você</p>
            </IconItem>
            
          </IconsArea>

        </TextArea>
        <CoverImage src={coverimage} />
      </CoverArea>
    
      <CoffeesList>
        <h1>Nossos cafés</h1>
        <ListMap>
          {coffeesList.map(item => {
              return (
                <Coffees 
                  key={item.id}
                  id={item.id} 
                  type={item.type} 
                  name={item.name} 
                  img={item.image}
                  description={item.description} 
                  price={item.price}/>
              )
            })}
        </ListMap>
      </CoffeesList>
      
    </Container>
  );
}