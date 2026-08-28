import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fallback_secret_key_skillforge";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      designation,
      department,
      role,
    } = req.body;


    // Validation

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email and password are required.",
      });
    }


    const normalizedEmail =
      email.trim().toLowerCase();

    const userExists =
      await User.findOne({
        email: normalizedEmail,
      });

    if (userExists) {
      return res.status(400).json({
        message:
          "An account with this email already exists.",
      });
    }

    const defaultCompetencies = [
      {
        competencyName:
          "Statistical Analysis",
        score: 0,
        status: "Critical Gap",
      },
      {
        competencyName:
          "Data Visualization",
        score: 0,
        status: "Critical Gap",
      },
      {
        competencyName:
          "Sampling Methods",
        score: 0,
        status: "Critical Gap",
      },
      {
        competencyName:
          "Survey Methodology",
        score: 0,
        status: "Critical Gap",
      },
      {
        competencyName:
          "Statistical Programming",
        score: 0,
        status: "Critical Gap",
      },
    ];

    let dbRole = "student";

    if (role === "faculty") {
      dbRole = "faculty";
    }

    if (
      role === "admin" ||
      role === "Admin"
    ) {
      dbRole = "admin";
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,

      designation:
        designation ||
        "Statistical Officer",

      department:
        department || "MoSPI",

      role: dbRole,

      competencyProfile:
        defaultCompetencies,
    });

    const token =
      generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      maxAge:
        30 *
        24 *
        60 *
        60 *
        1000,
    });


    return res.status(201).json({

      message:
        "Registration successful.",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Email address already in use.",
      });
    }

    return res.status(500).json({
      message:
        error.message ||
        "Internal Server Error.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const passwordMatched =
      await user.matchPassword(
        password
      );

    if (!passwordMatched) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const token =
      generateToken(user._id);


    res.cookie("token", token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      maxAge:
        30 *
        24 *
        60 *
        60 *
        1000,
    });


    return res.status(200).json({

      message:
        "Login successful.",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      message:
        "Internal Server Error.",
    });
  }
};

export const getCurrentUser = async (
  req,
  res
) => {
  try {

    return res.status(200).json({
      user: req.user,
    });

  } catch (error) {

    console.error(
      "Current User Error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to get current user.",
    });
  }
};


export const logoutUser = async (
  req,
  res
) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
    });


    return res.status(200).json({

      success: true,

      message:
        "Logged out successfully.",

    });

  } catch (error) {

    console.error(
      "Logout Error:",
      error
    );

    return res.status(500).json({
      message:
        "Logout failed.",
    });
  }
};