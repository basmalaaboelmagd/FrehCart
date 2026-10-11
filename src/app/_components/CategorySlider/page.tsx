import { getAllCategory } from "@/api/allCategory.api";
import Image from "next/image";
import Slidering from "../Slidering/page";
import { Autoplay } from "swiper/modules";
import Link from "next/link";



export default async function CategorySlider() {

  const { data } = await getAllCategory()
  return (
    <>
<div className='w-[90%]  mx-auto my-5'>
      <div className=" mx-auto flex items-center justify-between my-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 border-l-4 border-[#00a859] pl-3 text-[#1a2530]">
          Shop By <span className="text-[#00a859]">Category</span>
        </h2>
        <Link href="/categories" className="text-[#00a859] font-semibold text-md hover:underline flex items-center gap-1">
          View All Categories &rarr;
        </Link>

      </div>
  <Slidering data={data} />

</div>


    </>
  );
}
