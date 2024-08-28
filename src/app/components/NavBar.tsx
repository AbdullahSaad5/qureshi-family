"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
// @ts-ignore
import Logo from "../_assets/next.svg";
import Image from "next/image";
import { cn } from "@utils/cn";
import links from "@/app/_links";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const [active, setActive] = useState("login");
  const currentLocation = usePathname();

  return (
    <nav className="flex h-14 items-center justify-between rounded border bg-white px-6 py-10 shadow-sm">
      <div
        className={cn(
          "z-10 grid place-items-center rounded-full bg-white",

          currentLocation === "/" && "left-8 top-8 lg:relative lg:h-40 lg:w-40"
        )}
      >
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="logo"
            width={currentLocation === "/" ? 100 : 80}
            height={currentLocation === "/" ? 100 : 80}
            className="h-16 w-16 lg:h-20 lg:w-20"
          />
        </Link>
      </div>

      {/* Nav Bar Links in Large Screens and bigger sizes */}
      <div className="">
        <ul className="hidden px-2 font-semibold lg:flex">
          {links.slice(0, -2).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`mx-1 px-2 py-3 hover:text-primary ${
                  currentLocation.startsWith(link.href) &&
                  (currentLocation[link.href.length] === "/" ||
                    currentLocation.length === link.href.length) &&
                  "border-b-4 border-b-primary px-2 py-3 text-primary xl:px-6"
                } `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Nav Bar in Smaller than Large Screens  */}
      <details className="dropdown dropdown-end lg:hidden">
        <summary className="btn m-1">
          <Menu />
        </summary>
        <ul className="menu dropdown-content z-[999] w-52 rounded-box bg-base-100 p-2 shadow">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                key={link.name}
                href={link.href}
                className={`mx-2 ${
                  currentLocation.startsWith(link.href) &&
                  (currentLocation[link.href.length] === "/" ||
                    currentLocation.length === link.href.length) &&
                  "bg-primary text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      <div className="hidden rounded-full border border-blue-600   p-0.5 py-2 lg:block">
        <Link
          href="/signin"
          className={`${
            active === "login" ? "bg-blue-500 text-white" : "text-primary"
          } rounded-full px-4 py-2 text-xs transition-colors duration-300 lg:text-sm`}
          onClick={() => {
            setActive("login");
          }}
        >
          Login
        </Link>
        <Link
          href="/signup"
          className={`${
            active === "register" ? "bg-blue-500 text-white" : "text-primary"
          } rounded-full px-4 py-2 text-xs transition-colors duration-300 lg:text-sm`}
          onClick={() => {
            setActive("register");
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
