import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

export const AvatarContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const AvatarInfo = styled.div`
  a {
    cursor: pointer;

    &:hover {
      background-color: ${defaultTheme["purple-light"]};
      text-decoration: underline;
    }
  }
`;

export const AvatarPopoverStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  #SignOut {
    margin-top: 1rem;
  }
`;

interface BackgroundOpacityProps {
  isActive: boolean;
}

export const BackgroundOpacity = styled.div`
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.6;
    }
  }

  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: black;
  opacity: 0;
  z-index: -1;
  z-index: ${(props: BackgroundOpacityProps) => (props.isActive ? +1 : -1)};
  animation: ${(props: BackgroundOpacityProps) =>
    props.isActive ? "opacity 0.2s both" : null};

  left: 0;
  top: 0;
`;
