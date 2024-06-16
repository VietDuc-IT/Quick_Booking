import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  getAllSchedule,
  schedule,
  deleteSchedule,
  statusSchedule,
  getSchedule,
} from "../controllers/schedule.controller";

const route = express.Router();

//[POST] /api/schedule
route.post("/", verifyToken, schedule);

//[GET] /api/schedule
route.get("/", verifyToken, getAllSchedule);

//[GET] /api/schedule/:userid
route.get("/:userid", verifyToken, getSchedule);

// [PUT] /api/schedule/v1/status/:scheduleId
route.put("/v1/status/:scheduleId", verifyToken, statusSchedule);

// [DELETE] /api/schedule/:scheduleId
route.delete("/:scheduleId", verifyToken, deleteSchedule);

export default route;
