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

interface UpdatePersonalDataCredentials {
  name: string;
  email: string;
  phone: string;
}

interface ChangePasswordCredentials {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface IStatusResponse {
  status: number;
  message: string;
}

interface AuthContextData {
  signUp: (credentials: SignUpCredentials) => Promise<IStatusResponse>;
  signIn: (credentials: SignInCredentials) => Promise<IStatusResponse>;
  signOut: () => void;
  isAdmin: boolean;
  updatePersonalData: (
    credentials: UpdatePersonalDataCredentials
  ) => Promise<IStatusResponse>;
  updateAvatar: (avatar_file: FormData) => Promise<IStatusResponse>;
  changePassword: (credentials: ChangePasswordCredentials) => Promise<IStatusResponse>;
  user: User;
  isAuthenticated: boolean;
  isFetching: boolean;
  isFetchingAdmin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
  phone: string;
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
  let isFetchingAdmin = true;

  if (!token) {
    // console.log("is Fetching token");
    isFetching = false;
  }

  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar_url: "",
    phone: "",
  });

  if (isAdmin !== null) {
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
          const { name, email, avatar_url, phone } = response.data;

          setUser({ name, email, avatar_url, phone });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  useEffect(() => {
    if (user.email) {
      api
        .post("/users/isadmin", { email: user.email })
        .then((response) => {
          const { isAdmin } = response.data;
          setIsAdmin(isAdmin);
        })
        .catch(() => {
          // signOut();
        });
    }
  }, [user]);

  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<IStatusResponse> {
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
        phone: user.phone,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // navigation("/dashboard");
      authChannel.postMessage("signIn");
      return { status: 200, message: "Success" };
    } catch (error) {
      console.warn("🚀 / Error: ", error);
      return { status: 401, message: error.response.data.message };
    }
  }

  async function signUp({
    name,
    email,
    password,
  }: SignUpCredentials): Promise<IStatusResponse> {
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

  async function updatePersonalData({
    name,
    email,
    phone,
  }: UpdatePersonalDataCredentials): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/users/update", {
        name,
        email,
        phone,
      });

      // const { name, email, avatar_url, phone } = response.data;

      setUser({
        name: response.data.name,
        email: response.data.email,
        avatar_url: response.data.avatar_url,
        phone: response.data.phone,
      });

      if (response.status === 400) {
        return { message: response.data.message, status: 400 };
      }
    } catch (error) {}

    return { message: "Success", status: 201 };
  }

  async function updateAvatar(avatar_file: FormData): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/users/avatar", avatar_file, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data;`,
        },
      });

      const { avatar_url } = response.data;

      setUser({
        name: user.name,
        email: user.email,
        avatar_url,
        phone: user.phone,
      });

      if (response.status === 400) {
        return { message: response.data.message, status: 400 };
      }
    } catch (error) {
      console.warn("🚀 / updateAvatar / error", error);
    }

    return { message: "Success", status: 201 };
  }

  async function changePassword({
    old_password,
    new_password,
    confirm_new_password,
  }: ChangePasswordCredentials): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/users/password", {
        old_password,
        new_password,
        confirm_new_password,
      });

      if (response.status === 400) {
        return { message: response.data.message, status: 400 };
      }
    } catch (error) {
      console.warn("🚀 / changePassword / error", error);
    }
    return { message: "Success", status: 201 };
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        updatePersonalData,
        updateAvatar,
        changePassword,
        isAuthenticated,
        isFetching,
        isFetchingAdmin,
        user,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
