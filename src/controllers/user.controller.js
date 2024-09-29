import { prisma } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { responses } from "../middlewares/responses.middleware.js";

const createToken = (email, role, name) => {
  const token = jwt.sign(
    {
      email,
      name,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
  return token;
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, roleId } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!email) return responses.res400(res, "email");
    if (!password) return responses.res400(res, "password");
    if (!phone) return responses.res400(res, "phone");
    if (!roleId) return responses.res400(res, "roleId");

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        msg: "Please enter a valid email",
      });

    if (password.lenght < 8)
      return res.status(400).json({
        success: false,
        msg: "Please enter a strong Password",
      });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(409).json({
        success: false,
        msg: "Email already exists",
      });

    const roleExists = await prisma.role.findUnique({
      where: { id: Number(roleId) },
    });

    if (!roleExists)
      return res.status(400).json({
        success: false,
        msg: "Invalid roleId",
      });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone.toString(),
      },
    });

    const newRoleAssigment = await prisma.assignedRole.create({
      data: {
        password: hashedPassword,
        role: { connect: { id: Number(roleId) } }, // Usar connect en lugar de crear un nuevo objeto
        user: { connect: { id: newUser.id } },
      },
    });

    const token = createToken(newUser.email, roleExists.name, newUser.name);

    return res.status(201).json({
      success: true,
      msg: "User created sucsessfully",
      newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        msg: "Missing required fields: email, password",
      });

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        assignedRole: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "user not found" });

    let isMatch = false;
    let userRole = null;
    for (const assigned of user.assignedRole) {
      isMatch = await bcryptjs.compare(password, assigned.password);
      if (isMatch) {
        userRole = assigned.role.name;
        break;
      }
    }

    if (!isMatch)
      return res.status(401).json({
        success: false,
        msg: "Invalid Credentials",
      });

    const token = createToken(user.email, userRole, user.name);

    return res.status(201).json({
      success: true,
      msg: `User ${user.name} authenticated sucsessfully`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

const profile = async (req, res) => {
  try {
    const email = req.email;
    console.log("profile: ", email);
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return res.json({
      ok: true,
      msg: `profile user finded: ${user.name}`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

// function for update a user
const updateUser = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!user) return responses.res404(res, "user");

    await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, user.name);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view all users
const viewUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        assignedRole: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return responses.res200(res, "users", user);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one user
const viewOneUser = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const userController = {
  register,
  login,
  profile,
  updateUser,
  deleteUser,
  viewOneUser,
  viewUser,
};
