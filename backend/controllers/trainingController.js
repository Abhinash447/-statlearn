import TrainingMaterial from "../models/TrainingMaterial.js";
import TrainingProgress from "../models/TrainingProgress.js";
import Assessment from "../models/Assessment.js";


// =====================================================
// GET ALL TRAINING MATERIALS
// GET /api/v1/training
// =====================================================

export const getTrainingMaterials = async (req, res) => {
  try {
    const { skill, level, competency } = req.query;

    const filter = {
      isActive: true,
    };

    if (skill) {
      filter.skill = skill;
    }

    if (level) {
      filter.level = level;
    }

    if (competency) {
      filter.competency = competency;
    }

    const materials = await TrainingMaterial.find(filter)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });

  } catch (error) {
    console.error(
      "Get Training Materials Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch training materials.",
    });
  }
};


// =====================================================
// GET SINGLE TRAINING MATERIAL
// GET /api/v1/training/:id
// =====================================================

export const getTrainingMaterialById = async (
  req,
  res
) => {
  try {
    const material =
      await TrainingMaterial.findOne({
        _id: req.params.id,
        isActive: true,
      });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Training material not found.",
      });
    }

    return res.status(200).json({
      success: true,
      material,
    });

  } catch (error) {
    console.error(
      "Get Training Material Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch training material.",
    });
  }
};


// =====================================================
// GET RECOMMENDED TRAINING
// GET /api/v1/training/recommended
// =====================================================

export const getRecommendedTraining = async (
  req,
  res
) => {
  try {

    const userId = req.user._id;

    // -----------------------------------------------
    // Find latest assessments
    // -----------------------------------------------

    const assessments =
      await Assessment.find({
        user: userId,
      }).sort({
        completedAt: -1,
      });

    // -----------------------------------------------
    // No assessment
    // -----------------------------------------------

    if (!assessments.length) {
      const materials =
        await TrainingMaterial.find({
          isActive: true,
        })
          .sort({ createdAt: -1 })
          .limit(10);

        return res.status(200).json({
          success: true,
          message:
            "Complete an assessment to receive personalized recommendations.",
          personalized: false,
          recommendations: materials,
        });
    }

    // -----------------------------------------------
    // Keep latest assessment for each skill
    // -----------------------------------------------

    const latestBySkill = {};

    for (const assessment of assessments) {

      if (!assessment.skill) {
        continue;
      }

      if (
        !latestBySkill[assessment.skill]
      ) {
        latestBySkill[
          assessment.skill
        ] = assessment;
      }
    }

    const latestAssessments =
      Object.values(latestBySkill);

    // -----------------------------------------------
    // Find weak skills
    // -----------------------------------------------

    const weakAssessments =
      latestAssessments.filter(
        (assessment) =>
          Number(assessment.percentage) < 80
      );

    // -----------------------------------------------
    // If no gaps
    // -----------------------------------------------

    if (!weakAssessments.length) {
      return res.status(200).json({
        success: true,
        personalized: true,
        message:
          "No critical competency gaps found.",
        recommendations: [],
      });
    }

    // -----------------------------------------------
    // Find training materials
    // -----------------------------------------------

    const recommendations = [];

    for (const assessment of weakAssessments) {

      const materials =
        await TrainingMaterial.find({
          skill: assessment.skill,
          isActive: true,
        })
          .sort({ createdAt: -1 })
          .limit(5);

      materials.forEach((material) => {

        recommendations.push({
          ...material.toObject(),

          recommendationReason:
            `Your latest ${assessment.skill} assessment score is ${assessment.percentage}%. This training is recommended to strengthen your competency.`,

          assessmentScore:
            assessment.percentage,

          assessmentLevel:
            assessment.level,
        });

      });
    }

    return res.status(200).json({
      success: true,
      personalized: true,
      recommendations,
    });

  } catch (error) {

    console.error(
      "Get Recommended Training Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate training recommendations.",
    });
  }
};


// =====================================================
// START TRAINING
// POST /api/v1/training/:id/start
// =====================================================

