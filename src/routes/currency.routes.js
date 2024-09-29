import { Router } from "express";
import { CurrencyController } from "../controllers/currency.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, CurrencyController.createCurrency);
router.put("/update", adminAuth, CurrencyController.updateCurrency);
router.patch("/delete/:id", adminAuth, CurrencyController.deleteCurrency);
router.get("/view", CurrencyController.viewCurrency);
router.get("/view/:id", CurrencyController.viewOneCurrency);

export default router;
