import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 5rem;
  gap: 2rem;

  margin-inline: auto;
  max-width: 1600px;
  padding-inline: 1rem;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    padding-inline: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-width: 450px;
  }
`;

export const HeaderItem = styled.div`
  display: flex;
  margin-bottom: 2rem;

  .icon {
    margin-right: 0.5rem;
  }

  .yellow {
    color: ${defaultTheme["yellow-dark"]};
  }

  .purple {
    color: ${defaultTheme["purple"]};
  }

  h2 {
    color: ${defaultTheme["base-subtitle"]};
    font-size: 16px;

    font-weight: normal;
  }

  p {
    color: ${defaultTheme["base-text"]};
    font-size: 14px;

    font-weight: normal;
  }
`;

export const NoAddressMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

export const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${defaultTheme["base-card"]};
  border-radius: 8px;
  padding: 2rem;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
  }

  .noAddresses {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
  }

  @media only screen and (max-width: 900px) {
    padding: 1rem;
  }
`;

interface AddressItemProps {
  checked: boolean;
}

export const AddressItem = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 8px;
  padding: 0.5rem;
  border: 2px solid ${defaultTheme["base-hover"]};
  border-color: ${(props: AddressItemProps) =>
    props.checked ? defaultTheme.purple : null};

  div {
    margin-left: 1rem;
    flex: 1;
  }
  svg {
    color: ${defaultTheme["base-text"]};
    font-size: 1.5rem;
  }
  span {
    color: ${defaultTheme["base-label"]};
  }
  p {
    color: ${defaultTheme["base-text"]};
  }
`;

export const PaymentBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${defaultTheme["base-card"]};
  border-radius: 8px;
  padding: 2rem;

  @media only screen and (max-width: 900px) {
    padding: 1rem;
  }
`;

interface PaymentButtonProps {
  active: boolean;
}

export const PaymentButton = styled.button`
  display: flex;
  align-items: center;
  width: 200px;
  padding: 1rem;
  gap: 0.75rem;
  border-radius: 8px;
  background-color: ${(props: PaymentButtonProps) =>
    props.active ? defaultTheme["purple-light"] : defaultTheme["base-button"]};

  border: 2px solid transparent;
  border-color: ${(props: PaymentButtonProps) =>
    props.active ? defaultTheme.purple : null};
  user-select: none;

  font-size: 0.75rem;
  color: ${defaultTheme["base-text"]};
  text-transform: uppercase;
  &:hover {
    background-color: ${defaultTheme["base-hover"]};
  }
  svg {
    font-size: 1.2rem;
    color: ${defaultTheme.purple};
  }
`;

export const PaymentButtonList = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  width: 100%;

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding-inline: 0.5rem;
  }
`;

export const CartList = styled.div`
  background-color: ${(props) => props.theme["base-card"]};
  padding: 3rem 2rem;
  min-width: 400px;
  border-radius: 6px 44px 6px 44px;
  height: fit-content;

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 5.5rem;
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;

    border-bottom: 1px solid;
    border-color: ${(props) => props.theme["base-button"]};
  }
  .InfoPrices {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    margin-bottom: 0.5rem;
  }
  div .left {
    text-align: start;
  }
  div .right {
    text-align: end;
  }
  h4 {
    font-size: 14px;
    font-weight: normal;
    color: ${(props) => props.theme["base-text"]};
  }
  h4.right {
    font-size: 16px;
  }
  h3 {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  @media only screen and (max-width: 900px) {
    min-width: 100px;
  }
`;
