"use client";

import { useRouter } from "next/navigation";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import { Search } from "lucide-react";

function Header() {
  const router = useRouter();

  return (
    <div className="p-5 w-full bg-[#FFFFFF] flex flex-col md:flex-row justify-between items-center px-6 lg:px-10">
      {/* Logo and Title Section */}
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Image src={logo} alt="logo" width={70} height={50} />

        <div className="flex flex-col gap-1">
          <h1 className="text-[#82D026] text-2xl md:text-xl lg:text-2xl font-semibold">
            Qureshi
          </h1>
          <h3 className="text-[#000000] text-xl md:text-lg lg:text-xl text-center font-semibold">
            Family
          </h3>
        </div>
      </div>

      {/* Navbar Links and Search Input */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-20 items-center w-full md:w-auto">
        {/* Navbar Links */}
        <div className="flex gap-4 lg:gap-10">
          <div
            onClick={() => router.push("/Explore")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Explore
          </div>
          <div
            onClick={() => router.push("/expand")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Expand
          </div>
          <div
            onClick={() => router.push("/endorse")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Endorse
          </div>
          <div
            onClick={() => router.push("/login")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Login
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs mt-4 md:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-[#82D026]" size={22} />
          </div>

          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border-2 border-black py-2 pl-10 pr-5 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
