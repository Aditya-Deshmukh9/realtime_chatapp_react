import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    if (authUser?._id) {
      const newSocket = io("http://localhost:8000", {
        query: { userId: authUser._id },
      });

      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        if (newSocket) {
          newSocket.disconnect(); // Use disconnect for Socket.IO cleanup
        }
        dispatch(setSocket(null));
      };
    }
  }, [authUser?._id, dispatch]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
};
export default App;
