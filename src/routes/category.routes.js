import { Router } from "express";

const router = Router();

router.get("/category", (req, res) => {
  res.send("category");
});

export default router;
