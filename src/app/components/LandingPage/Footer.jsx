import React from "react";
import { FaFacebookF, FaInstagram, FaTimes } from "react-icons/fa";
import logo from "../../_assets/logo.png";
import Image from "next/image";
function Footer() {
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
            <span className="font-extrabold">Qureshi </span>
            <span className="text-[#82D026] mt-4 font-extrabold text-2xl md:text-2xl lg:text-2xl">
              Family
            </span>
          </h1>
        </div>
        <div className="flex flex-row md:flex-col  lg:flex-col xl:flex-row items-center border-b-2 border-white p-6 mt-16 md:mt-8 lg:mr-8">
          <span className="font-extrabold text-md  md:text-xl lg:text-xl">
            Follow Us On :
          </span>
          <div className="flex space-x-4 ml-4 mt-2 text-md md:text-xl lg:text-xl ">
            <FaFacebookF />
            <FaInstagram />
            <FaTimes />
          </div>
        </div>
      </div>
      {/* Add Spacing Between First and Second Line */}
      <div className="my-8 md:my-16 lg:my-2"></div>
      {/* Second Line - Table-Like Structure */}
      <div className=" flex items-center justify-center">
        <div className=" w-[90%] grid grid-cols-2 sm:grid-cols-2 sm:gap-16 md:grid-cols-2 md:gap-16 lg:grid-cols-4  lg:gap-16 xl:w-[90%] xl:grid-cols-5 px-4  border-b-2 border-white p-16">
          <div>
            <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
              COMPANY
            </h2>
            <div className="text-sm md:text-md lg:text-sm font-sm">
              <p className="py-1 md:py-2">About Us</p>
              <p className="py-1 md:py-2">Expand</p>
              <p className="py-1 md:py-2">Explore</p>
              <p className="py-1 md:py-2">Endorse</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
              SUPPORT
            </h2>
            <div className="text-sm md:text-md lg:text-sm font-sm">
              <p className="py-1 md:py-2">Contact Support</p>
              <p className="py-1 md:py-2">Help Center</p>
              <p className="py-1 md:py-2">Support Devices</p>
              <p className="py-1 md:py-2">Activate Your Device</p>
              <p className="py-1 md:py-2">Accessibility</p>
            </div>
          </div>
          <div className="my-12 md:my-0">
            <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
              PARTNERS
            </h2>
            <div className="text-sm md:text-md lg:text-sm font-sm">
              <p className="py-1 md:py-2">Advertise With Us</p>
              <p className="py-1 md:py-2">Partner With Us</p>
            </div>
          </div>
          <div className="my-12 md:my-0">
            <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
              AVAILABLE
            </h2>
            <div className="text-sm md:text-md lg:text-sm font-sm">
              <p className="py-1 md:py-2">iOS</p>
              <p className="py-1 md:py-2">Apple</p>
              <p className="py-1 md:py-2">Android</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-md md:text-xl lg:text-xl">
              ABOUT
            </h2>
            <div className="text-sm md:text-md lg:text-sm font-sm">
              <p className="py-1 md:py-2">User Stories</p>
              <p className="py-1 md:py-2">Become An Affiliate</p>
            </div>
          </div>
        </div>
      </div>
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
