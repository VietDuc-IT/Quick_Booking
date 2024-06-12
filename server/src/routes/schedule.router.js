import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getAllSchedule, schedule } from "../controllers/schedule.controller";

const route = express.Router();

//[POST] /api/schedule
route.post("/", verifyToken, schedule);

//[GET] /api/schedule
route.get("/", verifyToken, getAllSchedule);

export default route;
