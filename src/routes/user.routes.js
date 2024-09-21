import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/index.js";

const router = Router();

router.post("/create", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.profile);

export default router;
