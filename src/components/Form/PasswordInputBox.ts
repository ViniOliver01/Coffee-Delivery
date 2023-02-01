import styled from "styled-components";

export const PasswordInputBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  button {
    position: absolute;
    margin-top: 0;
    right: 10px;
    height: 100%;
    display: flex;
    align-items: center;

    //Icon
    svg {
      font-size: 1.5rem;
      color: white;
    }
  }
`;
