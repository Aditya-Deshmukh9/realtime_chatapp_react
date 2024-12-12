import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SidebarUser from "./SidebarUser";
import { getOtherUsers } from "../api/api";
import Logout from "./Logout";
import { IoSearchCircleSharp } from "react-icons/io5";

function Sidebar() {
  const [message, setMessage] = useState("");

  const { data } = useQuery({
    queryKey: ["otherUser]"],
    queryFn: () => getOtherUsers(),
  });

  // Filter users based on the search query
  const filteredUsers = data?.data?.otherUsers.filter((user) =>
    user.fullName.toLowerCase().includes(message.toLowerCase()),
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div className="h-full w-2/5">
      {/* Search */}
      <div className="m-2 flex h-full flex-col">
        <div className="relative p-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleSearch}
            className="w-full rounded-md px-3 py-2 pl-9 text-gray-700"
          />
          <IoSearchCircleSharp
            className="absolute left-2 top-3 rotate-90 cursor-pointer"
            size={30}
            color="black"
          />
        </div>
        <div className="my-4 h-full w-full overflow-y-auto">
          {/* User list */}
          {!message
            ? data?.data &&
              data?.data?.otherUsers?.map((data) => (
                <SidebarUser {...data} key={data._id} />
              ))
            : filteredUsers.length > 0 &&
              filteredUsers.map((user) => (
                <SidebarUser {...user} key={user._id} />
              ))}
        </div>
        <Logout />
      </div>
    </div>
  );
}

export default Sidebar;
