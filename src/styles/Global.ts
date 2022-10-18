import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-color: ${props => props.theme['background']};
        color: ${props => props.theme['base-text']};
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
`
