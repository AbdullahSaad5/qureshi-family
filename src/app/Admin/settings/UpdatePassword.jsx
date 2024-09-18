"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import API from "../../axios";
import { useForm } from "react-hook-form";
function UpdatePassword({ userId }) {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const newPassword = watch("newPassword");
  // const [userData, setUserData] = useState({
  //   oldPassword: "",
  //   newPassword: "",
  //   reEnterPassword: "",
  // });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    reEnterPassword: false,
  });
  const [loadingButton, setLoadingButton] = useState(false);

  const togglePasswordVisibility = (pass) => {
    // setShowPassword(!showPassword[pass]);
    setShowPassword((prevState) => ({
      ...prevState,
      [pass]: !prevState[pass], // Toggle the specific password field
    }));
  };

  const handleUpdatePassword = async (data) => {
    console.log(`userId : ${userId}, data: ${data.newPassword}`);
    try {
      setLoadingButton(true);
      const res = await API.post("/update_password", {
        userId,
        ...data,
      });
      if (res.status) {
        toast.success("Password updated successfully");
        reset();
      } else {
        toast.error(`Error : ${res.message}`);
      }
    } catch (error) {
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          "An error occurred. Please try again."
        }`
      );
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Update Password
        </h3>
      </div>
      <div className="p-7">
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
          <div className="">
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Old Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <div onClick={() => togglePasswordVisibility("oldPassword")}>
                    {showPassword.oldPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </span>
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-red">{errors.oldPassword.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character",
                    },
                    validate: (value) =>
                      value !== watch("oldPassword") ||
                      "New password cannot be the same as the old password",
                  })}
                  placeholder="Enter New Password"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <div onClick={() => togglePasswordVisibility("newPassword")}>
                    {showPassword.newPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="re-type-new-password"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Re-type New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.reEnterPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <div
                    onClick={() => togglePasswordVisibility("reEnterPassword")}
                  >
                    {showPassword.reEnterPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </span>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              type="button"
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button
              disabled={loadingButton}
              className={`flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90  ${
                loadingButton ? "cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              <div className="flex justify-center items-center">
                <span> Update</span>
                {loadingButton && <FaSpinner className="animate-spin ml-2" />}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
