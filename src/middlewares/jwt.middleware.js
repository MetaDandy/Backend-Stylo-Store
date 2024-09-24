import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "Token not provided",
    });
  }

  // Verifica que el token tenga el formato correcto (Bearer <token>)
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  } else {
    return res.status(400).json({
      error: "Token format is invalid",
    });
  }

  try {
    const { email, role } = jwt.verify(token, process.env.JWT_SECRET);

    // Inyecta la información del token en el objeto req
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
