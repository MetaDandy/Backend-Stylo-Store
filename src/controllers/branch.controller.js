import { prisma } from "../db.js";
import { responses } from "../middlewares/index.js";

// function for update a Branch
const createBranch = async (req, res) => {
  try {
    const { name, direction } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!direction) return responses.res400(res, "direction");

    const branch = await prisma.branch.create({
      data: {
        name,
        direction,
      },
    });

    return responses.res201(res, branch.name, branch);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Branch
const updateBranch = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Branch
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await prisma.branch.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!branch) return responses.res404(res, "branch");

    await prisma.branch.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, branch.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Branchs
const viewBranch = async (req, res) => {
  try {
    const branch = await prisma.branch.findMany({
      where: { deletedAt: null },
      include: {
        inventory: {
          select: {
            stock: true,
            product: {
              select: {
                name: true,
                id: true,
                productSize: {
                  select: {
                    sizeId: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                    typeCategory: {
                      select: { name: true },
                    },
                  },
                },
                brand: {
                  select: { name: true },
                },
                season: {
                  select: { name: true },
                },
                photo: {
                  select: { path: true },
                },
              },
            },
          },
        },
      },
    });

    return responses.res200(res, "branch", branch);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Branch
const viewOneBranch = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

//function add producto to inventory for admin
const addProductToInventory = async (req, res) => {
  try {
    const { branchId, productId, stock } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!branchId || !productId || stock <= 0) {
      return res
        .status(400)
        .json({ msg: "branchId, productId, and stock are required" });
    }

    // Verificar si el producto ya existe en la sucursal
    const existingInventory = await prisma.inventory.findFirst({
      where: {
        branchId: Number(branchId),
        productId: Number(productId),
        deletedAt: null, // Opcional, si estás manejando un soft delete
      },
    });

    if (existingInventory) {
      // Si el producto ya está en el inventario de la sucursal, actualizamos el stock
      const updatedInventory = await prisma.inventory.update({
        where: { id: existingInventory.id },
        data: { stock: existingInventory.stock + Number(stock) }, // Actualizamos sumando al stock actual
      });

      return res.status(200).json({
        message: `Stock updated for product ${updatedInventory.productId} in branch ${updatedInventory.branchId}`,
        inventory: updatedInventory,
      });
    }

    // Si no existe, creamos una nueva entrada en el inventario
    const newInventory = await prisma.inventory.create({
      data: {
        branchId: Number(branchId),
        productId: Number(productId),
        stock: Number(stock),
      },
    });

    return res.status(201).json({
      msg: `Product added to inventory in branch ${newInventory.branchId}`,
      inventory: newInventory,
    });
  } catch (error) {
    console.error("Error adding product to inventory:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const BranchController = {
  createBranch,
  updateBranch,
  deleteBranch,
  viewOneBranch,
  viewBranch,
  addProductToInventory,
};
