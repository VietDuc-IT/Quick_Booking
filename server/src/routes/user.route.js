import express from "express";

import {
  register,
  login,
  loginGG,
  forgotPassword,
  refreshPassword,
  refreshToken,
  logout,
  updateProfile,
  getUser,
  deleteUser,
  role,
  renter,
} from "../controllers/user.controller";
import {
  verifyToken,
  verifyUpdate,
  verifyDelete,
  verifyAdmin,
  verifyAdminAndUser,
} from "../middlewares/verifyToken";

const router = express.Router();

// [POST] /api/user/register
router.post("/register", register);

// [POST] /api/user/login
router.post("/login", login);

// [POST] /api/user/google/login
router.post("/google/login", loginGG);

// [POST] /api/user/forgot-password
router.post("/forgot-password", forgotPassword);

// [PUT] /api/user/refresh-password/:id
router.put("/refresh-password/:id", refreshPassword);

// [POST] /api/user/refreshToken
router.post("/refreshToken", refreshToken);

// [POST] /api/user/logout
router.post("/logout", verifyToken, logout);

// [PUT] /api/user/:id
router.put("/:id", verifyUpdate, updateProfile);

// [PUT] /api/user/role/:id
router.put("/role/:id", verifyAdmin, role);

// [GET] /api/user
router.get("/", verifyAdminAndUser, getUser);

// [GET] /api/user/renter
router.get("/renter", renter);

// [DELETE] /api/user/:id
router.delete("/:id", verifyDelete, deleteUser);

export default router;
