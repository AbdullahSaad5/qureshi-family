"use client";

import React, { useEffect, useState } from "react";
import Loader from "./components/common/Loader/index";

import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {  
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userToken");

    if (!storedUser) {
      router.push("/Admin/AdminLogin");
    }
    setTimeout(() => setLoading(false), 1000);
  }, [router]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
     
            <Toaster />
            {children} 
       
        </div>
      </body>
    </html>
  );
}
