import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Payment
const createPayment = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
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
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};
// function for view all Payments
const viewPayment = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "Tipos de pagos", payments);
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
