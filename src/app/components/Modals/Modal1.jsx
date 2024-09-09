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


const Modal1 = ({ isModalOpen, handleCancel, setIsAddSpouseModalOpen }) => {

  const [IDs, setIDs] = useState([]);
  const [reFetchtree, setReFetchtree] = useState(false);
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
      childGender: "male",
      grandfather: "",
      grandmother: "",
      fatherDOB: "",
    },
  });

  const today = new Date().toISOString().split("T")[0];
  const spouseName = watch("sName");

  const onSubmit = async (formData) => {
    console.log("Form submission");
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/addChild`,
        formData
      );

      console.log("Success:", response.data);

      toast.success("Send child request for review");
      setReFetchtree(true);
      handleOk();
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response.data.message ===
        "Multiple fathers found with the same name. Please provide the father's date of birth to narrow down the search."
      ) {
        toast.error("Please Enter father's date of birth");
        return;
      }

      if (
        error.response.data.message ===
        "Multiple fathers found with the same name and date of birth. Please provide the correct MongoDB ObjectId from the list to proceed."
      ) {
        toast.success("Please select the node");
        const fatherIDs = error.response.data.matchingFathers.map(
          (father) => father.id
        );
        setIDs(fatherIDs);
        return;
      }
      if (
        error.response.data.message ===
        "Father details are required to find possible mothers."
      ) {
        toast.error("Add spouse details before adding a child.");
        setSelectedParentID(error.response.data.fatherID);
        handleOk();
        setIsAddSpouseModalOpen(true);
        return;
      }
    }
  };

  const fetchFatherOptions = async (searchValue) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/searchbyname/${searchValue}`,
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

  const fetchFatherData = async (fatherId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFamilyDetails/${fatherId}`,
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

      if (response.ok) {
        console.log("Spouse data");
        console.log(data.spouses);

        const formattedOptions = Array.isArray(data.spouses)
          ? data.spouses.map((spouse) => ({
              value: spouse.id, // Use spouse.id as the value
              label: spouse.name, // Use spouse.name as the label
            }))
          : [];

        if (formattedOptions.length === 0) {
          toast.error("Add spouse details before adding a child.");
          setSpouseOptions([]);
          setSelectedParentID(fatherId);
          setShowAddSpouseButton(true);
        } else {
          setShowAddSpouseButton(false);
          setSpouseOptions(formattedOptions);
        }

        setValue("grandfather", data.father || "");
        setValue("grandmother", data.mother || "");
        setValue(
          "fatherDOB",
          data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : ""
        );
      } else {
        console.error("Error fetching father data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching father data:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Additional Information",
      children: (
        <div className="grid grid-cols-2 gap-6">
          {/* Spouse Name */}
          <div>
            <label
              htmlFor="sName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Name
            </label>
            <input
              type="text"
              id="sName"
              {...register("sName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Spouse Name"
            />
          </div>

          {/* Spouse Gender */}
          <div>
            <label
              htmlFor="sGender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Gender
            </label>
            <select
              id="sGender"
              {...register("sGender", {
                validate: (value) =>
                  !spouseName || value ? true : "Spouse gender is required",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sGender && (
              <p className="text-red-500 text-sm">{errors.sGender.message}</p>
            )}
          </div>

          {/* Spouse DOB */}
          <div>
            <label
              htmlFor="sDOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse DOB
            </label>
            <input
              type="date"
              id="sDOB"
              {...register("sDOB", {
                validate: (value) =>
                  !spouseName || value ? true : "Spouse DOB is required",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.sDOB && (
              <p className="text-red-500 text-sm">{errors.sDOB.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID
            </label>
            <input
              type="number"
              id="id"
              {...register("ID")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID"
            />
            {errors.ID && (
              <p className="text-red-500 text-sm">{errors.ID.message}</p>
            )}
          </div>

          {/* Tribe */}
          <div>
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
              <p className="text-red-500 text-sm">{errors.tribe.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
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
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* About Input */}
          <div className="col-span-2">
            <label
              htmlFor="aboutYou"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              id="aboutYou"
              {...register("aboutYou")}
              rows="3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      ),
    },
  ];

  const handleChange = (value) => {
    console.log("Selected value:", value);
    setValue("motherName", value);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} width={800} footer={null}>
      <section>
        <h2 className="text-center text-2xl font-semibold">Add Member</h2>
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
              Grand Father Name
            </label>
            <input
              type="text"
              id="grandfather"
              {...register("grandfather")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Grand Father Name"
            />
            {errors.grandfather && (
              <p className="text-red-500 text-sm">
                {errors.grandfather.message}
              </p>
            )}
          </div>

          {/* Grand Mother Name */}
          <div>
            <label
              htmlFor="grandmother"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Grand Mother Name
            </label>
            <input
              type="text"
              id="grandmother"
              {...register("grandmother")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Grand Mother Name"
            />
            {errors.grandmother && (
              <p className="text-red-500 text-sm">
                {errors.grandmother.message}
              </p>
            )}
          </div>

          {/* Father Name */}
          <div>
            <label
              htmlFor="fatherName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Father Name
            </label>
            <Select
              showSearch
              placeholder="Select father's name"
              filterOption={false}
              onSearch={debouncedFetchFatherOptions}
              options={fatherOptions}
              loading={loading}
              onChange={(value) => fetchFatherData(value)}
              style={{ width: "100%" }}
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm">
                {errors.fatherName.message}
              </p>
            )}
          </div>

          {/* Mother Name */}
          <div>
            <label
              htmlFor="spouse"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mother Name
            </label>
            <Select
              placeholder="Select Mother name"
              defaultValue={
                spouseOptions.length > 0 ? spouseOptions[0].value : undefined
              }
              style={{ width: "100%" }}
              onChange={handleChange}
              loading={loading}
            >
              {spouseOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label} {/* Display the name */}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Father DOB */}
          <div>
            <label
              htmlFor="fatherDOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Father DOB
            </label>
            <input
              type="date"
              id="fatherDOB"
              {...register("fatherDOB", {
                required: "Father's DOB is required",
                max: { value: today, message: "DOB cannot be in the future" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.fatherDOB && (
              <p className="text-red-500 text-sm">{errors.fatherDOB.message}</p>
            )}
          </div>

          {/* Child Name */}
          <div>
            <label
              htmlFor="childName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Child Name
            </label>
            <input
              type="text"
              id="childName"
              {...register("childName", { required: "Child Name is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Child Name"
            />
            {errors.childName && (
              <p className="text-red-500 text-sm">{errors.childName.message}</p>
            )}
          </div>

          {/* Child DOB */}
          <div>
            <label
              htmlFor="childDOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Child DOB
            </label>
            <input
              type="date"
              id="childDOB"
              {...register("childDOB", {
                max: { value: today, message: "DOB cannot be in the future" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.childDOB && (
              <p className="text-red-500 text-sm">{errors.childDOB.message}</p>
            )}
          </div>

          {/* Child Gender */}
          <div>
            <label
              htmlFor="childGender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Child Gender
            </label>
            <select
              id="childGender"
              {...register("childGender", {
                required: "Child Gender is required",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.childGender && (
              <p className="text-red-500 text-sm">
                {errors.childGender.message}
              </p>
            )}
          </div>

          {/* Show Add Spouse Button */}
          {showAddSpouseButton && (
            <div className="col-span-2 text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  handleCancel();
                  setIsAddSpouseModalOpen(true);
                }}
                className="bg-[#82D026] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#79b41d]"
              >
                Add Spouse
              </button>
            </div>
          )}

          {/* Show Collapse */}
          <div className="col-span-2">
            <Collapse defaultActiveKey={[]} items={items} />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-[#82D026] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#79b41d]"
            >
              Add Member
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default Modal1;
