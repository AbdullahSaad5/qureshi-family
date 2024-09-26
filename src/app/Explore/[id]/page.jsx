"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for programmatic navigation

import Header from "@/app/components/LandingPage/Header";

import Footer from "@/app/components/LandingPage/Footer";
import "./FamilyTree.css";

export default function PublicFigureTree() {
  const [data, setData] = useState({}); 
  const [ancestorChain, setAncestorChain] = useState([]); // Initialize as an object to avoid undefined issues
  const params = useParams();
  const router = useRouter(); // Create a router instance
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTreeById/${id}`
        );
        const result = await response.json();
        setData(result);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAncestorChain = async () => {
      if (id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAncestorChain/${id}`
        );
        const result = await response.json();
        setAncestorChain(result); // Store ancestor chain data
      }
    };
    fetchAncestorChain();
  }, [id]);

  const handleProfileClick = (userId) => {
    // Navigate to the profile page of the clicked member
    if (userId) {
      router.push(`/Explore/${userId}`);
    }
  };

  return (
    <div className="h-full min-h-[calc(170vh-112px)] flex-col flex items-stretch justify-stretch">
      <Header />
      <h2 className="tree-title">Family Tree</h2>
      <div className="grid">
        {/* Grandparents */}
        <div className="child-1">
          <div className="box-header">Father's Father</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.fatherOfFather?._id)}
          >
            {data.fatherOfFather?.name || "Unknown"}
          </div>
        </div>
        <div className="child-2">
          <div className="box-header">Father's Mother</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.fatherOfMother?._id)}
          >
            {data.fatherOfMother?.name || "Unknown"}
          </div>
        </div>
        <div className="child-3">
          <div className="box-header">Mother's Father</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.motherOfFather?._id)}
          >
            {data.motherOfFather?.name || "Unknown"}
          </div>
        </div>
        <div className="child-4">
          <div className="box-header">Mother's Mother</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.motherOfMother?._id)}
          >
            {data.motherOfMother?.name || "Unknown"}
          </div>
        </div>
        {/* Parents */}
        <div className="child-5">
          <div className="box-header">Father</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.father?._id)}
          >
            {data.father?.name || "Unknown"}
          </div>
        </div>
        <div className="child-6">
          <div className="box-header">Mother</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.mother?._id)}
          >
            {data.mother?.name || "Unknown"}
          </div>
        </div>

        <div className="child-7">
          <div className="box-header">Father's Siblings</div>
          <div className="box-name">
            {data.fatherSiblings?.length > 0
              ? data.fatherSiblings.map((sibling) => (
                  <div
                    key={sibling._id}
                    onClick={() => handleProfileClick(sibling._id)}
                    className="clickable-name"
                  >
                    {sibling.name}
                  </div>
                ))
              : "Unknown"}
          </div>
        </div>

        <div className="child-8">
          <div className="box-header">Mother's Siblings</div>
          <div className="box-name">
            {data.motherSiblings?.length > 0
              ? data.motherSiblings.map((sibling) => (
                  <div
                    key={sibling._id}
                    onClick={() => handleProfileClick(sibling._id)}
                    className="clickable-name"
                  >
                    {sibling.name}
                  </div>
                ))
              : "Unknown"}
          </div>
        </div>

        <div className="child-9">
          <div className="box-header">Famous Personality</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.famousPersonality?._id)}
          >
            {data.famousPersonality?.name || "Unknown"}
          </div>
        </div>
        {/* Siblings */}

        <div className="child-10">
          <div className="box-header">Siblings</div>
          <div className="box-name">
            {data.siblings?.length > 0
              ? data.siblings.map((sibling) => (
                  <div
                    key={sibling._id}
                    onClick={() => handleProfileClick(sibling._id)}
                    className="clickable-name"
                  >
                    {sibling.name}
                  </div>
                ))
              : "Unknown"}
          </div>
        </div>

        {/* Spouse */}

        <div className="child-12">
          <div className="box-header">Spouse</div>
          <div
            className="box-name"
            onClick={() => handleProfileClick(data.spouses?.[0]?._id)}
          >
            {" "}
            {data.spouses && data.spouses.length > 0
              ? data.spouses[0].name
              : "Unknown"}{" "}
          </div>
        </div>

        {/* Children */}

        <div className="child-15">
          <div className="box-header">Children</div>
          <div className="box-name">
            {data.children?.length > 0
              ? data.children.map((child) => (
                  <div
                    key={child._id}
                    onClick={() => handleProfileClick(child._id)}
                    className="clickable-name"
                  >
                    {child.name}
                  </div>
                ))
              : "Unknown"}
          </div>

        </div>



      {/* Ancestor Chain Section */}


        {/* Horizontal Lines */}
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
        <div className="line-5"></div>
        <div className="line-6"></div>
        <div className="line-7"></div>
        <div className="line-8"></div>
        <div className="line-9"></div>

        {/* Vertical Lines */}
        <div className="vertical-line-1"></div>
        <div className="vertical-line-2"></div>
        <div className="vertical-line-3"></div>
        <div className="vertical-line-4"></div>
        <div className="vertical-line-5"></div>
        <div className="vertical-line-6"></div>
        <div className="vertical-line-7"></div>
        <div className="vertical-line-8"></div>
        <div className="vertical-line-9"></div>
        <div className="vertical-line-10"></div>
        <div className="vertical-line-11"></div>
        <div className="vertical-line-12"></div>
        <div className="vertical-line-13"></div>
        <div className="vertical-line-14"></div>
        <div className="vertical-line-15"></div>
        <div className="vertical-line-16"></div>

        <div className="junction-1"></div>
        <div className="junction-2"></div>
        <div className="junction-3"></div>
        <div className="junction-4"></div>
        <div className="junction-5"></div>
        <div className="junction-6"></div>
        <div className="junction-7"></div>
        <div className="junction-8"></div>
        <div className="junction-9"></div>

        <div className="junction-10"></div>
        <div className="junction-11"></div>
        <div className="junction-12"></div>
        <div className="junction-13"></div>
        <div className="junction-14"></div>
      </div>
      <div className="ancestor-chain">
  <h2 className="ancestor-title">Ancestor Chain</h2>
  {ancestorChain?.ancestorChain ? (
    <p>{ancestorChain.ancestorChain}</p>
  ) : (
    <p>No ancestor chain data available.</p>
  )}
</div>
      <Footer />
    </div>
  );
}

