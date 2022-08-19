import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { Container, IconImage, ImageArea, ListDetails, Textarea } from "./Success.styles";
import successimg from '../../assets/successimg.png'

export function Success(){
    const {
        FormItens
        } = useContext(CartContext)
        console.log(FormItens);
        
  return (
    <Container>
        <Textarea>
            <h1>Uhu! Pedido confirmado</h1>
            <h2>Agora é só aguardar que logo o café chegará até você</h2>
            <section>
                <ListDetails>
                    <IconImage className="purple">
                        <MapPin weight="fill" size={16}/> 
                    </IconImage>
                    <div>
                        <p>Entrega em <span>{FormItens?.rua}, {FormItens?.numero}</span></p>   
                        <p>{FormItens?.bairro} - {FormItens?.cidade}, {FormItens?.uf}</p>   
                    </div>
                </ListDetails>

                <ListDetails>
                    <IconImage className="yellow">
                        <Timer weight="fill" size={16}/> 
                    </IconImage>
                    <div>
                        <p>Previsão de entrega</p>   
                        <span>20 min - 30 min </span>  
                    </div>
                </ListDetails>

                <ListDetails>
                    <IconImage className="yellow-dark">
                        <CurrencyDollar weight="fill" size={16}/>
                    </IconImage>
                    <div>
                        <p>Pagamento na entrega</p>   
                        <span>{FormItens?.paymethodSelect}</span>  
                    </div>
                </ListDetails>
            </section>
        </Textarea>
        <ImageArea>
            <img src={successimg} alt="" />
        </ImageArea>
    </Container>
  );
}