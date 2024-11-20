import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function SidebarUser({ _id, profilePhoto, fullName, username }) {
  const dispatch = useDispatch();

  function handleUserClick() {
    console.log(username);
    const data = { _id, profilePhoto, fullName, username };
    dispatch(setSelectedUser(data));
  }

  return (
    <div
      onClick={handleUserClick}
      key={_id}
      className={`${"border-blue-400 hover:border hover:bg-blue-700"} mb-1 flex cursor-pointer justify-start gap-4 rounded-2xl p-2 px-3`}
    >
      <img
        src={profilePhoto}
        alt={`${fullName}_profile_pic`}
        className="h-10 w-10"
        loading="lazy"
      />
      <h3 className="text-white">{fullName}</h3>
    </div>
  );
}

export default SidebarUser;
