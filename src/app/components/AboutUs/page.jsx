import Image from "next/image";
import about1 from "../../_assets/about1.jpg";
import about2 from "../../_assets/about2.jpg";
export default function AboutUs() {
  return (
    <div className="min-h-screen  ">
      <div className="flex flex-col md:flex-row items-center justify-center  bg-gray-100 p-12">
        <div className="p-4 mr-6 md:mb-0 mb-4">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <div className="border-2 border-[#82D026] w-[15%] mb-4" />
          <p className="text-sm">
            Welcome to the{" "}
            <span className="font-semibold text-[#646464]">
              {" "}
              Shajra e Nasab{" "}
            </span>{" "}
            of the Holy Prophet Hazrat Muhammad <br />
            (SAW), a dedicated platform to honor and preserve the sacred lineage{" "}
            <br />
            of the Prophet s (SAW) family. Our website provides an opportunity{" "}
            <br />
            for individuals to trace their connection to the Prophet s (SAW){" "}
            <br />
            noble ancestry and explore the rich history of his descendants.{" "}
            <br />
            Through this platform, we aim to share stories, historical <br />
            milestones, and the profound legacy that spans generations. Discover{" "}
            <br />
            the roots of this blessed lineage, and learn about the family that{" "}
            <br />
            continues to inspire Muslims worldwide.
          </p>
          <p></p>
        </div>
        <Image
          src={about1}
          alt="about1"
          className="w-[350px] sm:w-[400px] h-[280px] ml-0 md:ml-6 shadow-xl rounded-md"
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center mt-20 bg-white pb-16">
        <Image
          src={about2}
          alt="about1"
          className="w-[350px] sm:w-[400px] h-[280px] mt-6 md:mt-0 ml-8 mr-6 shadow-xl rounded-md"
        />
        <div className="p-4 ml-12">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <div className="border-2 border-[#82D026] w-[15%] mb-4" />
          <p className="text-sm">
            Our mission is to unite descendants of the Holy Prophet Hazrat{" "}
            <br />
            Muhammad (SAW) by preserving the sacred{" "}
            <span className="font-semibold text-[#646464]">
              {" "}
              Shajra e Nasab{" "}
            </span>{" "}
            and fostering <br />
            connections across generations. We aim to make this noble family{" "}
            <br />
            history accessible and meaningful, helping every individual trace{" "}
            <br />
            their lineage, uncover untold stories, and celebrate the values and{" "}
            <br />
            traditions that define the Prophet’s (SAW) blessed legacy. Together,{" "}
            <br />
            we strive to honor and preserve the Holy Prophet’s (SAW) lineage,{" "}
            <br />
            ensuring it remains a source of inspiration and guidance for future{" "}
            <br />
            generations.
          </p>
        </div>
      </div>
    </div>
  );
}
