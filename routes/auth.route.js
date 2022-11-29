import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { isAuthAdmin } from "../middlewares/isAuthAdmin.js";
import validationAuth from "../middlewares/validationAuth.js";
const router = Router();

router.post("/login", validationAuth.validationAuth, authController.login);

router.get("/info", authController.info);

router.get("/adminInfo", isAuthAdmin, authController.info);

router.post("/", authController.validateToken);

router.post("/admin", authController.validateTokenAdmin);

export default router;
