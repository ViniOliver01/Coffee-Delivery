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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
