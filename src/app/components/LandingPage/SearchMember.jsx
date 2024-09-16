"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LuSearchCheck } from "react-icons/lu";
import bg from "../../_assets/Rectangle404.png";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { Select } from "antd";

import { useRouter } from "next/navigation";

function SearchMember() {
  const [fatherOptions, setFatherOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selctedFather, setSelectedFather] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      fatherName: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log("Form submission");
    console.log(formData);
    router.push(`/Explore/${selctedFather}`);
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

      console.log("Data in console-----");
      console.log(data);

      if (response.ok) {
        console.log("Spouse data");
        console.log(data.spouses);

        setValue("fatherName", fatherId);
        setSelectedFather(fatherId);
        setValue("grandfather", data.father || "");
        setValue("grandmother", data.mother || "");
      } else {
        console.error("Error fetching father data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching father data:", error);
    }
  };



  return (
    <section
      className="relative flex items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="bg-white hidden md:block bg-opacity-50 md:m-12 lg:m-16 p-4 rounded-lg">
        <p className="text-black font-medium md:text-medium lg:text-xl">
          Explore your Qureshi Family history in <br />
          just minutes. Uncover generations of stories <br />
          with our easy-to-use tools. Trace your lineage <br />
          effortlessly and connect with your roots. <br />
          Start your family history journey today with <br />
          unmatched accuracy.
        </p>
      </div>

      <div className=" border-2  m-4 ml-[50px] md:ml-0 lg:ml-[50px] xl:ml-[250px] p-4 shadow-lg rounded-md bg-white bg-opacity-90">
        <div className="text-center mt-">
          <div className="flex items-center justify-center my-3">
            <LuSearchCheck className="text-[#7E7E7E] mx-2  text-5xl" />
          </div>
          <h2 className="flex items-center justify-center text-3xl text-center text-[#82D026] font-semibold mb-1">
            <span>Search Is Simple</span>
          </h2>
          <p className="text-sm p-">
            Easiest Way To Research Your Family History <br /> With Qureshi
            Family in Couple of Minutes
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-2"
        >
          <div className="w-full">
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
              value={selctedFather}
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
          <div className="w-full">
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

          <input
            type="hidden"
            {...register("fatherName", {
              required: "Father Name is required",
            })}
          />

          {/* Grand Mother Name */}
          <div className="w-full">
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
          <button
            type="submit"
            className="cursor-pointer w-full rounded-lg m-4 p-2 font-semibold text-white bg-[#82D026]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchMember;
