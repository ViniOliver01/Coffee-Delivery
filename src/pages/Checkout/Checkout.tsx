import { CartList, Container, FormInput, HeaderItem, InputText, PaymentButton, PaymentButtonList, PaymentMethod } from "./Checkout.styles";
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money, Trash } from 'phosphor-react';
import { CartItem } from "./components/CartItemList/CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext, coffeesList } from './../../context/CartContext/CartContext';

export function Checkout(){
  const [paymethodSelect, setPaymethodSelect] = useState('')
  
  const {ItensObject, ItensPrice} = useContext(CartContext)
  
    function handlePaymethodSelect(e: any){
      const id = e.target.id;
      // console.log(id)
      if(paymethodSelect==id){
        setPaymethodSelect("");
        
      }else{
        setPaymethodSelect(id);
      }
    }
    const FormatedItensPrice = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits : 2
      }).format(ItensPrice);

    const FormatedDeliveryPrice = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits : 2
      }).format(3.5);

    const FormatedTotalPrice = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits : 2
      }).format(ItensPrice+3.5);
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

        {/* {id, type, name, img, description, price, amount} */}

        {ItensObject.map(item => {
          return(
            <CartItem
              key={item.id} 
              id={item.id} 
              type={item.type} 
              name={item.name} 
              img={item.img} 
              description={item.description} 
              price={item.price} 
              amount={item.amount}/>
          )
        })}
        
        
        

        <div className="InfoPrices">
          <h4 className="left">Total de Itens</h4>
          <h4 className="right">R$ {FormatedItensPrice}</h4>
        </div>

        <div className="InfoPrices">
          <h4 className="left">Entrega</h4>
          <h4 className="right">R$ {FormatedDeliveryPrice}</h4>
        </div>

        <div className="InfoPrices">
          <h3 className="left">Total</h3>
          <h3 className="right">R$ {FormatedTotalPrice}</h3>
        </div>

          

          
        
        <button className="footer">CONFIRMAR PEDIDO</button>
      </CartList>
    </Container>
  );
}