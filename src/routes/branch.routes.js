import { Router } from "express";
import { BranchController } from "../controllers/branch.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, BranchController.createBranch);
router.put("/update", adminAuth, BranchController.updateBranch);
router.patch("/delete/:id", adminAuth, BranchController.deleteBranch);
router.get("/view", BranchController.viewBranch);
router.get("/view/:id", BranchController.viewOneBranch);
router.post("/addinventory", adminAuth, BranchController.addProductToInventory);

export default router;
