import { prisma } from "../db.js";

// function for update a Product
const createProduct = async (req, res) => {
  try {
  } catch (error) {}
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for update a Product
const updateProduct = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Product
const deleteProduct = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};
// function for view all Products
const viewProduct = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};
// function for view one Product
const viewOneProduct = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  viewOneProduct,
  viewProduct,
};
