"use client";

const Genogram = dynamic(() => import("./Geogram"), { ssr: false });
import dynamic from "next/dynamic";
import { FaSpinner } from "react-icons/fa";
import "./genogram.css";
import { useEffect, useState } from "react";
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
          className="mr-5 mb-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
        >
          Approve Request
        </button>
        <button
          onClick={() => openRejectModal()}
          className="mr-5 mb-5 text-white bg-[#a8323e] font-semibold py-2 px-4 rounded-lg hover:bg-[#52020a] transition-colors duration-300 ease-in-out"
        >
          Reject
        </button>
      </div>

      <div className="min-h-screen w-full">
        <Genogram Genogram={modifiedData} />
      </div>

      {/* Accept request */}
      {isAcceptedModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-gray-900 text-lg font-medium leading-6"
                      id="modal-title"
                    >
                      Confirm Addition
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">
                        Are you sure you want to add this record?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  disabled={loadingButton}
                  onClick={handelAccept}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm ${
                    loadingButton && "cursor-not-allowed"
                  }`}
                >
                  <span> Yes, Add</span>
                  {loadingButton && <FaSpinner className="animate-spin ml-2" />}
                </button>
                <button
                  onClick={closeAcceptModal}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reject request */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-gray-900 text-lg font-medium leading-6"
                      id="modal-title"
                    >
                      Confirm Rejection
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">
                        Are you sure you want to reject this request?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  disabled={loadingButton}
                  onClick={handelReject}
                  className={`inline-flex w-full justify-center items-center rounded-md border border-transparent bg-red px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red sm:ml-3 sm:w-auto sm:text-sm ${
                    loadingButton && "cursor-not-allowed"
                  }`}
                >
                  <span> Yes, Reject</span>
                  {loadingButton && <FaSpinner className="animate-spin ml-2" />}
                </button>
                <button
                  onClick={() => closeRejectModal()}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
