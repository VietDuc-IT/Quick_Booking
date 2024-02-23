import express from "express";
import { postNew, getAllPost } from "../controllers/post.controller";
import { verifyAdminAndUser } from "../middlewares/verifyToken";

const router = express.Router();

// POST
router.post("/", verifyAdminAndUser, postNew);

// GET
router.get("/get", verifyAdminAndUser, getAllPost);

export default router;
