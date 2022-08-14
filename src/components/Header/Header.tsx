import { HeaderContainer, LocationIcon, LogoArea } from "./Header.styles";
import logo from '../../assets/Logo.svg';
import { Cart } from '../Cart/Cart';
import { MapPin } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

export function Header(){
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
        <MapPin size={32} weight="fill"/>
        <p>Porto Alegre, RS</p>
      </LocationIcon>

      <Cart itens={3}/>

    </HeaderContainer>
  )
}