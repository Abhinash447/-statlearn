import User from "../models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const competencies = user.competencyProfile || [];

    // Calculate overall competency
    const overallCompetency =
      competencies.length > 0
        ? Math.round(
            competencies.reduce(
              (total, competency) =>
                total + Number(competency.score || 0),
              0
            ) / competencies.length
          )
        : 0;

    // Find skill gaps
    const skillGaps = competencies
      .filter(
        (competency) =>
          Number(competency.score || 0) < 80
      )
      .sort(
        (a, b) =>
          Number(a.score || 0) -
          Number(b.score || 0)
      );

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        department: user.department,
      },

      competency: {
        overall: overallCompetency,
        skillsAssessed: competencies.length,
        profile: competencies,
        skillGaps,
      },

      training: {
        completed: 0,
        modules: [],
      },

      quiz: {
        latest: null,
      },
    });

  } catch (error) {
    console.error(
      "Dashboard Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to load dashboard data.",
    });
  }
};