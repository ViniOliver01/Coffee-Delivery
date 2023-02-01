import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-family: "Baloo 2", cursive;
  font-weight: 900;
  height: 3rem;
  margin-bottom: 1rem;
`;

interface CardProps {
  display: "flex" | "grid";
  padding: "40px 60px" | "20px 30px" | "10px 20px" | "2rem 4rem";
}

export const Card = styled.div`
  display: ${(props: CardProps) => props.display};
  flex-direction: column;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  padding: ${(props: CardProps) => props.padding};
  min-width: 400px;
  width: fit-content;
  max-width: 600px;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.75rem;
  margin: auto;

  button {
    margin-top: 1rem;
  }
  form {
    width: 100%;
  }
`;

export const AddressCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme.white};

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    font-family: "Baloo 2", cursive;
    margin-bottom: 0.6rem;
  }
  p {
    font-size: 1rem;
  }
  div {
    margin-top: 0.6rem;
  }
  div > a {
    margin-top: 0.6rem;
    font-size: 1rem;
    cursor: pointer;
    color: ${defaultTheme.purple};
  }
`;

export const AddressBox = styled.div`
  display: grid;
  justify-content: center;
  padding-block: 1rem;
  grid-template-areas:
    "nomeEndereco nomeEndereco nomeEndereco nomeEndereco"
    "cep _ _ _"
    "cidade cidade estado estado"
    "rua rua rua rua"
    "numero complemento complemento complemento";
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(4, 20%);
  column-gap: 1rem;
  row-gap: 0.5rem;

  #cep {
    grid-area: cep;
  }

  #cidade {
    grid-area: cidade;
  }

  #estado {
    grid-area: estado;
  }

  #rua {
    grid-area: rua;
  }

  #numero {
    grid-area: numero;
  }

  #complemento {
    grid-area: complemento;
  }

  #nomeEndereco {
    grid-area: nomeEndereco;
  }
`;

//TODO My Account Components

export const ImageChangeArea = styled.div`
  position: relative;
`;

export const ImgWarp = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: auto;
    height: 100%;
  }
`;

export const LabelTest = styled.label`
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
  background-color: ${defaultTheme.purple};
  color: ${defaultTheme.white};
  padding: 0.4rem;
  border-radius: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const AvatarLabel = styled.label`
  text-transform: uppercase;
  font-weight: 700;
  color: #676767;

  input {
    border-radius: 15px;
    padding: 5px 5px 5px 10px;
    font-size: 18px;
    transition: 0.2s;

    &:focus {
      outline: none;
      border: 1px solid #64d488;
    }
    &::placeholder {
      color: #bebebe;
    }
  }

  input[type="file"] {
    display: none;
  }
`;
