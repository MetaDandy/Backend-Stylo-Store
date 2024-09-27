import { Router } from "express";
import { orderTypeController } from "../controllers/orderType.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, orderTypeController.createorderType);
router.put("/update", adminAuth, orderTypeController.updateorderType);
router.patch("/delete", adminAuth, orderTypeController.deleteorderType);
router.get("/view", orderTypeController.vieworderType);
router.get("/view/:id", orderTypeController.viewOneorderType);

export default router;
