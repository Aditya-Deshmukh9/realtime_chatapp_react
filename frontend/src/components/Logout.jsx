import { useMutation } from "@tanstack/react-query";
import React from "react";
import { userLogout } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setOtherUser, setSelectedUser } from "../redux/userSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: (res) => {
      toast.success("Logout Success");
      dispatch(setAuthUser(null));
      dispatch(setOtherUser(null));
      dispatch(setSelectedUser(null));
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error("Logout Failed");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute bottom-2 rounded-lg border border-red-500 bg-orange-600 px-4 py-1 text-sm text-white"
    >
      Logout
    </button>
  );
}

export default Logout;
