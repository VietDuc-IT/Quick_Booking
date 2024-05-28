import express from "express";
import {
  createPost,
  getPosts,
  getPostSystem,
  deletePost,
  updatePost,
  statusPost,
  viewPost,
  getpostfillter,
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

// [GET] /api/post/:postId
router.get("/:postId", viewPost);

// [GET] /api/post
router.get("/", getPosts);

// [GET] /api/post/fillter
router.get("/v1/fillter", getpostfillter);

// [GET] /api/post/private
router.get("/v1/system", verifyAdminAndUser, getPostSystem);

// [PUT] /api/post/:postId/:id
router.put("/:postId/:id", verifyUpdate, updatePost);

// [PUT] /api/post/status/:postId
router.put("/v1/status/:postId", verifyAdmin, statusPost);

// [DELETE] /api/post/:postId
router.delete("/:postId", verifyDelete, deletePost);

export default router;
