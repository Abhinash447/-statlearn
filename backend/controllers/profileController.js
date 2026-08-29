import User from '../models/User.js';
import Progress from '../models/Progress.js';

// @desc    Retrieve profile metadata
// @route   GET /api/v1/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Official profile not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile metadata
// @route   PUT /api/v1/profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.designation = req.body.designation || user.designation;
    user.department = req.body.department || user.department;
    if (req.body.qualifications) {
      user.qualifications = req.body.qualifications;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      designation: updatedUser.designation,
      department: updatedUser.department,
      qualifications: updatedUser.qualifications,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update official competency score/status & log progress
// @route   PUT /api/v1/profile/competency
export const updateCompetency = async (req, res) => {
  const { competencyName, score } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let status = 'Critical Gap';
    if (score >= 75) status = 'Strong';
    else if (score >= 40) status = 'Needs Improvement';

    const competencyIndex = user.competencyProfile.findIndex(
      (c) => c.competencyName.toLowerCase() === competencyName.toLowerCase()
    );

    let previousScore = 0;

    if (competencyIndex !== -1) {
      previousScore = user.competencyProfile[competencyIndex].score;
      user.competencyProfile[competencyIndex].score = score;
      user.competencyProfile[competencyIndex].status = status;
      user.competencyProfile[competencyIndex].lastEvaluated = Date.now();
    } else {
      user.competencyProfile.push({
        competencyName,
        score,
        status,
        lastEvaluated: Date.now(),
      });
    }

    // Explicitly mark array as modified for Mongoose tracking
    user.markModified('competencyProfile');
    await user.save();

    // Sync with Progress Model
    let progress = await Progress.findOne({ user: req.user._id });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        completedCourses: [],
        reassessmentLogs: [],
      });
    }

    progress.reassessmentLogs.push({
      competencyName,
      previousScore,
      newScore: score,
      evaluatedAt: Date.now(),
    });

    // Explicitly mark subdocument array as modified
    progress.markModified('reassessmentLogs');
    const savedProgress = await progress.save();

    res.status(200).json({
      message: 'Competency profile and progress log updated successfully',
      competencyProfile: user.competencyProfile,
      reassessmentLogs: savedProgress.reassessmentLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Main dashboard summary overview
// @route   GET /api/v1/dashboard
export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      'name designation department competencyProfile'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalTrackedSkills = user.competencyProfile.length;
    const strongSkills = user.competencyProfile.filter(
      (c) => c.status === 'Strong'
    ).length;
    const criticalGaps = user.competencyProfile.filter(
      (c) => c.status === 'Critical Gap'
    ).length;
    const needsImprovement = user.competencyProfile.filter(
      (c) => c.status === 'Needs Improvement'
    ).length;

    res.status(200).json({
      official: {
        name: user.name,
        designation: user.designation,
        department: user.department,
      },
      metrics: {
        totalTrackedSkills,
        strongSkills,
        needsImprovement,
        criticalGaps,
      },
      competencies: user.competencyProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Track learning trajectory & logs
// @route   GET /api/v1/progress
export const getLearningProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user._id });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        completedCourses: [],
        reassessmentLogs: [],
      });
    }

    res.status(200).json({
      success: true,
      completedCoursesCount: progress.completedCourses.length,
      completedCourses: progress.completedCourses,
      reassessmentLogs: progress.reassessmentLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};