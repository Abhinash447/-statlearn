import mongoose from 'mongoose';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';

// Seed sample courses fallback data
const SEED_COURSES = [
  {
    courseId: 'IGOT-STAT-101',
    title: 'Advanced Sampling Techniques for National Surveys',
    provider: 'iGOT Karmayogi',
    competencyTag: 'Sampling Methods',
    level: 'Advanced',
    durationHours: 12,
    rating: 4.8,
    modules: [
      { title: 'Stratified Random Sampling', durationMinutes: 120 },
      { title: 'Cluster & Multi-Stage Sampling', durationMinutes: 180 },
    ],
    description: 'Master practical sampling design methodologies used in large-scale government surveys.',
  },
  {
    courseId: 'NSSTA-VIZ-202',
    title: 'Data Visualization and Dashboarding with R',
    provider: 'NSSTA',
    competencyTag: 'Data Visualization',
    level: 'Intermediate',
    durationHours: 8,
    rating: 4.6,
    modules: [
      { title: 'ggplot2 Fundamentals', durationMinutes: 90 },
      { title: 'Building Interactive Dashboards', durationMinutes: 150 },
    ],
    description: 'Learn modern data visualization techniques tailored for statistical reports.',
  },
  {
    courseId: 'NSSTA-PROG-301',
    title: 'Statistical Programming & Automation',
    provider: 'NSSTA',
    competencyTag: 'Statistical Programming',
    level: 'Intermediate',
    durationHours: 15,
    rating: 4.7,
    modules: [
      { title: 'Data Wrangling', durationMinutes: 200 },
      { title: 'Automated Report Generation', durationMinutes: 240 },
    ],
    description: 'Streamline statistical workflows using modern programming tools.',
  },
];

// @desc    Get personalized learning path based on skill gaps
// @route   GET /api/v1/recommendations
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('competencyProfile');

    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Extract competencies flagged as Critical Gap or Needs Improvement
    const targetCompetencies = user.competencyProfile
      .filter((c) => c.status === 'Critical Gap' || c.status === 'Needs Improvement')
      .map((c) => c.competencyName.toLowerCase());

    let catalog = await Course.find();

    // Fallback catalog seeding if database is empty
    if (catalog.length === 0) {
      catalog = await Course.insertMany(SEED_COURSES);
    }

    // Filter & rank courses matching user gap competencies first
    const recommendedCourses = catalog.filter((course) =>
      targetCompetencies.includes(course.competencyTag.toLowerCase())
    );

    const resultCourses = recommendedCourses.length > 0 ? recommendedCourses : catalog;

    res.status(200).json({
      success: true,
      totalRecommended: resultCourses.length,
      targetGapsIdentified: targetCompetencies,
      recommendations: resultCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch metadata for a specific course
// @route   GET /api/v1/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if parameter matches standard 24-character hex ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    const course = await Course.findOne({
      $or: [
        ...(isObjectId ? [{ _id: id }] : []),
        { courseId: id }
      ]
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync learning progress & status
// @route   POST /api/v1/courses/progress
export const updateCourseProgress = async (req, res) => {
  const { courseId, percentComplete } = req.body;

  if (!courseId || percentComplete === undefined) {
    return res.status(400).json({ message: 'Provide courseId and percentComplete' });
  }

  try {
    // 1. Fetch course details to get courseTitle (prevents validation error)
    const isObjectId = mongoose.Types.ObjectId.isValid(courseId);
    const courseDoc = await Course.findOne({
      $or: [
        ...(isObjectId ? [{ _id: courseId }] : []),
        { courseId }
      ]
    });

    const courseTitle = courseDoc ? courseDoc.title : 'Competency Module';

    // 2. Find or create user progress document
    let progress = await Progress.findOne({ user: req.user._id });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        completedCourses: [],
        reassessmentLogs: [],
      });
    }

    const courseIndex = progress.completedCourses.findIndex(
      (item) => item.courseId === courseId
    );

    const isCompleted = percentComplete >= 100;

    // 3. Update or push progress entry including courseTitle
    if (courseIndex !== -1) {
      progress.completedCourses[courseIndex].percentComplete = percentComplete;
      progress.completedCourses[courseIndex].courseTitle = courseTitle;
      if (isCompleted) {
        progress.completedCourses[courseIndex].completedAt = Date.now();
      }
    } else {
      progress.completedCourses.push({
        courseId,
        courseTitle,
        percentComplete,
        completedAt: isCompleted ? Date.now() : null,
      });
    }

    progress.markModified('completedCourses');
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Course learning progress updated successfully',
      progress: progress.completedCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};