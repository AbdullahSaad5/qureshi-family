"use client";

import React, { useState } from "react";
import { Button, Divider, Modal } from "antd";


const DetailsModal = ({ isModalOpen, handleOk, handleCancel, data }) => {

  console.log("Data inside modal");
  console.log(data);





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
