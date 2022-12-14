import { CartList, Container, FormInput, HeaderItem, InputText, PaymentButtonList, PaymentMethod, PaymentButton } from "./Checkout.styles";
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money, SmileySad, Trash } from 'phosphor-react';
import { CartItem } from "./components/CartItemList/CartItem";
import { useContext, useState } from "react";
import { CartContext, deliveryValue } from './../../context/CartContext/CartContext';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface FormInputs{
  cep: number,
  rua: string,
  numero: number,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  paymethodSelect: string,
};

export function Checkout(){
  const {
    ItensObject,
    ItensAmount, 
    ItensPrice,
    handleSetFormData,
    handleFinishBuy
    } = useContext(CartContext)
  
  const [paymethodSelect, setPaymethodSelect] = useState('')
  const [paymethodSelectError, setPaymethodError] = useState(false)
  const [formError, setformError] = useState(false)
  const [FormItens, setFormItens] = useState<FormInputs>()


  const navigation = useNavigate();
  function GoToSuccess() {
    navigation('/success');
  }
  

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = data => addPaymenthodToForm(data);

  // console.log(watch("cep")) // watch input value by passing the name of it
    function addPaymenthodToForm(data: FormInputs){

      if(!!paymethodSelect){
        if(ItensAmount!=0){
          setformError(false);
          setFormItens({...data, paymethodSelect: paymethodSelect})
          handleSetFormData({...data, paymethodSelect: paymethodSelect})
          handleFinishBuy();
          GoToSuccess();
        }
        
      }else{
        setPaymethodError(true)
        setTimeout(()=>{setPaymethodError(false)}, 4000)
        setformError(true);
        setFormItens({bairro:'', 
          cep:0, 
          cidade:'', 
          complemento:'', 
          numero: 0, 
          paymethodSelect:'',
          rua:'', 
          uf:''});
        
      }
      
    }
  
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
      }).format(ItensAmount == 0 ? 0 : deliveryValue);

    const FormatedTotalPrice = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits : 2
      }).format(ItensAmount == 0 ? 0 : ItensPrice+deliveryValue);

      // useEffect(() => {
      //   // console.log("Form ERROR: "+formError);
      //   // console.log(paymethodSelect);
      //   console.log(FormItens);
      // });
  return (
    <Container>
      <FormInput>
        <HeaderItem>
          <MapPinLine className="icon yellow" size={22} />
          <div>
            <h1>Endere??o de Entrega</h1>
            <h2>Informe o endere??o onde deseja receber seu pedido</h2>
          </div>
          
        </HeaderItem>
        {/* {...register('test', { maxLength: { value: 2, message: "error message" } })} */}
      
        <form onSubmit={handleSubmit(onSubmit)} id="myform">
          <InputText placeholder="CEP" 
            type="text" 
            className="cep" 
            required
            {...register("cep", {required: true})}/>

          <InputText placeholder="Rua" 
            type="text" 
            className="rua" 
            required
            {...register("rua", { required: true })}/>

          <InputText placeholder="N??mero" 
            type="text" 
            className="numero" 
            required
            {...register("numero", {required: true})}/>

          <InputText placeholder="Complemento" 
            type="text" 
            className="complemento" 
            {...register("complemento")}/>

          <InputText placeholder="Bairro" 
            type="text" 
            className="bairro" 
            required
            {...register("bairro", {required: true})}/>

          <InputText placeholder="Cidade" 
            type="text" 
            className="cidade" 
            required
            {...register("cidade", {required: true})}/>

          <InputText placeholder="UF" 
            type="text" 
            className="uf" 
            required
            {...register("uf", { maxLength: { value: 2, message: "error message" }})}/>

        </form>
        
          {/* <input type="button" value={paymethodSelect}
              {...register("paymethodSelect")}/> */}
        <PaymentMethod>
          <HeaderItem>
            <CurrencyDollar size={22} className="icon purple"/>
            <div>
              <h1>Pagamento</h1>
              <h2>O pagamento ?? feito na entrega. Escolha a forma que deseja pagar</h2>
            </div>
          </HeaderItem>

          <PaymentButtonList className={paymethodSelectError ? 'invalidPaymentMethod' : ''}>

            <PaymentButton 
              id="Cart??o de Cr??dito" 
              className={paymethodSelect == "Cart??o de Cr??dito" ? "active" : ""} 
              // value={""}
              onClick={handlePaymethodSelect}
              // {...register("paymethodSelect")}
              // {...register("paymethodSelect", { value: paymethodSelect })}
              >
                <CreditCard id="Cart??o de Cr??dito" size={16} className="purple"  />
                <p id="Cart??o de Cr??dito">cart??o de cr??dito</p>
            </PaymentButton>
            

            <PaymentButton 
              id="Cart??o de D??bito" 
              className={paymethodSelect == "Cart??o de D??bito" ? "active" : ""} 
              onClick={handlePaymethodSelect}
              // value={''}
              // {...register("paymethodSelect")}
              // {...register("paymethodSelect", { value: paymethodSelect })}
              >
                <Bank id="Cart??o de D??bito" size={16} className="purple"  />
                <p id="Cart??o de D??bito">cart??o de d??bito</p>
            </PaymentButton>

            <PaymentButton 
              id="Dinheiro" 
              className={paymethodSelect == "Dinheiro" ? "active" : ""} 
              onClick={handlePaymethodSelect}
              // value={''} 
              // {...register("paymethodSelect", { value: paymethodSelect })}
              // {...register("paymethodSelect")}
              >
                <Money id="Dinheiro" size={16} className="purple"  />
                <p id="Dinheiro">dinheiro</p>
            </PaymentButton>
            {/* <input value={paymethodSelect} {...register("paymethodSelect")}></input> */}
            
          </PaymentButtonList>
          <span className="AlertInvalidPayment">{paymethodSelectError ? 'Por favor selecione uma forma de pagamento' : ''}</span>
        </PaymentMethod>
      </FormInput>
      <CartList>

        {ItensObject.map(item => {
          return(
            <CartItem
              key={item.id} 
              id={item.id} 
              name={item.name} 
              img={item.img} 
              price={item.price} 
              amount={item.amount}/>
          )
        })}
        {ItensObject.length == 0? <span>Carrinho Vazio <SmileySad size={32} /> </span> : ''}
        
        
        

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