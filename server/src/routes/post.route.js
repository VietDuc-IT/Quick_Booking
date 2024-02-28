import express from "express";
import {
  postNew,
  getPosts,
  deletePost,
  updatePost,
  statusPost,
} from "../controllers/post.controller";
import {
  verifyAdmin,
  verifyAdminAndUser,
  verifyDelete,
  verifyUpdate,
} from "../middlewares/verifyToken";

const router = express.Router();

// [POST] CREATE POST NEW
router.post("/create", verifyAdminAndUser, postNew);

// [GET] GET ALL POST
router.get("/get", getPosts);

// [PUT] UPDATE POST
router.put("/update/:postId/:id", verifyUpdate, updatePost);

// [PUT] STATUS POST
router.put("/status/:postId", verifyAdmin, statusPost);

// [DELETE] POST :ID
router.delete("/delete/:postId/:id", verifyDelete, deletePost);

export default router;
