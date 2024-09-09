"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../_assets/Rectangle 405.png";
import Image from "next/image";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, loginInfo);
      toast.success("Logged in successfully!");
      localStorage.setItem("userToken", res.data.message); // Assuming you receive a token
      setLoginInfo({ email: "", password: "" });
      router.push("/family-tree");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Incorrect email or password. Please try again.");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Image src={bg} alt="background" layout="fill" objectFit="cover" className="z-0" />
      {/* Login form */}
      <section className="absolute inset-0 flex items-center  justify-start ml:16 md:ml-16 lg:ml-32 z-10">
        <div className="w-[400px] ml-4 bg-white rounded-lg shadow bg-opacity-70 backdrop-blur-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={loginInfo.email}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={loginInfo.password}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>

              <div className="flex items-center justify-center">
                <div className="border-b-2 border-gray-500 w-[40%]"/>
                <p className="p-2">or</p>
                <div className="border-b-2 border-gray-500 w-[40%]"/>
              </div>

              <p className="text-sm cursor-pointer" onClick={() => router.push("/ForgetPassword")}>Forget Password?</p>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "} <br />
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  onClick={() => router.push("/signup")}
                >
                 Sign Up here
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
