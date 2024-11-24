import React, { useEffect } from "react";
import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { authUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null) {
      navigate("/auth/login");
    }
  }, [authUser]);

  if (authUser === null) return null;

  return (
    <div className="home-color flex h-screen w-full items-center justify-center">
      <div className="flex h-4/5 items-center rounded-md border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter md:w-4/5">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
