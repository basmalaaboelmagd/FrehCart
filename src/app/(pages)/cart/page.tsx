
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaShoppingCart,
  FaTrash,
  FaUser,
  FaPlus,
  FaMinus,
  FaArrowLeft,
} from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const formatPrice = (n: number | undefined) =>
  Number(n ?? 0).toLocaleString("en-US");

export default function CartPage() {
  const { cart, loading, getCart, updateCount, removeItem, clearCart } =
    useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userToken"));
    getCart();
  }, [getCart]);

  const products = cart?.products ?? [];
  const totalItems = products.reduce((sum, p) => sum + p.count, 0);

  if (loading && !cart) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Shopping Cart</span>
        </nav>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl">
            <FaShoppingCart />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        {!cart || products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center mt-8">
            <h2 className="text-2xl font-semibold mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some products to get started.
            </p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-8">
              You have{" "}
              <span className="text-green-600 font-semibold">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>{" "}
              in your cart
            </p>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="space-y-5">
                  {products.map((item) => {
                    const id = item.product._id || item.product.id;

                    return (
                      <div
                        key={id}
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex gap-6"
                      >
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="max-h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                            {item.product.title}
                          </h3>

                          <span className="self-start mt-3 bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                            {item.product.category?.name}
                          </span>

                          <p className="text-green-600 font-bold text-lg mt-3">
                            {formatPrice(item.price)} EGP
                          </p>

                          <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1">
                              <button
                                onClick={() =>
                                  updateCount(id, item.count - 1)
                                }
                                disabled={item.count <= 1}
                                aria-label="Decrease quantity"
                                className="w-9 h-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center disabled:cursor-not-allowed hover:enabled:bg-gray-100 hover:enabled:text-gray-700"
                              >
                                <FaMinus />
                              </button>

                              <span className="w-8 text-center font-semibold">
                                {item.count}
                              </span>

                              <button
                                onClick={() =>
                                  updateCount(id, item.count + 1)
                                }
                                aria-label="Increase quantity"
                                className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100"
                              >
                                <FaPlus />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(id)}
                              className="text-red-500 hover:text-red-700 flex items-center gap-2"
                            >
                              <FaTrash />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Total items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">
                    {formatPrice(
                      products.reduce(
                        (sum, item) => sum + item.price * item.count,
                        0
                      )
                    )}{" "}
                    EGP
                  </span>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full border border-red-200 text-red-500 py-3 rounded-xl hover:bg-red-50 mb-3"
                >
                  <FaTrash className="inline mr-2" />
                  Clear Cart
                </button>

                {isLoggedIn ? (
                  <Link
                    href="/checkout"
                    className="block text-center w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block text-center w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                  >
                    <FaUser className="inline mr-2" />
                    Login to Checkout
                  </Link>
                )}

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 mt-4 text-gray-500 hover:text-green-600"
                >
                  <FaArrowLeft />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
