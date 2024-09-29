import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Currency
const createCurrency = async (req, res) => {
  try {
    const { name, description, acronym } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");
    if (!acronym) return responses.res400(res, "acronym");

    const currency = await prisma.currency.create({
      data: {
        name,
        description,
        acronym,
      },
    });

    return responses.res201(res, currency.name, currency);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Currency
const updateCurrency = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Currency
const deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;

    const currency = await prisma.currency.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!currency) return responses.res404(res, "currency");

    await prisma.currency.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, currency.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Currencys
const viewCurrency = async (req, res) => {
  try {
    const currency = await prisma.currency.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "currency", currency);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Currency
const viewOneCurrency = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const CurrencyController = {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  viewOneCurrency,
  viewCurrency,
};
