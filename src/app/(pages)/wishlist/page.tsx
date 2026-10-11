"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const formatPrice = (n: number | undefined) => Number(n ?? 0).toLocaleString("en-US");

export default function WishlistPage() {
  const { wishlist, loading, getWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  if (loading && wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Wishlist</span>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl">
            <FaHeart />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center mt-8">
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Tap the heart on any product to save it here.</p>
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
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              </span>{" "}
              in your wishlist
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => {
                const id = product._id || product.id;
                return (
                  <div
                    key={id}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 flex flex-col"
                  >
                    {/* Image + remove */}
                    <div className="relative bg-gray-50 rounded-2xl h-52 flex items-center justify-center p-3">
                      <Link href={`/products/${id}`} className="h-full flex items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="max-h-full object-contain"
                        />
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col mt-4">
                      {product.category?.name && (
                        <span className="self-start bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full mb-2">
                          {product.category.name}
                        </span>
                      )}
                      <Link
                        href={`/products/${id}`}
                        className="font-semibold text-gray-900 line-clamp-1 hover:text-green-600"
                      >
                        {product.title}
                      </Link>

                      <p className="text-green-600 font-bold text-lg mt-2">
                        {formatPrice(product.priceAfterDiscount ?? product.price)} EGP
                        {product.priceAfterDiscount && (
                          <span className="ml-2 text-sm font-normal text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </p>

                      <button
                        onClick={() => addToCart(id)}
                        className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart /> Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
