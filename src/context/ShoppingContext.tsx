import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";

interface ShoppingContextData {
  getCoffees: () => Promise<ICoffeeListResponse[]>;
  getPurchaseData: (purchase_id: string) => Promise<IPurchaseResponse>;
  getSpecs: () => Promise<ISpecListResponse[]>;
}

interface ShoppingProviderProps {
  children: ReactNode;
}

export interface ICoffeeListResponse {
  id: string;
  name: string;
  available: boolean;
  description: string;
  image: string;
  image_url: string;
  price: number;
  specifications: {
    id: string;
    name: string;
    created_at: Date;
  }[];
  created_at: string;
}

interface IPurchaseResponse {
  purchaseData: {
    id: string;
    purchase_id: string;
    payment_type: string;
    status: string;
    user_id: string;
    products_value: number;
    delivery_value: number;
    total_value: number;
    created_at: Date;
    cart: {
      name: string;
      price: number;
      quantity: number;
      coffee_id: string;
    }[];
  };
  addressData: {
    id: string;
    user_id: string;
    name: string;
    cep: string;
    city: string;
    state: string;
    street: string;
    number: string;
    complement: string;
    created_at: Date;
  };
}

export interface ISpecListResponse {
  id: string;
  name: string;
  created_at: Date;
}

export const ShoppingContext = createContext({} as ShoppingContextData);

export function ShoppingProvider({ children }: ShoppingProviderProps) {
  const { user } = useContext(AuthContext);

  async function getCoffees(): Promise<ICoffeeListResponse[]> {
    try {
      const response = await api.get("/coffee");
      return response.data;
    } catch (error) {
      console.warn("🚀 / getPurchases / error", error);
    }
  }

  async function getSpecs(): Promise<ISpecListResponse[]> {
    try {
      const response = await api.get("/specifications");
      return response.data;
    } catch (error) {
      console.warn("🚀 / getPurchases / error", error);
    }
  }

  async function getPurchaseData(purchase_id: string): Promise<IPurchaseResponse> {
    try {
      const response = await api.get(`/purchases/${purchase_id}`);
      return response.data;
    } catch (error) {
      console.warn("🚀 / getPurchases / error", error);
    }
  }

  return (
    <ShoppingContext.Provider
      value={{
        getCoffees,
        getPurchaseData,
        getSpecs,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
