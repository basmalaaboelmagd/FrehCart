
'use client'
import { getAllCategory } from "@/api/allCategory.api";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { CategoryType } from './../../../types/allCategory.type';

export default function Slidering({data}:{data:CategoryType[]}) {

  return (
    <>
    
        <Swiper
          spaceBetween={0}
          slidesPerView={2}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          breakpoints={{640:{slidesPerView:3},768:{slidesPerView:4},1024:{slidesPerView:5},1280:{slidesPerView:7}}}
        >
          {data.map((cateogry)=><SwiperSlide>
            <img className="h-50 w-full" src={cateogry.image} />
          </SwiperSlide>)}

        </Swiper>

    </>
  );
}
