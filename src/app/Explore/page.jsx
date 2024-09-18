"use client";
import React from "react";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";
import { useEffect, useState } from "react";

export default function Explore() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();

  const handleNavigation = (id) => {
    router.push(`/Explore/${id}`);
  };

  const fetchData = async (page = 1, limit = 10) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllPublicFigures?page=${page}&limit=${limit}`
    );
    const result = await response.json();

    // Assuming the API returns data in { publicFigures, total } format
    setData(result.publicFigures);
    setTotalItems(result.total); // Set total items for pagination
  };

  // Fetch data when page changes
  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // Handle pagination change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Header />

      <div>
        <div className="container mx-auto flex flex-col items-center my- p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Famous Personalities
          </h1>

          {/* <!-- Table Structure --> */}
          <div className="overflow-x-auto rounded-xl flex items-center justify-center shadow-lg border-3 border-black w-full">
            <table className="text-left text-sm border-2 border-[#EEEEEE] overflow-hidden w-full">
              <thead className="bg-[#82D026] text-black ">
                <tr>
                  <th className="p-3 border-2 border-[#EEEEEE] text-center">
                    ID
                  </th>
                  <th className="p-3 border-2 border-[#EEEEEE] text-center">
                    Member Name
                  </th>
                  <th className="p-3 text-center">Description</th>
                </tr>
              </thead>
              <tbody className="text-[#515151] w-full ">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 border-2 border-[#EEEEEE] flex justify-center">
                        {index + 1 + (currentPage - 1) * pageSize}
                      </td>
                      <td
                        onClick={() => handleNavigation(item._id)}
                        className="p-3 border-2 border-[#EEEEEE] cursor-pointer"
                      >
                        <div className="hover:text-[#82D026]">{item.name}</div>
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

          {/* Pagination Component */}
          <div className="mt-12 mb-8">
            <Pagination
              className=""
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              itemRender={(page, type, originalElement) => {
                if (type === "page") {
                  return (
                    <a
                      className={
                        page === currentPage
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

      <Footer />
    </>
  );
}
