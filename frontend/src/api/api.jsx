import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// http://localhost:8000/api/auth/user/login
export const loginUser = async ({ username, password }) => {
  return api.post(
    "/api/auth/user/login",
    { username, password },
    { headers: { "Content-Type": "application/json" }, withCredentials: true },
  );
};

// http://localhost:8000/api/auth/user/register
export const registerUser = async ({
  fullName,
  username,
  password,
  gender,
  conformPassword,
}) => {
  console.log(fullName, username, password, gender, conformPassword);

  return api.post(
    "/api/auth/user/register",
    {
      fullName,
      username,
      password,
      gender,
      conformPassword,
    },
    { username, password },
    { headers: { "Content-Type": "application/json" }, withCredentials: true },
  );
};

// http://localhost:8000/api/auth/user
export const getOtherUsers = async () => {
  return await api.get("/api/auth/user", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

// http://localhost:8000/api/auth/user/logout
export const userLogout = async () => {
  return await api.get("/api/auth/user/logout", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const sendMessage = async ({ receverId, message }) => {
  console.log("Sending message to:", receverId, "Message:", message);
  const res = await api.post(
    `/api/auth/message/send/${receverId}`,
    { message },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return res;
};

export const getPreviousMessage = async (receverId) => {
  return await api.get(`/api/auth/message/${receverId}`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
