import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastHost } from "./components/Toast";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import Courses from "./pages/student/Courses";
import StudentAttendance from "./pages/student/Attendance";
import StudentAssignments from "./pages/student/Assignments";
import StudentExams from "./pages/student/Examinations";
import Results from "./pages/student/Results";
import StudentPerformance from "./pages/student/Performance";

import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyProfile from "./pages/faculty/Profile";
import FacultySubjects from "./pages/faculty/MySubjects";
import FacultyStudents from "./pages/faculty/Students";
import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyAssignments from "./pages/faculty/Assignments";
import FacultyExams from "./pages/faculty/Examinations";
import Grades from "./pages/faculty/Grades";
import FacultyPerformance from "./pages/faculty/Performance";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminFaculty from "./pages/admin/Faculty";
import AdminSubjects from "./pages/admin/Subjects";

import { NoticesProvider } from "./context/NoticesContext";
import NoticeBoard from "./pages/shared/NoticeBoard";

function Protected({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <NoticesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/student" element={<Protected role="student"><Layout portal="student" /></Protected>}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="examinations" element={<StudentExams />} />
              <Route path="results" element={<Results />} />
              <Route path="performance" element={<StudentPerformance />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="/faculty" element={<Protected role="faculty"><Layout portal="faculty" /></Protected>}>
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
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="/admin" element={<Protected role="admin"><Layout portal="admin" /></Protected>}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="notices" element={<NoticeBoard />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <ToastHost />
        </BrowserRouter>
      </NoticesProvider>
    </AuthProvider>
  );
}