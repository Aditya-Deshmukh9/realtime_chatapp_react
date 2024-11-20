import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth/user", userRoute);
app.use("/api/auth/message", messageRoute);

const port = 8000;

app.listen(port, () => {
  connectDB();
  console.log(`app is listening port ${port}`);
});
