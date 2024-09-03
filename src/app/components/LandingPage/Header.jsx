"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Importing both icons
import Link from "next/link";

function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("login");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-5 w-full bg-[#FFFFFF] flex flex-row justify-between items-center px-6 lg:px-10 relative">
      
      {/* Logo and Title Section */}
      <div className="flex items-center gap-2">
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

      {/* Navbar Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center absolute top-full left-0 w-full bg-white transition-transform duration-300 ease-in-out md:static md:flex-row md:gap-5 lg:gap-20 md:w-auto md:bg-transparent md:flex z-10`}
      >
        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 mt-4 md:mt-0">
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
            About Us
          </div>
        </div>
      </div>

      {/* Menu Icon and Login/Register */}
      <div className="flex">
        {/* Login/Register */}
        <div className=" rounded-full border border-[#82D026] p-0.5 py-2 mx-4">
          <Link
            href="/signin"
            className={`${
              active === "login" ? "bg-[#82D026] text-white" : "text-primary"
            } rounded-full px-4 py-2 text-xs transition-colors duration-300 lg:text-sm`}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={`${
              active === "register" ? "bg-[#82D026] text-white" : "text-primary"
            } rounded-full px-4 py-2 text-xs transition-colors duration-300 lg:text-sm`}
          >
            Register
          </Link>
        </div>

        {/* Icons */}
        <div className="md:hidden flex items-center">
          {menuOpen ? (
            <X
              className="text-black cursor-pointer"
              size={28}
              onClick={toggleMenu}
            />
          ) : (
            <Menu
              className="text-black cursor-pointer"
              size={28}
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
