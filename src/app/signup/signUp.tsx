"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import API from "../axios";

interface SignupInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: React.FC = () => {
  const router = useRouter();

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    let errors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;

    if (!emailRegex.test(signupInfo.email)) {
      errors.email = "Invalid email format";
    }

    if (!passwordRegex.test(signupInfo.password)) {
      errors.password =
        "Password must be 8-40 char long, contain at least one lower, one upper letter, and one special character";
    }

    if (signupInfo.password !== signupInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await API.post("/signup", {
          email: signupInfo.email,
          password: signupInfo.password,
        });
        setSignupInfo({ email: "", password: "", confirmPassword: "" });
        router.push("/signup");
        console.log("Signup successful:", res.data);
      } catch (error: any) {
        console.error(
          "Error during signup:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center bg-gray-800 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create New Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
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

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={signupInfo.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={signupInfo.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    onClick={() => router.push("/signin")}
                  >
                    Login here
                  </button>
                </p>
              </form>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
