import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a orderType
const createorderType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const oT = await prisma.orderType.create({
      data: {
        name,
        description,
      },
    });

    return responses.res201(res, oT.name, oT);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a orderType
const updateorderType = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a orderType
const deleteorderType = async (req, res) => {
  try {
    const { id } = req.params;

    const oT = await prisma.orderType.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!oT) return responses.res404(res, "order's type");

    await prisma.orderType.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, oT.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all orderTypes
const vieworderType = async (req, res) => {
  try {
    const oT = await prisma.orderType.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "Order Types", oT);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one orderType
const viewOneorderType = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const orderTypeController = {
  createorderType,
  updateorderType,
  deleteorderType,
  viewOneorderType,
  vieworderType,
};
