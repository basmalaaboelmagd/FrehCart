'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import image1 from "../../../../public/assets/images/imageye___-_imgi_111_home-slider-1.d79601a8.png"

import { Autoplay } from 'swiper/modules';

export default function MainSlider() {

  const slidesData = [
    {
      id: 1,
      image: image1,
      title: "Fresh Products Delivered\nto your Door",
      subtitle: "Get 20% off your first order",
      primaryBtnText: "Shop Now",
      secondaryBtnText: "View Deals"
    },
    {
      id: 2,
      image: image1,
      title: "Premium Quality Fresh \nProducts Guaranteed",
      subtitle: "Fresh from farm to your Table, 20% off first order",
      primaryBtnText: "Shop Now",
      secondaryBtnText: "Learn More"
    },
    {
      id: 3,
      image: image1,
      title: "Fast & Free Delivery ",
      subtitle: "Same day delivery available",
      primaryBtnText: "Shop Now",
      secondaryBtnText: "Learn More"
    }
  ];

  return (
    <>
      <div className="w-full mx-auto flex items-center my-5">
        <div className="w-full">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id} className="w-full">
                <Image
                  src={slide.image}
                  alt="Slider Image"
                  className="w-full h-[400px] object-cover"
                />

                <div className="absolute inset-0 bg-green-500/50 flex flex-col justify-center items-start p-8 md:p-16 text-white text-left">
                  <h2 className=" md:text-5xl leading-tight mb-4 whitespace-pre-line">
                    {slide.title}
                  </h2>

                  <p className=" md:text-xl font-medium mb-6 text-gray-100">
                    {slide.subtitle}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="bg-white text-green-600 font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-100 transition">
                      {slide.primaryBtnText}
                    </button>

                    <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition">
                      {slide.secondaryBtnText}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}