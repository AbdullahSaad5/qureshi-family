"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../app/axios";
import { toast } from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";

function NewPassword() {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;
    if (!passwordRegex.test(loginInfo.password)) {
      errors.password =
        "Password must be 8-40 characters long, contain at least one lowercase, one uppercase letter, and one special character.";
    }
    if (loginInfo.password !== loginInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleForget = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(loginInfo.password);

      // try {
      //   const res = await API.post("/login", loginInfo);
      //   toast.success("Logged in successfully!");
      //   typeof window !== undefined && localStorage.setItem("userToken", res.data.message); // Assuming you receive a token
      //   setLoginInfo({ email: "", password: "" });
      //   router.push("/family-tree");
      // } catch (error) {
      //   if (error.response?.status === 401) {
      //     toast.error("Incorrect email or password. Please try again.");
      //   } else {
      //     toast.error(
      //       error.response?.data?.message ||
      //         "An error occurred. Please try again."
      //     );
      //   }
      // }
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
              Create New Password
            </h2>

            {/* <p className="text-center text-xs">Enter your email, we will allow you to change your password.</p> */}
            <form
              action=""
              onSubmit={handleForget}
              className="space-y-4 md:space-y-6"
            >
              {/* Password Input */}
              <div className="col-span-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    // value={signupInfo.password}
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
                  className="block text-xs font-medium text-gray-900 dark:text-white"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    // value={signupInfo.confirmPassword}
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

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewPassword;
