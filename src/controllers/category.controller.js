import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Category
const createCategory = async (req, res) => {
  try {
    const { name, description, typeCategoryId } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");
    if (!typeCategoryId) return responses.res400(res, "category's type");

    const category = await prisma.category.create({
      data: {
        name: name,
        description: description,
        typeCategoryId: Number(typeCategoryId),
      },
    });

    const asd = await prisma.category.findFirst({
      where: { name: category.name },
    });

    if (!asd)
      return res.status(404).json({ success: false, msg: "NO se creo" });

    console.log(category);

    return responses.res201(res, category.name, category);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Category
const updateCategory = async (req, res) => {
  const id = Number(req.params.id);

  const { name, description, typeCategoryId } = req.body;

  let data = {};

  if (name) data.name = name;
  if (description) data.description = description;
  if (typeCategoryId) data.typeCategoryId = Number(typeCategoryId);

  if (Object.keys(data).length === 0)
    return responses.res400(res, "data for update");

  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return responses.res206(res, category.name, "updated");
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for delete a Category
const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findFirst({
      where: {
        deletedAt: null,
        id: id,
      },
    });

    if (!category) return responses.res404(res, "category");

    await prisma.category.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, category.name);
  } catch (error) {
    return responses.res500(res, error);
  }
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
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findFirst({
      where: { deletedAt: null, id },
      include: {
        typeCategory: {
          select: { name: true },
        },
      },
    });

    return responses.res200(res, category.name, category);
  } catch (error) {
    return responses.res500(res, error);
  }
};

export const CategoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  viewOneCategory,
  viewCategory,
};
