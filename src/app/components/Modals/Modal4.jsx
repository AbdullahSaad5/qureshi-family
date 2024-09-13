import React, { useState } from "react";
import { Button, Modal } from "antd";

const DetailsModal = ({ isModalOpen, handleOk, handleCancel, data }) => {
  console.log(data);
  return (
    <Modal
      footer={false}
      title="Person Details"
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{data?.n}</p>
      <p>{data?.s === "F" ? "Female" : "Male"} </p>
      <p>{data?.dob}</p>
    </Modal>
  );
};

export default DetailsModal;
