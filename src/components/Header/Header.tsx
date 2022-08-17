import { HeaderContainer, LocationIcon, LogoArea } from "./Header.styles";
import logo from '../../assets/Logo.svg';
import { Cart } from '../Cart/Cart';
import { MapPin } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";

export function Header(){
  const {
    ItensAmount
  } = useContext(CartContext)
  
  const navigation = useNavigate();

  function GoToHome() {
    navigation('/');
  }
  return (
    <HeaderContainer>
      <LogoArea onClick={GoToHome}>
        <img src={logo}/>
      </LogoArea>
      

      <LocationIcon>
        <MapPin size={24} weight="fill"/>
        <p>Porto Alegre, RS</p>
      </LocationIcon>

      <Cart itens={ItensAmount}/>

    </HeaderContainer>
  )
}