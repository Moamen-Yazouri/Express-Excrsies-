import { Router } from "express";
import { uploadSingle } from "../../config/multer.config";
import authController from "./auth.controller";

const router = Router();

router.post(
  '/sign-up',
  uploadSingle('avatar'),
  authController.signUp
);

export const authRouter = router;