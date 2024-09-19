"use client";

import { useState, useEffect } from "react";
import { UserRoundPen, UserRound, Mail, Phone, PenLine } from "lucide-react";
import Link from "next/link";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const router = useRouter();
  const { setUserVerified, setIsAdmin } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("fullName");
      const storedEmail = localStorage.getItem("email");
      const storedContact = localStorage.getItem("contact");
      setFullName(storedName || "Loading...");
      setemail(storedEmail || "Loading...");
      setcontact(storedContact || "Loading...");
    }
  }, []);

  return (
    <>
      <Header />

      <section className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-gray-100 px-6">
        <div className=" w-[80%] md:w-1/2 flex flex-col items-center mt-0 p-8 md:p-0">
          <UserRoundPen size={100} className="text-[#82D026] cursor-pointer" />
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-[#82D026]">Shajra </span> e Nasab
            </h1>
          </div>
          <p className="mt-4 text-sm sm:text-md text-center w-[80%] text-gray-700">
            Discover and explore your family history. Shajra e Nasab allows you
            to view and trace your family lineage easily.
          </p>
        </div>
        {/* Right Side - User Info Card */}
        <div className="w-[80%]  sm:w-[50%] md:w-[40%]  mr- py-8 md:py-0">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-row gap-x-4">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                Profile Information
              </h2>
              <Link href="/EditProfile">
                <PenLine className="text-[#82D026] cursor-pointer" />
              </Link>
            </div>
            {/* Name Field */}
            <div className="flex items-center mb-4">
              <UserRound className="text-[#82D026]" size={24} />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Name</h3>
                <p className="text-gray-600">{fullName}</p>
              </div>
            </div>
            {/* Email Field */}
            <div className="flex items-center mb-4">
              <Mail className="text-[#82D026]" size={24} />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            {/* Contact Field */}
            <div className="flex items-center mb-4">
              <Phone className="text-[#82D026]" size={24} />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
                <p className="text-gray-600">{contact}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("fullName");
                localStorage.removeItem("email");
                localStorage.removeItem("contact");
                localStorage.removeItem("userId");
                localStorage.removeItem("userToken");
                localStorage.removeItem("isAdmin");
                setIsAdmin(false);
                setUserVerified(false);
                router.push("/signin");
              }}
              className="w-full text-white bg-[#82D026] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default Profile;
