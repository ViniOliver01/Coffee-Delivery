import { CartList, Container, FormInput, HeaderItem, InputText, PaymentButtonList, PaymentMethod } from "./Checkout.styles";
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money, Trash } from 'phosphor-react';
import { CartItem } from "./components/CartItemList/CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext, coffeesList } from './../../context/CartContext/CartContext';
import { SubmitHandler, useForm } from "react-hook-form";
import { PaymentButton } from './components/PaymentButton/PaymentButton';

interface Inputs{
  cep: number,
  rua: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  paymethodSelect: string,
};

export function Checkout(){
  const [paymethodSelect, setPaymethodSelect] = useState('')
  const {ItensObject, ItensPrice} = useContext(CartContext)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  // console.log(watch("cep")) // watch input value by passing the name of it
  
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

      useEffect(() => {
        console.log(paymethodSelect);
      });
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
      
        <form onSubmit={handleSubmit(onSubmit)} id="myform">
          <InputText type="text" className="cep" placeholder="CEP" {...register("cep")}/>
          <InputText type="text" className="rua" placeholder="Rua" {...register("rua")}/>
          <InputText type="text" className="numero" placeholder="Número" {...register("numero")}/>
          <InputText type="text" className="complemento" placeholder="Complemento" {...register("complemento")}/>
          <InputText type="text" className="bairro" placeholder="Bairro" {...register("bairro")}/>
          <InputText type="text" className="cidade" placeholder="Cidade" {...register("cidade")}/>
          <InputText type="text" className="uf" placeholder="UF" {...register("uf")}/>
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
            <PaymentButton />

            {/* <PaymentButton 
              id="creditcard" 
              className={paymethodSelect == "creditcard" ? "active" : ""} 
              value={''}
              onClick={handlePaymethodSelect}
              // {...register("paymethodSelect")}
              >

                
            </PaymentButton>
            

            <PaymentButton 
              id="debitcard" 
              className={paymethodSelect == "debitcard" ? "active" : ""} 
              onClick={handlePaymethodSelect}
              value={''}
              // {...register("paymethodSelect")}
              >

              <Bank id="debitcard" size={16} className="purple"  />
              <p id="debitcard">cartão de débito</p>
            </PaymentButton>

            <PaymentButton 
              id="money" 
              className={paymethodSelect == "money" ? "active" : ""} 
              onClick={handlePaymethodSelect}
              value={''} 
              // {...register("paymethodSelect")}
              >

              <Money id="money" size={16} className="purple"  />
              <p id="money">dinheiro</p>
            </PaymentButton>

            <div className="toggle-switch">
              <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
              <label className="toggle-switch-label">
                Toggle Me!
              </label>
            </div> */}

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

          

          
        
        <button type="submit" form="myform" className="footer">CONFIRMAR PEDIDO</button>
      </CartList>
    </Container>
  );
}