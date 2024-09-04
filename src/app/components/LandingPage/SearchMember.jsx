import React from "react";
import { LuSearchCheck } from "react-icons/lu";
import family from "../../_assets/familyTree2.jpg";
import Image from "next/image";



function SearchMember() {
  return (
    <section className="flex items-center justify-around  w-full">
      <div className="w-[30%]  border-2 m-4 my-32 p-4 border-[CACACA] rounded-md">
        <div className="text-center mt-8">
          <h2 className="flex items-center justify-center text-4xl text-center text-[#82D026] font-semibold mb-6">
            <LuSearchCheck className="text-[#7E7E7E] mx-6 text-6xl" />{" "}
            <span>Search Is Simple</span>
          </h2>
          <p className="text-xl p-4">
            Easiest Way To Research Your Family History <br /> With Qureshi
            Family in Couple of Minutes
          </p>
        </div>
        <form action="" className="flex flex-col items-center mt-4 ">
          <input
            type="text"
            placeholder="Member Name"
            className="bg-[#FBF7F7] rounded-lg w-[80%] m-4 p-4 border-2 border-[CACACA]"
          />
          <input
            type="text"
            placeholder="Grandparent Name"
            className="bg-[#FBF7F7] rounded-lg w-[80%] m-4 p-4 border-2 border-[CACACA]"
          />
          <input
            type="text"
            placeholder="Parent Name (Mother/Father)"
            className="bg-[#FBF7F7] rounded-lg w-[80%] m-4 p-4 border-2 border-[CACACA]"
          />
          <input
            type="button"
            value="Search Family Member"
            className="cursor-pointer w-[80%] rounded-lg m-4 p-3 font-semibold text-white bg-[#82D026]"
          />
        </form>
      </div>
      <div className="m-4 p-4 ">
        <Image src={family} alt="" className="w-[800px] h-[500px] " />
      </div>
    </section>
  );
}

export default SearchMember;
