"use client";

import React, { useState } from "react";
import { Button, Divider, Modal } from "antd";
import { useRouter } from "next/navigation";

const DetailsModal = ({ isModalOpen, handleOk, handleCancel, data }) => {
  const router = useRouter();
  console.log("Data inside modal");
  console.log(data);

  const ancestorChain = (data?.ancestorChain || []).filter(
    (ancestor) => ancestor.name && ancestor.id
  );

  const handleClick = (id) => {
    router.push(`/Explore/${id}`);
  };

  return (
    <Modal
      footer={false}
      title="Person Details"
      centered
      open={isModalOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <Divider
        orientation="left"
        style={{
          marginBlock: "0.5em",
          backgroundColor: "#1890ff",
        }}
      ></Divider>
      <p>
        <span className="font-semibold">Name:</span> {data?.n}
      </p>
      <p>
        <span className="font-semibold">Gender:</span>{" "}
        {data?.s === "F" ? "Female" : "Male"}{" "}
      </p>
      <p>
        <span className="font-semibold">DOB:</span> {data?.dob}
      </p>
      <p className="flex gap-3">
        <span className="font-semibold">Ancestor Chain:</span>{" "}
        {ancestorChain.length > 0 ? (
          <span className="flex space-x-2">
            {ancestorChain.map((ancestor, index) => (
              <React.Fragment key={ancestor.id}>
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleClick(ancestor.id)}
                >
                  {ancestor.name}
                </span>
                {index < ancestorChain.length - 1 && (
                  <span>&gt;</span> // Arrow separator
                )}
              </React.Fragment>
            ))}
          </span>
        ) : (
          <span>No ancestors found</span>
        )}
      </p>
      <p>
        <span className="font-semibold">Address:</span>{" "}
        {data?.address || "Unknown"}
      </p>
      <p>
        <span className="font-semibold">Biography:</span>{" "}
        {data?.biography || "Unknown"}
      </p>
    </Modal>
  );
};

export default DetailsModal;
