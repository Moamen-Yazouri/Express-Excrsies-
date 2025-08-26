import { RequestHandler, Router } from "express";
import { uploadSingle } from "../../config/multer.config";
import authController from "./auth.controller";

const router = Router();

router.post('/login', authController.login as RequestHandler) ;

router.post(
  '/sign-up',
  uploadSingle('avatar'),
  authController.signUp,
);


export const authRouter = router;