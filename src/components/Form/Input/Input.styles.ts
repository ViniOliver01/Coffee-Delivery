import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const CurrencyInputBox = styled.label`
  display: flex;
  flex-direction: row;
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  padding-inline: 0.5rem;
  align-items: center;
  height: 2.2rem;
  width: 35%;

  gap: 0.3rem;

  font-size: 1.125rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: ${defaultTheme["base-text"]};

  input {
    font-size: 1.125rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: ${defaultTheme["base-text"]};
    border-radius: 0px;
    text-align: center;

    right: 0;
    top: 0;
    background-color: transparent;
  }

  &.focus {
    outline: 2px solid ${defaultTheme.purple};
  }
`;

interface MaskedInputBoxProps {
  isFocus: boolean;
}
export const MaskedInputBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  padding: 0.1rem;
  height: 2.2rem;
  width: fit-content;
  width: 100%;
  outline: 2px solid transparent;

  outline-color: ${(props: MaskedInputBoxProps) =>
    props.isFocus ? defaultTheme.purple : null};

  input {
    background-color: ${defaultTheme["base-input"]};
    width: 100%;
    font-size: 1.125rem;
    padding-inline: 0.5rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: ${defaultTheme["base-text"]};

    &:focus-visible {
      outline: none;
    }
  }
`;
