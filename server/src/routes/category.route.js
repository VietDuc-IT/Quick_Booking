import express from "express";
import { newCategory } from "../controllers/category.controller";

const route = express.Router();

route.post("/create", newCategory);

export default route;
