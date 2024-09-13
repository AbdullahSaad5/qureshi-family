"use client";

import React from "react";
import { Expand } from "lucide-react";
import Image from "next/image";
import explore from "../../_assets/explore.png";
import { useRouter } from "next/navigation";
import endorse from "../../_assets/endorse.png";
function Qureshi() {
  const router = useRouter();

  return (
    <section className="md:p-12 mb-8 mt-12 sm:mt-0">
      <div className={` text-[#82D026]  text-center m-4 p-4`}>
        <h2 className="text-5xl">Shajra-e-Nasb</h2>
      </div>
      <div className=" m-4 p- text-center">
        <p className="mt-4">
          A{" "}
          <span className="font-semibold text-[#646464]"> Shajra e Nasab</span>{" "}
          is a family tree that traces the lineage of a family across
          generations. It records ancestral connections, <br />
          preserving family heritage and history. In Islamic culture, it holds
          significance for families, especially those claiming <br /> descent
          from notable religious or historical figures. This genealogical record
          is often used to maintain accurate <br /> knowledge of a family’s
          ancestry and is sometimes referred to during important events like
          marriages. <br />
          Families may pass down their Shajra e Nasab as a symbol of pride and
          tradition..
        </p>
      </div>
      <div className="mt-12 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-x-4 gap-x-4 ml-6 p-4">
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[270px] md:h-[250px] p-4">
          <span className=" flex items-center text-center mb-4">
            <Image src={explore} alt="explore" className="mr-2 w-[60px]" />
            <h2 className="xl:text-[18px] text-[15px] font-bold mb-2">
              Explore Your Ancestry
            </h2>
          </span>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Uncover stories and records from your family&#39;s past. Discover
            the rich tapestry of your family&#39;s past.
          </p>
          <p
            onClick={() => router.push("/Explore")}
            className="text-[#82D026] cursor-pointer mt-8"
          >
            Learn More
          </p>
        </div>
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[270px] md:h-[250px] p-4">
          <span className="flex items-center text-center mb-7 ml-2">
            <Expand size={50} className="text-[#82D026]" />
            <h2 className="xl:text-[18px] text-[15px] font-bold ml-2 mb-2">
              Expand Your Family Tree
            </h2>
          </span>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Grow your family tree by connecting with relatives and adding new
            branches.
          </p>
          <p
            onClick={() => router.push("/Expand")}
            className="text-[#82D026] cursor-pointer mt-8"
          >
            Learn More
          </p>
        </div>
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[270px] md:h-[250px] p-4">
          <span className="flex items-center text-center mb-4 ml-2">
            <Image src={endorse} alt="explore" className="w-[60px]" />
            <h2 className="xl:text-[18px] text-[15px] font-bold ml-2 mb-2">
              About Us
            </h2>
          </span>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Share your research and discoveries with the family. Recognize and
            celebrate everyone&#39;s research efforts.
          </p>
          <p
            onClick={() => router.push("/AboutUs")}
            className="text-[#82D026] cursor-pointer mt-8"
          >
            Learn More
          </p>
        </div>
      </div>
    </section>
  );
}
export default Qureshi;