export const startTraining = async (
  req,
  res
) => {
  try {

    const userId = req.user._id;
    const trainingId = req.params.id;

    // -----------------------------------------------
    // Check material
    // -----------------------------------------------

    const material =
      await TrainingMaterial.findOne({
        _id: trainingId,
        isActive: true,
      });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Training material not found.",
      });
    }

    // -----------------------------------------------
    // Check existing progress
    // -----------------------------------------------

    let progress =
      await TrainingProgress.findOne({
        user: userId,
        trainingMaterial: trainingId,
      });

    // -----------------------------------------------
    // Create progress
    // -----------------------------------------------

    if (!progress) {

      progress =
        await TrainingProgress.create({

          user: userId,

          trainingMaterial:
            trainingId,

          progress: 0,

          status: "in-progress",

          startedAt: new Date(),

          recommended: true,

        });

    } else {

      if (
        progress.status !==
        "completed"
      ) {

        progress.status =
          "in-progress";

        if (!progress.startedAt) {
          progress.startedAt =
            new Date();
        }

        await progress.save();
      }
    }

    return res.status(200).json({

      success: true,

      message:
        "Training started successfully.",

      progress,

    });

  } catch (error) {

    console.error(
      "Start Training Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to start training.",
    });
  }
};


// =====================================================
// UPDATE TRAINING PROGRESS
// PUT /api/v1/training/:id/progress
// =====================================================

export const updateTrainingProgress = async (
  req,
  res
) => {
  try {

    const userId = req.user._id;
    const trainingId = req.params.id;

    const {
      progress: progressValue,
    } = req.body;

    // -----------------------------------------------
    // Validate
    // -----------------------------------------------

    if (
      progressValue === undefined ||
      progressValue === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Progress value is required.",
      });
    }

    const numericProgress =
      Number(progressValue);

    if (
      Number.isNaN(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Progress must be between 0 and 100.",
      });
    }

    // -----------------------------------------------
    // Find progress
    // -----------------------------------------------

    const trainingProgress =
      await TrainingProgress.findOne({
        user: userId,
        trainingMaterial: trainingId,
      });

    if (!trainingProgress) {
      return res.status(404).json({
        success: false,
        message:
          "Training progress not found. Start the training first.",
      });
    }

    // -----------------------------------------------
    // Update
    // -----------------------------------------------

    trainingProgress.progress =
      numericProgress;

    if (numericProgress >= 100) {

      trainingProgress.progress = 100;

      trainingProgress.status =
        "completed";

      trainingProgress.completedAt =
        trainingProgress.completedAt ||
        new Date();

    } else {

      trainingProgress.status =
        "in-progress";
    }

    await trainingProgress.save();

    return res.status(200).json({

      success: true,

      message:
        "Training progress updated.",

      progress:
        trainingProgress,

    });

  } catch (error) {

    console.error(
      "Update Training Progress Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update training progress.",
    });
  }
};


// =====================================================
// COMPLETE TRAINING
// PUT /api/v1/training/:id/complete
// =====================================================

export const completeTraining = async (
  req,
  res
) => {
  try {

    const userId = req.user._id;
    const trainingId = req.params.id;

    const trainingProgress =
      await TrainingProgress.findOne({
        user: userId,
        trainingMaterial: trainingId,
      });

    if (!trainingProgress) {
      return res.status(404).json({
        success: false,
        message:
          "Training progress not found. Start the training first.",
      });
    }

    trainingProgress.progress = 100;

    trainingProgress.status =
      "completed";

    trainingProgress.completedAt =
      new Date();

    await trainingProgress.save();

    return res.status(200).json({

      success: true,

      message:
        "Training completed successfully.",

      progress:
        trainingProgress,

    });

  } catch (error) {

    console.error(
      "Complete Training Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to complete training.",
    });
  }
};


// =====================================================
// GET MY TRAINING PROGRESS
// GET /api/v1/training/progress/my
// =====================================================

export const getMyTrainingProgress = async (
  req,
  res
) => {
  try {

    const progress =
      await TrainingProgress.find({
        user: req.user._id,
      })
        .populate(
          "trainingMaterial"
        )
        .sort({
          updatedAt: -1,
        });

    return res.status(200).json({

      success: true,

      count: progress.length,

      progress,

    });

  } catch (error) {

    console.error(
      "Get Training Progress Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch training progress.",
    });
  }
};