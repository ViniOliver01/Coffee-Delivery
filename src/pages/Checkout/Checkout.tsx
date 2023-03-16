import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
  Package,
  SmileySad,
} from "phosphor-react";
import {
  AddressBox,
  AddressItem,
  CartList,
  Container,
  HeaderItem,
  NoAddressMessage,
  PaymentBox,
  PaymentButton,
  PaymentButtonList,
} from "./Checkout.styles";

import { useMediaQuery, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Form/Button/Button";
import { Link } from "../../components/Form/Button/Link";
import { CartContext } from "../../context/CartContext";
import { IAddressesResponse, UserContext } from "../../context/UserContext";
import { formatCurrency } from "../../utils/format";
import { AuthContext } from "./../../context/AuthContext";
import { CartItem } from "./components/CartItemList/CartItem";

export function Checkout() {
  const { getAddresses } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const {
    products_amount,
    products_list,
    products_value,
    total_value,
    delivery_value,
    handleFinishBuy,
  } = useContext(CartContext);

  const [addressList, setAddressList] = useState<IAddressesResponse[]>([]);
  const [payMethodSelect, setPayMethodSelect] = useState(2); // inicia com o dinheiro selecionado
  const [addressSelect, setAddressSelect] = useState(0); // inicia com o dinheiro selecionado
  const [isSubmitting, setIsSubmitting] = useState(false); // inicia com o dinheiro selecionado

  const payMethod = ["Cartão de Crédito", "Cartão de Débito", "Dinheiro"];

  const navigation = useNavigate();
  const toast = useToast();

  async function onSubmit() {
    isAuthenticated;

    if (!isAuthenticated) {
      toast({
        title: "Você ainda não está logado",
        status: "error",
        duration: 9000,
        position: isMobile ? "top" : "bottom",
        isClosable: true,
      });
    } else if (addressList.length === 0) {
      toast({
        title: "Nenhum endereço ativo",
        status: "error",
        duration: 9000,
        position: isMobile ? "top" : "bottom",
        isClosable: true,
      });
    }

    if (products_amount === 0) {
      toast({
        title: "Carrinho vazio",
        status: "error",
        duration: 9000,
        position: isMobile ? "top" : "bottom",
        isClosable: true,
      });
    }

    if (products_amount !== 0 && addressList.length !== 0) {
      setIsSubmitting(true);

      setTimeout(async () => {
        const response = await handleFinishBuy(
          addressList[addressSelect].id,
          payMethod[payMethodSelect]
        );
        setIsSubmitting(false);
        if (response === undefined) {
          toast({
            title: "Erro ao efetuar a compra",
            status: "error",
            duration: 9000,
            position: isMobile ? "top" : "bottom",
            isClosable: true,
          });
        }
        navigation(`/success/${response.id}`);
      }, 1000);
    }
  }

  function GoToAddress() {
    navigation("/account/address");
  }

  function GoToLogin() {
    navigation("/login");
  }

  useEffect(() => {
    async function listAddresses() {
      const data = await getAddresses();
      setAddressList(data);
    }
    if (isAuthenticated) {
      listAddresses();
    }
  }, []);

  const [isMobile] = useMediaQuery("(max-width: 900px)", {
    ssr: true,
    fallback: false,
  });

  const [isDesktop] = useMediaQuery("(min-width: 901px)", {
    ssr: true,
    fallback: false,
  });

  if (isMobile) {
    return (
      <Container>
        <CartList>
          {products_list.map((item) => {
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
          {products_list.length == 0 ? (
            <span>
              Carrinho Vazio <SmileySad size={32} />{" "}
            </span>
          ) : (
            ""
          )}

          <div className="InfoPrices">
            <h4 className="left">Total de Itens</h4>
            <h4 className="right">{formatCurrency(products_value / 100)}</h4>
          </div>

          <div className="InfoPrices">
            <h4 className="left">Entrega</h4>
            <h4 className="right">{formatCurrency(delivery_value / 100)}</h4>
          </div>

          <div className="InfoPrices">
            <h3 className="left">Total</h3>
            <h3 className="right">{formatCurrency(total_value / 100)}</h3>
          </div>
        </CartList>

        <AddressBox>
          <HeaderItem>
            <MapPinLine className="icon yellow" size={22} />
            <div>
              <h2>Endereço de Entrega</h2>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </HeaderItem>
          {addressList.length > 0 ? (
            <NoAddressMessage>
              <p> Para editar seus endereços vá para</p>
              <Link onClick={GoToAddress}>meus endereços</Link>
            </NoAddressMessage>
          ) : isAuthenticated ? (
            <div className="noAddresses">
              <SmileySad size={32} />
              <NoAddressMessage>
                <p>Você ainda não tem um endereço cadastrado, para cadastrar vá até </p>
                <Link onClick={GoToAddress}>meus endereços</Link>
              </NoAddressMessage>
            </div>
          ) : (
            <div className="noAddresses">
              <SmileySad size={32} />
              <NoAddressMessage>
                <p>Parece que você não está logado, para entrar clique em</p>
                <Link onClick={GoToLogin}>Entrar</Link>
              </NoAddressMessage>
            </div>
          )}

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
          </div>
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
              active={payMethodSelect === 0}
              onClick={() => setPayMethodSelect(0)}
            >
              <CreditCard /> Cartão de Crédito
            </PaymentButton>

            <PaymentButton
              active={payMethodSelect === 1}
              onClick={() => setPayMethodSelect(1)}
            >
              <Bank /> Cartão de Débito
            </PaymentButton>

            <PaymentButton
              active={payMethodSelect === 2}
              onClick={() => setPayMethodSelect(2)}
            >
              <Money /> Dinheiro
            </PaymentButton>
          </PaymentButtonList>
        </PaymentBox>

        <Button
          onClick={onSubmit}
          isLoading={isSubmitting}
          loadingText="Confirmando..."
          color="purple"
          type="submit"
        >
          CONFIRMAR PEDIDO
        </Button>
      </Container>
    );
  } else if (isDesktop) {
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
              <NoAddressMessage>
                <p> Para editar seus endereços vá para</p>
                <Link onClick={GoToAddress}>meus endereços</Link>
              </NoAddressMessage>
            ) : isAuthenticated ? (
              <div className="noAddresses">
                <SmileySad size={32} />
                <NoAddressMessage>
                  <p>Você ainda não tem um endereço cadastrado, para cadastrar vá até </p>
                  <Link onClick={GoToAddress}>meus endereços</Link>
                </NoAddressMessage>
              </div>
            ) : (
              <div className="noAddresses">
                <SmileySad size={32} />
                <NoAddressMessage>
                  <p>Parece que você não está logado, para entrar clique em</p>
                  <Link onClick={GoToLogin}>Entrar</Link>
                </NoAddressMessage>
              </div>
            )}

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
            </div>
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
                active={payMethodSelect === 0}
                onClick={() => setPayMethodSelect(0)}
              >
                <CreditCard /> Cartão de Crédito
              </PaymentButton>

              <PaymentButton
                active={payMethodSelect === 1}
                onClick={() => setPayMethodSelect(1)}
              >
                <Bank /> Cartão de Débito
              </PaymentButton>

              <PaymentButton
                active={payMethodSelect === 2}
                onClick={() => setPayMethodSelect(2)}
              >
                <Money /> Dinheiro
              </PaymentButton>
            </PaymentButtonList>
          </PaymentBox>
        </div>
        <CartList>
          {products_list.map((item) => {
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
          {products_list.length == 0 ? (
            <span>
              Carrinho Vazio <SmileySad size={32} />{" "}
            </span>
          ) : (
            ""
          )}

          <div className="InfoPrices">
            <h4 className="left">Total de Itens</h4>
            <h4 className="right">{formatCurrency(products_value / 100)}</h4>
          </div>

          <div className="InfoPrices">
            <h4 className="left">Entrega</h4>
            <h4 className="right">{formatCurrency(delivery_value / 100)}</h4>
          </div>

          <div className="InfoPrices">
            <h3 className="left">Total</h3>
            <h3 className="right">{formatCurrency(total_value / 100)}</h3>
          </div>

          <Button
            onClick={onSubmit}
            isLoading={isSubmitting}
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
}
