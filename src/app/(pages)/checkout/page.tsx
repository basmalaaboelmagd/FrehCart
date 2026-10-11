"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutRedirect() {
  const { cart, loading, getCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (loading) return;
    router.replace(cart?._id ? `/checkout/${cart._id}` : "/cart");
  }, [cart, loading, router]);

  return null;
}