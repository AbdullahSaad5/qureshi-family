"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";

import { toast } from "react-hot-toast";



import "@xyflow/react/dist/style.css";



const Modal2 = ({ isAddSpouseModalOpen, setIsAddSpouseModalOpen }) => {
  const [formData, setFormData] = useState({
    spouseName: "",
    SpouseGender: "",
    spouseDOB: "",
  });
  const [errorss, setErrors] = useState({});

  const handleChangee = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { spouseName, SpouseGender, spouseDOB } = formData;

    if (!spouseName) newErrors.spouseName = "Spouse Name is required";
    if (!SpouseGender) newErrors.SpouseGender = "Spouse Gender is required";
    if (!spouseDOB) {
      newErrors.spouseDOB = "Spouse DOB is required";
    } else if (new Date(spouseDOB) > new Date()) {
      newErrors.spouseDOB = "Spouse DOB cannot be a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitSpouse = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Inside spouse change function");
      const newData = {
        ...formData,
        personId: selectedParentID,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/addSpouse`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Spouse Added successfully");
          toast.success("Spouse Added successfully");
          setIsAddSpouseModalOpen(false);
        } else {
          console.error("Error adding spouse:", data.message);
        }
      } catch (error) {
        console.error("Error adding spouse:", error);
      }
    }
  };

  return (
    <Modal
      open={isAddSpouseModalOpen}
      onCancel={() => setIsAddSpouseModalOpen(false)}
      width={800}
      footer={null}
    >
      <section>
        <h2 className="text-center text-2xl font-semibold">Add Spouse</h2>
        <form onSubmit={onSubmitSpouse} className="grid grid-cols-2 gap-6 mt-8">
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
              value={formData.spouseName}
              onChange={handleChangee}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Spouse Name"
            />
            {errorss.spouseName && (
              <p className="text-red-500 text-sm">{errorss.spouseName}</p>
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
              value={formData.SpouseGender}
              onChange={handleChangee}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errorss.SpouseGender && (
              <p className="text-red-500 text-sm">{errorss.SpouseGender}</p>
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
              value={formData.spouseDOB}
              onChange={handleChangee}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errorss.spouseDOB && (
              <p className="text-red-500 text-sm">{errorss.spouseDOB}</p>
            )}
          </div>

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
