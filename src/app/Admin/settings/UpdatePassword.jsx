"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../axios";
function UpdatePassword({ userId }) {
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
    reEnterPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    reEnterPassword: false,
  });
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = (pass) => {
    // setShowPassword(!showPassword[pass]);
    setShowPassword((prevState) => ({
      ...prevState,
      [pass]: !prevState[pass], // Toggle the specific password field
    }));
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    let errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/;

    if (!passwordRegex.test(userData.newPassword)) {
      errors.newPassword =
        "Password must be 8-40 characters long, contain at least one lowercase, one uppercase letter, and one special character.";
    }
    if (userData.oldPassword === userData.newPassword) {
      errors.newPassword = "Old password and new password cannot be same";
    }

    if (userData.newPassword !== userData.reEnterPassword) {
      errors.reEnterPassword = "Password doesn't match.";
    }
    console.log(errors);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log(`userId : ${userId}`);

    if (validateForm()) {
      try {
        const res = await API.post("/update_password", {
          userId,
          oldPassword: userData.oldPassword,
          newPassword: userData.newPassword,
        });
        if (res.status) {
          toast.success("Password updated successfully");
          setUserData({
            oldPassword: "",
            newPassword: "",
            reEnterPassword: "",
          });
        } else {
          toast.error(`Error : ${res.message}`);
        }
      } catch (error) {
        toast.error(
          `Error: ${
            error.response?.data?.message ||
            "An error occurred. Please try again."
          }`,
        );
      }
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
        <form onSubmit={handleUpdatePassword}>
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
                  value={userData.oldPassword}
                  onChange={handleChange}
                  name="oldPassword"
                  required
                  autoComplete="off"
                  id="oldPassword"
                  type={showPassword.oldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
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
                  value={userData.newPassword}
                  onChange={handleChange}
                  required
                  name="newPassword"
                  autoComplete="off"
                  id="newPassword"
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Enter your New password"
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
                <p className="text-sm text-red">{errors.newPassword}</p>
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
                  value={userData.reEnterPassword}
                  onChange={handleChange}
                  name="reEnterPassword"
                  required
                  id="re-type-new-password"
                  type={showPassword.reEnterPassword ? "text" : "password"}
                  placeholder="Re-enter your New password"
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
            {errors.reEnterPassword && (
              <p className="text-sm text-red">{errors.reEnterPassword}</p>
            )}
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              type="button"
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              onClick={() =>
                setUserData({
                  newPassword: "",
                  oldPassword: "",
                  reEnterPassword: "",
                })
              }
            >
              Cancel
            </button>
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
