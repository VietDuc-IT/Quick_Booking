import express from "express";
import {
  create,
  deleteComment,
  editComment,
  getAll,
  likeComment,
  view,
} from "../controllers/comment.controller";
import { verifyToken } from "../middlewares/verifyToken";

const route = express.Router();

// [POST] /api/comment
route.post("/", verifyToken, create);

// [GET] /api/comment/:postId
route.get("/:postId", view);

// [PUT] /api/comment/like/:commentId
route.put("/like/:commentId", verifyToken, likeComment);

// [PUT] /api/comment/edit/:commnetId
route.put("/edit/:commentId", verifyToken, editComment);

// [DELETE] /api/comment/:commentId
route.delete("/:commentId", verifyToken, deleteComment);

// [GET] /api/comment
route.get("/", verifyToken, getAll);

export default route;
