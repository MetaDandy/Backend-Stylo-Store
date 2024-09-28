import { Router } from "express";
import { SeasonController } from "../controllers/season.controller.js";
import { adminAuth } from "../middlewares/index.js";

const router = Router();

router.post("/create", adminAuth, SeasonController.createSeason);
router.put("/update", adminAuth, SeasonController.updateSeason);
router.patch("/delete/:id", adminAuth, SeasonController.deleteSeason);
router.get("/view", SeasonController.viewSeason);
router.get("/view/:id", SeasonController.viewOneSeason);

export default router;
