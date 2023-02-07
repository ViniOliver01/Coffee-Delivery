import { RadioGroup } from "@chakra-ui/react";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
  Package,
  SmileySad,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Form/Button";
import { IAddressesResponse, UserContext } from "../../context/UserContext";
import { CartContext } from "./../../context/CartContext/CartContext";
import {
  AddressBox,
  AddressItem,
  CartList,
  Container,
  HeaderItem,
  PaymentBox,
  PaymentButton,
  PaymentButtonList,
} from "./Checkout.styles";
import { CartItem } from "./components/CartItemList/CartItem";

export interface FormInputs {
  cep: number;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  payMethodSelect: string;
}

export function Checkout() {
  // const [paymethodSelectError, setPaymethodError] = useState(false);
  // const [formError, setformError] = useState(false);
  // const [FormItens, setFormItens] = useState<FormInputs>();

  // const navigation = useNavigate();
  // function GoToSuccess() {
  //   navigation("/success");
  // }

  // // console.log(watch("cep")) // watch input value by passing the name of it
  // function addPaymenthodToForm(data: FormInputs) {
  //   if (!!paymethodSelect) {
  //     if (ItensAmount != 0) {
  //       setformError(false);
  //       setFormItens({ ...data, paymethodSelect: paymethodSelect });
  //       handleSetFormData({ ...data, paymethodSelect: paymethodSelect });
  //       handleFinishBuy();
  //       GoToSuccess();
  //     }
  //   } else {
  //     setPaymethodError(true);
  //     setTimeout(() => {
  //       setPaymethodError(false);
  //     }, 4000);
  //     setformError(true);
  //     setFormItens({
  //       bairro: "",
  //       cep: 0,
  //       cidade: "",
  //       complemento: "",
  //       numero: 0,
  //       paymethodSelect: "",
  //       rua: "",
  //       uf: "",
  //     });
  //   }
  // }

  // function handlePaymethodSelect(e: any) {
  //   const id = e.target.id;
  //   // console.log(id)
  //   if (paymethodSelect == id) {
  //     setPaymethodSelect("");
  //   } else {
  //     setPaymethodSelect(id);
  //   }
  // }
  // const FormatedItensPrice = new Intl.NumberFormat("pt-BR", {
  //   style: "decimal",
  //   minimumFractionDigits: 2,
  // }).format(ItensPrice);

  // const FormatedDeliveryPrice = new Intl.NumberFormat("pt-BR", {
  //   style: "decimal",
  //   minimumFractionDigits: 2,
  // }).format(ItensAmount == 0 ? 0 : deliveryValue);

  // const FormatedTotalPrice = new Intl.NumberFormat("pt-BR", {
  //   style: "decimal",
  //   minimumFractionDigits: 2,
  // }).format(ItensAmount == 0 ? 0 : ItensPrice + deliveryValue);

  // // useEffect(() => {
  // //   // console.log("Form ERROR: "+formError);
  // //   // console.log(paymethodSelect);
  // //   console.log(FormItens);
  // // });
  const { getAddresses } = useContext(UserContext);
  const { ItensAmount, ItensObject } = useContext(CartContext);

  const [value, setValue] = useState("1");
  const [addressList, setAddressList] = useState<IAddressesResponse[]>([]);
  const [paymethodSelect, setPaymethodSelect] = useState(2); // inicia com o dinheiro selecionado
  const [addressSelect, setAddressSelect] = useState(0); // inicia com o dinheiro selecionado
  const [isSubmitting, setIsSubmitting] = useState(false); // inicia com o dinheiro selecionado
  const navigation = useNavigate();

  async function onSubmit() {
    console.log("🚀 / onSubmit / data", paymethodSelect, addressSelect);
    console.log("🚀 / onSubmit / ItensAmount", ItensAmount);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // navigation("/success");
    }, 1000);
  }

  useEffect(() => {
    async function listAddresses() {
      const data = await getAddresses();
      setAddressList(data);
    }
    listAddresses();
  }, []);

  return (
    <Container>
      <div>
        <AddressBox>
          <HeaderItem>
            <MapPinLine className="icon yellow" size={22} />
            <div>
              <h2>Endereço de Entrega</h2>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </HeaderItem>
          {addressList.length > 0 ? (
            <p>
              Para editar seus endereços clique <a href="/account/address">AQUI</a>
            </p>
          ) : null}

          <div>
            {addressList.map((address, index) => {
              return (
                <AddressItem
                  key={address.id}
                  onClick={() => setAddressSelect(index)}
                  checked={addressSelect == index}
                >
                  <Package weight="fill" />
                  <div>
                    <span>{address.name}</span>
                    <p>
                      {address.street}, {address.number}. {address.city} -{" "}
                      {String(address.state).toUpperCase()}
                    </p>
                  </div>
                </AddressItem>
              );
            })}
            {addressList.length == 0 ? (
              <div className="noAddresses">
                <SmileySad size={32} />
                <h2>
                  Você ainda não tem um endereço cadastrado, vá até
                  <a href="/account/address"> Meus endereços </a>e adicione um novo
                  endereço
                </h2>
              </div>
            ) : null}
          </div>

          <RadioGroup onChange={setValue} value={value}>
            <div>
              {/* <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio> */}
            </div>
          </RadioGroup>
        </AddressBox>

        <PaymentBox>
          <HeaderItem>
            <CurrencyDollar size={22} className="icon purple" />
            <div>
              <h2>Pagamento</h2>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </HeaderItem>
          <PaymentButtonList>
            <PaymentButton
              active={paymethodSelect === 0}
              onClick={() => setPaymethodSelect(0)}
            >
              <CreditCard /> Cartão de Crédito
            </PaymentButton>

            <PaymentButton
              active={paymethodSelect === 1}
              onClick={() => setPaymethodSelect(1)}
            >
              <Bank /> Cartão de Débito
            </PaymentButton>

            <PaymentButton
              active={paymethodSelect === 2}
              onClick={() => setPaymethodSelect(2)}
            >
              <Money /> Dinheiro
            </PaymentButton>
          </PaymentButtonList>
        </PaymentBox>
      </div>
      <CartList>
        {ItensObject.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              img={item.img}
              price={item.price}
              amount={item.amount}
            />
          );
        })}
        {ItensObject.length == 0 ? (
          <span>
            Carrinho Vazio <SmileySad size={32} />{" "}
          </span>
        ) : (
          ""
        )}

        <div className="InfoPrices">
          <h4 className="left">Total de Itens</h4>
          <h4 className="right">R$ {}</h4>
        </div>

        <div className="InfoPrices">
          <h4 className="left">Entrega</h4>
          <h4 className="right">R$ {}</h4>
        </div>

        <div className="InfoPrices">
          <h3 className="left">Total</h3>
          <h3 className="right">R$ {}</h3>
        </div>

        <Button
          onClick={onSubmit}
          isLoading={isSubmitting}
          isDisabled={ItensAmount === 0 || addressList.length === 0}
          loadingText="Confirmando..."
          color="purple"
          type="submit"
        >
          CONFIRMAR PEDIDO
        </Button>
      </CartList>
    </Container>
  );
}
