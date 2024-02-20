import express from "express";

import { getAllUser, deleteUser } from "../controllers/user.controller";
import { verifyAdmin } from "../middlewares/verifyToken";

const router = express.Router();

// [GET] ALL USER
router.get("/", verifyAdmin, getAllUser);

// [DELETE] USER
router.delete("/delete/:id", deleteUser);

export default router;
