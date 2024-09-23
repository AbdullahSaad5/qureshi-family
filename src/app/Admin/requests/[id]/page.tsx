"use client";

const Genogram = dynamic(() => import("./Geogram"), { ssr: false });
import dynamic from "next/dynamic";
import { FaSpinner } from "react-icons/fa";
import "./genogram.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useParams } from "next/navigation";
import Header from "../../../components/LandingPage/Header";
import Footer from "../../../components/LandingPage/Footer";
import toast from "react-hot-toast";
import API from "../../../axios";
import Loader from "../../components/common/Loader";
import { useRouter } from "next/navigation";
// Define the Member interface
interface Member {
  _id: string;
  name: string;
  gender: string;
  spouseIds: string[];
  father: string;
  mother: string;
  dateOfBirth: string; // Assuming dateOfBirth is stored as a string
}

export default function PublicFigureTree() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isAcceptedModal, setAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const openAcceptModal = () => {
    setAcceptModalOpen(true);
  };

  const closeAcceptModal = () => {
    setAcceptModalOpen(false);
  };
  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const handelAccept = async () => {
    try {
      setLoadingButton(true);
      await API.put(`/addChildApprov/${id}`);
      // await axios.put(`/api/update-endpoint/${selectedRecord._id}`, {
      //   status: "approved", // Add or update the status field to 'approved'
      // });
      toast.success("Record Updated");
      router.push("/Admin/requests");

      closeAcceptModal();
    } catch (error) {
      console.error("Error updating record:", error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setLoadingButton(false);
    }
  };
  const handelReject = async () => {
    try {
      setLoadingButton(true);
      await API.put(`/addChildDec/${id}`);
      // await axios.put(`/api/update-endpoint/${selectedRecord._id}`, {
      //   status: "approved", // Add or update the status field to 'approved'
      // });
      toast.success("Add child request decline successfully");
      router.push("/Admin/requests");

      closeRejectModal();
    } catch (error) {
      console.error("Error updating record:", error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setLoadingButton(false);
    }
  };

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchData = async () => {
        const response = await fetch(
          `https://quresh-family-5b06b2823b36.herokuapp.com/api/getTreeById/${id}?isAdmin=true`
        );
        const result = await response.json();
        console.log(result);

        setData(result);
      };

      fetchData();
    }
  }, [id]);

  let modifiedData =
    data.map((member: Member) => {
      const newMember = {
        key: member._id,
        n: member.name,
        s: member.gender.toUpperCase().charAt(0),
        spouses: member.spouseIds,
        f: member.father,
        m: member.mother,
        dob: new Date(member.dateOfBirth).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      if (!newMember.f) {
        // @ts-ignore
        delete newMember.f;
      }
      if (!newMember.m) {
        // @ts-ignore
        delete newMember.m;
      }

      return newMember;
    }) || [];
  console.log(modifiedData);

  if (!modifiedData || !modifiedData?.length)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className=" min-h-screen w-full ">
      <div className=" flex justify-end mt-2">
        <button
          onClick={() => openAcceptModal()}
          className="mr-5 mb-5 text-white hover:cursor-pointer bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
        >
          Approve Request
        </button>
        <button
          onClick={() => openRejectModal()}
          className="mr-5 mb-5 text-white  hover:cursor-pointer bg-[#a8323e] font-semibold py-2 px-4 rounded-lg hover:bg-[#978f90]  transition-colors duration-300 ease-in-out"
        >
          Reject
        </button>
      </div>

      <div className="min-h-screen w-full">
        <Genogram Genogram={modifiedData} />
      </div>

      {/* Accept request */}
      <Modal
        title="Confirm Approve"
        open={isAcceptedModal}
        onCancel={closeAcceptModal}
        footer={[
          <Button
            key="submit"
            style={{ backgroundColor: "#4caf50", color: "white" }}
            loading={loadingButton}
            onClick={handelAccept}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to add this record?</p>
      </Modal>

      {/* Reject request */}
      <Modal
        title="Confirm Reject"
        open={isRejectModalOpen}
        onCancel={closeRejectModal}
        footer={[
          <Button
            key="submit"
            style={{ backgroundColor: "#FF0000", color: "white" }}
            loading={loadingButton}
            onClick={handelReject}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to reject this request?</p>
      </Modal>
    </div>
  );
}
