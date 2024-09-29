import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Catalog
const createCatalog = async (req, res) => {
  try {
    const { name, seasonId } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!seasonId) return responses.res400(res, "sesasonId");

    const catalog = await prisma.catalog.create({
      data: {
        name,
        seasonId: Number(seasonId),
      },
    });

    return responses.res201(res, catalog.name, catalog);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Catalog
const updateCatalog = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Catalog
const deleteCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return responses.res400(res, "catalog id");

    const catalog = await prisma.catalog.findFirst({
      where: { id: Number(id) },
    });

    if (!catalog) return responses.res404(res, "catalog");

    return responses.res206(res, catalog.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Catalogs
const viewCatalog = async (req, res) => {
  try {
    const catalog = await prisma.catalog.findMany({
      where: { deletedAt: null },
      include: {
        season: {
          select: {
            name: true,
            id: true,
          },
        },
        productCatalog: {
          select: {
            product: {
              select: {
                name: true,
                photo: {
                  select: {
                    path: true,
                  },
                },
                season: {
                  select: {
                    name: true,
                  },
                },
                brand: {
                  select: {
                    name: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                    typeCategory: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return responses.res200(res, "catalog", catalog);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Catalog
const viewOneCatalog = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

const addProductCatalog = async (req, res) => {
  try {
    const { productId, catalogId } = req.body;

    if (!productId) return responses.res400(res, "productId");
    if (!catalogId) return responses.res400(res, "catalogId");

    const existingProduct = await prisma.productCatalog.findFirst({
      where: { productId: Number(productId), catalogId: Number(catalogId) },
    });

    if (existingProduct)
      return responses.res404(res, "Product existing in catalog");

    const pC = await prisma.productCatalog.create({
      data: {
        productId: Number(productId),
        catalogId: Number(catalogId),
      },
    });

    return responses.res201(res, `${pC.catalogId} ${pC.productId}`, pC);
  } catch (error) {
    return responses.res500(res, error);
  }
};

export const CatalogController = {
  createCatalog,
  updateCatalog,
  deleteCatalog,
  viewOneCatalog,
  viewCatalog,
  addProductCatalog,
};
