"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import validateName from "../components/Validations/validateName";
// import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";

function Signup() {
  const [showPassword, setShowPassword] = useState({
    password: true,
    confirmPassword: true,
  });
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

  const togglePasswordVisibility = (pass) => {
    // setShowPassword(!showPassword[pass]);
    setShowPassword((prevState) => ({
      ...prevState,
      [pass]: !prevState[pass], // Toggle the specific password field
    }));
  };

  const validateForm = () => {
    let errors = {};
    const phoneRegex = /^\+\d{12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;
    validateName(signupInfo.fullName) &&
      (errors.fullName = validateName(signupInfo.fullName));

    if (!emailRegex.test(signupInfo.email)) {
      errors.email = "Invalid email format";
    }
    if (!phoneRegex.test(signupInfo.contact)) {
      errors.contact =
        "Phone number must start with '+' should be at least 12 digits";
    }

    if (!passwordRegex.test(signupInfo.password)) {
      errors.password =
        "Password must be 8-40 characters long, contain at least one lowercase, one uppercase letter, and one special character.";
    }

    if (signupInfo.password !== signupInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (signupInfo.email !== signupInfo.confirmEmail) {
      errors.confirmEmail = "Email do not match.";
    }
    console.log(errors);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await API.post("/createUser/add", {
          fullName: signupInfo.fullName,
          contact: signupInfo.contact,
          email: signupInfo.email,
          password: signupInfo.password,
          aboutYou: signupInfo.aboutYou,
        });
        console.log(`reponse ${res.data.status}`);
        if (res.data.status) {
          setSignupInfo({ email: "", password: "", confirmPassword: "" });
          toast.success("Signup successful!");
          router.push("/Admin/login");
        } else {
          toast.error(`${res.data.message}`);
        }
      } catch (error) {
        console.log(`catch ${res.status}`);
        toast.error(
          `Signup failed: ${
            error.response?.message || "An error occurred. Please try again."
          }`,
        );
      }
    }
  };

  return (
    <div className="">
      {/* Background Image */}
      {/* <Image
        src={bg}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      /> */}

      {/* Signup Form Overlay */}
      <section className="flex items-center justify-start md:w-[600px] lg:w-[700px]">
        <div className="dark:border-gray-700 w-full max-w-5xl rounded-lg bg-white bg-opacity-70 p-4 shadow backdrop-blur-lg dark:border dark:bg-gray dark:bg-opacity-80">
          <div className="space-y-4 p-8 md:space-y-6">
            <h1 className="text-gray-900 text-center text-xl font-bold leading-tight tracking-tight dark:text-black md:text-2xl">
              Create New Account
            </h1>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSignup}>
              {/* Fullname Input */}
              <div className="col-span-1">
                <label
                  htmlFor="fullName"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Full Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                  value={signupInfo.fullName}
                />
                {errors.fullName && (
                  <p className="text-sm text-red">{errors.fullName}</p>
                )}
              </div>

              {/* Contact Input */}
              <div className="col-span-1">
                <label
                  htmlFor="contact"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Contact Number
                </label>
                <input
                  onChange={handleChange}
                  type="tel"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="+92********34"
                  required
                  value={signupInfo.contact}
                />
                {errors.contact && (
                  <p className="text-sm text-red">{errors.contact}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                  required
                  value={signupInfo.email}
                />
                {errors.email && (
                  <p className="text-sm text-red">{errors.email}</p>
                )}
              </div>

              {/* Reenter Email Input */}
              <div className="col-span-1">
                <label
                  htmlFor="confirmEmail"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Re-enter Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                  required
                  value={signupInfo.confirmEmail}
                />
                {errors.confirmEmail && (
                  <p className="text-sm text-red">{errors.confirmEmail}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="col-span-1">
                <label
                  htmlFor="password"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword.password ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    value={signupInfo.password}
                  />
                  <div
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  >
                    {showPassword.password ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword.confirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    value={signupInfo.confirmPassword}
                  />
                  <div
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  >
                    {showPassword.confirmPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red">{errors.confirmPassword}</p>
                )}
              </div>

              {/* About Input */}
              <div className="col-span-2">
                <label
                  htmlFor="aboutYou"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  About
                </label>
                <textarea
                  onChange={handleChange}
                  name="aboutYou"
                  id="aboutYou"
                  rows="3"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                  value={signupInfo.aboutYou}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 dark:bg-primary"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
