"use client";

// import Genogram from "./Geogram";
const Genogram = dynamic(() => import("./Geogram"), { ssr: false });
import dynamic from "next/dynamic";
import "./genogram.css";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members`);
      console.log(response);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  let modifiedData =
    data.map((member) => {
      const newMember = {
        key: member._id,
        n: member.name,
        s: member.gender.toUpperCase().charAt(0),
        // about: member.about,
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
    <div className="genogram" style={{ height: "100vh" }}>
      <Genogram Genogram={modifiedData} />
    </div>
  );
};

export default App;
