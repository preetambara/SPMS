import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import NoticeBoard from "../pages/shared/NoticeBoard";
import { ROLES } from "../constants/roles";
import { ROUTES } from "../constants/routes";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import StudentProfile from "../pages/student/Profile";
import Courses from "../pages/student/Courses";
import StudentAttendance from "../pages/student/Attendance";
import StudentAssignments from "../pages/student/Assignments";
import StudentExams from "../pages/student/Examinations";
import Results from "../pages/student/Results";
import StudentPerformance from "../pages/student/Performance";

// Faculty Pages
import FacultyDashboard from "../pages/faculty/Dashboard";
import FacultyProfile from "../pages/faculty/Profile";
import FacultySubjects from "../pages/faculty/MySubjects";
import FacultyStudents from "../pages/faculty/Students";
import FacultyAttendance from "../pages/faculty/Attendance";
import FacultyAssignments from "../pages/faculty/Assignments";
import FacultyExams from "../pages/faculty/Examinations";
import Grades from "../pages/faculty/Grades";
import FacultyPerformance from "../pages/faculty/Performance";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminStudents from "../pages/admin/Students";
import AdminFaculty from "../pages/admin/Faculty";
import AdminSubjects from "../pages/admin/Subjects";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Student Portal Routes */}
      <Route
        path={ROUTES.STUDENT.ROOT}
        element={
          <ProtectedRoute role={ROLES.STUDENT}>
            <Layout portal={ROLES.STUDENT} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="courses" element={<Courses />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="examinations" element={<StudentExams />} />
        <Route path="results" element={<Results />} />
        <Route path="performance" element={<StudentPerformance />} />
        <Route path="notices" element={<NoticeBoard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Faculty Portal Routes */}
      <Route
        path={ROUTES.FACULTY.ROOT}
        element={
          <ProtectedRoute role={ROLES.FACULTY}>
            <Layout portal={ROLES.FACULTY} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="subjects" element={<FacultySubjects />} />
        <Route path="students" element={<FacultyStudents />} />
        <Route path="attendance" element={<FacultyAttendance />} />
        <Route path="assignments" element={<FacultyAssignments />} />
        <Route path="examinations" element={<FacultyExams />} />
        <Route path="grades" element={<Grades />} />
        <Route path="performance" element={<FacultyPerformance />} />
        <Route path="notices" element={<NoticeBoard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin Console Routes */}
      <Route
        path={ROUTES.ADMIN.ROOT}
        element={
          <ProtectedRoute role={ROLES.ADMIN}>
            <Layout portal={ROLES.ADMIN} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="faculty" element={<AdminFaculty />} />
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="notices" element={<NoticeBoard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRoutes;
