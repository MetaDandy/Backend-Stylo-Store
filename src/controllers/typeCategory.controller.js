import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a CategoryType
const createCategoryType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const categoryType = await prisma.typeCategory.create({
      data: {
        name,
        description,
      },
    });

    return responses.res201(res, categoryType.name, categoryType);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a CategoryType
const updateCategoryType = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a CategoryType
const deleteCategoryType = async (req, res) => {
  try {
    const { id } = req.params;

    const cT = await prisma.typeCategory.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!cT) return responses.res404(res, "category's type");

    await prisma.typeCategory.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, cT.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all CategoryTypes
const viewCategoryType = async (req, res) => {
  try {
    const categoryTypes = await prisma.typeCategory.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return responses.res200(res, "Category's types", categoryTypes);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one CategoryType
const viewOneCategoryType = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const CategoryTypeController = {
  createCategoryType,
  updateCategoryType,
  deleteCategoryType,
  viewOneCategoryType,
  viewCategoryType,
};
