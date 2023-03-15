import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const SideBarLink = styled.li`
  list-style-type: none;
`;

export const SideBarNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SideBarCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  width: fit-content;
  margin-top: 4rem;
  height: fit-content;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.5rem;

  h2 {
    margin-top: 0.5rem;
    color: ${defaultTheme["base-label"]};
    font-size: 1rem;

    a {
      color: ${defaultTheme.purple};
      font-size: 1rem;
    }
  }
`;

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

  @media only screen and (max-width: 700px) {
    font-size: 1.75rem;
  }
  @media only screen and (max-width: 320px) {
    font-size: 1.5rem;
  }
`;

interface CardProps {
  display: "flex" | "grid";
  padding: "40px 60px" | "20px 30px" | "10px 20px" | "2rem 4rem";
}

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  span {
    color: ${defaultTheme["base-label"]};
    font-size: 1rem;
    font-style: italic;
  }

  @media only screen and (max-width: 700px) {
    min-width: 200px;
    max-width: 600px;
    width: 100%;
    padding: 2rem 4rem;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    padding: 1rem 2rem;
  }
`;

export const AddressCardList = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  min-width: 400px;
  width: fit-content;
  max-width: 600px;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.75rem;
  margin: auto;

  @media only screen and (max-width: 700px) {
    min-width: 0px;
    width: 100%;
    grid-template-columns: auto;
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
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.6rem;
    div {
      align-items: center;
      justify-content: flex-end;
      button {
        margin-top: 0;
        width: fit-content;
      }
    }
  }
  div > a {
    margin-top: 0.6rem;
    font-size: 1rem;
    cursor: pointer;
    color: ${defaultTheme.purple};
  }
`;

export const MobileAddressCard = styled.div`
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
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.6rem;
    div {
      align-items: center;
      justify-content: flex-end;
      button {
        margin-top: 0;
        width: fit-content;
      }
    }
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
    "cep cep _ _"
    "cidade cidade estado estado"
    "rua rua rua rua"
    "numero numero complemento complemento";
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

export const ImageChangeArea = styled.div`
  position: relative;
`;

export const ImgWarp = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;

  div {
    position: absolute;
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

//TODO Purchases Components

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  width: 100%;

  tbody > tr {
    cursor: pointer;
  }

  tr {
    background-color: ${defaultTheme.white};
    .Canceled,
    .Delivery,
    .PaymentAprove,
    .Finished {
      font-size: 1rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        gap: 0.2rem;
      }
    }

    .Canceled {
      color: red;
    }
    .Delivery {
      color: ${defaultTheme["base-text"]};
    }
    .PaymentAprove {
      color: green;
    }
    .Finished {
      color: green;
    }

    td {
      padding: 0.5rem 1rem;
      text-align: center;
    }
    th {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      font-weight: bold;
      font-family: "Baloo 2", cursive;
    }
  }
  tr:first-child {
    th:first-child {
      border-radius: 44px 0 0 0;
    }
    th:last-child {
      border-radius: 0 44px 0 0;
    }
  }
  tr:last-child {
    td:first-child {
      border-radius: 0 0 0 44px;
    }
    td:last-child {
      border-radius: 0 0 44px 0;
    }
  }
`;

export const PurchaseItemCard = styled.div`
  display: flex;
  background-color: #f3f3f3;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  gap: 0.5rem;
  margin-top: 1rem;

  img {
    width: 64px;
    height: 64px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    h2 {
      font-size: 1.25rem;
      font-weight: bolder;
      font-family: "Baloo 2", cursive;
    }
    p {
      margin-bottom: 0.1rem;
    }
  }

  span {
    display: flex;
    flex-direction: column-reverse;
    font-size: 1.25rem;
    font-weight: bolder;
    font-family: "Baloo 2", cursive;
  }
`;

export const ModalCard = styled.div`
  p {
    font-size: 1.1rem;
    font-weight: bolder;
    font-family: "Baloo 2", cursive;
    margin-bottom: 0.3rem;

    span {
      margin-left: 0.5rem;
      color: #5f5f5f;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    p {
      font-size: 1.1rem;
      font-weight: bolder;
      font-family: "Baloo 2", cursive;
      text-align: right;

      &:first-child {
        margin-top: 1rem;
      }

      &:last-child {
        font-size: 1.25rem;
        margin-top: 0.3rem;
      }
    }
  }
`;
