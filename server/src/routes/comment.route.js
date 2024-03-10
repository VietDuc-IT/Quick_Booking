import express from "express";
import { create, view } from "../controllers/comment.controller";
import { verifyToken } from "../middlewares/verifyToken";

const route = express.Router();

// [POST] /api/comment
route.post("/", verifyToken, create);

// [GET] /api/comment
route.get("/:postId", view);

export default route;
