import { Minus, Plus, Trash } from 'phosphor-react';
import { useContext } from 'react';
import { CartContext } from '../../../../context/CartContext/CartContext';
import { Buttons, CenterDiv, Container, ItensCountCart, PriceDisplay, RemoveItemButton } from './CartItem.styles';
import { useState } from 'react';
import { getImage } from './../../../../assets/CoffeeIndex';

interface CartItemProps{
  id: number
  name: string
  img: string
  price: number
  amount: number
}

const URLImg = '../src/assets/CoffeeTypes/'

export function CartItem({id, name, img, price, amount}:CartItemProps){
  const {
    handleAddItensToCart,
    handleSetTotalAmount,
    handleSetTotalPrice,
    handleRemoveItensToCart
  } = useContext(CartContext)
  const [amountItens, setAmountItens] = useState(amount);
  const totalPrice = price*amount

  const FormatedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits : 2
    }).format(totalPrice);

    function handleAdd(){
      setAmountItens(amountItens+1)
      const amount = amountItens+1
      handleSetTotalAmount(+1)
      handleSetTotalPrice(+price)
      handleAddItensToCart({id, name, img, price, amount})
    }

    function handleMinus(){
      setAmountItens(amountItens-1)
      const amount = amountItens-1
      if (amount ==0) {
        handleRemoveItensToCart({id, name, img, price, amount})
      }else{
        handleAddItensToCart({id, name, img, price, amount})
      }
      handleSetTotalAmount(-1)
      handleSetTotalPrice(-price)
    }

    function handleRemove(){
      handleSetTotalAmount(-amount)
      handleSetTotalPrice(-price*amount)
      handleRemoveItensToCart({id, name, img, price, amount})
    }

  return (
    <Container>
        {/* <img src={URLImg+img+'.png'} alt="" /> */}
        <img src={getImage(id)} alt="" />
        <CenterDiv>
            <p>{name}</p>
            <Buttons>
                <ItensCountCart>
                <a onClick={handleMinus}><Minus size={16} weight="bold"/></a>
                {amountItens}
                <a onClick={handleAdd}><Plus size={16} weight="bold" /></a>
                </ItensCountCart>

                <RemoveItemButton onClick={handleRemove}>
                    <Trash size={16}/>
                    <p>REMOVER</p>
                </RemoveItemButton>
            </Buttons>
        </CenterDiv>
        <PriceDisplay>R$ {FormatedPrice}</PriceDisplay>
    </Container>
  );
}