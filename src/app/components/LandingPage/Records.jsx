import React from "react";
import Image from "next/image";
import family from "../../_assets/family.png";

function Records() {
  return (
    <section className=" flex items-center justify-around h-[400px] md:h-[550px]">
      <div className="md:ml-6">
        <h2 className="text-3xl lg:text-4xl font-bold p-2">
          Search Billions <br /> Of Records
        </h2>
        <p className="text-md p-2">
          Dive into our huge international records <br />
          database – just search a name to learn more <br />
          about your ancestors. With exclusive content <br />
          and accurate results well help you uncover <br />
          more than you ever imagined.
        </p>
      </div>
      <Image
        src={family}
        alt="family"
        className="hidden md:block lg:w-[500px] w-[450px] "
      />
    </section>
  );
}

export default Records;
