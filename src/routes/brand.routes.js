import { Router } from "express";
import { BrandController } from "../controllers/brand.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, BrandController.createBrand);
router.put("/update", adminAuth, BrandController.updateBrand);
router.patch("/delete", adminAuth, BrandController.deleteBrand);
router.get("/view", BrandController.viewBrand);
router.get("/view/:id", BrandController.viewOneBrand);

export default router;
