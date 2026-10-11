

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/category";

async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to load categories");
  const json = await res.json();
  return json.data;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Categories</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Categories</h1>
        <p className="text-gray-500 mb-8">Browse our products by category</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:ring-1 hover:ring-green-600 transition"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="font-semibold text-lg text-green-600">{cat.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
