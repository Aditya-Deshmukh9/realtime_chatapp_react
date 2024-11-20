import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGDB_URL)
    .then(() => console.log("DB connect Successfully"))
    .catch((err) => console.log("DB ERR :", err));
};
