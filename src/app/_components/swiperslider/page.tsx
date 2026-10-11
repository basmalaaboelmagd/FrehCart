'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ProductType } from './../../../types/allProduct.types';

export default function SwiperSlider({ data } :{data:ProductType}) {
    
    

    const [selectedImage, setSelectedImage] = useState(data.imageCover)
    
    return (
        <>
            <div className='w-[90%] mx-auto'>
                <div className='flex items-center'>
                    <div className='w-full md:w-1/4' >
                        <Image width={500} height={500} src={selectedImage} alt="" />
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={4}
                            modules={[Autoplay]}
                            autoplay={{ delay: 2000 }}                        >

                            {data.images.map((image) => (<SwiperSlide onClick={() => setSelectedImage(image)}><img src={image} alt="" /></SwiperSlide>
                            ))}

                        </Swiper>


                    </div>
                    <div className='w-full md:w-3/4'>
                        <h2 className='text-green-600 text-xl font-semibold'>{data.title}</h2>
                        <p className="my-3 " >{data.description}</p>
                        <div className='flex justify-between items-center'>
                            <div className='star-left'>
                                <span>{data.price} EGP</span>
                            </div>
                            <div className='star-right'>
                                <span className='flex items-center'>{data.ratingsAverage} <Star className='text-[#FFC900]' fill='#FFC900' /> </span>

                            </div>
                        </div>
                        <Button className={'w-full my-3 bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer '}>Add To Cart</Button>

                    </div>
                </div>
            </div>


        </>
    )
}
