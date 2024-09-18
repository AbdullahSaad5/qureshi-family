"use client";
import { FaSpinner } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { toast } from "react-hot-toast";
import API from "../../axios";
import "@xyflow/react/dist/style.css";
import "antd/dist/reset.css";
import { Contact } from "lucide-react";

const EditModal = ({ isModalOpen, handleCancel, data, fetchData }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      contact: "",
      email: "",

      /*
      status": "active",
            "isBlocked": false,
            "isAdmin": false,
            "_id": "66e8279b3a3b0675d28e6e3f",
            "fullName": "Ali Khan",
            "contact": "+921111111190",
            "email": "Ali@gmail.com",
            "password": "$2b$10$UM3Ip6IgXhbB7OWP6cA1LOktrVdEHqbwtM6YPcwOvc0cSKpcdC.qC",
            "aboutYou": "Hello i am testing this website",
            "date_time": "2024-09-16T12:42:03.545Z", */
    },
  });

  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    console.log(`data : ${JSON.stringify(data, null, 2)}`);
    reset({
      userID: data._id,
      // isBlocked: data.isBlocked,
      // isAdmin: data.isAdmin,
      fullName: data?.fullName,
      contact: data?.contact,
      email: data?.email,
    });
    setValue("isAdmin", data.isAdmin);
    setValue("status", data.status);
  }, []);

  const onSubmit = async (formData) => {
    setLoadingButton(true);
    console.log(`Form submission: ${JSON.stringify(formData, null, 2)}`);
    try {
      const response = await API.post(`/update_profile`, formData);
      console.log("Success:", response.data);
      toast.success(response.data.message);
      handleCancel();
      reset();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      {
        toast.error(error.response.data.message);
        setSelectedParentID(error.response.data.fatherID);
        handleCancel();
      }
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
          {/* Status Select */}
          <div className="col-span-6">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              id="status"
              {...register("status", {
                required: "Please select an option",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="active">Active</option>
              <option value="blocked">Block</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
          {/* Admin Select */}
          <div className="col-span-6">
            <label
              htmlFor="isAdmin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Is Admin
            </label>
            <select
              id="isAdmin"
              {...register("isAdmin", {
                required: "Please select an option",
              })}
              onChange={(e) => {
                const value = e.target.value === "true"; // Convert to boolean
                e.target.value = String(value); // Convert back to string so the form can handle it
                return value;
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.isAdmin && (
              <p className="text-red-500 text-sm">{errors.isAdmin.message}</p>
            )}
          </div>
          {/* fullName */}
          <div className="col-span-6">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", {
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
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          {/* Contact */}
          <div className="col-span-6">
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Conatct
            </label>
            <input
              type="text"
              id="contact"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^\+\d{12}$/, // Starts with '+' followed by exactly 12 digits
                  message:
                    "Phone number must start with '+' and be exactly 12 digits",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+-- --- ------- "
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="col-span-12">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              disabled={true}
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
