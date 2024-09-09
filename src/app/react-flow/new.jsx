"use client";
import { useState } from "react";
import { Button, Modal } from "antd";
import { CollapseProps } from "antd";
import { Collapse } from "antd";

const items = [
  {
    key: "1",
    label: "Additional Information",
    children: (
      <div className="grid grid-cols-2 gap-6">
        {/* Spouse Name */}
        <div>
          <label
            htmlFor="sName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spouse Name
          </label>
          <input
            // onChange={handleChange}
            type="text"
            name="sName"
            id="sName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Spouse Name"
            required
            // value={signupInfo.email}
          />
          {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
        </div>

        {/* Spouse Gender */}
        <div>
          <label
            htmlFor="sGender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spouse Gender
          </label>
          <select
            // onChange={handleChange}
            name="sGender"
            id="sGender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            // value={signupInfo.gender}
          >
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {/* {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )} */}
        </div>

        {/* Spouse DOB */}
        <div>
          <label
            htmlFor="sDOB"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spouse DOB
          </label>
          <input
            // onChange={handleChange}
            type="date"
            name="sDOB"
            id="sDOB"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Spouse DOB"
            required
            // value={signupInfo.email}
          />
          {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
        </div>

        {/* <div className="border-b-2 border-black"></div> */}

        {/* ID */}
        <div>
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID
          </label>
          <input
            // onChange={handleChange}
            type="number"
            name="id"
            id="id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ID"
            required
            // value={signupInfo.email}
          />
          {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
        </div>

        {/* Tribe */}
        <div>
          <label
            htmlFor="tribe"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tribe
          </label>
          <input
            // onChange={handleChange}
            type="text"
            name="tribe"
            id="tribe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tribe"
            required
            // value={signupInfo.email}
          />
          {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="addres"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Addres
          </label>
          <input
            // onChange={handleChange}
            type="text"
            name="addres"
            id="addres"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Addres"
            required
            // value={signupInfo.email}
          />
          {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
        </div>

        {/* About Input */}
        <div className="col-span-2">
          <label
            htmlFor="aboutYou"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            About
          </label>
          <textarea
            // onChange={handleChange}
            name="aboutYou"
            id="aboutYou"
            rows="3"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tell us about yourself..."
            // value={signupInfo.aboutYou}
          />
        </div>
      </div>
    ),
  },
];

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        // height={300}
      >
        <section className="">
          <h2 className="text-center text-2xl font-semibold">Add Child</h2>
          <form action="" className="grid grid-cols-2 gap-6 mt-8">
            {/* Father Name Input  */}
            <div>
              <label
                htmlFor="fName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Father Name
              </label>
              <input
                // onChange={handleChange}
                type="text"
                name="fName"
                id="fName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Father Name"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Mother Name Input  */}
            <div>
              <label
                htmlFor="mName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mother Name
              </label>
              <input
                // onChange={handleChange}
                type="text"
                name="mName"
                id="mName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mother Name"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Father DOB */}
            <div>
              <label
                htmlFor="fDOB"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Father DOB
              </label>
              <input
                // onChange={handleChange}
                type="date"
                name="fDOB"
                id="fDOB"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Father DOB"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Mother DOB */}
            <div>
              <label
                htmlFor="mDOB"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mother DOB
              </label>
              <input
                // onChange={handleChange}
                type="date"
                name="mDOB"
                id="mDOB"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mother DOB"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Child Name */}
            <div>
              <label
                htmlFor="childName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Child Name
              </label>
              <input
                // onChange={handleChange}
                type="text"
                name="childName"
                id="childName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Children Name"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Child DOB */}
            <div>
              <label
                htmlFor="childDOB"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Child DOB
              </label>
              <input
                // onChange={handleChange}
                type="date"
                name="childDOB"
                id="childDOB"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Children DOB"
                required
                // value={signupInfo.email}
              />
              {/* {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )} */}
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                // onChange={handleChange}
                name="gender"
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                // value={signupInfo.gender}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              {/* {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )} */}
            </div>
          </form>

          <form action="" className="mt-10">
            <Collapse
              items={items}
              defaultActiveKey={["1"]}
              onChange={onChange}
            />
          </form>
        </section>
      </Modal>
    </>
  );
}

export default Login;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import API from "../../app/axios";
// import { toast } from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import bg from "../_assets/Rectangle 405.png";
// import Image from "next/image";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/login", loginInfo);
//       toast.success("Logged in successfully!");
//       typeof window !== undefined && localStorage.setItem("userToken", res.data.message); // Assuming you receive a token
//       setLoginInfo({ email: "", password: "" });
//       router.push("/family-tree");
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Incorrect email or password. Please try again.");
//       } else {
//         toast.error(
//           error.response?.data?.message || "An error occurred. Please try again."
//         );
//       }
//     }
//   };

//   return (
//     <div className="relative w-full h-screen">
//       <Image src={bg} alt="background" layout="fill" objectFit="cover" className="z-0" />
//       {/* Login form */}
//       <section className="absolute inset-0 flex items-center justify-start ml:16 md:ml-16 lg:ml-32 z-10">
//         <div className="w-full bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
//             <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Sign In
//             </h1>
//             <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   onChange={handleChange}
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@company.com"
//                   required
//                   value={loginInfo.email}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     onChange={handleChange}
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                     value={loginInfo.password}
//                   />
//                   <div
//                     onClick={togglePasswordVisibility}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="text-gray-500" />
//                     ) : (
//                       <FaEye className="text-gray-500" />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Sign In
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Don't have an account?{" "} <br />
//                 <button
//                   className="font-medium text-blue-600 hover:underline dark:text-primary-500"
//                   onClick={() => router.push("/signup")}
//                 >
//                  Sign Up here
//                 </button>
//               </p>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login;
