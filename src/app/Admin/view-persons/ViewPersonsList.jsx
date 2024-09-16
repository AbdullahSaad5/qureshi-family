"use client";
import { ImCross } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";

import { FaCrown } from "react-icons/fa";
import API from "../../axios";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader/index";
import { useEffect, useState } from "react";
import Pagination from "../components/Paggination/Paggination";
import Modal1 from "../../components/Modals/Modal1";
import EditModal from "../../components/Modals/EditModal";
const ViewPersonsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    console.log(`item data: ${JSON.stringify(item, null, 2)}`);
    setSelectedRecord(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [personList, setPersonList] = useState([]);
  const fetchData = async () => {
    const res = await API.get("/getAllMembers");
    if (res.status) {
      setPersonList(res.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function removeObjectWithId(arr, id) {
    return arr.filter((obj) => obj.id !== id);
  }
  const [loading, setLoading] = useState(true);
  // delete user :not being used
  const handelDelete = async () => {
    if (selectedRecord) {
      try {
        await API.delete(`/member/${selectedRecord._id}`);
        closeDeleteModal();
        toast.success("Record Deleted Successfully");
      } catch (error) {
        toast.error("Error deleting record:", error);
      }
    }
  };
  // update user :not being used
  const handleUpdate = async () => {
    if (selectedRecord) {
      try {
        await API.put("/addChildApprov", { ...selectedRecord, approve: true });
        // await axios.put(`/api/update-endpoint/${selectedRecord._id}`, {
        //   status: "approved", // Add or update the status field to 'approved'
        // });
        toast.success("Record Updated");

        fetchData(); // Re-fetch data after updating to refresh the table
        // closeUpdateModal();
      } catch (error) {
        console.error("Error updating record:", error);
        // Handle error (e.g., show a toast notification)
      }
    }
  };
  const handleFmousPersonality = async () => {
    if (selectedRecord) {
      try {
        const res = await API.post(`/makePublicFigure/${selectedRecord._id}`);
        toast.success(res.data?.message);
        closePublicFigureModal();
        fetchData();
      } catch (error) {
        console.log(
          `Catch, ${selectedRecord} and its id ${selectedRecord._id}`
        );
        toast.error("Error updating record:", error);
        // Handle error (e.g., show a toast notification)
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", // 'short' for abbreviated month name
      day: "numeric",
    });
  };
  // Paggination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = personList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get the current page's users
  const indexOfLastUser = currentPage * recordsPerPage;
  const indexOfFirstUser = indexOfLastUser - recordsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // Calculate total pages
  // console.log(
  //   ` current userlength/ recoordsPerPage${filteredUsers.length} / ${recordsPerPage}`
  // );
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle the change in select for recordPerpage
  const handleRecordsChange = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
  };
  // Handle search
  // Filter users based on search ter
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when a new search is done
  };
  //modal control
  const [isViewModalOpen, setViewIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeletModal] = useState(false);
  const [isPublicFigureModalOpen, sePublicFigureModal] = useState(false);

  const openDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsDeletModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeletModal(false);
  };
  const openViewModal = (record) => {
    setSelectedRecord(record);
    setViewIsModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setViewIsModalOpen(false);
  };

  const openPublicFigureModal = (record) => {
    setSelectedRecord(record);
    sePublicFigureModal(true);
  };
  const closePublicFigureModal = () => {
    setSelectedRecord(null);
    sePublicFigureModal(false);
  };

  return (
    <div className="mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="grid grid-cols-6">
            <div className="col-span-6">
              <input
                type="text"
                placeholder="Search users by name"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-2 w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Index
                  </th>
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Gender
                  </th>

                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {key + 1 + recordsPerPage * (currentPage - 1)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.name}
                      </h5>
                      {/* <p className="text-sm">${item.}</p> */}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.gender}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => openViewModal(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                        {/* Edit button  */}
                        <button
                          onClick={() => showModal(item)}
                          className="hover:text-red-900 text-red"
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          // disabled={item.isProminentFigure}
                          onClick={() => openPublicFigureModal(item)}
                          className={`hover:text-red ${
                            item.isProminentFigure &&
                            `text-meta-6 hover:text-meta-6`
                          } `}
                        >
                          <FaCrown />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center">
              {/* Pagination Buttons */}
              <Pagination
                totalPages={totalPages}
                usersPerPage={recordsPerPage}
                totalUsers={filteredUsers.length}
                paginate={paginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleRecordsChange={handleRecordsChange}
              />
            </div>
          </div>
        </div>
      )}
      {/* View record details  */}
      {isViewModalOpen && selectedRecord && (
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
                      className="text-gray-900 text-xl font-bold leading-6"
                      id="modal-title"
                    >
                      User Details
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-700   text-sm md:text-lg">
                        Name: {selectedRecord.name || `-`}
                      </p>
                      <p className="text-gray-700  text-sm md:text-lg ">
                        Gender: {selectedRecord.gender || `-`}
                      </p>
                      <p className="text-gray-700  text-sm md:text-lg ">
                        Father: {selectedRecord?.father?.name || `-`}
                      </p>
                      <p className="text-gray-700  text-sm md:text-lg ">
                        Mother: {selectedRecord?.mother?.name || `-`}
                      </p>
                      <p className="text-gray-700  text-sm md:text-lg ">
                        Prominent Figure :{" "}
                        {selectedRecord?.isProminentFigure.toString() || `-`}
                      </p>
                      <p className="text-gray-700  text-sm md:text-lg ">
                        Date of Birth:{" "}
                        {formatDate(
                          selectedRecord.dateOfBirth
                            ? selectedRecord.dateOfBirth
                            : `not provided`
                        )}
                      </p>
                      {/* Add more fields as needed */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={closeViewModal}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {selectedRecord && isModalOpen && (
        <EditModal
          isModalOpen={isModalOpen}
          data={selectedRecord}
          handleCancel={handleCancel}
          fetchData={fetchData}
        />
      )}
      {/* Add as Public Figure */}
      {isPublicFigureModalOpen && selectedRecord && (
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
                      Update Famous Personality
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">
                        {selectedRecord.selectedRecord
                          ? `Are you sure you want to remove from Famous Personality`
                          : ` Are you sure you want to add this user as Famous Personality`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleFmousPersonality}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={closePublicFigureModal}
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
};

export default ViewPersonsList;
