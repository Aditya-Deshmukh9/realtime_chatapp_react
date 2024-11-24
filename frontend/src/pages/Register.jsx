import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../api/api";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    gender: "",
    password: "",
    conformPassword: "",
  });
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: () => registerUser(formData),
    onSuccess: (res) => {
      toast.success(res?.data?.msg);
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (
      formData.fullName === "" ||
      formData.username === "" ||
      formData.gender === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      toast("All fields are required!");
    }

    if (formData.password !== formData.conformPassword) {
      toast("Passwords do not match!");
    }
    registerMutation.mutate(formData);
  };

  return (
    <div className="home-color flex min-h-screen w-full items-center justify-center">
      <div className="flex items-center justify-center rounded-md border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
        <div className="w-full max-w-sm rounded-lg p-8 px-14 shadow-lg sm:max-w-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">Chat App</h2>

          <h3 className="mb-4 text-start text-2xl font-semibold">
            Register for free
          </h3>
          {registerMutation.isError && (
            <p className="">{registerMutation.error}</p>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-2 gap-y-2"
          >
            <div className="col-span-2">
              <label className="block text-gray-50" htmlFor="fullName">
                Full Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="mb-2 w-full rounded-lg border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-50" htmlFor="username">
                Username<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="mb-2 w-full rounded-lg border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-50" htmlFor="gender">
                Gender<span className="text-red">*</span>
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mb-2 w-full rounded-lg border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-gray-50" htmlFor="password">
                Password<span className="text-red">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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

            <div className="relative">
              <label className="block text-gray-50" htmlFor="conformPassword">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="conformPassword"
                placeholder="Confirm Password"
                value={formData.conformPassword}
                onChange={handleChange}
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
            {registerMutation.isError ? (
              <p className="text-red-500">
                {/* {registerMutation?.error?.response?.data?.msg} */}
              </p>
            ) : null}
            <button
              type="submit"
              className="col-span-2 mt-4 w-full rounded-lg bg-[#003465] py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
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
            Already have an account?{" "}
            <Link to={"/auth/login"} className="text-blue-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
