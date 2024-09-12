"use client";
// import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "./components/common/Loader/index";

import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  // const { state, setState } = useContext(MyContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("userToken");
    // console.log(JSON.stringify(storedUser, null, 2));
    if (!storedUser) {
      router.push("/Admin/login");
    }
    setTimeout(() => setLoading(false), 1000);
  }, [router]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          
            {/* <Toaster /> */}
            {children}
          
        </div>
      </body>
    </html>
  );
}
