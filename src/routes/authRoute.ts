import express from "express"
import { signin, signup } from "../controllers/auth.controller";
import { checkDuplicateSignUp } from "../middlewares/verifySignUp";

const router = express.Router()
router.post('/signup',[checkDuplicateSignUp],signup);
router.post('/signin',signin);
export default router