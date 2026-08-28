import User from "../models/User.js";

const TARGET_BENCHMARKS = {
  "Statistical Analysis": 85,
  "Data Visualization": 80,
  "Sampling Methods": 75,
  "Survey Methodology": 75,
  "Statistical Programming": 80,
};

export const getCompetencyScores = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("competencyProfile");

    if (!user) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    const scoresComparison = {};

    user.competencyProfile.forEach((c) => {
      const target =
        TARGET_BENCHMARKS[
          c.competencyName
        ] || 75;

      scoresComparison[
        c.competencyName
      ] = {
        baselineScore: c.score,
        targetScore: target,
        status: c.status,
      };
    });

    return res.status(200).json({
      success: true,
      competencyScores:
        scoresComparison,
    });
  } catch (error) {
    console.error(
      "Get Competency Scores Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch competency scores.",
    });
  }
};

export const getGapAnalysis = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("competencyProfile");

    if (!user) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    const gapDetails = [];
    const criticalGaps = [];

    user.competencyProfile.forEach((c) => {
      const targetScore =
        TARGET_BENCHMARKS[
          c.competencyName
        ] || 75;

      const currentScore = Number(
        c.score || 0
      );

      const gapScore = Math.max(
        0,
        targetScore - currentScore
      );

      const isCritical =
        currentScore < 50;

      const gapItem = {
        competencyName:
          c.competencyName,
        currentScore,
        targetScore,
        gapScore,
        status:
          currentScore >= targetScore
            ? "Strong"
            : currentScore >= 60
            ? "Needs Improvement"
            : "Critical Gap",
        isCritical,
      };

      gapDetails.push(gapItem);

      if (isCritical) {
        criticalGaps.push(gapItem);
      }
    });

    return res.status(200).json({
      success: true,
      totalTrackedCompetencies:
        gapDetails.length,
      criticalGapsCount:
        criticalGaps.length,
      criticalGaps,
      fullGapAnalysis:
        gapDetails,
    });
  } catch (error) {
    console.error(
      "Get Gap Analysis Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch skill gap analysis.",
    });
  }
};