import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: () => loginUser({ username, password }),
    onSuccess: (res) => {
      if (!res?.data?.status) {
        console.log(res.data);

        dispatch(setAuthUser(res.data));
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  console.log(loginMutation.data);

  return (
    <div className="home-color flex min-h-screen w-full items-center justify-center">
      <div className="flex items-center justify-center rounded-md border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
        <div className="w-full max-w-md rounded-lg p-8 px-14 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">Your logo</h2>

          <h3 className="mb-4 text-start text-2xl font-semibold">Login</h3>
          {loginMutation.isError ? (
            <p className="text-red-500">
              {loginMutation?.error?.response?.data?.msg}
            </p>
          ) : null}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-gray-50" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 w-full rounded-lg border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-gray-50" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-4 top-9 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash color="black" size={18} />
                ) : (
                  <FaEye color="black" size={18} />
                )}
              </div>
            </div>
            {/* forgort password */}
            <div className="pb-4 text-left">
              <Link to="#" className="hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#003465] py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Sign in
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-100">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex w-full justify-center space-x-4">
            <div className="flex w-1/3 items-center justify-center rounded-md bg-gray-100 p-2">
              <FcGoogle className="h-6 w-6" />
            </div>
            <button className="flex w-1/3 items-center justify-center rounded-md bg-gray-100 p-2">
              <FaGithub className="h-6 w-6" color="black" />
            </button>
            <button className="flex w-1/3 items-center justify-center rounded-md bg-gray-100 p-2">
              <FaFacebook className="h-6 w-6" color="blue" />
            </button>
          </div>

          <p className="mt-6 text-center text-gray-100">
            Don’t have an account yet?{" "}
            <NavLink
              to={"/auth/register"}
              className="text-blue-300 hover:underline"
            >
              Register for free
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
