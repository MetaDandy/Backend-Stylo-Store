import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/index.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.profile);
router.put("/update", verifyToken, userController.updateUser);
router.patch("/delete/:id", verifyToken, userController.deleteUser);
router.get("/view", verifyToken, userController.viewUser);
router.get("/view/:id", verifyToken, userController.viewOneUser);
router.post("/create", verifyToken, userController.register);

export default router;
