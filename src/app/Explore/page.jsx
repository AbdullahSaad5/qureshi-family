"use client";
import React from "react";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Explore() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleNavigation = (id) => {
    router.push(`/Explore/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllPublicFigures`
      );
      const data = await response.json();

      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center my- p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          {" "}
          Famous Personalities{" "}
        </h1>
        {/* <!-- Table Structure --> */}
        <div className="overflow-x-auto rounded-xl flex items-center justify-center shadow-lg border-3 border-black w-full">
          <table className=" text-left text-sm border-2 border-[#EEEEEE] overflow-hidden w-full">
            {/* Apply border-radius to the entire table */}
            <thead className="bg-[#82D026] text-black ">
              <tr className="">
                <th className="p-3 border-2 border-[#EEEEEE] text-center">
                  id
                </th>
                <th className="p-3 border-2 border-[#EEEEEE] text-center">
                  Name
                </th>
                <th className="p-3 text-center">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#515151] w-full ">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <>
                    <tr className="border-b">
                      <td className="p-3 border-2 border-[#EEEEEE]">
                        {index + 1}
                      </td>
                      <td
                        onClick={() => handleNavigation(item._id)}
                        className="p-3 border-2 border-[#EEEEEE] cursor-pointer"
                      >
                        <div className="hover:text-[#82D026]"> {item.name}</div>
                      </td>
                      <td
                        onClick={() => handleNavigation(item._id)}
                        className="p-3 border-2 border-[#EEEEEE] cursor-pointer"
                      >
                        <div className="hover:text-[#82D026]">
                          {item.biography}
                        </div>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 mb-8 ">
          <Pagination
            defaultCurrent={1}
            total={50}
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                return (
                  <a
                    className={
                      page === 1
                        ? "text-[#82D026]"
                        : "text-[#515151] hover:text-[#82D026]"
                    }
                  >
                    {page}
                  </a>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </div>
    </div>
  );
}
