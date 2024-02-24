import express from "express";

import {
  registerUser,
  loginUser,
  requestRefreshToken,
  logoutUser,
  loginGG,
  updateProfile,
} from "../controllers/auth.controller";
import { verifyToken, verifyUpdate } from "../middlewares/verifyToken";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);
router.post("/google", loginGG);

// [PUT] UPDATE FROFILE
router.put("/update/:id", verifyUpdate, updateProfile);

// LOGOUT
router.post("/logout", verifyToken, logoutUser);

// REFRESH TOKEN
router.post("/refresh", requestRefreshToken);

export default router;
