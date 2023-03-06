import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 60px;
  min-width: 400px;
  width: fit-content;
  max-width: 600px;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.5rem;

  h2 {
    color: ${defaultTheme["base-label"]};
    font-size: 1rem;
  }
`;
