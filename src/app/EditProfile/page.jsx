"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { useForm } from "react-hook-form";
import API from "../axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";

const EditProfile = () => {
  const router = useRouter();
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("1");
  // Function to switch between tabs
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const id = typeof window !== "undefined" && localStorage.getItem("userId");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      //   email: "",
      contact: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const watchPassword = watch("password");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onInfoSubmit = async (data) => {
    console.log("Info Submitted");
    try {
      console.log("Inside Info Change");
      const response = await API.post(
        `https://quresh-family-5b06b2823b36.herokuapp.com/api/update_profile`,
        {
          userID: id,
          contact: data.contact,
          fullName: data.name,
        }
      );
      toast.success("Info Updated Sucessfully");
      console.log(response.data);
      typeof window !== "undefined" &&
        localStorage.setItem("contact", response.data.user.contact);
      typeof window !== "undefined" &&
        localStorage.setItem("fullName", response.data.user.fullName);
      typeof window !== "undefined" &&
        localStorage.setItem("userToken", JSON.stringify(response.data.user));
      router.push("/Profile");
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

  const onPasswordSubmit = async (data) => {
    // e.preventDefault()
    try {
      console.log("Inside Password Submit");
      const response = await API.post(
        `https://quresh-family-5b06b2823b36.herokuapp.com/api/update_password`,
        {
          userId: id,
          oldPassword: data.oldPassword,
          newPassword: data.password,
        }
      );

      toast.success("Password updated Sucessfully");
      router.push("/Profile");
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

  useEffect(() => {
    const username =
      typeof window !== "undefined" && localStorage.getItem("fullName");
    const contact =
      typeof window !== "undefined" && localStorage.getItem("contact");

    if (username && contact) {
      setValue("contact", contact);
      setValue("name", username);
    }
  },[]);
  return (
    <>
      <Header />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Tabs navigation */}

        <div className="flex border-b border-gray-300 mb-6">
          <Link href="/Profile" className="">
            <ArrowLeftFromLine className=" mt-3 mr-3 cursor-pointer hover:text-[#82D026] " />
          </Link>

          <div
            onClick={() => handleTabChange("1")}
            className={`px-4 py-2 text-lg cursor-pointer ${
              activeTab === "1"
                ? "border-b-4 border-[#82D026] text-[#82D026]"
                : "text-gray-600"
            }`}
          >
            Edit Profile Info
          </div>

          <div
            onClick={() => handleTabChange("2")}
            className={`px-4 py-2 text-lg cursor-pointer ${
              activeTab === "2"
                ? "border-b-4 border-[#82D026] text-[#82D026]"
                : "text-gray-600"
            }`}
          >
            Change Password
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg h-[500px] overflow-y-auto">
          {activeTab === "1" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Edit Profile Information
              </h3>
              <form
                onSubmit={handleSubmit(onInfoSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {/* Name Input */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Username is required",
                      maxLength: {
                        value: 40,
                        message: "Name must be less than 40 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Contact Input */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Contact</label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your contact"
                    {...register("contact", {
                      required: "Contact is required",
                    })}
                  />
                  {errors.contact && (
                    <p className="text-rose-500 text-sm">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-[#82D026] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
          {activeTab === "2" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Change Password</h3>
              <form
                onSubmit={handleSubmit(onPasswordSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {/* Old Password Input */}
                <div className="col-span-1">
                  <label
                    htmlFor="oldPassword"
                    className="block text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="oldPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("oldPassword", {
                        required: "Old Password is required",
                      })}
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
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("password", {
                        required: "Password is required",
                      })}
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
                    <p className="text-rose-500 text-sm">
                      {errors.password.message}
                    </p>
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
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                          value === watchPassword || "Passwords must match",
                      })}
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
                    <p className="text-rose-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#82D026] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default EditProfile;
