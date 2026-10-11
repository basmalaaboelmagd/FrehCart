import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ProductType } from '@/types/allProduct.types';
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistButton from "../WishlistButton/WishlistButton";



export default function SingleProduct({ currentProduct }: { currentProduct: ProductType }) {
    return (
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
            <div className="inner p-5">
                <Card className="w-full max-w-sm inner p-5 ring-0 hover:ring-1 hover:ring-green-600 cursor-pointer group relative">
                    
                    {}
                    <div className="absolute top-3 right-3 z-10">
                        <WishlistButton productId={currentProduct.id} />
                    </div>

                    <Link href={`/products/${currentProduct.id}`}>
                        <CardHeader>
                            <CardTitle>
                                <Image width={500} height={500} src={currentProduct.imageCover} alt={currentProduct.title} />
                            </CardTitle>
                            <CardDescription>
                                <h2 className='text-green-600 text-lg'>{currentProduct.category.name}</h2>
                                <p className='text-black text-md font-semibold my-3'>{currentProduct.title}</p>

                                <div className='flex justify-between items-center'>
                                    <div className='star-left'>
                                        <span>{currentProduct.price} EGP</span>
                                    </div>
                                    <div className='star-right'>
                                        <span className='flex items-center'>{currentProduct.ratingsAverage} <Star className='text-[#FFC900]' fill='#FFC900' /> </span>
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Link>

                    {/* زرار الـ Add To Cart الحقيقي اللي أنتي عملتيه */}
                    <AddToCartButton productId={currentProduct.id} className="w-full my-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                </Card>
            </div>
        </div>
    )
}