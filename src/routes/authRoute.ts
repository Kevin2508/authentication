import express from "express"
import { signin, signup } from "../controllers/auth.controller";
import { checkDuplicateSignUp } from "../middlewares/verifySignUp";
import { authCaptcha } from "../middlewares/captcha";
import { verifyCaptcha } from "../middlewares/verifyCaptcha";

const router = express.Router()
router.post('/signup',[checkDuplicateSignUp,verifyCaptcha],signup);
router.post('/signin',signin);
router.get('/captcha',authCaptcha);
export default router