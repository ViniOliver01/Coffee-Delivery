import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

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

export const Options = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    color: ${defaultTheme["base-label"]};
    font-size: 0.875rem;
    margin-left: -4px;
  }

  a {
    color: ${defaultTheme.purple};
    font-size: 0.875rem;
  }
`;

export const FooterTitle = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  h2 {
    margin-top: 0;
    border: 1px solid transparent;
  }
`;
