import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

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

export const VerifyLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  svg {
    color: ${defaultTheme.green};
  }
`;
