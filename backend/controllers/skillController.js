import Assessment from "../models/Assessment.js";

const TARGET_SCORE = 80;

export const getMySkillGaps = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      user: req.user._id,
    }).sort({
      completedAt: -1,
    });

    const latestBySkill = new Map();

    for (const assessment of assessments) {
      if (!latestBySkill.has(assessment.skill)) {
        latestBySkill.set(
          assessment.skill,
          assessment
        );
      }
    }

    const skills = Array.from(
      latestBySkill.values()
    ).map((assessment) => {
      const score = Number(
        assessment.competencyScore ??
          assessment.percentage ??
          0
      );

      const gap = Math.max(
        0,
        TARGET_SCORE - score
      );

      let status = "Critical Gap";

      if (score >= TARGET_SCORE) {
        status = "Strong";
      } else if (score >= 60) {
        status = "Needs Improvement";
      }

      return {
        assessmentId: assessment._id,
        skill: assessment.skill,
        level: assessment.level,
        score,
        target: TARGET_SCORE,
        gap,
        status,
        type: assessment.type,
        completedAt: assessment.completedAt,
      };
    });

    const gaps = skills
      .filter(
        (item) => item.score < item.target
      )
      .sort(
        (a, b) => a.score - b.score
      );

    return res.status(200).json({
      success: true,
      totalSkills: skills.length,
      totalGaps: gaps.length,
      skills,
      gaps,
    });
  } catch (error) {
    console.error(
      "Get My Skill Gaps Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch skill gap analysis.",
      error: error.message,
    });
  }
};