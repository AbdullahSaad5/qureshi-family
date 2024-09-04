import React from "react";
import { Telescope, Expand, MessageSquareQuote } from "lucide-react";
import { BsStars } from "react-icons/bs";
import Image from "next/image";

import explore from "../../_assets/explore.png";
import endorse from "../../_assets/endorse.png";

function Qureshi() {
  return (
    <section className="md:p-12 mb-12">
      <div className="w-full  flex justify-center">
        <div className="relative text-[#82D026] text-center m-4 p-4  w-64">
          <BsStars className="absolute top-0 right-0 text-3xl" />

          <BsStars className="absolute bottom-0 left-0 text-3xl" />

          <h2 className="text-5xl">Qureshi</h2>
        </div>
      </div>

      <div className=" m-4 p-4 text-center">
        <p className="text-md">
          <span className="font-semibold text-[#646464]">Qureshi </span>also
          rendered as Quraishi, Qureshy, Quraishy, Qoraishi, Qoreshi, Koraishi,
          Kureshi, Kureshy, Kureishi, Coreishi, (Arabic/ <br />
          Urdu: قریشی, Hindi: कुरैशी) which means member of the Quraish tribe.
          It is a Muslim family name that originates from Arabs in <br />
          Saudi Arabia and indicates descent from the{" "}
          <span className="text-[#82D026]"> Quraish  </span>which was the
          leading noblest tribe in Mecca at the time of birth of <br />
          the{" "}
          <span className="text-[#82D026] underline">
            {" "}
            Holy Prophet Hazrat Muhammad ( صَلَّى اللَّهُ عَلَيْهِ وآلہ وَسَلَّم
            ) 
          </span>
          when <span className="underline"> Prophet’s grandfather </span> was
          the head of tribe
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-x-4 gap-x-4 m-4 p-4">
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[300px] p-4">
          <span className="block text-center mb-4">
            <Image src={explore} alt="explore" className="w-[60px]" />
          </span>
          <h2 className="xl:text-[20px] text-[15px] font-bold mb-2">
            Explore Your Ancestry
          </h2>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Uncover stories and records from your family&#39;s past. Discover
            the rich tapestry of your family&#39;s past.
          </p>
          <p className="text-[#82D026] cursor-pointer mt-8">Learn More</p>
        </div>
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[300px] p-4">
          <span className="block text-center mb-4">
            <Expand size={55} className="text-[#82D026]" />
          </span>
          <h2 className="xl:text-[20px] text-[15px] font-bold mb-2">
            Expand Your Family Tree
          </h2>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Grow your family tree by connecting with relatives and adding new
            branches.
          </p>
          <p className="text-[#82D026] cursor-pointer mt-8">Learn More</p>
        </div>
        <div className="flex flex-col justify-center border rounded-lg shadow-lg border-[#D2D2D2] w-[90%] xl:w-[90%] lg:w-[100%] h-[300px] p-4">
          <span className="block text-center mb-4">
            <Image src={endorse} alt="explore" className="w-[60px]" />
          </span>
          <h2 className="xl:text-[20px] text-[15px] font-bold mb-2">
            Endorse Your Contribution
          </h2>
          <p className="text-sm xl:text-md mb-2 text-[#676767]">
            Share your research and discoveries with the family. Recognize and
            celebrate everyone&#39;s research efforts.
          </p>
          <p className="text-[#82D026] cursor-pointer mb-2 mt-8">Learn More</p>
        </div>
      </div>
    </section>
  );
}

export default Qureshi;
