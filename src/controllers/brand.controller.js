import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Brand
const createBrand = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for update a Brand
const updateBrand = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Brand
const deleteBrand = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for view all Brands
const viewBrand = async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "Brands", brands);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Brand
const viewOneBrand = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const BrandController = {
  createBrand,
  updateBrand,
  deleteBrand,
  viewOneBrand,
  viewBrand,
};
