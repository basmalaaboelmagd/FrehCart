"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";


interface Props {
  productId: string;
  className?: string;
}

export default function AddToCartButton({ productId, className = "" }: Props) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    await addToCart(productId);
    setAdding(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={adding}
      className={`flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition ${className}`}
    >
      <FaShoppingCart />
      {adding ? "Adding..." : "Add to cart"}
    </button>
    
  );
}