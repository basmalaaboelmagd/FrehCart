
import { getProductsDetails } from '@/api/productDetail.api'
import SwiperSlider from '@/app/_components/swiperslider/page';
import React, { use } from 'react'


export default async function ProductDetail({ params }:{params:{id:string}}) {

    let { id } = await params

    let { data } = await getProductsDetails(id)
    console.log('ProductDetail:', JSON.stringify(data, null, 2)); console.log('Image:', data.imageCover);

    return (
        <>
            <SwiperSlider data={data}/>

        </>
    )
}
