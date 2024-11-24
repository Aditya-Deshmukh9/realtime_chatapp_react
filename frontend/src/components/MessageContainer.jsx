import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPreviousMessage } from "../api/api.jsx";
import TextMsg from "./textMassage/TextMsg.jsx";
import MessageSend from "./messageSend.jsx";

function MessageContainer() {
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const [messages, setMessages] = useState([]);

  const onlineUser = onlineUsers?.includes(selectedUser?._id);
  // Fetch previous messages
  const previousMessage = useMutation({
    mutationFn: (userId) => getPreviousMessage(userId),
    onSuccess: (data) => {
      setMessages(data?.data || []); // Initialize messages with fetched data
    },
    onError: (error) => {
      console.error("Error fetching messages:", error.message);
    },
  });

  // Fetch previous messages when the selected user changes
  useEffect(() => {
    if (selectedUser) {
      previousMessage.mutate(selectedUser._id);
    }
  }, [selectedUser]);

  // Listen for real-time incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        // Append the incoming message if it's from the current chat
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket?.on("message", handleNewMessage);

    return () => {
      socket?.off("message", handleNewMessage);
    };
  }, [socket, selectedUser]);

  if (!selectedUser) {
    return <h1>Please select a user to chat</h1>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-between border-l-2">
      {/* Header */}
      <div className="flex h-14 items-center gap-x-2 bg-blue-700 p-2 px-2">
        <img
          src={selectedUser?.profilePhoto}
          alt="User avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="">
          <h2 className="text-white">{selectedUser?.fullName}</h2>
          <span>{onlineUser ? "online" : "offline"}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="my-2 flex flex-grow flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {previousMessage.isLoading ? (
          <TextMsg text="Loading messages..." />
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <TextMsg key={msg._id} text={msg.message} senderId={msg.senderId} />
          ))
        ) : (
          <TextMsg text="No messages yet" />
        )}
      </div>

      {/* Message Input */}
      <MessageSend setMessages={setMessages} />
    </div>
  );
}

export default MessageContainer;
