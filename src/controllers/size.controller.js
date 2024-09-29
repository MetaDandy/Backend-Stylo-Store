import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Size
const createSize = async (req, res) => {
  try {
    const { id, name, description } = req.body;

    if (!id) return responses.res400(res, "id");
    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const size = await prisma.size.create({
      data: {
        name,
        description,
        id,
      },
    });

    return responses.res201(res, size.name, size);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Size
const updateSize = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Size
const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;

    const size = await prisma.size.findFirst({
      where: { deletedAt: null, id },
    });

    if (!size) return responses.res404(res, "size");

    await prisma.size.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, size.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Sizes
const viewSize = async (req, res) => {
  try {
    const size = await prisma.size.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "size", size);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Size
const viewOneSize = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const SizeController = {
  createSize,
  updateSize,
  deleteSize,
  viewOneSize,
  viewSize,
};
