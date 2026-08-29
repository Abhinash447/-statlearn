import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import Dashboard from "./pages/Dashboard/Dashboard";
import SkillSelection from "./pages/SkillSelection/SkillSelection";
import SkillAssessment from "./pages/SkillAssessment/SkillAssessment";
import Assessment from "./pages/Assessment/Assessment";
import AssessmentResult from "./pages/AssessmentResult/AssessmentResult";
import Quiz from "./pages/Quiz/Quiz";
import Training from "./pages/Training/Training";
import TrainingModule from "./pages/TrainingModule/TrainingModule";
import Progress from "./pages/Progress/Progress";
import SkillGaps from "./pages/SkillGaps/SkillGaps";


import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/student-dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/skill-selection"
          element={<SkillSelection />}
        />

        <Route
          path="/skill-assessment"
          element={<SkillAssessment />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/assessment-result"
          element={<AssessmentResult />}
        />

        <Route
          path="/assessment-result/:assessmentId"
          element={<AssessmentResult />}
        />

        <Route
          path="/skill-gaps"
          element={<SkillGaps />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/training"
          element={<Training />}
        />

        <Route
          path="/training/module"
          element={<TrainingModule />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/faculty-dashboard"
          element={<FacultyDashboard />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;