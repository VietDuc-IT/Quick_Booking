import express from "express";

import { getAllUser, deleteUser } from "../controllers/user.controller";
import {
  verifyToken,
  verifyTokenAndAdminAuth,
} from "../middlewares/verifyToken";

const router = express.Router();

// [GET] ALL USER
router.get("/", verifyToken, getAllUser);

// [DELETE] USER
router.delete("/delete/:id", verifyTokenAndAdminAuth, deleteUser);

export default router;
