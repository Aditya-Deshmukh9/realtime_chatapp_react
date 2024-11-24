import React, { useState } from "react";
import { sendMessage } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";

function MessageSend({ setMessages }) {
  const [message, setMessage] = useState("");
  const { selectedUser, authUser } = useSelector((state) => state.user);

  // Send new message
  const messageSend = useMutation({
    mutationFn: ({ receverId, message }) => sendMessage({ receverId, message }),
    onSuccess: (res) => {
      if (res?.data?.success) {
        // Append the new message locally
        setMessages((prev) => [
          ...prev,
          { _id: Date.now(), message, senderId: authUser._id }, // Add temporary message
        ]);
        setMessage(""); // Clear input field
      }
    },
    onError: (error) => {
      console.error("Error sending message:", error.message);
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    messageSend.mutate({ receverId: selectedUser._id, message });

    // Emit the message through socket
    if (socket) {
      socket.emit("sendMessage", { receverId: selectedUser._id, message });
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="relative p-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-md px-3 py-2 text-gray-700"
      />
      <IoSend
        className="absolute right-4 top-4 cursor-pointer"
        size={22}
        color="black"
        onClick={handleSendMessage}
      />
    </form>
  );
}

export default MessageSend;
