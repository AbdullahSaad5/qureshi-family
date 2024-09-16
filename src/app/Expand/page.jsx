"use client";

// import Genogram from "./Geogram";
const Genogram = dynamic(() => import("./Geogram.jsx"), { ssr: false });
import dynamic from "next/dynamic";
import "./genogram.css";
import { useForm } from "react-hook-form";
import Modal1 from "../components/Modals/Modal1.jsx";
import Modal2 from "../components/Modals/Modal2.jsx";
import Modal3 from "../components/Modals/Modal3.jsx";
import Header from "../components/LandingPage/Header.jsx";
import Footer from "../components/LandingPage/Footer.jsx";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [reFetchtree, setReFetchtree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddSpouseButtonClick, setIsAddSpouseButtonClick] = useState(false);

  const [isAddSpouseModalOpen, setIsAddSpouseModalOpen] = useState(false);
  const [slectedFatherID, setSelectedFatherID] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`
      );
      console.log(response);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [reFetchtree]);

  let modifiedData =
    data.map((member) => {
      const newMember = {
        key: member._id,
        n: member.name,
        s: member.gender.toUpperCase().charAt(0),
        spouses: member.spouseIds,
        f: member.father,
        m: member.mother,
        tribe: member.tribe,
        biography: member.biography,
        address: member.address,
        ancestorChain: member.ancestorChain,
        dob: new Date(member.dateOfBirth).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      if (!newMember.f) {
        delete newMember.f;
      }
      if (!newMember.m) {
        delete newMember.m;
      }

      return newMember;
    }) || [];
  console.log(modifiedData);

  if (!modifiedData || !modifiedData?.length) return <div>Loading...</div>;

  return (
    <div className=" h-full min-h-[calc(170vh-112px)] flex-col flex items-stretch justify-stretch">
      <Header />
      <div>
        <div className="w-full flex justify-end py-4">
          <button
            onClick={() => setIsAddSpouseButtonClick(true)}
            className="mr-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
          >
            Add Spouse
          </button>

          <button
            onClick={showModal}
            className="mr-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
          >
            Add Member
          </button>
        </div>
      </div>
      <Modal1
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
        setSelectedFatherID={setSelectedFatherID}
        setReFetchtree={setReFetchtree}
        reFetchtree={reFetchtree}
      />
      <Modal2
        isAddSpouseModalOpen={isAddSpouseModalOpen}
        setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
        slectedFatherID={slectedFatherID}
        setReFetchtree={setReFetchtree}
        reFetchtree={reFetchtree}
      />
      <Modal3
        isAddSpouseButtonClick={isAddSpouseButtonClick}
        setIsAddSpouseButtonClick={setIsAddSpouseButtonClick}
        setReFetchtree={setReFetchtree}
        reFetchtree={reFetchtree}
      />

      <div className="genogram">
        <Genogram Genogram={modifiedData} />
      </div>
      <Footer />
    </div>
  );
};

export default App;

// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import Modal1 from "../components/Modals/Modal1.jsx";
// import Modal2 from "../components/Modals/Modal2.jsx";
// import Header from "../components/LandingPage/Header.jsx";
// import Footer from "../components/LandingPage/Footer.jsx";
// import ReactFlowTree from "./ReactFlow.jsx";
// import "@xyflow/react/dist/style.css";

// import "antd/dist/reset.css";

// const LayoutFlow = () => {
//   const [data, setData] = useState([]);
//   const [IDs, setIDs] = useState([]);

//   const [reFetchtree, setReFetchtree] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isAddSpouseModalOpen, setIsAddSpouseModalOpen] = useState(false);
//   const [slectedFatherID, setSelectedFatherID] = useState("");

//   const {
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       childGender: "male",
//       grandfather: "",
//       grandmother: "",
//       fatherDOB: "",
//     },
//   });

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     reset();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`
//       );
//       const data = await response.json();
//       setData(data);
//     };

//     fetchData();
//   }, [reFetchtree]);

//   useEffect(() => {
//     if (reFetchtree) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`
//           );
//           const data = await response.json();

//           setData(data);
//           setReFetchtree(false);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [reFetchtree]);

//   if (data.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header />

//       <div>
//         <div className="w-full flex justify-end">
//           <button
//             onClick={showModal}
//             className="mr-5 text-white bg-[#82D026] font-semibold py-2 px-4 rounded-lg hover:bg-[#76bb22] transition-colors duration-300 ease-in-out"
//           >
//             Add Member
//           </button>
//         </div>
//         <Modal1
//           isModalOpen={isModalOpen}
//           handleCancel={handleCancel}
//           setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
//           setSelectedFatherID={setSelectedFatherID}
//         />
//         <Modal2
//           isAddSpouseModalOpen={isAddSpouseModalOpen}
//           setIsAddSpouseModalOpen={setIsAddSpouseModalOpen}
//           slectedFatherID={slectedFatherID}
//         />
//         <ReactFlowTree data={data} IDs={IDs} />;
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default LayoutFlow;
