import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller";
import { verifyToken } from "../middlewares/verifyToken";

const route = express.Router();

route.post("/send", verifyToken, sendMessage);

route.get("/:id", verifyToken, getMessage);

export default route;
