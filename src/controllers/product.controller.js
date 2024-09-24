import { prisma } from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      bestSeller,
      categoryId,
      seasonId,
      brandId,
      productSize,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !bestSeller ||
      !categoryId ||
      !seasonId ||
      !brandId ||
      !productSize
    )
      return res.status(400).json({
        success: false,
        msg: "Missing required fields: price, description, name, bestSeller, categoryId, seasonId, brandId, productSize",
      });

    console.log(typeof price);

    let pSize;
    if (typeof productSize === "string") pSize = JSON.parse(productSize);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        seasonId: Number(seasonId),
        categoryId: Number(categoryId),
        brandId: Number(brandId),
        bestSeller: Boolean(bestSeller),
        productSize: {
          create: pSize.map((sizeId) => ({
            size: { connect: { id: sizeId } },
          })),
        },
        photo: {
          create: imagesUrl.map((url) => ({
            path: url,
          })),
        },
      },
    });

    return responses.res201(res, newProduct.name, newProduct);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Product
const updateProduct = async (req, res) => {
  return responses.res505(res);
};

// function for delete a Product
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findFirst({
      where: {
        deletedAt: null,
        id: id,
      },
    });

    if (!product) responses.res404(res, "Producto");

    await prisma.product.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });

    return responses.res205(res, product.name);
  } catch (error) {
    responses.res500(res, error);
  }
};

// function for view all Products
const viewProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null, // Excluir productos eliminados (donde deletedAt no es nulo)
      },
      include: {
        category: {
          select: { name: true }, // Obtener solo el nombre de la categoría
        },
        brand: {
          select: { name: true }, // Obtener solo el nombre de la marca
        },
        season: {
          select: { name: true }, // Obtener solo el nombre de la temporada
        },
        productSize: {
          select: { sizeId: true },
        },
        photo: {
          select: { path: true }, // Obtener la URL de la foto
        },
      },
    });

    return responses.res200(res, "Products", products);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Product
const viewOneProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!product) return responses.res404(res, "Product");

    return responses.res200(res, product.name, product);
  } catch (error) {
    return responses.res500(res, error);
  }
};

export const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  viewOneProduct,
  viewProduct,
};
