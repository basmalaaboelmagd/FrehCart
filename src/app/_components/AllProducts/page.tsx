import SingleProduct from '@/app/_components/singleProduct/page'
import { getAllProducts } from '@/api/allproducts.api'
import type { ProductType } from "@/types/allProduct.types";
export default async function AllProducts() {

  let { data } = await getAllProducts()


  return (
    <>
      <title>Product</title>

      <div className='w-[90%] mx-auto my-5'>
        <div className='flex flex-wrap'>
          {data.map((currentProduct:ProductType) =>
            <SingleProduct key={currentProduct._id} currentProduct={currentProduct} />
          )}
        </div>
      </div>
    </>
  )
}