"use client";

import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";
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
import { useRouter } from "next/navigation";

function Search() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const router = useRouter();

  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      setLoading(true); // Set loading to true while fetching data

      // Convert data to query parameters
      const queryParams = new URLSearchParams(data).toString();

      // Build the URL based on whether query parameters are present
      const url = queryParams
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/openSearch?${queryParams}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/openSearch`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Search result:", result);

      setPersons(result); // Store API response in state
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 w-full p-5 gap-5"
      >
        {/* Child Name (Required) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">Child Name *</label>
          <input
            type="text"
            {...register("childName")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          {errors.childName && (
            <span className="text-rose-500 text-sm">
              Child Name is required
            </span>
          )}
        </div>

        {/* Biography */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">Biography</label>
          <input
            type="text"
            {...register("biography")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        {/* Gender */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            {...register("gender")}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* <option value="Other">Other</option> */}
          </select>
        </div>

        {/* Date of Birth */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        {/* Date of Death
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Death
          </label>
          <input
            type="date"
            {...register("dateOfDeath")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div> */}

        {/* Is Prominent Figure */}

        {/* Father Name */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">Father Name</label>
          <input
            type="text"
            {...register("fatherName")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        {/* Grandfather Name */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label className="block text-sm font-medium mb-1">
            Grandfather Name
          </label>
          <input
            type="text"
            {...register("grandfatherName")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
          <input
            type="checkbox"
            {...register("isProminentFigure")}
            className="border border-gray-300 mr-2"
          />
          <label className="text-sm font-medium">Is a Prominent Figure</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#82D026] text-white p-2 w-full rounded-md transition col-span-12 md:col-span-6 lg:col-span-4 "
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-center my-4">Loading...</p>}

      {/* Table to display the results */}
      {persons.length > 0 && (
        <div className="mt-6 p-4 max-w-4xl mx-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biography
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {persons.map((person, index) => (
                <tr key={person._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td
                    onClick={() => router.push(`/Explore/${person._id}`)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                  >
                    {person.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.biography || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Search;
