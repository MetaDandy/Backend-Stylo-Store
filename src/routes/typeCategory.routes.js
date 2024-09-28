import { Router } from "express";
import { CategoryTypeController } from "../controllers/typeCategory.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, CategoryTypeController.createCategoryType);
router.put("/update", adminAuth, CategoryTypeController.updateCategoryType);
router.patch(
  "/delete/:id",
  adminAuth,
  CategoryTypeController.deleteCategoryType
);
router.get("/view", CategoryTypeController.viewCategoryType);
router.get("/view/:id", CategoryTypeController.viewOneCategoryType);

export default router;
