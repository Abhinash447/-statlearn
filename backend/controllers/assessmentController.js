import Assessment from "../models/Assessment.js";
import User from "../models/User.js";

export const createAssessment = async (req, res) => {
  try {
    const {
      skill,
      level,
      type = "initial",
      score,
      totalQuestions,
      percentage,
    } = req.body;

    if (
      !skill ||
      !level ||
      score === undefined ||
      !totalQuestions ||
      percentage === undefined
    ) {
      return res.status(400).json({
        message: "Required assessment data is missing.",
      });
    }

    const assessment = await Assessment.create({
      user: req.user._id,
      skill,
      level,
      type,
      score,
      totalQuestions,
      percentage,
      competencyScore: percentage,
      completedAt: new Date(),
    });

    let status = "Critical Gap";

    if (percentage >= 80) {
      status = "Strong";
    } else if (percentage >= 50) {
      status = "Needs Improvement";
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const competency =
      user.competencyProfile.find(
        (item) =>
          item.competencyName.toLowerCase() ===
          skill.toLowerCase()
      );

    if (competency) {
      competency.score = percentage;
      competency.status = status;
      competency.lastEvaluated = new Date();
    } else {
      user.competencyProfile.push({
        competencyName: skill,
        score: percentage,
        status,
        lastEvaluated: new Date(),
      });
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Assessment saved successfully.",
      assessment,
      competency: {
        skill,
        score: percentage,
        status,
      },
    });
  } catch (error) {
    console.error(
      "Create Assessment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to save assessment.",
      error: error.message,
    });
  }
};

export const getMyAssessments = async (req, res) => {
  try {
    const assessments =
      await Assessment.find({
        user: req.user._id,
      }).sort({
        completedAt: -1,
      });

    return res.status(200).json({
      success: true,
      assessments,
    });
  } catch (error) {
    console.error(
      "Get Assessments Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assessments.",
    });
  }
};

export const getAssessmentById = async (
  req,
  res
) => {
  try {
    const assessment =
      await Assessment.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error(
      "Get Assessment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assessment.",
    });
  }
};