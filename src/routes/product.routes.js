import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { adminAuth, upload } from "../middlewares/index.js";

const router = Router();

router.post(
  "/create",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  ProductController.createProduct
);
router.put("/update", adminAuth, ProductController.updateProduct);
router.patch("/delete/:id", adminAuth, ProductController.deleteProduct);
router.get("/view", ProductController.viewProduct);
router.get("/view/:id", ProductController.viewOneProduct);

export default router;
