import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../context/AuthContext";
import { CartContextProvider } from "../context/CartContext/CartContext";
import { Router } from "../routes/Router";
import { GlobalStyle } from "../styles/Global";
import defaultTheme from "../styles/themes/Default";

export function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <AuthProvider>
            <CartContextProvider>
              <Router />
            </CartContextProvider>
          </AuthProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </ChakraProvider>
  );
}
