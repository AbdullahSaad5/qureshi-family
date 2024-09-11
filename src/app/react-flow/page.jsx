"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Modal1 from "../components/Modals/Modal1.jsx";
import Modal2 from "../components/Modals/Modal2.jsx";
import Header from "../components/LandingPage/Header.jsx";
import Footer from "../components/LandingPage/Footer.jsx";
import ReactFlowTree from "./ReactFlow.jsx";
import "@xyflow/react/dist/style.css";

import "antd/dist/reset.css";

const LayoutFlow = () => {
  const [data, setData] = useState([]);
  const [IDs, setIDs] = useState([]);

  const [reFetchtree, setReFetchtree] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAddSpouseModalOpen, setIsAddSpouseModalOpen] = useState(false);

  const {
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      childGender: "male",
      grandfather: "",
      grandmother: "",
      fatherDOB: "",
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`
      );
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [reFetchtree]);

  useEffect(() => {
    if (reFetchtree) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`
          );
          const data = await response.json();

          setData(data);
          setReFetchtree(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [reFetchtree]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <div>
        <div className="w-full flex justify-end">
          <button
            onClick={showModal}
            className="mr-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
          >
            Add Member
          </button>
        </div>
        <Modal1
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
        />
        <Modal2
          isAddSpouseModalOpen={isAddSpouseModalOpen}
          setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
        />
        <ReactFlowTree data={data} IDs={IDs} />;
      </div>

      <Footer />
    </>
  );
};

export default LayoutFlow;
