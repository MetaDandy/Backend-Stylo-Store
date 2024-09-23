import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";
import { verifyToken } from "../middlewares/index.js";

const router = Router();

router.post("/create", verifyToken, RoleController.createRole);
router.put("/update", verifyToken, RoleController.updateRole);
router.patch("/delete", verifyToken, RoleController.deleteRole);
router.get("/view", verifyToken, RoleController.viewRole);
router.get("/view/:id", verifyToken, RoleController.viewOneRole);

export default router;
