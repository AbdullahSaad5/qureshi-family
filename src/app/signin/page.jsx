"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { verifyUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Inside on submit function");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        data
      );
      console.log(response.data.data);
      typeof window !== undefined &&
        localStorage.setItem("userId", response.data.data._id);
      typeof window !== undefined &&
        localStorage.setItem("email", response.data.data.email);
      typeof window !== undefined &&
        localStorage.setItem("contact", response.data.data.contact);
      typeof window !== undefined &&
        localStorage.setItem("fullName", response.data.data.fullName);
      toast.success(response.data.message);
      verifyUser();
      router.push("/Explore");
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Image
        src={bg}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Login form */}
      <section className="absolute inset-0 flex items-center justify-start ml:16 md:ml-16 lg:ml-32 z-10">
        <div className="w-full bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            {/* Use handleSubmit from react-hook-form to submit the form */}
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@gmail.com"
                />
                {/* Error message for email */}
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500" />
                    ) : (
                      <FaEyeSlash className="text-gray-500" />
                    )}
                  </div>
                </div>
                {/* Error message for password */}
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <p
                onClick={() => router.push("/ForgetPassword")}
                className="ml-0.5 mt-0.5 cursor-pointer"
              >
                Forget Password ?
              </p>
              <button
                type="submit"
                className="w-full mt-5 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import API from "../../app/axios";
// import { toast } from "react-hot-toast";
// import Image from "next/image";
// import logo from "../_assets/logo.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useForm } from "react-hook-form";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//   } = useForm();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (data) => {
//     try {
//       const res = await API.post("/login", data);
//       console.log("Login successful:", res.data);
//       toast.success("Logged in successfully!");
//       typeof window !== undefined && localStorage.setItem("userToken", res.data.message);
//       // Redirect or perform other actions
//       router.push("/family-tree");
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Specific handling for incorrect password or unauthorized access
//           toast.error("Incorrect email or password. Please try again.");
//           setError("email", {
//             type: "manual",
//             message: "Incorrect email or password.",
//           });
//         } else if (error.response.data && error.response.data.message) {
//           // Other specific error messages from the server
//           toast.error(`Login failed: ${error.response.data.message}`);
//         } else {
//           // General error handling for other status codes
//           toast.error("An error occurred. Please try again.");
//         }
//       } else {
//         // Network error or other unforeseen errors
//         toast.error(
//           "A network error occurred. Please check your connection and try again."
//         );
//       }
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div>
//       <section className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center bg-gray-800 px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div
//               onClick={() => router.push("/")}
//               className="flex justify-center mt-5 gap-2 cursor-pointer"
//             >
//               <Image src={logo} alt="logo" width={70} height={50} />
//               <div className="flex flex-col gap-1">
//                 <h1 className="text-[#82D026] text-2xl md:text-xl lg:text-2xl font-semibold">
//                   Qureshi
//                 </h1>
//                 <h3 className="text-[#000000] text-xl md:text-lg lg:text-xl text-center font-semibold">
//                   Family
//                 </h3>
//               </div>
//             </div>
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Login
//               </h1>
//               <form
//                 className="space-y-4 md:space-y-6"
//                 onSubmit={handleSubmit(handleLogin)}
//               >
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                         message: "Invalid email address",
//                       },
//                     })}
//                     type="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-xs">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       {...register("password", {
//                         required: "Password is required",
//                       })}
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       placeholder="••••••••"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                     <div
//                       onClick={togglePasswordVisibility}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                     >
//                       {showPassword ? (
//                         <FaEyeSlash className="text-gray-500" />
//                       ) : (
//                         <FaEye className="text-gray-500" />
//                       )}
//                     </div>
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-xs">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full text-white bg-[#82D026]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Sign In
//                 </button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Dont have an account?{" "}
//                   <button
//                     className="font-medium text-[#82D026] hover:underline dark:text-primary-500"
//                     onClick={() => router.push("/signup")}
//                   >
//                     Sign Up here
//                   </button>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login;
