import React from "react";
import { Telescope, Expand, MessageSquareQuote } from "lucide-react";

// import { Poor_Richard } from "next/font/google";

// const PoorRichard = Poor_Richard({
//     weight: "400",
//     subsets: ["latin"],
//   });

function Qureshi() {
  return (
    <section className="md:p-12 mb-12">
      <div className={` text-[#82D026]  text-center m-4 p-4`}>
        <h2 className="text-5xl">Qureshi</h2>
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

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4 p-4">

        <div className="flex flex-col justify-center border-2 rounded-lg shadow-lg border-[#D2D2D2] w-[90%] h-[400px] p-4">
          <span className="block text-center mb-12 ">
            <Telescope size={70} className="text-[#82D026]" />
          </span>
          <h2 className="text-xl font-bold mb-2">Explore Your Ancestry</h2>
          <p className="mb-2 text-[#676767]">
            Uncover stories and records from your family's past. Discover the
            rich tapestry of your family's past.
          </p>
          <p className="text-[#82D026] cursor-pointer mt-8">Learn More</p>
        </div>

        <div className="flex flex-col justify-center border-2 rounded-lg shadow-lg border-[#D2D2D2] w-[90%] h-[400px] p-4">
          <span className="block text-center mb-4">
            <Expand size={60} className="text-[#82D026] mb-8" />
          </span>
          <h2 className="text-xl font-bold mb-2">Expand Your Family Tree</h2>
          <p className="mb-2 text-[#676767]">
            Grow your family tree by connecting with relatives and adding new
            branches.
          </p>
          <p className="text-[#82D026] cursor-pointer mt-14">Learn More</p>
        </div>

        <div className="flex flex-col justify-center border-2 rounded-lg shadow-lg border-[#D2D2D2] w-[90%] h-[400px] p-4">
          <span className="block text-center mb-4">
            <MessageSquareQuote size={60} className="text-[#82D026] mb-8" />
          </span>
          <h2 className="text-xl font-bold mb-2">Endorse Your Contribution</h2>
          <p className="mb-2 text-[#676767]">
            Share your research and discoveries with the family. Recognize and
            celebrate everyone's research efforts.
          </p>
          <p className="text-[#82D026] cursor-pointer mt-8">Learn More</p>
        </div>
      </div>

    </section>
  );
}

export default Qureshi;
