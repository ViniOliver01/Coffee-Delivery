import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext({} as CartContextType);

interface CartContextType {
  products_amount: number;
  products_value: number;
  delivery_value: number;
  total_value: number;
  products_list: CartObjectType[];
  handleSetProductsAmount: (amount: number) => void;
  handleSetProductsPrice: (amount: number) => void;
  handleAddItensToCart: (item: CartObjectType) => void;
  handleRemoveItensToCart: (item: CartObjectType) => void;
  handleCheckObjectsState: (item: CartObjectType) => number;
  handleFinishBuy: (
    address_id: string,
    payment_type: string
  ) => Promise<IPurchaseResponse>;
}

interface CartContextProviderProps {
  children: ReactNode;
}

interface CartObjectType {
  id: string;
  name: string;
  img: string;
  price: number;
  amount: number;
}

interface IPurchaseResponse {
  id: string;
  purchase_id: string;
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
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const { isAuthenticated } = useContext(AuthContext);

  const [products_list, set_products_list] = useState<CartObjectType[]>([]);

  const [products_amount, set_products_amount] = useState(0);
  const [products_value, set_products_value] = useState(0);
  const [total_value, set_total_value] = useState(0);
  const [delivery_value, set_delivery_value] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("@coffee-delivery") == null) {
      localStorage.setItem("@coffee-delivery", "[]");
    }

    let get = JSON.parse(localStorage.getItem("@coffee-delivery"));

    if (products_list.length === 0 && get.length > 0) {
      set_products_list(get);
    }

    calcProductsAmount();
  }, []);

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("@coffee-delivery"));

    if (products_list !== get) {
      const products = JSON.stringify(products_list);
      localStorage.setItem("@coffee-delivery", products);
    }

    calcProductsAmount();
  }, [products_list]);

  function handleCheckObjectsState({ id, name, img, price, amount }: CartObjectType) {
    let newAmount: number;
    newAmount = 0;
    products_list.map((item) => {
      item.id == id ? (newAmount = item.amount) : 0;
    });
    return newAmount;
  }

  function handleAddItensToCart({ id, name, img, price, amount }: CartObjectType) {
    products_list.map((item) => {
      if (item.id == id) {
        products_list.splice(products_list.indexOf(item), 1);
      }
    });
    addItensToCart({ id, name, img, price, amount });
  }

  function handleRemoveItensToCart({ id, name, img, price, amount }: CartObjectType) {
    handleSetProductsPrice(-price * amount);
    set_products_list((state) =>
      state.filter((ItensObject) => {
        return ItensObject.id !== id;
      })
    );
  }

  function handleSetProductsPrice(newPrice: number) {
    set_products_value((state) => state + newPrice);
  }

  function handleSetProductsAmount(amount: number) {
    set_products_amount((state) => state + amount);
  }

  // TODO Function area

  function addItensToCart({ id, name, img, price, amount }: CartObjectType) {
    set_products_list((state) =>
      [...state, { id, name, img, price, amount }].sort(
        (a, b) => Number(a.id) - Number(b.id)
      )
    );
  }

  function calcProductsValue() {
    set_products_value(
      products_list.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0)
    );
  }

  function calcProductsAmount() {
    set_products_amount(
      products_list.reduce((total, product) => {
        return total + product.amount;
      }, 0)
    );
  }

  function calcDeliveryValue() {
    if (products_amount > 0) {
      set_delivery_value(400);
    }
    if (products_amount === 0) {
      set_delivery_value(0);
    }
  }

  function calcTotalPrice() {
    set_total_value(products_value + delivery_value);
  }

  useEffect(() => {
    calcDeliveryValue();
    calcProductsValue();
    calcTotalPrice();
  }, [products_list, products_value, delivery_value]);

  async function handleFinishBuy(
    address_id: string,
    payment_type: string
  ): Promise<IPurchaseResponse> {
    interface IFinishCartProps {
      coffee_id: string;
      quantity: number;
    }

    const cart: IFinishCartProps[] = products_list.map((item) => {
      return { coffee_id: String(item.id), quantity: item.amount };
    });

    try {
      const response = await api.post("/purchases", {
        address_id,
        delivery_value,
        payment_type,
        cart,
      });
      set_products_list([]);
      set_products_amount(0);
      set_products_value(0);
      return response.data;
    } catch (error) {
      console.warn("🚀 / createAddress / error", error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        products_amount,
        products_list,
        products_value,
        delivery_value,
        total_value,
        handleSetProductsAmount,
        handleAddItensToCart,
        handleSetProductsPrice,
        handleRemoveItensToCart,
        handleCheckObjectsState,
        handleFinishBuy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
