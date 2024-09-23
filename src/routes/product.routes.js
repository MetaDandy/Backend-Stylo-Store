import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { upload, verifyToken } from "../middlewares/index.js";

const router = Router();
//6 34 03
router.post(
  "/create",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  verifyToken,
  ProductController.createProduct
);
router.put("/update", verifyToken, ProductController.updateProduct);
router.patch("/delete", verifyToken, ProductController.deleteProduct);
router.get("/view", verifyToken, ProductController.viewProduct);
router.get("/view/:id", verifyToken, ProductController.viewOneProduct);

export default router;
