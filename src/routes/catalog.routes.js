import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, CatalogController.createCatalog);
router.post("/addproduct", adminAuth, CatalogController.addProductCatalog);
router.put("/update", adminAuth, CatalogController.updateCatalog);
router.patch("/delete/:id", adminAuth, CatalogController.deleteCatalog);
router.get("/view", CatalogController.viewCatalog);
router.get("/view/:id", CatalogController.viewOneCatalog);

export default router;
