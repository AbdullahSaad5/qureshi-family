"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import API from "../../axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import validateName from "../components/Validations/validateName";
// import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const password = watch("password");
  const email = watch("email");
  const [showPassword, setShowPassword] = useState({
    password: true,
    confirmPassword: true,
  });
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);

  // const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSignupInfo({
  //     ...signupInfo,
  //     [name]: value,
  //   });
  // };

  const togglePasswordVisibility = (pass) => {
    // setShowPassword(!showPassword[pass]);
    setShowPassword((prevState) => ({
      ...prevState,
      [pass]: !prevState[pass], // Toggle the specific password field
    }));
  };

  // const validateForm = () => {
  //   let errors = {};
  //   const phoneRegex = /^\+\d{12}$/;
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;
  //   validateName(signupInfo.fullName) &&
  //     (errors.fullName = validateName(signupInfo.fullName));

  //   if (!emailRegex.test(signupInfo.email)) {
  //     errors.email = "Invalid email format";
  //   }
  //   if (!phoneRegex.test(signupInfo.contact)) {
  //     errors.contact =
  //       "Phone number must start with '+' should be at least 12 digits";
  //   }

  //   if (!passwordRegex.test(signupInfo.password)) {
  //     errors.password =
  //       "Password must be 8-40 characters long, contain at least one lowercase, one uppercase letter, and one special character.";
  //   }

  //   if (signupInfo.password !== signupInfo.confirmPassword) {
  //     errors.confirmPassword = "Passwords do not match.";
  //   }
  //   if (signupInfo.email !== signupInfo.confirmEmail) {
  //     errors.confirmEmail = "Email do not match.";
  //   }
  //   console.log(errors);
  //   setErrors(errors);

  //   return Object.keys(errors).length === 0;
  // };

  const handleSignup = async (data) => {
    try {
      setLoadingButton(true);
      const res = await API.post("/createUser/add", {
        fullName: data.fullName,
        contact: data.contact,
        email: data.email,
        password: data.password,
        aboutYou: data.aboutYou,
        isAdmin: data.isAdmin ? "true" : "false",
      });
      console.log(`reponse ${res.data.status}`);
      if (res.data.status) {
        // setSignupInfo({ email: "", password: "", confirmPassword: "" });
        toast.success("Signup successful!");
        reset();
        router.push("/Admin/users");
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(`catch ${res.status}`);
      toast.error(
        `Signup failed: ${
          error.response?.message || "An error occurred. Please try again."
        }`
      );
    } finally {
      setLoadingButton(false);
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
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={handleSubmit(handleSignup)}
            >
              {/* Fullname Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="fullName"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "Full Name is required",
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: "Invalid Full Name",
                    },
                    minLength: {
                      value: 2,
                      message: "Full Name should be atleast 2 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm text-red">{errors.fullName.message}</p>
                )}
              </div>

              {/* Contact Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="contact"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="+-- --- ------- "
                  {...register("contact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^\+\d{12}$/, // Starts with '+' followed by exactly 12 digits
                      message:
                        "Phone number must start with '+' and be exactly 12 digits",
                    },
                  })}
                />
                {errors.contact && (
                  <p className="text-sm text-red">{errors.contact.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="email"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red">{errors.email.message}</p>
                )}
              </div>

              {/* Reenter Email Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="confirmEmail"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Re-enter Email
                </label>
                <input
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="confirmEmail"
                  {...register("confirmEmail", {
                    required: "Email is required",
                    validate: (value) =>
                      value === email || "Emails do not match",
                  })}
                />
                {errors.confirmEmail && (
                  <p className="text-sm text-red">
                    {errors.confirmEmail.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="password"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.password ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...register("password", {
                      required: "Password is required test",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character",
                      },
                    })}
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
                  <p className="text-sm text-red">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-900 block text-sm font-medium dark:text-black"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
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
                  <p className="text-sm text-red">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="flex gap-2">
                  <input type="checkbox" {...register("isAdmin")} />
                  <div>Make Admin</div>
                </label>
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
                  name="aboutYou"
                  id="aboutYou"
                  rows="3"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                  {...register("aboutYou", {
                    required: "Introduction is required",
                    maxLength: {
                      value: 500,
                      message: "Introduction cannot exceed 500 characters",
                    },
                    minLength: {
                      value: 25,
                      message: "Introduction must be at least 25 characters",
                    },
                  })}
                />
                {errors.aboutYou && (
                  <p className="text-sm text-red">{errors.aboutYou.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-2">
                <button
                  disabled={loadingButton}
                  type="submit"
                  className={`focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 dark:bg-primary  ${
                    loadingButton && "cursor-not-allowed"
                  }`}
                >
                  <div className=" flex justify-center items-center">
                    <span> Create Account</span>
                    {loadingButton && (
                      <FaSpinner className="animate-spin ml-2" />
                    )}
                  </div>
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
