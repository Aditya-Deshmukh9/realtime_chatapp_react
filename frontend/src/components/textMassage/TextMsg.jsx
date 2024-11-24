import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function TextMsg({ text, senderId }) {
  const scroll = useRef();
  const { authUser } = useSelector((state) => state.user);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  return (
    <div
      ref={scroll}
      className={`bubble text-xs ${authUser._id === senderId ? `right` : `left`}`}
    >
      {text}
    </div>
  );
}

export default TextMsg;
