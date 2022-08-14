import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CartContextProvider } from "../context/CartContext/CartContext";
import { Router } from "../routes/Router";
import { GlobalStyle } from "../Theme/Global";
import {defaultTheme} from './../Theme/Default';

export function App(){
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}