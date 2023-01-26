import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface ISingInResponse {
  status: number;
  message: string;
}

interface AuthContextData {
  signUp: (credentials: SignUpCredentials) => Promise<ISingInResponse>;
  signIn: (credentials: SignInCredentials) => Promise<ISingInResponse>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  isFetching: boolean;
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
  const { "coffee.token": token } = parseCookies();
  let isFetching = true;

  if (!token) {
    console.log("is Fetching token");
    isFetching = false;
  }

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar_url: "",
  });

  if (user.name !== "") {
    console.log("🚀 / AuthProvider / user", user);
    console.log("is Fetching user");
    isFetching = false;
  }

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

  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<ISingInResponse> {
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
      return { status: 200, message: "Success" };
    } catch (error) {
      console.log("🚀 / Error: ", error);
      return { status: 401, message: error.response.data.message };
    }
  }

  async function signUp({
    name,
    email,
    password,
  }: SignUpCredentials): Promise<ISingInResponse> {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      if (response.status === 400) {
        return { message: response.data.message, status: 400 };
      }
    } catch (error) {}

    return { message: "Success", status: 201 };
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, isAuthenticated, isFetching, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
