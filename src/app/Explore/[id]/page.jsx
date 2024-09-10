"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactFlowTree from "../../react-flow/ReactFlow";
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

  return (
    <>
      <>
        <Header />

        {data.length > 0 && <ReactFlowTree data={data} />}

        <Footer />
      </>
    </>
  );
}
