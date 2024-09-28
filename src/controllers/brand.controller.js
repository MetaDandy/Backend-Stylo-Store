import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Brand
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return responses.res400(res, "Name");

    const brand = await prisma.brand.create({
      data: { name: name },
    });

    return responses.res201(res, brand.name, brand);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Brand
const updateBrand = async (req, res) => {
  const id = Number(req.params.id);

  const { name } = req.body;

  let data = {};

  if (name) data.name = name;

  if (Object.keys(data).length === 0)
    return responses.res400(res, "data for update");

  try {
    const brand = await prisma.brand.update({
      where: { id: id },
      data: data,
    });

    return responses.res206(res, brand.name, "updated");
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for delete a Brand
const deleteBrand = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const brand = await prisma.brand.findFirst({
      where: {
        deletedAt: null,
        id: id,
      },
    });

    console.log(brand);

    if (!brand) return responses.res404(res, "Brand");

    await prisma.brand.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });

    console.log(brand);

    return responses.res206(res, brand.name);
  } catch (error) {
    return responses.res500(res, error);
  }
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
  try {
    const id = Number(req.params.id);

    const brand = await prisma.brand.findFirst({
      where: { deletedAt: null, id: id },
    });

    return responses.res200(res, brand.name, brand);
  } catch (error) {
    return responses.res500(res, error);
  }
};

export const BrandController = {
  createBrand,
  updateBrand,
  deleteBrand,
  viewOneBrand,
  viewBrand,
};
