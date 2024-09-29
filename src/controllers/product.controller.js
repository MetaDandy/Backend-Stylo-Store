import { prisma } from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import { responses } from "../middlewares/responses.middleware.js";

// function for create a Product
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      price,
      description,
      bestSeller,
      categoryId,
      seasonId,
      brandId,
      size,
    } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!price) return responses.res400(res, "price");
    if (!description) return responses.res400(res, "description");
    if (!bestSeller) return responses.res400(res, "bestSeller");
    if (!categoryId) return responses.res400(res, "categoryId");
    if (!seasonId) return responses.res400(res, "seasonId");
    if (!brandId) return responses.res400(res, "brandId");
    let pSize;
    if (typeof size === "string") pSize = JSON.parse(size);
    if (pSize.length === 0) return responses.res400(res, "size");

    console.log(bestSeller, typeof bestSeller);

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
        bestSeller: bestSeller === "false" ? false : true,
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

    if (!product) return responses.res404(res, "Producto");

    await prisma.product.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, product.name);
  } catch (error) {
    return responses.res500(res, error);
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
          select: {
            name: true,
            typeCategory: {
              select: { name: true },
            },
          },
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
          select: { path: true },
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
      include: {
        category: {
          select: {
            name: true,
            typeCategory: {
              select: { name: true },
            },
          },
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
