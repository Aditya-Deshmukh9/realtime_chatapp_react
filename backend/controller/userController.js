import bcrypt from "bcryptjs";
import { User } from "../models/userModal.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, conformPassword, gender } = req.body;
    if (!fullName || !username || !password || !conformPassword || !gender) {
      return res.status(400).json({ message: "All field are required" });
    }

    if (password !== conformPassword) {
      return res.status(400).json({ message: "Password is not Match" });
    }

    const user = await User.findOne({ username });
    if (user === username) {
      return res
        .status(400)
        .json({ message: "Password is Already exits please try different" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const FemaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePhoto: gender === "male" ? maleProfilePhoto : FemaleProfilePhoto,
    });

    return res.status(200).json({
      msg: "account is successfully created",
      succes: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ msg: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Incorrect username and password", succes: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ msg: "Incorrect username and password", succes: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // sameSite: "strict",
      })
      .json({
        msg: "Logged in successfully",
        success: true,
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    throw error;
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        msg: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json({ otherUsers });
  } catch (error) {
    console.log(error);
  }
};
