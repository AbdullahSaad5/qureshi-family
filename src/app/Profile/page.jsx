"use client";

import React from "react";
import { UserRoundPen, UserRound, Mail, Phone, PenLine } from "lucide-react";
import Link from "next/link";
function Profile() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-gray-100 px-6">
      <div className=" w-[80%] md:w-1/2 flex flex-col items-center mt-0 p-8 md:p-0">
        <UserRoundPen size={100} className="text-[#82D026] cursor-pointer" />
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {" "}
            <span className="text-[#82D026]">Shajra </span> e Nasab
          </h1>
        </div>
        <p className="mt-4 text-sm sm:text-md text-center w-[80%] text-gray-700">
          Discover and explore your family history. Shajra e Nasab allows you to
          view and trace your family lineage easily.
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
              <p className="text-gray-600">John Doe</p>
            </div>
          </div>
          {/* Email Field */}
          <div className="flex items-center mb-4">
            <Mail className="text-[#82D026]" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">testuser@email.com</p>
            </div>
          </div>
          {/* Contact Field */}
          <div className="flex items-center mb-4">
            <Phone className="text-[#82D026]" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
              <p className="text-gray-600">03*******47</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Profile;
