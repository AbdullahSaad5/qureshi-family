"use client";
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import API from "../../axios";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader/index";
import { useEffect, useState } from "react";
import Pagination from "../components/Paggination/Paggination";
import { Modal, Descriptions, Badge, Button } from "antd";
import EditUserModal from "@/app/components/Modals/EditUserModal";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const fetchData = async () => {
    const res = await API.get("/createUser/get_all");
    if (res.status) {
      setUserList(res.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function removeObjectWithId(arr, id) {
    return arr.filter((obj) => {
      return obj._id !== id;
    });
  }
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const handleDelete = async () => {
    setLoadingButton(true);
    if (selectedRecord) {
      try {
        const newState = removeObjectWithId(userList, selectedRecord._id);
        setUserList(newState);
        const res = await API.delete(
          `/createUser/remove/${selectedRecord._id}`
        );
        // fetchData();
        closeDeleteModal();
        toast.success("Record deleted successfully:");
      } catch (error) {
        console.log(
          `Catch, ${selectedRecord} and its id ${selectedRecord._id}`
        );
        toast.error("Error deleting record:", error);
        // Handle error (e.g., show a toast notification)
      } finally {
        setLoadingButton(false);
      }
    }
  };
  const handleUpdateUserStatus = async () => {
    if (selectedRecord) {
      setLoadingButton(true);
      try {
        const res = await API.put(`/updatestatus`, {
          userID: selectedRecord._id,
          status: selectedRecord.isBlocked ? "active" : "blocked",
        });
        toast.success(res.data.message);
        fetchData();
        closeUserStatusUpdaedModal();
        setLoadingButton(false);
      } catch (error) {
        toast.error("Error updating record:", error);
        // Handle error (e.g., show a toast notification)
      } finally {
        setLoadingButton(false);
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
  // Filter users based on search term
  const filteredUsers = userList.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get the current page's users
  const indexOfLastUser = currentPage * recordsPerPage;
  const indexOfFirstUser = indexOfLastUser - recordsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order state (ascending by default)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when a new search is done
  };
  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const [isViewModalOpen, setViewIsModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isupdateUserStatusMoldalOpen, setUpdaUserStatusModalOpen] =
    useState(false);
  const [isEditModalOpen, setIEditModalOpen] = useState(false);

  // Handle the change in select for recordPerpage
  const handleRecordsChange = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
  const openViewModal = (record) => {
    setSelectedRecord(record);
    setViewIsModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setViewIsModalOpen(false);
  };
  const openDeletModal = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeleteModalOpen(false);
  };
  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRecord(null);
    setIEditModalOpen(false);
  };
  const openUserStatusUpdaedModal = (record) => {
    setSelectedRecord(record);
    setUpdaUserStatusModalOpen(true);
  };

  const closeUserStatusUpdaedModal = () => {
    setSelectedRecord(null);
    setUpdaUserStatusModalOpen(false);
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
            <table className=" min-w-[600px] w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 text-left font-medium text-black dark:text-white xl:pl-11">
                    Index
                  </th>
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    contact
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>

                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((item, key) => (
                  <tr key={key}>
                    <td className=" flex justify-center text-center items-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {key + 1 + recordsPerPage * (currentPage - 1)}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.fullName}
                      </h5>
                      {/* <p className="text-sm">${item.}</p> */}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.contact}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item?.status === "active" ? `Active` : `Block`}
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
                        <button
                          onClick={() => openDeletModal(item)}
                          className="hover:text-red-900 text-red"
                        >
                          <MdDeleteForever />
                        </button>
                        <button
                          onClick={() => openUserStatusUpdaedModal(item)}
                          className=""
                        >
                          {item?.isBlocked ? <FaUserShield /> : <FaUserSlash />}
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="hover:text-red-900 text-red"
                        >
                          <FaUserEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      )}
      {/* View record details  */}
      {isViewModalOpen && selectedRecord && (
        <Modal
          title="User Information"
          open={isViewModalOpen}
          footer={false}
          onCancel={closeViewModal}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Status">
              {selectedRecord?.status === "active" ? (
                <Badge status="success" text="Active" />
              ) : (
                <Badge status="error" text="Blocked" />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedRecord?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              {selectedRecord?.contact}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {selectedRecord?.isAdmin ? `Admin` : `User`}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Joining">
              {selectedRecord?.date_time
                ? formatDate(selectedRecord?.date_time)
                : `-`}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedRecord && (
        <Modal
          title="Confirm Deletion"
          open={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          footer={[
            <Button
              key="submit"
              style={{
                backgroundColor: "#f44336",
                color: "white",
              }}
              loading={loadingButton}
              onClick={handleDelete}
            >
              Confirm
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      )}
      {/* Update user Status Active / Block  */}
      {isupdateUserStatusMoldalOpen && selectedRecord && (
        <Modal
          title="Confirm Status Update"
          open={isupdateUserStatusMoldalOpen}
          onCancel={closeUserStatusUpdaedModal}
          footer={[
            <Button
              key="submit"
              style={{
                backgroundColor: `${
                  selectedRecord?.status === "active" ? "#f44336" : "#4caf50"
                }`,
                color: "white",
              }}
              loading={loadingButton}
              onClick={handleUpdateUserStatus}
            >
              Confirm
            </Button>,
          ]}
        >
          <p>
            {selectedRecord?.status === "active"
              ? `Are you sure you want to block this user?`
              : `Are you sure you want un-block this user?`}
          </p>
        </Modal>
      )}

      {/* Eidit User Details */}

      {isEditModalOpen && selectedRecord && (
        <EditUserModal
          isModalOpen={isEditModalOpen}
          data={selectedRecord}
          handleCancel={closeEditModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Users;
