import { Brandd } from "@/types/allBrands.type"





export const getAllBrands = async (): Promise<Brandd> => {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  )

  const payLoad: Brandd = await response.json()

  return payLoad
}