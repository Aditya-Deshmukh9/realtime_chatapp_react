import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config({});

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth/user", userRoute);
app.use("/api/auth/message", messageRoute);

const port = 8000;

server.listen(port, () => {
  connectDB();
  console.log(`app is listening port ${port}`);
});
