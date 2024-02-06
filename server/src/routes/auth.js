import express from "express";
import {
  registerUser,
  loginUser,
  requestRefreshToken,
  logoutUser,
} from "../controllers/authController";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", verifyToken, logoutUser);

// REFRESH
router.post("/refresh", requestRefreshToken);

export default router;
