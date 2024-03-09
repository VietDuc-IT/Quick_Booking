import express from "express";
import {
  createPost,
  getPosts,
  getPostSystem,
  deletePost,
  updatePost,
  statusPost,
} from "../controllers/post.controller";
import {
  verifyAdmin,
  verifyAdminAndUser,
  verifyDelete,
  verifyToken,
  verifyUpdate,
} from "../middlewares/verifyToken";

const router = express.Router();

// [POST] /api/post
router.post("/", verifyAdminAndUser, createPost);

// [GET] /api/post
router.get("/", getPosts);

// [GET] /api/post/private
router.get("/private", verifyToken, getPostSystem);

// [PUT] /api/post/:postId/:id
router.put("/:postId/:id", verifyUpdate, updatePost);

// [PUT] /api/post/status/:postId
router.put("/status/abc/:postId", verifyAdmin, statusPost);

// [DELETE] /api/post/:postId
router.delete("/:postId", verifyDelete, deletePost);

export default router;
