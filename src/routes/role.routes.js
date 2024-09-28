import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, RoleController.createRole);
router.put("/update", adminAuth, RoleController.updateRole);
router.patch("/delete/:id", adminAuth, RoleController.deleteRole);
router.get("/view", RoleController.viewRole);
router.get("/view/:id", RoleController.viewOneRole);

export default router;
