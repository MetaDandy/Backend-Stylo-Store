import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Category
const createCategory = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for update a Category
const updateCategory = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Category
const deleteCategory = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for view all Categorys
const viewCategory = async (req, res) => {
  try {
    const categorys = await prisma.category.findMany({
      where: { deletedAt: null },
      include: {
        typeCategory: {
          select: { name: true },
        },
      },
    });

    return responses.res200(res, "Categorys", categorys);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Category
const viewOneCategory = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const CategoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  viewOneCategory,
  viewCategory,
};
