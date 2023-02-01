import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding-inline: 10rem;
  margin-top: 1rem;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  color: ${defaultTheme["base-title"]};
`;

export const AccountCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 2rem;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme.white};

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${defaultTheme["base-title"]};
    margin: 0;
  }
  span {
    font-size: 0.75rem;
    color: ${defaultTheme["base-label"]};
    margin-top: 0.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
  p {
    font-size: 1rem;
    color: ${defaultTheme["base-text"]};
  }

  a {
    margin-top: 0.5rem;
    color: ${defaultTheme.purple};
    cursor: pointer;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  padding: 0.1rem;
`;

export const Image = styled.img`
  width: 96px;
  border-radius: 100%;
`;

export const EditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  padding: 0.2rem;
  background-color: ${defaultTheme.purple};
  svg {
    color: ${defaultTheme.white};
    font-size: 1.5rem;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Address = styled.div`
  display: grid;
  grid-template-areas:
    "cep _ _ _"
    "cidade cidade estado estado"
    "rua rua rua rua"
    "numero complemento complemento complemento"
    "nomeEndereco nomeEndereco nomeEndereco nomeEndereco";
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(4, 1fr);
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
