export const API_ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh-token",
  },
  STUDENT: {
    PROFILE: "/students/profile",
    DASHBOARD: "/students/dashboard",
    COURSES: "/students/courses",
    ATTENDANCE: "/students/attendance",
    ASSIGNMENTS: "/students/assignments",
    EXAMINATIONS: "/students/examinations",
    RESULTS: "/students/results",
    PERFORMANCE: "/students/performance",
  },
  FACULTY: {
    PROFILE: "/faculty/profile",
    DASHBOARD: "/faculty/dashboard",
    SUBJECTS: "/faculty/subjects",
    STUDENTS: "/faculty/students",
    ATTENDANCE: "/faculty/attendance",
    ASSIGNMENTS: "/faculty/assignments",
    EXAMINATIONS: "/faculty/examinations",
    GRADES: "/faculty/grades",
    PERFORMANCE: "/faculty/performance",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    STUDENTS: "/admin/students",
    FACULTY: "/admin/faculty",
    SUBJECTS: "/admin/subjects",
  },
  NOTICES: {
    BASE: "/notices",
    BY_ID: (id) => `/notices/${id}`,
  },
});
