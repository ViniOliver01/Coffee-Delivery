import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";

interface UserContextData {
  getPurchases: () => Promise<IPurchasesResponse[]>;
}

interface UserProviderProps {
  children: ReactNode;
}

interface ICartResponseProps {
  name: string;
  coffee_id: string;
  price: number;
  quantity: number;
  img_url: string;
}

interface IPurchasesResponse {
  id: string;
  purchase_id: number;
  user_id: string;
  created_at: Date;
  status: string;
  cart: ICartResponseProps[];
  total_value: number;
  products_value: number;
  delivery_value: number;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const { user } = useContext(AuthContext);

  async function getPurchases(): Promise<IPurchasesResponse[]> {
    try {
      const response = await api.get("/purchases");
      return response.data;
    } catch (error) {
      console.log("🚀 / getPurchases / error", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        getPurchases,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
