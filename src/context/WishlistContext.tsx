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
import type {
  WishlistProduct,
  WishlistListResponse,
  WishlistIdsResponse,
} from "@/types/wishlist";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

interface WishlistContextType {
  wishlist: WishlistProduct[];
  wishlistCount: number;
  loading: boolean;
  getWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}

const getToken = () => localStorage.getItem("userToken") ?? "";
const getHeaders = () => ({ token: getToken() });

const getErrorMessage = (err: unknown, fallback: string) =>
  axios.isAxiosError(err) ? err.response?.data?.message ?? fallback : fallback;

export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  // IDs بس: بنستخدمها عشان نلوّن القلب في أي كارت منتج
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------- Display ----------
  const getWishlist = useCallback(async () => {
    if (!getToken()) {
      setWishlist([]);
      setWishlistIds([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get<WishlistListResponse>(BASE_URL, {
        headers: getHeaders(),
      });
      setWishlist(data.data);
      setWishlistIds(data.data.map((p) => p._id || p.id));
    } catch {
      setWishlist([]);
      setWishlistIds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- Add ----------
  const addToWishlist = async (productId: string) => {
    if (!getToken()) {
      toast.info("Please login first");
      return;
    }
    try {
      const { data } = await axios.post<WishlistIdsResponse>(
        BASE_URL,
        { productId },
        { headers: getHeaders() }
      );
      setWishlistIds(data.data);
      toast.success(data.message ?? "Added to wishlist");
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't add to wishlist"));
    }
  };

  // ---------- Remove ----------
  const removeFromWishlist = async (productId: string) => {
    try {
      const { data } = await axios.delete<WishlistIdsResponse>(
        `${BASE_URL}/${productId}`,
        { headers: getHeaders() }
      );
      setWishlistIds(data.data);
      setWishlist((prev) => prev.filter((p) => data.data.includes(p._id || p.id)));
      toast.success(data.message ?? "Removed from wishlist");
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't remove from wishlist"));
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // القلب: لو المنتج موجود يشيله، لو مش موجود يضيفه
  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) await removeFromWishlist(productId);
    else await addToWishlist(productId);
  };

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlistIds.length,
        loading,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
