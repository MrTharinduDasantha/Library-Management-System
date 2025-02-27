import { verifyToken } from "../utils/jwtUtils.js";

// Middleware to check if the token is valid or not
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Miidleware to check if the user is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Access denied. User is not an admin" });
  }
  next();
};

export { authMiddleware, adminMiddleware };
