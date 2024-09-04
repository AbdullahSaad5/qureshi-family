import React from "react";
import ramadan from "../../_assets/last.png";


function JoinFamily() {
  return (
    <section className="font-poppins h-[700px] bg-cover bg-center flex items-center justify-end " 
      style={{ backgroundImage: `url(${ramadan.src})`  }}>
      {/* <div className="border-b mt-20 border-gray-300" /> */}
    
      <div className="flex flex-col items-center justify-center text-center mr-10">
        <h2 className=" text-3xl md:text-4xl tracking-wider font-medium mb-4 text-[#82D026] ">
          Join Qureshi <br /> Family Community
        </h2>
        <p className="text-white font-extralight text-sm md:text-xs text-center tracking-wider p-4 pt-8 mb-4">
          Millions of families around the world use Qureshi Family to explore
          their history. Collaborate <br />
          with members join and just search a name to know everything about Your
          Ancestors{" "}
        </p>
      </div>

      {/* <div className="flex justify-center"></div> */}
    </section>
  );
}

export default JoinFamily;
