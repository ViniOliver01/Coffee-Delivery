import { createGlobalStyle } from "styled-components";
import Background from "../assets/Background.svg";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-image: url(${Background}) !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
        color: ${(props) => props.theme["base-text"]};
    }
    header {
        font-family: 'Baloo 2', cursive;
        line-height: 130%;
    }
    body, input, textarea, button{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;
