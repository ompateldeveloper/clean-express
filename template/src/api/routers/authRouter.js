import { Router } from "express";
import { signupValidator } from "../validators/signup-validator.js";
import { authController } from "../controllers/authController.js";
import { signinValidator } from "../validators/signin-validator.js";

export const authRouter = Router();
authRouter.post("/signin", signinValidator, authController.signin);
authRouter.post("/signup", signupValidator, authController.signup);
// authRouter.get("/me",authMiddleware,authController.me);
