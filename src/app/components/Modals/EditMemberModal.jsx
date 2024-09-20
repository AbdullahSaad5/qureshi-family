"use client";
import { FaSpinner } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { toast } from "react-hot-toast";
import API from "../../axios";
import "@xyflow/react/dist/style.css";
import "antd/dist/reset.css";

const EditModal = ({ isModalOpen, handleCancel, data, fetchData }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      tribe: "",
      biography: "",
    },
  });

  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    console.log(`data : ${JSON.stringify(data, null, 2)}`);
    reset({
      name: data?.name,
      address: data?.address,
      tribe: data?.tribe,
      biography: data?.biography,
    });
  }, []);

  const onSubmit = async (formData) => {
    setLoadingButton(true);
    console.log(`Form submission: ${JSON.stringify(formData, null, 2)}`);
    try {
      const response = await API.put(`/members/${data._id}`, formData);
      console.log("Success:", response.data);
      toast.success("Members Profile updated Successfully");
      handleCancel();
      reset();
      fetchData();
    } catch (error) {
      console.error("Error:", error);

      // if (error.response.data.message === "Mother ID is required") {
      //   toast.error("Add spouse details before adding a child.");
      //   setSelectedParentID(error.response.data.fatherID);
      //   handleCancel();
      //   return;
      // }
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
      <section>
        <h2 className="text-center text-2xl font-semibold">Edit Details</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-2 "
        >
          {/* name */}
          <div className="col-span-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: "Invalid Name",
                },
                minLength: {
                  value: 2,
                  message: "Name should be atleast 2 characters",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* Tribe */}
          <div className="col-span-6">
            <label
              htmlFor="tribe"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tribe
            </label>
            <input
              type="text"
              id="tribe"
              {...register("tribe")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tribe"
            />
            {errors.tribe && (
              <p className="text-red text-sm">{errors.tribe.message}</p>
            )}
          </div>
          {/* Address */}
          <div className="col-span-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-red text-sm">{errors.address.message}</p>
            )}
          </div>
          {/* About Input */}
          <div className="col-span-12">
            <label
              htmlFor="aboutYou"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              id="aboutYou"
              {...register("biography")}
              rows="3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
          {/* Submit Button */}
          <div className="col-span-12  text-center mt-6">
            <button
              disabled={loadingButton}
              type="submit"
              className={` inline-flex w-full justify-center items-center bg-[#7457dd] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#8e54d1] ${
                loadingButton ? "cursor-not-allowed" : ""
              }`}
            >
              <span> Update Details</span>
              {loadingButton && <FaSpinner className="animate-spin ml-2" />}
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default EditModal;
