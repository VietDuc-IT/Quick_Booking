import express from "express";
import { postNew } from "../controllers/post.controller";
import { verifyAdminAndUser } from "../middlewares/verifyToken";

const router = express.Router();

// REGISTER
router.post("/:id", verifyAdminAndUser, postNew);

export default router;
