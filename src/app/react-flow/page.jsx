"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { CollapseProps } from "antd";
import { Collapse } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import dagre from "dagre";
import { getAllConnections, getAllEdges } from "./helpers.js";
import ReactFlowTree from "./ReactFlow.jsx";
import "@xyflow/react/dist/style.css";

const LayoutFlow = () => {
  const [data, setData] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const today = new Date().toISOString().split("T")[0];
  const fatherName = watch("fatherName");
  const motherName = watch("motherName");
  const spouseName = watch("sName");

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/addChild`,
        formData
      );
      console.log("Success:", response.data);

      toast.success("Send child request for review");
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
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
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

          {/* ID */}
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID
            </label>
            <input
              // onChange={handleChange}
              type="number"
              name="id"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID"
              required
              // value={signupInfo.email}
            />
            {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
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
              // onChange={handleChange}
              type="text"
              name="tribe"
              id="tribe"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tribe"
              required
              // value={signupInfo.email}
            />
            {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="addres"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Addres
            </label>
            <input
              // onChange={handleChange}
              type="text"
              name="addres"
              id="addres"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Addres"
              required
              // value={signupInfo.email}
            />
            {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
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
              // onChange={handleChange}
              name="aboutYou"
              id="aboutYou"
              rows="3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tell us about yourself..."
              // value={signupInfo.aboutYou}
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/members`
      );
      const data = await response.json();
      //   const addedNodes = [];
      //   data.forEach((item) => {
      //     if (addedNodes.length < 2) {
      //       if (!item.father) {
      //         item.father = "0";
      //       }
      //       if (!item.mother) {
      //         item.mother = "1";
      //       }
      //       addedNodes.push(item);
      //     }
      //   });

      //   data.push({
      //     _id: "0",
      //     name: "Father",
      //     spouse: ["1"],
      //   });
      //   data.push({
      //     _id: "1",
      //     name: "Mother",
      //     spouse: ["0"],
      //   });

      setData(data);
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          onClick={showModal}
          className="mr-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
        >
          Add Member
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <section>
          <h2 className="text-center text-2xl font-semibold">Add Member</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6 mt-8"
          >
            {/* Father Name */}
            <div>
              <label
                htmlFor="fatherName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Father Name
              </label>
              <input
                type="text"
                id="fatherName"
                {...register("fatherName", {
                  validate: (value) =>
                    value || motherName ? true : "Father Name is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Father Name"
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
                htmlFor="motherName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mother Name
              </label>
              <input
                type="text"
                id="motherName"
                {...register("motherName", {
                  validate: (value) =>
                    value || fatherName ? true : "Mother Name is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mother Name"
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm">
                  {errors.motherName.message}
                </p>
              )}
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
                  max: {
                    value: today,
                    message: "DOB cannot be in the future",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.fatherDOB && (
                <p className="text-red-500 text-sm">
                  {errors.fatherDOB.message}
                </p>
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
                {...register("childName", {
                  required: "Child Name is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Child Name"
              />
              {errors.childName && (
                <p className="text-red-500 text-sm">
                  {errors.childName.message}
                </p>
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
                  max: {
                    value: today,
                    message: "DOB cannot be in the future",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.childDOB && (
                <p className="text-red-500 text-sm">
                  {errors.childDOB.message}
                </p>
              )}
            </div>

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
      <ReactFlowTree data={data} IDs={IDs} />;
    </div>
  );
};

export default LayoutFlow;
