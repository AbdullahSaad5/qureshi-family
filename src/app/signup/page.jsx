"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [signupInfo, setSignupInfo] = useState({
    fullName: "",
    contact: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    aboutYou: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;

    if (!emailRegex.test(signupInfo.email)) {
      errors.email = "Invalid email format";
    }

    if (!passwordRegex.test(signupInfo.password)) {
      errors.password =
        "Password must be 8-40 characters long, contain at least one lowercase, one uppercase letter, and one special character.";
    }

    if (signupInfo.password !== signupInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await API.post("/signup", {
          email: signupInfo.email,
          password: signupInfo.password,
        });
        setSignupInfo({ email: "", password: "", confirmPassword: "" });
        toast.success("Signup successful!");
        router.push("/signin");
      } catch (error) {
        toast.error(
          `Signup failed: ${
            error.response?.data?.message ||
            "An error occurred. Please try again."
          }`
        );
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src={bg}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Signup Form Overlay */}
      <section className="absolute inset-0 flex items-center md:w-[600px] lg:w-[700px] justify-start m-26 z-10">
        <div className="w-full max-w-5xl p-4 bg-white bg-opacity-70 rounded-lg shadow dark:bg-gray-800 dark:bg-opacity-80 dark:border dark:border-gray-700 backdrop-blur-lg">
          <div className="p-8 space-y-4 md:space-y-6">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Account
            </h1>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSignup}>
              {/* Fullname Input */}
              <div className="col-span-1">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                  value={signupInfo.fullName}
                />
              </div>

              {/* Contact Input */}
              <div className="col-span-1">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Contact Number
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="92**********34"
                  required
                  value={signupInfo.contact}
                />
              </div>

              {/* Email Input */}
              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={signupInfo.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Reenter Email Input */}
              <div className="col-span-1">
                <label
                  htmlFor="confirmEmail"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Re-enter Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={signupInfo.confirmEmail}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="col-span-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={signupInfo.password}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={signupInfo.confirmPassword}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* About Input */}
              <div className="col-span-2">
                <label
                  htmlFor="aboutYou"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <textarea
                  onChange={handleChange}
                  name="aboutYou"
                  id="aboutYou"
                  rows="3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tell us about yourself"
                  value={signupInfo.aboutYou}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full text-white hover:bg-blue-500 bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create Account
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                >
                  Sign In here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
