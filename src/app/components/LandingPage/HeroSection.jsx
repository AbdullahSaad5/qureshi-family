"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sliderImage1 from "../../_assets/sliderImage1.png";
import sliderImage2 from "../../_assets/sliderImage2.png";
import sliderImage3 from "../../_assets/sliderImage3.png";

function HeroSection() {
  const router = useRouter();
  const images = [sliderImage1, sliderImage2, sliderImage3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Increase timer to 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Slider Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      ))}

      <div className="relative w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Text Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 bg-black bg-opacity-30 md:bg-transparent">
            <div className="hidden md:flex flex-col">
              <h1 className="text-[#82D026] text-5xl font-bold mb-4">
                Trace your family root
              </h1>
              <h3 className="text-white text-xl">
                Grow your family tree, discover new connections, and explore
                billions of historical records with a FREE trial.
              </h3>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Sign In</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#82D026] text-white font-bold rounded"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
