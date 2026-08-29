  import jwt from "jsonwebtoken";
  import User from "../models/User.js";

  const JWT_SECRET = process.env.JWT_SECRET;

  export const protect = async (req, res, next) => {
    try {
      if (!JWT_SECRET) {
        console.error("JWT_SECRET is not configured.");

        return res.status(500).json({
          message: "Server authentication configuration error.",
        });
      }

      let token = null;

      if (req.cookies?.token) {
        token = req.cookies.token;
      }

      if (
        !token &&
        req.headers.authorization?.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({
          message: "Not authorized, no token provided.",
        });
      }

      const decoded = jwt.verify(
        token,
        JWT_SECRET
      );

      if (!decoded?.id) {
        return res.status(401).json({
          message: "Not authorized, invalid token.",
        });
      }

      const user = await User.findById(
        decoded.id
      ).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "Not authorized, user not found.",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(
        "Auth middleware error:",
        error.message
      );

      return res.status(401).json({
        message: "Not authorized, token failed.",
      });
    }
  };