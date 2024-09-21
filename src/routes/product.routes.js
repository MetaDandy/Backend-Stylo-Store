import { Router } from "express";
import { prisma } from "../db.js";
const router = Router();

router.get("/product", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post("/product", async (req, res) => {
  const newProduct = await prisma.product.create({ data: req.body });

  res.json(newProduct);
});

export default router;
