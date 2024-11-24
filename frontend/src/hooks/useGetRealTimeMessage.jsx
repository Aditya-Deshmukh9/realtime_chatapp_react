import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);

      queryClient.setQueryData(["messages"], (oldMessages = []) => [
        ...oldMessages,
        newMessage,
      ]);
    });

    return () => socket?.off("newMessage");
  }, [socket, queryClient]);
};

export default useGetRealTimeMessage;
