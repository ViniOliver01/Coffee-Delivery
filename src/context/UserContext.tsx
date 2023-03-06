import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";

interface UserContextData {
  getPurchases: () => Promise<IPurchasesResponse[]>;
  getAddresses: () => Promise<IAddressesResponse[]>;
  createAddress: (data: IAddressRequest) => Promise<IAddressRequest>;
  deleteAddress: (id: string) => Promise<IStatusResponse>;
  updateAddress: (data: IUpdateAddressRequest) => Promise<IAddressRequest>;
}

interface UserProviderProps {
  children: ReactNode;
}

interface IStatusResponse {
  status: number;
  message: string;
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

export interface IAddressesResponse {
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
}

export interface IAddressRequest {
  name: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  complement?: string;
}

export interface IUpdateAddressRequest {
  id: string;
  name: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  complement?: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const { user } = useContext(AuthContext);

  async function getPurchases(): Promise<IPurchasesResponse[]> {
    try {
      const response = await api.get("/purchases");
      return response.data;
    } catch (error) {
      console.warn("🚀 / getPurchases / error", error);
    }
  }

  async function getAddresses(): Promise<IAddressesResponse[]> {
    try {
      const response = await api.get("/users/address");
      return response.data;
    } catch (error) {
      console.warn("🚀 / getPurchases / error", error);
    }
  }

  async function createAddress({
    cep,
    city,
    name,
    number,
    state,
    street,
    complement,
  }: IAddressRequest): Promise<IAddressRequest> {
    try {
      const response = await api.post("/users/address", {
        cep,
        city,
        name,
        number,
        state,
        street,
        complement,
      });
      return response.data;
    } catch (error) {
      console.warn("🚀 / createAddress / error", error);
    }
  }

  async function deleteAddress(id: string): Promise<IStatusResponse> {
    try {
      const response = await api.post("/users/delete-address", {
        id,
      });
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async function updateAddress({
    id,
    cep,
    city,
    name,
    number,
    state,
    street,
    complement,
  }: IUpdateAddressRequest): Promise<IAddressRequest> {
    try {
      const response = await api.patch("/users/address", {
        id,
        cep,
        city,
        name,
        number,
        state,
        street,
        complement,
      });
      return response.data;
    } catch (error) {
      console.warn("🚀 / createAddress / error", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        getPurchases,
        getAddresses,
        createAddress,
        deleteAddress,
        updateAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
