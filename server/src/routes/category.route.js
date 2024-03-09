import express from "express";
import {
  create,
  view,
  edit,
  deleteCategory,
} from "../controllers/category.controller";
import { verifyAdmin } from "../middlewares/verifyToken";

const route = express.Router();

// [POST] /api/category
route.post("/", verifyAdmin, create);

// [GET] /api/category
route.get("/", view);

// [PUT] /api/category/:cateId
route.put("/:cateId", verifyAdmin, edit);

// [DELETE] /api/category/:cateId
route.delete("/:cateId", verifyAdmin, deleteCategory);

export default route;
