"use client";

const Genogram = dynamic(() => import("./Geogram"), { ssr: false });
import dynamic from "next/dynamic";
import "./genogram.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";

export default function PublicFigureTree() {
  const [data, setData] = useState([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTreeById/${id}`
        );
        const result = await response.json();

        setData(result);
      };

      fetchData();
    }
  }, [id]);

  let modifiedData =
    data.map((member) => {
      const newMember = {
        key: member._id,
        n: member.name,
        s: member.gender.toUpperCase().charAt(0),
        spouses: member.spouseIds,
        f: member.father,
        m: member.mother,
        tribe: member.tribe || "Unknown",
        biography: member.biography || "Unknown",
        address: member.address || "Unknown",
        ancestorChain: member.ancestorChain || "Unknown",
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

      <div className="genogram mt-10">
        <Genogram Genogram={modifiedData} />
      </div>
      <Footer />
    </div>
  );
}
