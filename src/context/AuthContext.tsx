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
  remember: boolean;
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

interface ResetPasswordProps {
  reset_token: string;
  password: string;
}

interface IStatusResponse {
  status: number;
  message: string;
}

interface AuthContextData {
  signUp: (credentials: SignUpCredentials) => Promise<IStatusResponse>;
  signIn: (credentials: SignInCredentials) => Promise<IStatusResponse>;
  signOut: () => void;
  sendEmailResetPassword: (email: string) => Promise<IStatusResponse>;
  resetPassword: (data: ResetPasswordProps) => Promise<IStatusResponse>;
  verifyResetToken: (reset_token: string) => Promise<IStatusResponse>;
  reeSendConfirmEmail: (data: reeSendConfirmEmailProps) => Promise<IStatusResponse>;
  confirmEmail: (token: string) => Promise<IStatusResponse>;
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

interface reeSendConfirmEmailProps {
  name: string;
  email: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
  phone: string;
  email_is_verified: boolean;
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
    email_is_verified: false,
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
          const { name, email, avatar_url, phone, email_is_verified } = response.data;

          setUser({ name, email, avatar_url, phone, email_is_verified });
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
    remember,
  }: SignInCredentials): Promise<IStatusResponse> {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
        remember,
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
        email_is_verified: user.email_is_verified,
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

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
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
        email_is_verified: response.data.email_is_verified,
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
        email_is_verified: user.email_is_verified,
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

  async function sendEmailResetPassword(email: string): Promise<IStatusResponse> {
    try {
      const response = await api.post("/password/forgot", { email });
      console.log("🚀 / sendEmailResetPassword / response:", response);

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn("🚀 / sendEmailResetPassword / error", error);
    }
  }

  async function resetPassword({
    password,
    reset_token,
  }: ResetPasswordProps): Promise<IStatusResponse> {
    try {
      const response = await api.post("/password/reset?token=" + reset_token, {
        password,
      });

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function verifyResetToken(reset_token: string): Promise<IStatusResponse> {
    try {
      const response = await api.post(
        "/password/verify-reset-token?token=" + reset_token
      );

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function reeSendConfirmEmail({
    name,
    email,
  }: reeSendConfirmEmailProps): Promise<IStatusResponse> {
    try {
      const response = await api.post("/users/verify-email", { name, email });

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function confirmEmail(token: string): Promise<IStatusResponse> {
    try {
      const response = await api.post("/users/confirmation/" + token);

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        sendEmailResetPassword,
        reeSendConfirmEmail,
        confirmEmail,
        resetPassword,
        verifyResetToken,
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
