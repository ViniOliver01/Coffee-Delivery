import { Minus, Plus, Trash } from 'phosphor-react';
import cafPhoto from '../../../../assets/CoffeeTypes/arabe.png'
import { Buttons, CenterDiv, Container, ItensCountCart, PriceDisplay, RemoveItemButton } from './CartItem.styles';

export function CartItem(){
  return (
    <Container>
        <img src={cafPhoto} alt="" />
        <CenterDiv>
            <p>Expresso Tradicional</p>
            <Buttons>
                <ItensCountCart>
                <a><Minus size={16} weight="bold"/></a>
                {"5"}
                <a><Plus size={16} weight="bold" /></a>
                </ItensCountCart>

                <RemoveItemButton>
                    <Trash size={16}/>
                    <p>REMOVER</p>
                </RemoveItemButton>
            </Buttons>
        </CenterDiv>
        <PriceDisplay>R$ 9,90</PriceDisplay>
    </Container>
  );
}