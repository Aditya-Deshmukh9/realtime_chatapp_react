import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function SidebarUser({ _id, profilePhoto, fullName, username }) {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.user);
  console.log(onlineUsers);

  const onlineUser = onlineUsers?.includes(_id);
  console.log(onlineUser);

  function handleUserClick() {
    const data = { _id, profilePhoto, fullName, username };
    dispatch(setSelectedUser(data));
  }

  return (
    <div
      onClick={handleUserClick}
      key={_id}
      className="mb-1 flex cursor-pointer justify-start gap-4 rounded-2xl border-blue-400 p-2 px-3 hover:border hover:bg-blue-700"
    >
      <div
        className={`relative h-10 w-10 rounded-full ${onlineUser ? "border-2 border-blue-300" : ""}`}
      >
        {onlineUser ? (
          <span className="absolute left-0.5 h-2 w-2 rounded-full bg-blue-400"></span>
        ) : null}
        <img
          src={profilePhoto}
          alt={`${fullName}_profile_pic`}
          className="object-cover"
        />
      </div>
      <h3 className="text-white">{fullName}</h3>
    </div>
  );
}

export default SidebarUser;
