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

const Modal1 = ({
  isModalOpen,
  handleCancel,
  setIsAddSpouseModalOpen,
  setSelectedFatherID,
  setReFetchtree,
  reFetchtree,
  data,
}) => {
  const [IDs, setIDs] = useState([]);
  const [fatherOptions, setFatherOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spouseOptions, setSpouseOptions] = useState([]);
  const [selectedParentID, setSelectedParentID] = useState("");
  const [showAddSpouseButton, setShowAddSpouseButton] = useState(false);
  const [selctedWife, setSelectedWife] = useState("");

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

  useEffect(() => {
    if (data) {
      reset(data);
      console.log(`Data of person in edit ${JSON.stringify(data, null, 2)}`);
    }
  }, [data]);

  const childGender = watch("childGender");

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

      // toast.success("Send child request for review");
      toast.success("Child Add Successfully");
      handleCancel();
      reset();
      setReFetchtree(!reFetchtree);
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

        setValue("fatherId", fatherId);
        setSelectedFatherID(fatherId);
        if (formattedOptions.length === 0) {
          toast.error("Add spouse details before adding a child.");
          setSpouseOptions([]);
          setValue("");
          setSelectedFatherID(fatherId);

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
              id="spouseName"
              {...register("spouseName", {
                validate: (value) => {
                  const spouseDOB = watch("spouseDOB");
                  if (spouseDOB && !value) {
                    return "Spouse Name is required if Spouse DOB is filled";
                  }
                  return true;
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              htmlFor="sGender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Spouse Gender
            </label>
            <input
              type="text"
              id="spouseGender"
              {...register("spouseGender", {
                validate: (value) =>
                  !spouseName || value ? true : "Spouse gender is required",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Spouse Gender"
              readOnly
            />
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
              id="spouseDOB"
              {...register("spouseDOB", {
                validate: (value) => {
                  const spouseName = watch("spouseName");
                  if (spouseName && !value) {
                    return "Spouse DOB is required";
                  }
                  return true;
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.spouseDOB && (
              <p className="text-red-500 text-sm">{errors.spouseDOB.message}</p>
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
    setValue("motherId", value);
    setSelectedWife(value);
  };

  useEffect(() => {
    if (spouseOptions.length > 0) {
      setValue("motherId", spouseOptions[0].value);
      setSelectedWife(spouseOptions[0].value);
    }
  }, [spouseOptions, setValue]);

  useEffect(() => {
    if (childGender === "male") {
      setValue("spouseGender", "female");
    } else if (childGender === "female") {
      setValue("spouseGender", "male");
    }
  }, [childGender, setValue]);

  return (
    <Modal
      className="ml-20 mr-20 md:ml-0 md:mr-0"
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <section>
        <h2 className="text-center text-2xl font-semibold">Add Member</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-6 mt-8"
        >
          {/* Grand Father Name */}
          <div className="col-span-12 md:col-span-6">
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
              readOnly
            />
          </div>

          {/* Grand Mother Name */}
          <div className="col-span-12 md:col-span-6">
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
              readOnly
            />
          </div>

          {/* Father Name */}
          <div className="col-span-12 md:col-span-6">
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
              onChange={(value) => {
                setValue("fatherName", value);
                fetchFatherData(value);
              }}
              style={{ width: "100%" }}
            />
            {errors.fatherName && (
              <p className="text-rose-500 text-sm">
                {errors.fatherName.message}
              </p>
            )}
          </div>

          {/* Mother Name */}
          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="spouse"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mother Name
            </label>
            <Select
              placeholder="Select Mother name"
              style={{ width: "100%" }}
              value={selctedWife}
              onChange={handleChange}
              loading={loading}
            >
              {spouseOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label} {/* Display the name */}
                </Select.Option>
              ))}
            </Select>

            {errors.motherId && (
              <p className="text-rose-500 text-sm">{errors.motherId.message}</p>
            )}
          </div>

          {/* Father DOB */}
          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="fatherDOB"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Father DOB
            </label>
            <input
              type="date"
              id="fatherDOB"
              {...register("fatherDOB")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              readOnly
            />
          </div>

          {/* Child Name */}
          <div className="col-span-12 md:col-span-6">
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
              <p className="text-rose-500 text-sm">
                {errors.childName.message}
              </p>
            )}
          </div>

          {/* Child DOB */}
          <div className="col-span-12 md:col-span-6">
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
              <p className="text-rose-500 text-sm">{errors.childDOB.message}</p>
            )}
          </div>

          {/* Child Gender */}
          <div className="col-span-12 md:col-span-6">
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
              <p className="text-rose-500 text-sm">
                {errors.childGender.message}
              </p>
            )}
          </div>

          <input type="hidden" {...register("fatherId")} />
          <input
            type="hidden"
            {...register("fatherName", {
              required: "Father Name is required",
            })}
          />

          <input
            type="hidden"
            {...register("motherId", {
              required: "Mother Name is required",
            })}
          />

          {/* Show Add Spouse Button */}
          {showAddSpouseButton && (
            <div className="col-span-12 text-center mt-6">
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
          <div className="col-span-12">
            <Collapse defaultActiveKey={[]} items={items} />
          </div>

          {/* Submit Button */}
          <div className="col-span-12  text-center mt-6">
            <button
              type="submit"
              disabled={showAddSpouseButton}
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
