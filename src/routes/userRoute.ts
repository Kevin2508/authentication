import express from "express"
import { signin, signup } from "../controllers/auth.controller";
import { adminBoard, allAccess, userBoard } from "../controllers/user.controller";
import { isAdmin, verifyToken } from "../middlewares";

const router = express.Router()
router.get("/all",allAccess);
router.get("/user", [verifyToken],userBoard);
router.get("/admin",[verifyToken, isAdmin], adminBoard);
export default router;