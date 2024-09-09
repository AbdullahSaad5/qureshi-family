import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import Header from "./components/LandingPage/Header";
import Footer from "./components/LandingPage/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qureshi Family",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Toaster />
          <Header />
          <AntdRegistry>{children}</AntdRegistry>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
