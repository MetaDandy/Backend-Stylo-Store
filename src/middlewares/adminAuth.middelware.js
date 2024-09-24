import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res.status(401).json({
        success: false,
        msg: "Not authorized, please login again",
      });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } else {
      return res.status(400).json({
        error: "Token format is invalid",
      });
    }

    const { email, role } = jwt.verify(token, process.env.JWT_SECRET);

    if (email !== process.env.ADMIN_EMAIL || role !== process.env.ADMIN_ROLE)
      return res.status(403).json({
        success: false,
        msg: "Not authorized, please login again",
      });

    req.email = email;
    req.role = role;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);

    // En caso de token inválido o expirado
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }
};
