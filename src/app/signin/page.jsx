"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";

import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { FaSpinner } from "react-icons/fa";

function Login() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { verifyUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoadingButton(true);
      console.log("Inside on submit function");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        data
      );
      console.log(response.data.data);
      typeof window !== "undefined" &&
        localStorage.setItem("userId", response.data.data._id);
      typeof window !== "undefined" &&
        localStorage.setItem("email", response.data.data.email);
      typeof window !== "undefined" &&
        localStorage.setItem("contact", response.data.data.contact);
      typeof window !== "undefined" &&
        localStorage.setItem("fullName", response.data.data.fullName);
      typeof window !== "undefined" &&
        localStorage.setItem("userToken", JSON.stringify(response.data.data));
      toast.success(response.data.message);
      verifyUser();
      if (response.data.data.isAdmin === true) {
        router.push("/Admin");
      } else {
        router.push("/Explore");
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <>
      <Header />

      <div className="relative w-full h-screen">
        <Image
          src={bg}
          alt="background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        {/* Login form */}
        <section className="absolute inset-0 flex items-center justify-start ml:16 md:ml-16 lg:ml-32 z-9">
          <div className="w-full bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              {/* Use handleSubmit from react-hook-form to submit the form */}
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@gmail.com"
                  />
                  {/* Error message for email */}
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEye className="text-gray-500" />
                      ) : (
                        <FaEyeSlash className="text-gray-500" />
                      )}
                    </div>
                  </div>
                  {/* Error message for password */}
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <p
                  onClick={() => router.push("/ForgetPassword")}
                  className="ml-0.5 mt-0.5 cursor-pointer"
                >
                  Forget Password ?
                </p>

                <button
                  disabled={loadingButton}
                  type="submit"
                  className={` flex justify-center  items-center w-full mt-5 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                     ${loadingButton && "cursor-not-allowed"}
                    `}
                >
                  <span>Sign In</span>
                  {loadingButton && <FaSpinner className="animate-spin ml-2" />}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Login;
