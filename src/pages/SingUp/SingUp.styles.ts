import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: bolder;
    color: ${defaultTheme["base-title"]};
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: ${defaultTheme["base-subtitle"]};
    text-align: center;
    width: 75%;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 60px;
  min-width: 400px;
  width: fit-content;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const Input = styled.input`
  background-color: ${defaultTheme["base-input"]};
  border: 2px solid ${defaultTheme.purple};
  border-radius: 6px;
  height: 2.2rem;
  padding: 0.5rem;

  font-size: 1.125rem;
  color: ${defaultTheme["base-text"]};

  &:focus {
    outline: 2px solid ${defaultTheme.purple};
  }
`;

export const Label = styled.label`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${defaultTheme["base-title"]};
`;

interface ButtonProps {
  login?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.login ? defaultTheme.purple : defaultTheme["base-button"]};

  color: ${(props: ButtonProps) =>
    props.login ? defaultTheme.white : defaultTheme["base-text"]};
  border: none;
  width: 100%;
  padding: 0.625rem;
  border-radius: 6px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
