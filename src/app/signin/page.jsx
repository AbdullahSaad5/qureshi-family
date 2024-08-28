"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../app/axios";
import { toast } from "react-hot-toast";

function Login() {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", loginInfo);
      setLoginInfo({ email: "", password: "" });
      console.log("Login successful:", res.data);
      if (res.ok) {
        toast.success("Logged in successfully!");
        // Redirect or perform other actions
      } else {
        toast.error(`Login failed: ${res.data.message}`);
      }
      // Assuming you get a token or user data on successful login
      // You might want to save the token or user data in localStorage or state
      // navigate('/dashboard'); // Redirect to a dashboard or homepage after successful login
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      // Show an error message to the user
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center bg-gray-800 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={loginInfo.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={loginInfo.password}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <button
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up here
                  </button>
                </p>
              </form>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
