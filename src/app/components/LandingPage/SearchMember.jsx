import React from "react";
import { LuSearchCheck } from "react-icons/lu";
import bg from "../../_assets/Rectangle404.png";

function SearchMember() {
  return (
    <section
      className="relative flex items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className=" xl:w-[27%] border-2 m-4 ml-10 md:ml-16 p-4 shadow-lg rounded-md bg-white bg-opacity-90">
        <div className="text-center mt-">
          <div className="flex items-center justify-center my-3">
            <LuSearchCheck className="text-[#7E7E7E] mx-2  text-5xl" />
          </div>
          <h2 className="flex items-center justify-center text-3xl text-center text-[#82D026] font-semibold mb-1">
            <span>Search Is Simple</span>
          </h2>
          <p className="text-sm p-">
            Easiest Way To Research Your Family History <br /> With Qureshi
            Family in Couple of Minutes
          </p>
        </div>
        <form action="" className="flex flex-col items-center mt-2">
          <input
            type="text"
            placeholder="Member Name"
            className="bg-[#FBF7F7] text-sm rounded-lg w-[80%] m-4 p-2 border-2 border-[#CACACA]"
          />
          <input
            type="text"
            placeholder="Grandparent Name"
            className="bg-[#FBF7F7] text-sm rounded-lg w-[80%] m-2 p-2 border-2 border-[#CACACA]"
          />
          <input
            type="text"
            placeholder="Parent Name (Mother/Father)"
            className="bg-[#FBF7F7] text-sm rounded-lg w-[80%] m-4 p-2 border-2 border-[#CACACA]"
          />
          <input
            type="button"
            value="Search Family Member"
            className="cursor-pointer w-[80%] rounded-lg m-4 p-2 font-semibold text-white bg-[#82D026]"
          />
        </form>
      </div>
    </section>
  );
}

export default SearchMember;
