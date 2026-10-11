"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Cart, CartResponse } from "@/types/cart";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

interface CartContextType {
  cart: Cart | null;
  numOfCartItems: number;
  loading: boolean;
  getCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<boolean>;
  updateCount: (productId: string, count: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

const getHeaders = () => ({ token: localStorage.getItem("userToken") ?? "" });

const getErrorMessage = (err: unknown, fallback: string) =>
  axios.isAxiosError(err) ? err.response?.data?.message ?? fallback : fallback;

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCart = useCallback(async () => {
    if (!localStorage.getItem("userToken")) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get<CartResponse>(BASE_URL, {
        headers: getHeaders(),
      });
      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch {
      setCart(null);
      setNumOfCartItems(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId: string) => {
    try {
      const { data } = await axios.post<CartResponse>(
        BASE_URL,
        { productId },
        { headers: getHeaders() }
      );
      setNumOfCartItems(data.numOfCartItems);
      toast.success(data.message ?? "Product added to cart");
      await getCart();
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err, "Something went wrong"));
      return false;
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const { data } = await axios.delete<CartResponse>(`${BASE_URL}/${productId}`, {
        headers: getHeaders(),
      });
      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
      toast.success("Product removed");
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't remove product"));
    }
  };

  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return removeItem(productId);
    try {
      const { data } = await axios.put<CartResponse>(
        `${BASE_URL}/${productId}`,
        { count },
        { headers: getHeaders() }
      );
      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't update quantity"));
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(BASE_URL, { headers: getHeaders() });
      setCart(null);
      setNumOfCartItems(0);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't clear cart"));
    }
  };

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        numOfCartItems,
        loading,
        getCart,
        addToCart,
        updateCount,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}