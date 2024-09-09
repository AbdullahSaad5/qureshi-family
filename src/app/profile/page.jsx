import React from "react";
import { UserRoundPen, UserRound , Mail, Phone, PenLine } from "lucide-react";
import Link from "next/link";

function Profile() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-gray-100 px-6">
      <div className=" w-[80%] md:w-1/2 flex flex-col items-center mt-0 p-8 md:p-0">
        <UserRoundPen size={100} className="text-[#82D026] cursor-pointer" />
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {" "}
            <span className="text-[#82D026]">Shajra </span> e Nasab
          </h1>
        </div>
        <p className="mt-4 text-sm sm:text-md text-center w-[80%] text-gray-700">
          Discover and explore your family history. Shajra e Nasab allows you to
          view and trace your family lineage easily.
        </p>
      </div>

      {/* Right Side - User Info Card */}
      <div className="w-[80%]  sm:w-[50%] md:w-[40%]  mr- py-8 md:py-0">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-row gap-x-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              Profile Information
            </h2>
            <Link href="/editProfile">
                <PenLine className="text-[#82D026] cursor-pointer" />
            </Link>
          </div>
          {/* Name Field */}
          <div className="flex items-center mb-4">
            <UserRound className="text-[#82D026]" size={24}/>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Name</h3>
              <p className="text-gray-600">John Doe</p>
            </div>
          </div>
          {/* Email Field */}
          <div className="flex items-center mb-4">
            <Mail className="text-[#82D026]" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">testuser@email.com</p>
            </div>
          </div>
          {/* Contact Field */}
          <div className="flex items-center mb-4">
            <Phone className="text-[#82D026]" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
              <p className="text-gray-600">03*******47</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;








































// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import API from "../../../app/axios";
// import { toast } from "react-hot-toast";
// import { useParams } from "next/navigation";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import bg from "../../_assets/Rectangle 405.png";
// import Image from "next/image";
// import { LockKeyhole } from "lucide-react";
// import { useForm } from "react-hook-form";
// function NewPassword() {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;
//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//     mode: "onChange",
//   });
//   const watchPassword = watch("password");
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const onSubmit = async (data) => {
//     console.log(data.password);
//     try {
//       console.log("Inside on submit function");
//       const response = await API.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/createUser/reset_password/${id}`,
//         {
//           newPassword: data.password,
//         }
//       );
//       toast.success("Password reset Sucessfully");
//       router.push("/signin");
//     } catch (error) {
//       console.error("Error details:", error);
//       if (error.response) {
//         const message = error.response.data.message;
//         toast.error(message);
//       } else if (error.request) {
//         toast.error("No response received from the server.");
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     }
//   };
//   return (
//     <div className="relative w-full h-screen">
//       <Image
//         src={bg}
//         alt="background"
//         layout="fill"
//         objectFit="cover"
//         className="z-0"
//       />
//       {/* Login form */}
//       <section className="absolute inset-0 flex items-center justify-start ml:16 md:ml-16 lg:ml-32 z-10">
//         <div className="w-[400px] ml-4 bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <div className="flex justify-center items-center">
//               <LockKeyhole size={42} strokeWidth={2.25} />
//             </div>
//             <h2 className="text-center text-xl font-normal">
//               Create New Password
//             </h2>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="space-y-4 md:space-y-6"
//             >
//               {/* Password Input */}
//               <div className="col-span-1">
//                 <label
//                   htmlFor="password"
//                   className="block text-xs font-medium text-gray-900 dark:text-white"
//                 >
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     {...register("password", {
//                       required: "Password is required",
//                     })}
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
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//               {/* Confirm Password Input */}
//               <div className="col-span-1">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-xs font-medium text-gray-900 dark:text-white"
//                 >
//                   Confirm New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     {...register("confirmPassword", {
//                       required: "Confirm your password",
//                       validate: (value) =>
//                         value === watchPassword || "Passwords must match",
//                     })}
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
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Set Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// export default NewPassword;

