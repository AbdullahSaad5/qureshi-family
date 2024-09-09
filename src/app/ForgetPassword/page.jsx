"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../app/axios";
import { toast } from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";

function ForgetPassword() {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForget = async (e) => {
    e.preventDefault();
    console.log("Inside handle forget pass function");

    try {
      console.log("Inside on submit function");
      const response = await API.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/forget_password`,
        {
          email: loginInfo.email,
        }
      );
      toast.success(
        `We sent an email to ${loginInfo.email} with a link to get back into your account`,
        { duration: 7000 }
      );
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        const message = error.response.data.message;
        toast.error(message);
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Image
        src={bg}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Login form */}
      <section className="absolute  inset-0 flex items-center justify-start ml:16 md:ml-16 lg:ml-32 z-10">
        <div className="w-[400px] ml-4 bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
            <div class="flex justify-center items-center">
              <LockKeyhole size={42} strokeWidth={2.25} />
            </div>
            <h2 className="text-center text-xl font-normal">
              Trouble logging in?
            </h2>

            <p className="text-center text-xs">
              Enter your email, we will allow you to change your password.
            </p>
            <form
              action=""
              onSubmit={handleForget}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs  font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                  value={loginInfo.email}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send Link
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
