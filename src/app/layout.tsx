"use client";

import type { Metadata } from "next";

import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import Header from "./components/LandingPage/Header";
import Footer from "./components/LandingPage/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useRouter } from "next/navigation";
import {  useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const storedUser =
  //     typeof window !== "undefined" && localStorage.getItem("userToken");

  //   if (!storedUser) {
  //     router.push("/signin");
  //   }
  //   setTimeout(() => setLoading(false), 1000);
  // }, [router]);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Toaster />
          {/* <Header /> */}
          <AntdRegistry>{children}</AntdRegistry>
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
