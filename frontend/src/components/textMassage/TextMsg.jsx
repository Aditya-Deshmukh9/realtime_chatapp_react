import React from "react";
import { useSelector } from "react-redux";

function TextMsg({ text, senderId }) {
  const { authUser } = useSelector((state) => state.user);
  // right
  return (
    <div
      className={`bubble text-xs ${authUser._id === senderId ? `right` : `left`}`}
    >
      {text}
    </div>
  );
}

export default TextMsg;
