import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a orderType
const createorderType = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
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
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
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
