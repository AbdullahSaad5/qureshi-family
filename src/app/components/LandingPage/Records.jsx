import React from "react";
import Image from "next/image";
import family from "../../_assets/family.png";
function Records() {
  return (
    <section className=" flex items-center justify-around h-[400px] md:h-[520px] lg:h-[480px]">
      <div className="md:ml-6 p-6 mt-16 mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold p-2">
          Search Billions <br className="hidden md:block" /> Of Records
        </h2>
        <p className="text-md p-2">
          Embark on a journey through time with our expansive records. Uncover{" "}
          <br />
          the rich history of your ancestors and their legacy. With detailed{" "}
          <br />
          data and exclusive archives, every search reveals more. Trace your{" "}
          <br />
          family tree across generations and continents. Connect the dots of{" "}
          <br />
          your heritage with precise and reliable information. Discover the{" "}
          <br />
          stories that shaped your past and define your future.
        </p>
      </div>
      <Image
        src={family}
        alt="family"
        className="hidden md:block lg:w-[500px]  w-[400px] mr-6"
      />
    </section>
  );
}
export default Records;
