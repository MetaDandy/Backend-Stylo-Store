import { Router } from "express";
import { SizeController } from "../controllers/size.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, SizeController.createSize);
router.put("/update", adminAuth, SizeController.updateSize);
router.patch("/delete/:id", adminAuth, SizeController.deleteSize);
router.get("/view", SizeController.viewSize);
router.get("/view/:id", SizeController.viewOneSize);

export default router;
