import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getPreviousMessage, sendMessage } from "../api/api.jsx";
import TextMsg from "./textMassage/TextMsg.jsx";

function MessageContainer() {
  const { selectedUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const massageSend = useMutation({
    mutationFn: ({ receverId, message }) => sendMessage({ receverId, message }),
    onSuccess: (res) => {
      if (res?.success) {
        setMessage("");
        alert(res.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const previousMessage = useMutation({
    mutationFn: (userId) => getPreviousMessage(userId),
  });

  useEffect(() => {
    if (selectedUser) {
      previousMessage.mutate(selectedUser._id);
    }
  }, [selectedUser, massageSend.data]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    massageSend.mutate({ receverId: selectedUser._id, message });

    console.log("Message sent");
  };

  if (!selectedUser) {
    return <h1>Please select a user to chat</h1>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-between border-l-2">
      {/* Header */}
      <div className="flex h-14 items-start gap-x-2 bg-blue-700 p-2 px-2">
        <img
          src={selectedUser?.profilePhoto}
          alt="User avatar for Aditya Deshmukh"
          className="h-10 w-10"
        />
        <h2 className="text-white">{selectedUser?.fullName}</h2>
      </div>

      {/* Messages */}
      <div className="my-2 flex flex-grow flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {previousMessage.isIdle ? (
          <TextMsg text="Loading messages..." />
        ) : previousMessage?.data?.data &&
          previousMessage?.data?.data.length > 0 ? (
          previousMessage?.data?.data.map((msg) => (
            <TextMsg key={msg._id} text={msg.message} senderId={msg.senderId} />
          ))
        ) : (
          <TextMsg text={"No massage yet"} />
        )}
      </div>

      {/* Message Input */}
      <div className="relative p-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md px-3 py-2 text-gray-700"
        />
        <IoSend
          className="absolute right-8 top-4 cursor-pointer"
          size={22}
          color="black"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default MessageContainer;
