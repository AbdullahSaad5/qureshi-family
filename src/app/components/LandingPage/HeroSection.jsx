"use client";
import { Carousel } from "antd";
import Image from "next/image";
import sliderImage1 from "../../_assets/1.png";
import sliderImage2 from "../../_assets/2.png";
import sliderImage3 from "../../_assets/3.png";
import { Righteous } from "next/font/google";


const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
});
const HeroSection = () => {
  const images = [sliderImage1, sliderImage2, sliderImage3];
  return (
    <div className="relative w-full h-[600px]">
  
      <Carousel autoplay className="h-full" dots={true} fade={true} easing="linear" speed={1000} >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[600px]">
            <Image
              src={image}
              alt={`Slider Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        ))}
      </Carousel>
     
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 z-9">
        <h1
          className={`${righteous.className}  text-[#82D026] text-5xl md:text-6xl lg:text-7xl font-bold mb-4`}
        >
          Trace <span className="text-white">Your</span> <br /> family{" "}
          <span className="text-white">Root</span>
        </h1>
        <h3 className="text-white text-lg tracking-normal">
          Grow your family tree, discover new connections, and <br /> explore
          billions of historical records with a{" "}
          <span className="text-[#82D026]"> FREE trial. </span>
        </h3>
        <div className="grid grid-cols-12">
          <div className="flex items-center col-span-5 mt-4">
            <input
              type="text"
              placeholder="Search Member Record"
              className="flex-grow px-4 py-4 border-none rounded-l-full focus:outline-none"
            />
            <button
              type="button"
              className="px-4 py-4 bg-[#82D026] text-white rounded-r-full  font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
