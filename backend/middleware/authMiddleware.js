import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "fallback_secret_key_skillforge";

export const protect = async (req, res, next) => {
  try {
    let token = null;

    // ==========================================
    // 1. CHECK HTTP-ONLY COOKIE
    // ==========================================

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ==========================================
    // 2. ALSO SUPPORT BEARER TOKEN
    // ==========================================

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ==========================================
    // 3. NO TOKEN
    // ==========================================

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }

    // ==========================================
    // 4. VERIFY TOKEN
    // ==========================================

    const decoded = jwt.verify(token, JWT_SECRET);

    // ==========================================
    // 5. FIND USER
    // ==========================================

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found",
      });
    }

    // ==========================================
    // 6. ATTACH USER TO REQUEST
    // ==========================================

    req.user = user;

    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};