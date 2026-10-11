"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import SingleProduct from "@/app/_components/singleProduct/page";
import type { ProductType } from "@/types/allProduct.types";
import type { Category, SubCategory } from "@/types/category";

const BASE = "https://ecommerce.routemisr.com/api/v1";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [category, setCategory] = useState<Category | null>(null);
  const [subs, setSubs] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [activeSub, setActiveSub] = useState<string | null>(null); // null = كل منتجات الـ category
  const [loadingProducts, setLoadingProducts] = useState(true);


  useEffect(() => {
    let cancelled = false;
    setActiveSub(null);
    (async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get(`${BASE}/categories/${id}`),
          axios.get(`${BASE}/categories/${id}/subcategories`),
        ]);
        if (cancelled) return;
        setCategory(catRes.data.data);
        setSubs(subRes.data.data);
      } catch {
        if (!cancelled) {
          setCategory(null);
          setSubs([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setLoadingProducts(true);
    (async () => {
      try {
        const params = activeSub
          ? { "subcategory[in]": activeSub }
          : { "category[in]": id };
        const { data } = await axios.get(`${BASE}/products`, { params });
        if (!cancelled) setProducts(data.data);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoadingProducts(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, activeSub]);

  const chipClass = (active: boolean) =>
    `px-5 py-2 rounded-full border text-sm font-medium transition ${
      active
        ? "bg-green-600 border-green-600 text-white"
        : "bg-white border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600"
    }`;

  const activeSubName = subs.find((s) => s._id === activeSub)?.name;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-green-600">Categories</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category?.name ?? "..."}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{category?.name ?? "Category"}</h1>

        {/* Subcategories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => setActiveSub(null)} className={chipClass(activeSub === null)}>
            All
          </button>
          {subs.map((sub) => (
            <button
              key={sub._id}
              onClick={() => setActiveSub(sub._id)}
              className={chipClass(activeSub === sub._id)}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {loadingProducts ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No products found{activeSubName ? ` in ${activeSubName}` : ""}
            </h2>
            <Link href="/categories" className="inline-flex items-center gap-2 text-green-600 hover:underline">
              <FaArrowLeft size={14} /> Back to categories
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {products.map((product) => (
              <SingleProduct key={product.id} currentProduct={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
