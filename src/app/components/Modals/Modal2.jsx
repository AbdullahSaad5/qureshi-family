"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { toast } from "react-hot-toast";

const Modal2 = ({
  isAddSpouseModalOpen,
  setIsAddSpouseModalOpen,
  slectedFatherID,
  reFetchtree,
  setReFetchtree,
}) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: "onChange", // Validate on change
  });

  // Function to handle form submission
  const onSubmitSpouse = async (data) => {
    console.log("Form Submitted:", data);

    console.log("Father 2 ID in modal 2");
    console.log(slectedFatherID);

    setValue("personId", slectedFatherID);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addSpouse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Spouse added successfully");
        toast.success("Spouse Added successfully");
        setIsAddSpouseModalOpen(false);
        reset();
        setReFetchtree(!reFetchtree);
      } else {
        console.error("Error adding spouse:", responseData.message);
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error adding spouse:", error);
      toast.error("An error occurred while adding the spouse.");
    }
  };

  useEffect(() => {
    setValue("personId", slectedFatherID);
  }, [slectedFatherID]);

  return (
    <Modal
      open={isAddSpouseModalOpen}
      onCancel={() => setIsAddSpouseModalOpen(false)}
      width={800}
      footer={null}
    >
      <section>
        <h2 className="text-center text-2xl font-semibold">Add Spouse</h2>
        <form
          onSubmit={handleSubmit(onSubmitSpouse)} // Use handleSubmit from react-hook-form
          className="grid grid-cols-2 gap-6 mt-8"
        >
          {/* Spouse Name */}
          <div>
            <label
              htmlFor="spouseName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Name
            </label>
            <input
              type="text"
              id="spouseName"
              {...register("spouseName", {
                required: "Spouse Name is required",
              })}
              className={`bg-gray-50 border ${
                errors.spouseName ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Spouse Name"
            />
            {errors.spouseName && (
              <p className="text-red-500 text-sm">
                {errors.spouseName.message}
              </p>
            )}
          </div>

          {/* Spouse Gender */}
          <div>
            <label
              htmlFor="SpouseGender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Gender
            </label>
            <select
              id="SpouseGender"
              {...register("SpouseGender", {
                required: "Spouse Gender is required",
              })}
              className={`bg-gray-50 border ${
                errors.SpouseGender ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.SpouseGender && (
              <p className="text-red-500 text-sm">
                {errors.SpouseGender.message}
              </p>
            )}
          </div>

          {/* Spouse DOB */}
          <div>
            <label
              htmlFor="spouseDOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse DOB
            </label>
            <input
              type="date"
              id="spouseDOB"
              {...register("spouseDOB", {
                required: "Spouse DOB is required",
                validate: {
                  notFutureDate: (value) =>
                    new Date(value) <= new Date() ||
                    "Spouse DOB cannot be a future date",
                },
              })}
              className={`bg-gray-50 border ${
                errors.spouseDOB ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {errors.spouseDOB && (
              <p className="text-red-500 text-sm">{errors.spouseDOB.message}</p>
            )}
          </div>

          <input type="hidden" {...register("personId")} />

          {/* Submit Button */}
          <div className="col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-[#82D026] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#79b41d]"
            >
              Add Spouse
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default Modal2;
