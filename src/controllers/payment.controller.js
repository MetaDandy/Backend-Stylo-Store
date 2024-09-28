import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Payment
const createPayment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const payment = await prisma.payment.create({
      data: {
        name,
        description,
      },
    });

    return responses.res201(res, payment.name, payment);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Payment
const updatePayment = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Payment
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!payment) return responses.res404(res, "payment");

    await prisma.payment.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, payment.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Payments
const viewPayment = async (req, res) => {
  try {
    const payment = await prisma.payment.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "payment", payment);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Payment
const viewOnePayment = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const PaymentController = {
  createPayment,
  updatePayment,
  deletePayment,
  viewOnePayment,
  viewPayment,
};
