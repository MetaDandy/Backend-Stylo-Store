import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { adminAuth, verifyToken } from "../middlewares/index.js";

const router = Router();

router.post("/create", verifyToken, OrderController.createOrder);
router.put("/update", verifyToken, OrderController.updateOrder);
router.patch("/delete", verifyToken, OrderController.deleteOrder);
router.get("/view", adminAuth, OrderController.viewOrder);
router.get("/view/:id", verifyToken, OrderController.viewOneOrder);
router.get("/viewUser", verifyToken, OrderController.userOrder);

export default router;
