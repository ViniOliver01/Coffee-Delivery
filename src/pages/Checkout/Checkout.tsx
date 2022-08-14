import { CartList, Container, FormInput, HeaderItem, InputText, PaymentButton, PaymentButtonList, PaymentMethod } from "./Checkout.styles";
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money, Trash } from 'phosphor-react';
import { CartItem } from "./components/CartItemList/CartItem";
import { useState } from "react";

const ListCart = [
  {
    id: 0,
    type: ['tradicional'],
    name: 'Expresso Tradicional',
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 9.90,
  },
  {
    id: 1,
    type: ['tradicional'],
    name: 'Expresso Americano',
    description: "Expresso diluído, menos intenso que o tradicional",
    price: 9.90,
  },
]

export function Checkout(){
  const [paymethodSelect, setPaymethodSelect] = useState('');

    function handlePaymethodSelect(e: any){
      const id = e.target.id;
      console.log(id)
      if(paymethodSelect==id){
        setPaymethodSelect("");
        
      }else{
        setPaymethodSelect(id);
      }
    }

  return (
    <Container>
      <FormInput>
        <HeaderItem>
          <MapPinLine className="icon yellow" size={22} />
          <div>
            <h1>Endereço de Entrega</h1>
            <h2>Informe o endereço onde deseja receber seu pedido</h2>
          </div>
          
        </HeaderItem>
      
        <form>
          <InputText type="text" name="cep" className="cep" placeholder="CEP"/>
          <InputText type="text" name="rua" className="rua" placeholder="Rua"/>
          <InputText type="text" name="numero" className="numero" placeholder="Número"/>
          <InputText type="text" name="complemento" className="complemento" placeholder="Complemento"/>
          <InputText type="text" name="bairro" className="bairro" placeholder="Bairro"/>
          <InputText type="text" name="cidade" className="cidade" placeholder="Cidade"/>
          <InputText type="text" name="uf" className="uf" placeholder="UF"/>
        </form>
        <PaymentMethod>
          <HeaderItem>
            <CurrencyDollar size={22} className="icon purple"/>
            <div>
              <h1>Pagamento</h1>
              <h2>O pagamento é feito na entrega. Escolha a forma que deseja pagar</h2>
            </div>
          </HeaderItem>

          <PaymentButtonList>

            <PaymentButton 
              id="creditcard" 
              className={paymethodSelect == "creditcard" ? "active" : ""} 
              onClick={handlePaymethodSelect}>

              <CreditCard id="creditcard" size={16} className="purple" />
              <p id="creditcard">Cartão de crédito</p>
            </PaymentButton>

            <PaymentButton 
              id="debitcard" 
              className={paymethodSelect == "debitcard" ? "active" : ""} 
              onClick={handlePaymethodSelect}>

              <Bank id="debitcard" size={16} className="purple"  />
              <p id="debitcard">cartão de débito</p>
            </PaymentButton>

            <PaymentButton 
              id="money" 
              className={paymethodSelect == "money" ? "active" : ""} 
              onClick={handlePaymethodSelect}>

              <Money id="money" size={16} className="purple"  />
              <p id="money">dinheiro</p>
            </PaymentButton>

          </PaymentButtonList>
          

        </PaymentMethod>
        
      </FormInput>
      
      <CartList>

        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />

        <div className="InfoPrices">
          <h4 className="left">Total de Itens</h4>
          <h4 className="right">R$ 29,70</h4>
        </div>

        <div className="InfoPrices">
          <h4 className="left">Entrega</h4>
          <h4 className="right">R$ 3,50</h4>
        </div>

        <div className="InfoPrices">
          <h3 className="left">Total</h3>
          <h3 className="right">R$ 33,20</h3>
        </div>

          

          
        
        <button className="footer">CONFIRMAR PEDIDO</button>
      </CartList>
    </Container>
  );
}