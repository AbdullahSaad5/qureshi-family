"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaTimes } from "react-icons/fa";
import logo from "../../_assets/logo.png";
import X from "../../_assets/X.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#1B1B1B]  text-white px-6 md:px-16 pt-12">
      <div className="flex flex-col md:flex-col lg:flex-row  justify-between items-center ">
        <div className="flex flex-row items-center border-b-2 border-white m- ">
          <Image
            src={logo}
            alt="Qureshi Family Logo"
            className="mb-2"
            style={{ width: "70px", height: "70px" }}
          />
          <h1 className="font-bold flex flex-col text-center m-4 justify-center text-3xl md:text-3xl lg:text-3xl">
            <span className="font-extrabold">Shajra e </span>
            <span className="text-[#82D026] mt-4 font-extrabold text-2xl md:text-2xl lg:text-2xl">
              Nasab
            </span>
          </h1>
        </div>
        {/* <div className="flex flex-row md:flex-col  lg:flex-col xl:flex-row items-center border-b-2 border-white p-4 mt-16 md:mt-8 lg:mr-8">
          <span className="font-extrabold text-md mt-2 md:text-xl lg:text-xl">
            Follow Us On :
          </span>
          <div className="flex ml-4 mt-2 text-md md:text-xl lg:text-xl ">
            <FaFacebookF className="mt-[10px]"/>
            <FaInstagram className="mt-[10px] ml-4"/>
            <Image className="w-10 h-8 md:w-12 md:h-10 " src={X} alt="X logo" />
            {/* <FaTimes /> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* Add Spacing Between First and Second Line */}
      <div className="my-8 md:my-16 lg:my-2"></div>
      {/* Second Line - Table-Like Structure */}
      <div className=" flex items-center justify-center">
        {/* <div className=" w-[90%] flex justify-center px-4  border-b-2 border-white p-16"> */}
        {/* use the below div instead of above div if there are more then 2 items to display */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 items-center w-full flex flex-col  sm:flex-row gap-2 sm:gap-14 ">
            <div className="px- mt-1">
              <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
                NAVIGATION
              </h2>
              <div className="text-sm md:text-md lg:text-sm font-sm">
                <p
                  onClick={() => router.push("/AboutUs")}
                  className="py-1 md:py-2 cursor-pointer"
                >
                  About Us
                </p>
                <p
                  onClick={() => router.push("/Expand")}
                  className="py-1 md:py-2 cursor-pointer"
                >
                  Expand
                </p>
                <p
                  onClick={() => router.push("/Explore")}
                  className="py-1 md:py-2 cursor-pointer"
                >
                  Explore
                </p>
                {/* <p className="py-1 md:py-2">Endorse</p> */}
              </div>
            </div>
            <div className="ml-12 sm:ml-0 mt-12 sm:mt-3 md:mt-1 mb-9">
              <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
                CONTACT US
              </h2>
              <div className="text-sm md:text-md lg:text-sm font-sm">
                <p className="py-1 md:py-2">Contact Support</p>
                <p className="py-1 md:py-2">info@shajraenasab.com</p>
                {/* <p className="py-1 md:py-2">Support Devices</p>
              <p className="py-1 md:py-2">Activate Your Device</p>
              <p className="py-1 md:py-2">Accessibility</p> */}
              </div>
            </div>
            <div className="mr-8 sm:mr-0 mt-6 sm:mt-7 md:mt-0">
              <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl ml-4">
                SOCIAL LINKS
              </h2>
              <div className="text-sm md:text-md lg:text-sm font-sm">
                <div className="flex flex-row  ml-3 mb-4 mt-2">
                  <FaFacebookF size={20} className="mt-[4px] mr-[5px]" />
                  <p className="ml-2 mt-1">facebook</p>
                </div>
                <div className="flex flex-row  ml-3">
                  <FaInstagram size={20} className="mt-[4px] mr-[5px]" />
                  <p className="ml-2 mt-1">instagram</p>
                </div>
                <div className="flex flex-row  mr-8 mt-4 sm:mt-3 md:mt-0 ">
                  <Image
                    className="w-10 h-8 md:w-12 md:h-10 "
                    src={X}
                    alt="X logo"
                  />
                  <p className="mt-2">twitter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-white w-[100%] mb-4 mt-16" />
      {/* Third Line - Copyright */}
      <div className="mb-0 mt-12 md:mt-12 lg:mt-8 lg:mb-0 text-center text-sm md:text-sm lg:text-sm font-medium">
        <p className="p-3">Copyright© 2024 Qureshi Family</p>
        <p className="">
          Qureshi Family Is A Registered Trademark All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
export default Footer;
