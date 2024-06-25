import express from "express";
import {
  confirm,
  getrenter,
  remove,
  renterSign,
  getRenters,
} from "../controllers/renter.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

//[PUT] /api/renter/sign/:id
router.put("/sign/:id", verifyToken, renterSign);

//[GET] /api/renter/sign
router.get("/sign", verifyToken, getrenter);

//[PUT] /api/renter/confirm/:id
router.put("/confirm/:id", verifyToken, confirm);

//[PUT] /api/renter/remove/:id
router.put("/remove/:id", verifyToken, remove);

//[GET] /api/renter/getRenters
router.get("/getRenters", verifyToken, getRenters);

export default router;
