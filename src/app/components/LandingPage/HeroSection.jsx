"use client";

import { Carousel } from "antd";
import Image from "next/image";
import sliderImage1 from "../../_assets/1.png";
import sliderImage2 from "../../_assets/2.png";
import sliderImage3 from "../../_assets/3.png";
import { Righteous } from "next/font/google";
import { Button, Input, Space } from 'antd';

// Load the Righteous font
const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const images = [sliderImage1, sliderImage2, sliderImage3];

  return (
    <>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[600px]">
            <Image
              src={image}
              alt={`Slider Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 z-10">
              <h1
                className={`${righteous.className} text-[#82D026] text-5xl md:text-6xl lg:text-7xl font-bold mb-4`}
              >
                Trace <span className="text-white">Your</span> <br /> family{" "}
                <span className="text-white">Root</span>
              </h1>
              <h3 className="text-white text-lg tracking-normal">
                grow your family tree, discover new connections, and <br />{" "}
                explore billions of historical records with a{" "}
                <span className="text-[#82D026]"> FREE trial. </span>
              </h3>

              <Space.Compact
                style={{ width: "40%" }} // Add gap between input and button
                className="mt-16"
              >
                <Input
                  defaultValue="Combine input and button"
                  className="rounded-full p-4"
                  style={{ backgroundColor: "white" , padding:"12px" }}
                />
                <Button
                  type="primary"
                  className="rounded-full p-4 text-xl font-medium"
                  style={{ backgroundColor: "#82D026", borderColor: "#82D026" , padding:"24px" , font:"24px"}}
                >
                  Search
                </Button>
              </Space.Compact>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default HeroSection;


// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import sliderImage1 from "../../_assets/sliderImage1.png";
// import sliderImage2 from "../../_assets/sliderImage2.png";
// import sliderImage3 from "../../_assets/sliderImage3.png";

// function HeroSection() {
//   const router = useRouter();
//   const images = [sliderImage1, sliderImage2, sliderImage3];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Increase timer to 5 seconds

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="relative w-full h-[600px] overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
//             index === currentImageIndex ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={image}
//             alt={`Slider Image ${index + 1}`}
//             layout="fill"
//             objectFit="cover"
//             className="w-full h-full"
//           />
//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black opacity-30"></div>
//         </div>
//       ))}

// <div className="relative w-full h-[600px] overflow-hidden">
//   <div className="absolute inset-0 flex flex-col md:flex-row">
//     {/* Text Section */}
//     <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 bg-black bg-opacity-30 md:bg-transparent">
//       <div className="hidden md:flex flex-col">
//         <h1 className="text-[#82D026] text-5xl font-bold mb-4">
//           Trace your family root
//         </h1>
//         <h3 className="text-white text-xl">
//           Grow your family tree, discover new connections, and explore
//           billions of historical records with a FREE trial.
//         </h3>
//       </div>
//     </div>

//           {/* Login Form Section */}
//           {/* <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 mt-10">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//               <h2 className="text-2xl font-bold mb-6">Sign In</h2>
//               <form>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="password" className="block text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-[#82D026] text-white font-bold rounded"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
