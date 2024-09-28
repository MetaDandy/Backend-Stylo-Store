import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, PaymentController.createPayment);
router.put("/update", adminAuth, PaymentController.updatePayment);
router.patch("/delete/:id", adminAuth, PaymentController.deletePayment);
router.get("/view", PaymentController.viewPayment);
router.get("/view/:id", PaymentController.viewOnePayment);

export default router;
