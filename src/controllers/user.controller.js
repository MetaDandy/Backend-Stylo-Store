import { prisma } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone, roleId } = req.body;

    if (!name || !email || !password || !phone)
      return res.status(400).json({
        ok: false,
        msg: "Missing required fields: email, password, name, phone",
      });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(409).json({
        ok: false,
        msg: "Email already exists",
      });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone.toString(),
      },
    });

    const newRoleAssigment = await prisma.assignedRole.create({
      data: {
        role: { id: roleId },
        user: { id: newUser.id },
      },
    });

    const role = await prisma.role.findFirst({
      where: { id: roleId },
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.name,
        role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    return res.status(201).json({
      ok: true,
      msg: "User created sucsessfully",
      newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
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
        ok: false,
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

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Credentials" });

    const userRole =
      user.assignedRole.length > 0 ? user.assignedRole[0].role.name : null;

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    return res.status(201).json({
      ok: true,
      msg: `User ${user.name} authenticated sucsessfully`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
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
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

export const userController = {
  register,
  login,
  profile,
};
