"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { userVerified, logoutUser } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-5 w-full bg-[#FFFFFF] flex flex-row justify-between items-center px-6 lg:px-10 relative shadow-md">
      <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
        <Image src={logo} alt="logo" width={80} height={80} />
        {/* <div className="flex flex-col gap-1">
          <h1 className="text-[#82D026] text-2xl md:text-xl lg:text-2xl font-semibold">
            Shajra e
          </h1>
          <h3 className="text-[#000000] text-xl md:text-lg lg:text-xl text-center font-semibold">
            Nasb
          </h3>
        </div> */}
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center absolute top-full left-0 w-full bg-white transition-transform duration-300 ease-in-out md:static md:flex-row md:gap-5 lg:gap-20 md:w-auto md:bg-transparent md:flex z-10`}
      >
        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 mt-4 md:mt-0 ">
          <div
            onClick={() => handleNavigation("/Explore")}
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
            onClick={() => handleNavigation("/AboutUs")}
            className="text-[#000000] text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
          >
            About Us
          </div>

          {userVerified ? (
            <div
              onClick={() => handleNavigation("/Profile")}
              className="md:hidden text-[#000000] mb-5 text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
            >
              Profile
            </div>
          ) : (
            <div
              onClick={() => handleNavigation("/signin")}
              className="md:hidden text-[#000000] mb-5 text-xl md:text-lg lg:text-xl font-semibold cursor-pointer"
            >
              Login
            </div>
          )}
        </div>
      </div>

      {userVerified ? (
        <div className="cursor-pointer hidden md:block">
          <Avatar
            className="cursor-pointer hidden md:block"
            onClick={() => router.push("/Profile")}
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </div>
      ) : (
        <div onClick={() => handleNavigation("/signin")} className=" md:flex hidden">
          <div className="relative flex justify-center w-40 lg:w-48 rounded-full border border-[#82D026] bg-[#82D026] p-0.5 cursor-pointer">
            <div className="text-center text-white text-sm lg:text-base rounded-full px-4 py-2 transition-colors duration-300">
              Login
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden flex items-center">
        {menuOpen ? (
          <X className="text-black cursor-pointer" size={28} onClick={toggleMenu} />
        ) : (
          <Menu className="text-black cursor-pointer" size={28} onClick={toggleMenu} />
        )}
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
