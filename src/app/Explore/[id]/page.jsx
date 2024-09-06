"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactFlowTree from "../../react-flow/ReactFlow";

export default function PublicFigureTree() {
  const [data, setData] = useState([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/getTreeById/${id}`
        );
        const result = await response.json();

        setData(result);
      };

      fetchData();
    }
  }, [id]);

  return (
    <>
      <div>Public Figure Tree</div>

      {data.length > 0 && <ReactFlowTree data={data} />}
    </>
  );
}