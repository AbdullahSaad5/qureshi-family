import React from "react";
import family from "../../_assets/family.png";
import Image from "next/image";


function JoinFamily() {
  return (
    <section className="font-poppins mb-16" style={{ height: "75vh" }}>
      <div className="border-b mt-36 border-gray-300" />
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className=" text-[40px] md:text-[56px] tracking-wider font-medium mb-4 text-[#82D026] ">
          Join Qureshi Family Community
        </h2>
        <p className="text-[#8B8B8B] font-medium md:text-[25px] tracking-wider p-4 pt-8 mb-4">
          Millions of families around the world use Qureshi Family to explore
          their history. Collaborate <br />
          with members join and just search a name to know everything about Your
          Ancestors{" "}
        </p>
        <Image
          src={family}
          alt="family-image"
          className="w-full h-auto max-w-2xl border-b-2 border-gray-400"
        />
      </div>

      <div className="flex justify-center"></div>
    </section>
  );
}

export default JoinFamily;
