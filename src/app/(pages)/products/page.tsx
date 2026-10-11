import AllProducts from '../../_components/AllProducts/page'
import Link from "next/link"
import { Package } from "lucide-react"

export default async function Products() {
  return (
    <>
      <title>Product</title>

      <div className="bg-green-500 text-white p-8 my-4 w-full mx-auto">
        <div className="text-sm mb-3">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / All Products
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-xl text-2xl">
            <Package />
          </div>

          <div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-sm opacity-90">
              Explore our complete product collection
            </p>
          </div>
        </div>
      </div>

      <AllProducts />
    </>
  )
}
