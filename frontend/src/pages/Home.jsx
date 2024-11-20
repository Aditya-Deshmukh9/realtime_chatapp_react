import React from "react";
import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="home-color flex h-screen w-full items-center justify-center">
      <div className="flex h-4/5 w-4/5 items-center rounded-md border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
