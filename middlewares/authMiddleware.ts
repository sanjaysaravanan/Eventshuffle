import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }

  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    // Verify the token
    jwt.verify(token, JWT_SECRET);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
