import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../context/AuthContext";
import { CartContextProvider } from "../context/CartContext";
import { ShoppingProvider } from "../context/ShoppingContext";
import { UserProvider } from "../context/UserContext";
import { Router } from "../routes/Router";
import { GlobalStyle } from "../styles/Global";
import defaultTheme from "../styles/themes/Default";

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <ShoppingProvider>
            <UserProvider>
              <AuthProvider>
                <CartContextProvider>
                  <GoogleOAuthProvider clientId={clientID}>
                    <Router />
                  </GoogleOAuthProvider>
                  ;
                </CartContextProvider>
              </AuthProvider>
            </UserProvider>
          </ShoppingProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </ChakraProvider>
  );
}
