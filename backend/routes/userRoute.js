import express from "express";
import {
  getOtherUser,
  login,
  logout,
  register,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUser);

export default router;
