"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { CollapseProps } from "antd";
import { Collapse } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

import "@xyflow/react/dist/style.css";
import debounce from "lodash/debounce";
import "antd/dist/reset.css";

const Modal3 = ({
  isAddSpouseButtonClick,
  setIsAddSpouseButtonClick,
  setReFetchtree,
  reFetchtree,
}) => {
  const [fatherOptions, setFatherOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spouseOptions, setSpouseOptions] = useState([]);
  const [selectedParentID, setSelectedParentID] = useState("");
  const [showAddSpouseButton, setShowAddSpouseButton] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      father: "",
      mother: "",
      spouseName: "",
      dateOfBirth: "",
      spouseGender: "",
      spouseDOB: "",
      userID: "",
    },
  });

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addSpouse`,
        formData
      );

      console.log("Success:", response.data);

      // toast.success("Send child request for review");
      toast.success("Spouse Add Successfully");
      reset();
      setIsAddSpouseButtonClick(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response.data.message === "Mother ID is required") {
        toast.error("Add spouse details before adding a child.");
        setSelectedParentID(error.response.data.fatherID);
        handleCancel();
        setIsAddSpouseModalOpen(true);
        return;
      }
    }
  };

  const fetchFatherOptions = async (searchValue) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/searchbyusername/${searchValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        const formattedOptions = data.map((person) => ({
          value: person._id,
          label: `
          Name: ${person.name}
          Father: ${person.father || "Unknown"}
        `.trim(),
        }));
        setFatherOptions(formattedOptions);
      } else {
        console.error("Error fetching options:", data.message);
      }
    } catch (error) {
      console.error("Error in fetching father options:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchFatherOptions = debounce(fetchFatherOptions, 500);

  const fetchFatherData = async (userID) => {
    console.log("UserID", userID);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFamilyDetails/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      console.log("Data in console");
      console.log(data);
      if (data.gender === "male") {
        setValue("spouseGender", "female");
      } else {
        setValue("spouseGender", "male");
      }
      setValue("userID", userID);
      setValue("father", data.father);
      setValue("mother", data.mother);
      setValue(
        "dateOfBirth",
        new Date(data.dateOfBirth).toISOString().slice(0, 10)
      );
    } catch (error) {
      console.error("Error fetching father data:", error);
    }
  };

  useEffect(() => {
    if (spouseOptions.length > 0) {
      setValue("motherId", spouseOptions[0].value);
    }
  }, [spouseOptions, setValue]);

  return (
    <Modal
      open={isAddSpouseButtonClick}
      onCancel={() => setIsAddSpouseButtonClick(false)}
      width={800}
      footer={null}
    >
      <section>
        <h2 className="text-center text-2xl font-semibold">Add Spouse</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 mt-8"
        >
          {/* Grand Father Name */}
          <div>
            <label
              htmlFor="grandfather"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Father Name
            </label>
            <input
              type="text"
              id="father"
              {...register("father")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Father Name"
              readOnly
            />
            {errors.father && (
              <p className="text-rose-500 text-sm">{errors.father.message}</p>
            )}
          </div>

          {/* Grand Mother Name */}
          <div>
            <label
              htmlFor="mother"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mother Name
            </label>
            <input
              type="text"
              id="mother"
              {...register("mother")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder=" Mother Name"
              readOnly
            />
            {errors.mother && (
              <p className="text-rose-500 text-sm">{errors.mother.message}</p>
            )}
          </div>

          {/* Father Name */}
          <div>
            <label
              htmlFor="Name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <Select
              showSearch
              placeholder="Name"
              filterOption={false}
              onSearch={debouncedFetchFatherOptions}
              options={fatherOptions}
              loading={loading}
              onChange={(value) => fetchFatherData(value)}
              style={{ width: "100%" }}
            />
            {errors.Name && (
              <p className="text-rose-500 text-sm">{errors.Name.message}</p>
            )}
          </div>

          {/* Father DOB */}
          <div>
            <label
              htmlFor="DOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                required: "DOB is required",
                max: { value: today, message: "DOB cannot be in the future" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              readOnly
            />
          </div>

          {/* Child Name */}
          <div>
            <label
              htmlFor="SpouseName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Name
            </label>
            <input
              type="text"
              id="spouseName"
              {...register("spouseName", {
                required: "Child Name is required",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Child Name"
            />
            {errors.spouseName && (
              <p className="text-rose-500 text-sm">
                {errors.spouseName.message}
              </p>
            )}
          </div>

          {/* Child DOB */}
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
                required: "Spouse date of birth is required",
                max: { value: today, message: "DOB cannot be in the future" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.spouseDOB && (
              <p className="text-rose-500 text-sm">
                {errors.spouseDOB.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="spouseGender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Gender
            </label>
            <input
              type="text"
              id="spouseGender"
              {...register("spouseGender")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder=" Spouse Gender"
              readOnly
            />
            {errors.spouseGender && (
              <p className="text-rose-500 text-sm">
                {errors.spouseGender.message}
              </p>
            )}
          </div>

          <input type="hidden" {...register("userID")} />
          <input
            type="hidden"
            {...register("Name", {
              required: "Name is required",
            })}
          />

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

export default Modal3;
