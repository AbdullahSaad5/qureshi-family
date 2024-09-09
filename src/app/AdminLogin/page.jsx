"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../components/Api/axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import MyContext from "../context/MyContext";
function Login() {
  const { state, setState } = useContext(MyContext);
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
      const res = await API.post("/login", loginInfo);
      if (res.data.status) {
        console.log("Login successful:", res.data);
        toast.success("Logged in successfully!");
        const userData = res.data?.data;
        console.log(`user Data ${JSON.stringify(userData)}`);
        typeof window !== undefined &&
          localStorage.setItem("userToken", JSON.stringify(userData)); // Assuming you receive a token
        setLoginInfo({ email: "", password: "" });
        // Redirect or perform other actions
        router.push("/");
      } else {
        toast.error(res.data.message);
      }

      // Assuming you get a token or user data on successful login
      // You might want to save the token or user data in typeof window !== undefined && localStorage or state
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Specific handling for incorrect password or unauthorized access
          toast.error("Incorrect email or password. Please try again.");
        } else if (error.response.data && error.response.data.message) {
          // Other specific error messages from the server
          toast.error(`Login failed: ${error.response.data.message}`);
        } else {
          // General error handling for other status codes
          toast.error("An error occurred. Please try again.");
        }
      } else {
        // Network error or other unforeseen errors
        toast.error(
          "A network error occurred. Please check your connection and try again."
        );
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="bg-gray-800 mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="dark:bg-gray-800 dark:border-gray-700 w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-gray-900 text-center text-xl font-bold leading-tight tracking-tight dark:text-black md:text-2xl">
                Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@company.com"
                    required
                    value={loginInfo.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
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
                      className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                      value={loginInfo.password}
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
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
                  className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4"
                >
                  Sign In
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up here
                  </button>
                </p> */}
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
