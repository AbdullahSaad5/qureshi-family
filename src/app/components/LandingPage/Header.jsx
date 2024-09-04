"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("login");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="p-5 w-full bg-[#FFFFFF] flex flex-row justify-between items-center px-6 lg:px-10 relative">
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
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

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center absolute top-full left-0 w-full bg-white transition-transform duration-300 ease-in-out md:static md:flex-row md:gap-5 lg:gap-20 md:w-auto md:bg-transparent md:flex z-10`}
      >
        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 mt-4 md:mt-0">
          <div
            onClick={() => handleNavigation("/family-tree")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Explore
          </div>
          <div
            onClick={() => handleNavigation("/Expand")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Expand
          </div>
          <div
            onClick={() => handleNavigation("/Endorse")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Endorse
          </div>
          <div
            onClick={() => handleNavigation("/AboutUs")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            About Us
          </div>

          <div
            onClick={() => handleNavigation("/signin")}
            className="md:hidden text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Login
          </div>

          <div
            onClick={() => handleNavigation("/signup")}
            className="md:hidden text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="relative hidden  md:flex justify-between w-40 lg:w-48 rounded-full border border-[#82D026] p-0.5">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-[#82D026] rounded-full transition-transform duration-300 ${
              active === "register" ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>

          <Link
            href="/signin"
            className={`flex-1 text-center relative z-10 text-xs lg:text-sm rounded-full px-4 py-2 transition-colors duration-300 ${
              active === "login" ? "text-white" : "text-primary"
            }`}
            onClick={() => setActive("login")}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={`flex-1 text-center relative z-10 text-xs lg:text-sm rounded-full px-4 py-2 transition-colors duration-300 ${
              active === "register" ? "text-white" : "text-primary"
            }`}
            onClick={() => setActive("register")}
          >
            Register
          </Link>
        </div>

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

// "use client";

// import { useRouter } from "next/navigation";
// import logo from "../../_assets/logo.png";
// import Image from "next/image";
// import { Search } from "lucide-react";

// function Header() {
//   const router = useRouter();

//   return (
//     <div className="p-5 w-full bg-[#FFFFFF] flex flex-col md:flex-row justify-between items-center px-6 lg:px-10">
//       {/* Logo and Title Section */}
//       <div
//         onClick={() => router.push("/")}
//         className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer"
//       >
//         <Image src={logo} alt="logo" width={70} height={50} />

//         <div className="flex flex-col gap-1">
//           <h1 className="text-[#82D026] text-2xl md:text-xl lg:text-2xl font-semibold">
//             Qureshi
//           </h1>
//           <h3 className="text-[#000000] text-xl md:text-lg lg:text-xl text-center font-semibold">
//             Family
//           </h3>
//         </div>
//       </div>

//       {/* Navbar Links and Search Input */}
//       <div className="flex flex-col md:flex-row gap-5 lg:gap-20 items-center w-full md:w-auto">
//         {/* Navbar Links */}
//         <div className="flex gap-4 lg:gap-10">
//           <div
//             onClick={() => router.push("/family-tree")}
//             className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
//           >
//             Explore
//           </div>
//           <div
//             onClick={() => router.push("/expand")}
//             className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
//           >
//             Expand
//           </div>
//           <div
//             onClick={() => router.push("/endorse")}
//             className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
//           >
//             Endorse
//           </div>
//           <div
//             onClick={() => router.push("/login")}
//             className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
//           >
//             Login
//           </div>
//         </div>

//         {/* Search Input */}
//         <div className="relative w-full max-w-xs mt-4 md:mt-0">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <Search className="text-[#82D026]" size={22} />
//           </div>

//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full rounded-full border-2 border-black py-2 pl-10 pr-5 focus:outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
