import styled from "styled-components";
import defaultTheme from "../../../styles/themes/Default";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bolder;
  font-family: "Baloo 2", cursive;
  color: ${defaultTheme["base-text"]};
`;

interface LabelProps {
  isCheck: boolean;
  showError: boolean;
}
export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.1rem 0.5rem;
  gap: 0.3rem;
  border-radius: 8px;
  width: fit-content;

  background-color: ${({ isCheck, showError }: LabelProps) =>
    isCheck
      ? defaultTheme["green-light"]
      : showError
      ? defaultTheme["red-light"]
      : defaultTheme["base-button"]};

  p {
    font-size: 1rem !important;
    font-weight: bolder;
    font-family: "Baloo 2", cursive;
    color: ${defaultTheme["base-text"]};
  }
  svg {
    color: ${({ isCheck, showError }: LabelProps) =>
      isCheck ? defaultTheme.green : showError && defaultTheme.red};
  }
`;
