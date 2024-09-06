import Image from "next/image";
import about1 from "../_assets/about1.jpg";
import about2 from "../_assets/about2.jpg";
export default function AboutUs() {
  return (
    <div className="min-h-screen  ">
      <div className="flex flex-col md:flex-row items-center justify-center  bg-gray-100 p-12">
        <div className="p-4 mr-6 md:mb-0 mb-4">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <div className="border-2 border-[#82D026] w-[15%] mb-4" />
          <p className="text-sm">
            Welcome to the Qureshi Family website, where we celebrate our shared{" "}
            <br />
            heritage. Our mission is to connect family members and preserve our{" "}
            <br />
            rich history. Discover your roots, trace our familys journey, and{" "}
            <br />
            explore generations of stories. With easy-to-use tools, you can{" "}
            <br />
            learn about significant milestones and traditions. Join a global{" "}
            <br />
            community of Qureshis as we honor our past and embrace the future.{" "}
            <br />
            Together, we continue the legacy of the Qureshi family for <br />
            generations to come.
          </p>
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
            Our mission is to unite the Qureshi family by preserving our rich{" "}
            <br />
            heritage and fostering connections across generations. We aim to{" "}
            <br />
            make family history accessible and meaningful, helping every member{" "}
            <br />
            trace their roots, discover untold stories, and celebrate the values{" "}
            <br />
            and traditions that define us. Together, we strive to keep the{" "}
            <br />
            Qureshi legacy alive and thriving for future generations.
          </p>
        </div>
      </div>
    </div>
  );
}
