import styled from "styled-components";
import defaultTheme from "../../styles/themes/Default";

export const VerifyLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  svg {
    color: ${defaultTheme.green};
  }
`;
