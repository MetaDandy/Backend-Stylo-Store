import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, CategoryController.createCategory);
router.put("/update", adminAuth, CategoryController.updateCategory);
router.patch("/delete/:id", adminAuth, CategoryController.deleteCategory);
router.get("/view", CategoryController.viewCategory);
router.get("/view/:id", CategoryController.viewOneCategory);

export default router;
