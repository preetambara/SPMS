# 🎓 Student Performance Management System (SPMS)

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![ESLint](https://img.shields.io/badge/ESLint-10.10-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, modern web platform designed to streamline academic tracking, course administration, attendance logging, examinations, and performance analytics for educational institutions.

Built with a modular, **MERN-ready client architecture**, SPMS provides dedicated role-tailored portals for **Students**, **Faculty Members**, and **Institutional Administrators**.

---

## 📑 Table of Contents

- [✨ Key Features by Role](#-key-features-by-role)
  - [Student Portal](#-student-portal)
  - [Faculty Portal](#-faculty-portal)
  - [Administrator Console](#-administrator-console)
- [🔑 Demo Login Credentials](#-demo-login-credentials)
- [🏛 Architecture & Directory Layout](#-architecture--directory-layout)
- [🛠 Tech Stack & Design System](#-tech-stack--design-system)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Available Scripts](#available-scripts)
- [🔌 Backend API Integration (MERN)](#-backend-api-integration-mern)
- [🔮 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)

---

## ✨ Key Features by Role

### 🎓 Student Portal
- **Interactive Dashboard**: Real-time summary of today's schedule, pending assignment deadlines, attendance percentage, and recent assessment scores.
- **Academic Profile**: Comprehensive student record including enrollment ID, program, semester, section, batch, contact, and guardian details.
- **Course Center**: Enrolled subjects overview with syllabus completion progress bars, assigned professors, and credit breakdowns.
- **Attendance Tracker**: Visual donut gauges and monthly attendance percentage trends with subject-by-subject present/absent logs.
- **Assignment Submissions**: Submission manager with status filters (Pending, Submitted, Graded) and direct attachment uploads.
- **Examinations & Schedules**: Upcoming exam timetables, room assignments, reporting times, and previous exam records.
- **Results & CGPA Analytics**: Semester-wise marks sheets, SGPA/CGPA calculations, and grade distributions.
- **Notice Board**: Instant announcements from the administration and faculty with category tags.

### 👨‍🏫 Faculty Portal
- **Faculty Command Center**: Today's class schedule, quick actions (Mark Attendance, Add Assignment, Enter Grades), and class performance overviews.
- **Subject Management**: Overview of assigned course sections, student counts, and active syllabus coverage.
- **Attendance Register**: Bulk student roll-call with One-Click "Mark All Present" and individual attendance toggling.
- **Assignments Manager**: Create, schedule, publish drafts, and evaluate student homework and project submissions.
- **Examination Coordinator**: Schedule mid-semester and end-semester tests, set maximum marks, and allot examination halls.
- **Grading Suite**: Tabular gradebook with real-time grade computation (`O`, `A+`, `A`, `B+`, etc.) and instant result publishing.
- **Student Roster**: Student directory with individual academic standings and contact information.

### 🛡 Administrator Console
- **Executive Overview**: High-level institutional metrics, total student/faculty headcounts, active departments, and system activity logs.
- **Student Information System (SIS)**: Directory with filters, admission modal for onboarding new students, and CSV export.
- **Faculty Directory**: Manage faculty appointments, designations, departments, and active statuses.
- **Curriculum & Subjects**: Manage university courses, course codes, syllabus credits, and faculty allocations.
- **Campus Announcement Hub**: Compose and publish campus-wide or role-targeted announcements with live broadcast.

---

## 🔑 Demo Login Credentials

You can test any role immediately. The login screen provides pre-filled demo role buttons:

| Role | Roll No / ID | Demo Password | Portal URL |
|:---|:---|:---|:---|
| 🎓 **Student** | `STU2024001` | `student123` | `/student/dashboard` |
| 👨‍🏫 **Faculty** | `FAC2019002` | `faculty123` | `/faculty/dashboard` |
| 🛡 **Administrator** | `ADM2024001` | `admin123` | `/admin/dashboard` |

---

## 🏛 Architecture & Directory Layout

The application is structured to follow **industry-standard MERN frontend architecture**, enforcing separation of concerns between API networking, state management, reusable UI primitives, custom hooks, and route configurations:

```
SPMS/
├── .env.example             # Template environment variables for API configuration
├── .env                     # Local environment configuration
├── index.html               # Single-page application entry HTML
├── package.json             # NPM dependencies, scripts, and engine specs
├── vite.config.js           # Vite build tool and plugin configuration
├── eslint.config.js         # ESLint flat configuration (React 19, React-Hooks, Refresh)
│
└── src/
    ├── api/ & services/     # REST API Service Layer
    │   ├── apiClient.js     # Base HTTP client with JWT interceptor & offline fallback
    │   ├── authService.js   # Authentication, session validation, & token storage
    │   ├── studentService.js# Student records, courses, exams, & results endpoints
    │   ├── facultyService.js# Faculty class management, grading, & attendance endpoints
    │   ├── adminService.js  # Administrative CRUD endpoints for students & faculty
    │   ├── noticeService.js # University notice board announcements
    │   └── index.js         # Barrel export for all services
    │
    ├── components/
    │   ├── common/          # Atomic, reusable UI design system
    │   │   ├── Avatar.jsx      # Initials-based colored avatar generator
    │   │   ├── Badge.jsx       # Status and category badges
    │   │   ├── EmptyState.jsx  # Reusable zero-data illustration placeholder
    │   │   ├── Field.jsx       # Accessible form field wrapper with validation error
    │   │   ├── Modal.jsx       # Animated accessible dialog modal
    │   │   ├── PageHeader.jsx  # Consistent page title with action bar
    │   │   ├── Progress.jsx    # Visual percentage progress bar
    │   │   ├── StatCard.jsx    # Metric card with tint variations and trend tags
    │   │   ├── Tabs.jsx        # Tab navigation bar
    │   │   └── index.js        # Common components barrel export
    │   │
    │   ├── layout/          # Layout & Navigation wrappers
    │   │   ├── Layout.jsx      # Sidebar, topbar header, search, user dropdown & outlet
    │   │   └── index.js
    │   ├── Charts.jsx       # Pure SVG Line charts, Bar charts, & Donut gauges
    │   ├── Icon.jsx         # Lightweight SVG icon collection
    │   ├── Toast.jsx        # Notification host & toaster component
    │   └── UI.jsx           # Backward-compatibility layer for UI components
    │
    ├── constants/           # Centralized application constants & enums
    │   ├── roles.js         # Roles (STUDENT, FACULTY, ADMIN) and labels
    │   ├── routes.js        # Centralized path routing constants
    │   ├── apiEndpoints.js  # RESTful API route definitions
    │   ├── storageKeys.js   # LocalStorage key definitions
    │   └── index.js
    │
    ├── context/             # Global Application State Providers
    │   ├── AuthContext.jsx     # Authentication state, session handling, & logout
    │   ├── NoticesContext.jsx  # Dynamic notice updates & live broadcasting
    │   └── index.js
    │
    ├── hooks/               # Custom React Hooks
    │   ├── useAuth.js       # Hook to access current user & auth methods
    │   ├── useNotices.js    # Hook to access notice board items
    │   ├── useAsync.js      # Async handler for API requests (loading/data/error)
    │   ├── useDebounce.js   # Debounce hook for responsive search & filters
    │   └── index.js
    │
    ├── pages/               # Application Route Views
    │   ├── admin/           # Admin Dashboard, Students, Faculty, Subjects
    │   ├── faculty/         # Faculty Dashboard, Attendance, Assignments, Grades, etc.
    │   ├── student/         # Student Dashboard, Attendance, Results, Analytics, etc.
    │   ├── shared/          # Shared Notice Board view
    │   ├── Login.jsx        # Unified role-switching Login page
    │   └── Settings.jsx     # Profile settings, preferences, & password reset
    │
    ├── routes/              # Routing Architecture
    │   ├── AppRoutes.jsx       # Complete declarative route tree
    │   ├── ProtectedRoute.jsx  # Role-based route guard & authentication protection
    │   └── index.js
    │
    ├── utils/               # General Helper Functions
    │   ├── formatters.js    # Date, name initials, greeting, & percentage helpers
    │   ├── storage.js       # Safe localStorage JSON wrapper with exception safety
    │   ├── toast.js         # Imperative custom event toast dispatcher
    │   └── index.js
    │
    ├── App.jsx              # App root hosting Context Providers & AppRoutes
    ├── main.jsx             # React DOM entry point
    └── index.css            # Custom CSS design system with CSS custom properties
```

---

## 🛠 Tech Stack & Design System

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (lightning-fast HMR and optimized production bundles)
- **Routing**: [React Router 7](https://reactrouter.com/) (nested layouts, declarative routes, and route guards)
- **Styling**: Vanilla CSS Design System with CSS variables (`--primary`, `--navy`, `--slate`, `--surface`), modern typography (Inter), glassmorphism, and responsive CSS grid.
- **Visualizations**: Pure SVG data charts (Line charts, Bar charts, Donut progress gauges) — lightweight and zero third-party chart bundle bloat.
- **Icons**: Custom optimized SVG icon set.
- **Code Quality**: ESLint flat config with React Hooks & React Refresh rules.

---

## 🚀 Quick Start & Installation

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your system.
```bash
node -v
npm -v
```

### Installation Steps

1. **Clone or navigate to the repository:**
   ```bash
   git clone <repository-url>
   cd SPMS
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell: `Copy-Item .env.example .env`)*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the URL printed in your terminal).

---

### Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts the Vite development server with HMR. |
| **Production Build** | `npm run build` | Compiles and optimizes code into `/dist`. |
| **Preview Build** | `npm run preview` | Locally serves the production build for testing. |
| **Lint Check** | `npm run lint` | Runs ESLint to verify clean syntax and standards. |

---

## 🔌 Backend API Integration (MERN)

The frontend is fully prepared for an Express + MongoDB backend:

1. In `.env`, set your backend API base URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
2. The [`apiClient.js`](file:///c:/Users/ramch/Downloads/SPMS/SPMS/src/services/apiClient.js) automatically:
   - Prepends the base URL to all requests.
   - Automatically injects `Authorization: Bearer <token>` from localStorage.
   - Formats headers as `Content-Type: application/json`.
3. **Graceful Offline Fallback**: If the backend server is not running, the services automatically fall back to the built-in mock dataset (`src/data/mockData.js`), allowing full offline demonstration without crashes.

---

## 🔮 Future Enhancements

- [ ] Complete Node.js + Express + MongoDB backend with JWT token generation and bcrypt password hashing.
- [ ] Direct export of official student grade reports to PDF format.
- [ ] Dark Mode toggle with persistent CSS theme variables.
- [ ] Real-time web socket notifications for published assignments and examinations.
- [ ] SMS / Email integration for automated attendance warning alerts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for academic, personal, and commercial usage.
