import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Role
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    });

    return responses.res201(res, role.name, role);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Role
const updateRole = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await prisma.role.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!role) return responses.res404(res, "payment");

    await prisma.role.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, role.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all Roles
const viewRole = async (req, res) => {
  try {
    const role = await prisma.role.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "role", role);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Role
const viewOneRole = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const RoleController = {
  createRole,
  updateRole,
  deleteRole,
  viewOneRole,
  viewRole,
};
