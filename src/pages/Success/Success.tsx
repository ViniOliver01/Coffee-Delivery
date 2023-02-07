import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import successImg from "../../assets/SuccessImg.png";
import { ShoppingContext } from "./../../context/ShoppingContext";
import { Container, IconImage, ImageArea, ListDetails, Textarea } from "./Success.styles";

interface CheckoutData {
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
  };
  payment_type: string;
}

export function Success() {
  const { getPurchaseData } = useContext(ShoppingContext);
  const { id } = useParams();

  const [data, setData] = useState<CheckoutData>();

  useEffect(() => {
    async function getPurchase() {
      const { addressData, purchaseData } = await getPurchaseData(id);
      setData({
        address: {
          street: addressData.street,
          number: addressData.number,
          city: addressData.city,
          state: addressData.state,
        },
        payment_type: purchaseData.payment_type,
      });
    }
    getPurchase();
  }, []);

  return (
    <Container>
      <Textarea>
        <h1>Uhu! Pedido confirmado</h1>
        <h2>Agora é só aguardar que logo o café chegará até você</h2>
        <section>
          <ListDetails>
            <IconImage className="purple">
              <MapPin weight="fill" size={16} />
            </IconImage>
            <div>
              <p>
                Entrega em{" "}
                <span>
                  {data?.address.street}, {data?.address.number}
                </span>
              </p>
              <p>
                {data?.address.city}, {String(data?.address.state).toUpperCase()}
              </p>
            </div>
          </ListDetails>

          <ListDetails>
            <IconImage className="yellow">
              <Timer weight="fill" size={16} />
            </IconImage>
            <div>
              <p>Previsão de entrega</p>
              <span>20 min - 30 min </span>
            </div>
          </ListDetails>

          <ListDetails>
            <IconImage className="yellow-dark">
              <CurrencyDollar weight="fill" size={16} />
            </IconImage>
            <div>
              <p>Pagamento na entrega</p>
              <span>{data?.payment_type}</span>
            </div>
          </ListDetails>
        </section>
      </Textarea>
      <ImageArea>
        <img src={successImg} alt="" />
      </ImageArea>
    </Container>
  );
}
