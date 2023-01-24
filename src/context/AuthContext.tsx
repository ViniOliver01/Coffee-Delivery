import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(shouldBroadcast = true) {
  destroyCookie(undefined, "coffee.token");
  destroyCookie(undefined, "coffee.refreshToken");
  destroyCookie(undefined, "coffee.avatar");
  shouldBroadcast && authChannel.postMessage("signOut");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar_url: "",
  });
  const isAuthenticated = user.email != "";

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut(false);
          break;
        case "signIn":
          // navigation("/dashboard");
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "coffee.token": token } = parseCookies();

    if (token) {
      api
        .get("/users/profile")
        .then((response) => {
          const { name, email, avatar_url } = response.data;

          setUser({ name, email, avatar_url });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, refresh_token, user } = response.data;

      setCookie(undefined, "coffee.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "coffee.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "coffee.avatar", user.avatar_url, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        name: user.name,
        email,
        avatar_url: user.avatar_url,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // navigation("/dashboard");
      authChannel.postMessage("signIn");
    } catch (error) {
      console.log("🚀 / Error: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
