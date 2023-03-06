import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";

interface ShoppingContextData {
  getCoffees: () => Promise<ICoffeeListResponse[]>;
  getPurchaseData: (purchase_id: string) => Promise<IPurchaseResponse>;
  getSpecs: () => Promise<ISpecListResponse[]>;
  updateCoffeeImage: (
    coffee_id: string,
    coffee_file: FormData
  ) => Promise<IStatusResponse>;
  updateCoffeeData: (data: IUpdateCoffee) => Promise<IStatusResponse>;
  updateSpecName: (data: IUpdateSpec) => Promise<IStatusResponse>;
  createSpec: (name: string) => Promise<IStatusResponse>;
  deleteSpec: (id: string) => Promise<IStatusResponse>;
  deleteCoffee: (id: string) => Promise<IStatusResponse>;
  createCoffee: (data: ICreateCoffee) => Promise<Coffee>;
  addSpecToCoffee: (data: addSpecToCoffeeProps) => Promise<IStatusResponse>;
}

export interface Coffee {
  id: string;
  available: boolean;
  name: string;
  description: string;
  price: number;
  created_at: Date;
}

interface addSpecToCoffeeProps {
  coffee_id: string;
  specs_ids: string[];
}

interface IStatusResponse {
  status: number;
  message: string;
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
    updated_at: Date;
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
  updated_at: Date;
  created_at: Date;
}

interface ICreateCoffee {
  name: string;
  description: string;
  price: number;
}

interface IUpdateCoffee {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

interface IUpdateSpec {
  id: string;
  name: string;
}

export const ShoppingContext = createContext({} as ShoppingContextData);

export function ShoppingProvider({ children }: ShoppingProviderProps) {
  const { user } = useContext(AuthContext);

  async function getCoffees(): Promise<ICoffeeListResponse[]> {
    try {
      const response = await api.get("/coffee");
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async function getPurchaseData(purchase_id: string): Promise<IPurchaseResponse> {
    try {
      const response = await api.get(`/purchases/${purchase_id}`);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async function updateCoffeeImage(
    coffee_id: string,
    coffee_file: FormData
  ): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/coffee/image/" + coffee_id, coffee_file, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data;`,
        },
      });
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function updateCoffeeData({
    id,
    name,
    description,
    price,
    available,
  }: IUpdateCoffee): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/coffee/update", {
        id,
        name,
        description,
        price,
        available,
      });
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function createCoffee({
    name,
    description,
    price,
  }: ICreateCoffee): Promise<Coffee> {
    try {
      const response = await api.post("/coffee", {
        name,
        description,
        price,
      });
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async function deleteCoffee(id: string): Promise<IStatusResponse> {
    try {
      const response = await api.delete("/coffee/" + id);
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function getSpecs(): Promise<ISpecListResponse[]> {
    try {
      const response = await api.get("/specifications");
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async function createSpec(name: string): Promise<IStatusResponse> {
    try {
      const response = await api.post("/specifications", {
        name,
      });
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function deleteSpec(id: string): Promise<IStatusResponse> {
    try {
      const response = await api.delete("/specifications/" + id);

      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function updateSpecName({ id, name }: IUpdateSpec): Promise<IStatusResponse> {
    try {
      const response = await api.patch("/specifications/update", {
        id,
        name,
      });
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  async function addSpecToCoffee({
    coffee_id,
    specs_ids,
  }: addSpecToCoffeeProps): Promise<IStatusResponse> {
    try {
      const response = await api.post("/coffee/specifications", {
        coffee_id,
        specifications_ids: specs_ids,
      });
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <ShoppingContext.Provider
      value={{
        getCoffees,
        getPurchaseData,
        updateCoffeeImage,
        updateCoffeeData,
        createCoffee,
        deleteCoffee,
        createSpec,
        deleteSpec,
        getSpecs,
        updateSpecName,
        addSpecToCoffee,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
