import express from "express";

import { getAllUser, deleteUser } from "../controllers/user.controller";
import { verifyAdmin, verifyDelete } from "../middlewares/verifyToken";

const router = express.Router();

// [GET] ALL USER
router.get("/", verifyAdmin, getAllUser);

// [DELETE] USER
router.delete("/delete/:id", verifyDelete, deleteUser);

export default router;
