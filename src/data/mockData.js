export const STUDENT = {
  name: "Aarav Sharma", id: "STU2024001", roll: "CS2024031", enrollment: "UNI2024001",
  program: "B.Tech Computer Science & Engineering", dept: "Computer Science & Engineering",
  batch: "2023 – 2027", admissionYear: "2023", semester: "Semester 4", section: "B",
  dob: "14 Aug 2005", gender: "Male", phone: "+91 98765 43210",
  email: "aarav.sharma@university.edu",
  address: "24, Green Park Residency, Sector 12, Pune, Maharashtra – 411001",
  guardian: "Rajesh Sharma", emergency: "+91 98230 11223",
  created: "12 Jul 2023", lastLogin: "Today, 09:12 AM",
};

export const FACULTY = {
  name: "Dr. Rohan Mehta", employeeId: "FAC2019002", designation: "Associate Professor",
  department: "Computer Science & Engineering", email: "rohan.mehta@university.edu",
  phone: "+91 98450 22110", location: "Pune, Maharashtra", joiningDate: "12 June 2019",
  status: "Active", type: "Full-Time", experience: "6+ Years",
  dob: "22 Jul 1985", gender: "Male",
  office: "Room 214, CS Department Block, University Campus",
  address: "Sai Residency, Baner Road, Pune, Maharashtra – 411045",
};

export const STUDENT_SUBJECTS = [
  { code: "CS301", name: "Database Management Systems", faculty: "Dr. Rohan Mehta", credits: 4, progress: 68, attendance: 91 },
  { code: "CS302", name: "Computer Networks", faculty: "Prof. Anita Desai", credits: 4, progress: 61, attendance: 85 },
  { code: "CS303", name: "Artificial Intelligence", faculty: "Dr. Vikram Singh", credits: 3, progress: 57, attendance: 87 },
  { code: "CS304", name: "Software Engineering", faculty: "Prof. Meera Iyer", credits: 3, progress: 52, attendance: 83 },
  { code: "CS305", name: "Operating Systems", faculty: "Dr. Rohan Mehta", credits: 4, progress: 64, attendance: 93 },
  { code: "CS306", name: "Web Technologies", faculty: "Prof. Sanjay Gupta", credits: 3, progress: 48, attendance: 78 },
];

export const TODAY_CLASSES = [
  { time: "09:00", subject: "Database Management Systems", type: "Lecture", room: "Room 304", faculty: "Dr. Rohan Mehta" },
  { time: "11:00", subject: "Computer Networks", type: "Lab", room: "Networks Lab-2", faculty: "Prof. Anita Desai" },
  { time: "14:00", subject: "Software Engineering", type: "Tutorial", room: "Room 210", faculty: "Prof. Meera Iyer" },
];

export const DEADLINES = [
  { title: "ER Diagram & Normalization", subject: "DBMS • CS301", due: "Due 28 Feb", urgency: "high" },
  { title: "Networking Lab Report", subject: "CN • CS302", due: "Due 02 Mar", urgency: "med" },
  { title: "AI Case Study Submission", subject: "AI • CS303", due: "Due 05 Mar", urgency: "med" },
  { title: "Scholarship Application Form", subject: "Administration", due: "Due 10 Mar", urgency: "low" },
];

export const NOTICES = [
  { title: "Mid-Semester Examination Schedule Released", body: "The mid-sem timetable for Semester 4 is now available on the Examinations page.", date: "10 Feb 2025 • Exam Cell" },
  { title: "Semester Fee Payment Window Open", body: "Fee payment for the current semester is open until 28 February 2025.", date: "08 Feb 2025 • Accounts" },
  { title: "Annual Tech Fest Registration", body: "Register for TechNova'25 events before 20 February. Limited slots per event.", date: "05 Feb 2025 • Student Council" },
];

export const ATTENDANCE = {
  overall: 87, present: 238, absent: 9, total: 247, leaves: 14,
  monthly: { labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"], data: [92, 88, 90, 84, 86, 85, 91] },
  subjects: [
    { code: "CS301", name: "Database Management Systems", present: 42, total: 46 },
    { code: "CS302", name: "Computer Networks", present: 39, total: 46 },
    { code: "CS303", name: "Artificial Intelligence", present: 40, total: 46 },
    { code: "CS304", name: "Software Engineering", present: 38, total: 46 },
    { code: "CS305", name: "Operating Systems", present: 43, total: 46 },
    { code: "CS306", name: "Web Technologies", present: 36, total: 46 },
  ],
  recent: [
    { date: "14 Feb", subject: "Operating Systems", status: "P" },
    { date: "13 Feb", subject: "Database Management Systems", status: "P" },
    { date: "13 Feb", subject: "Computer Networks", status: "A" },
    { date: "12 Feb", subject: "Artificial Intelligence", status: "P" },
    { date: "12 Feb", subject: "Software Engineering", status: "P" },
    { date: "11 Feb", subject: "Web Technologies", status: "A" },
    { date: "11 Feb", subject: "Operating Systems", status: "P" },
    { date: "10 Feb", subject: "Database Management Systems", status: "P" },
  ],
};

export const STUDENT_ASSIGNMENTS = [
  { id: 1, title: "ER Diagram & Normalization", subject: "DBMS • CS301", due: "28 Feb 2025", marks: 20, status: "Pending" },
  { id: 2, title: "Networking Lab Report", subject: "CN • CS302", due: "02 Mar 2025", marks: 10, status: "Pending" },
  { id: 3, title: "AI Case Study", subject: "AI • CS303", due: "05 Mar 2025", marks: 15, status: "Pending" },
  { id: 4, title: "SDLC Models Report", subject: "SE • CS304", due: "20 Feb 2025", marks: 20, scored: 17, status: "Graded" },
  { id: 5, title: "CPU Scheduling Simulation", subject: "OS • CS305", due: "18 Feb 2025", marks: 25, scored: 22, status: "Graded" },
  { id: 6, title: "Portfolio Website", subject: "WT • CS306", due: "10 Feb 2025", marks: 50, scored: 45, status: "Graded" },
  { id: 7, title: "Subnetting Problem Set", subject: "CN • CS302", due: "15 Feb 2025", marks: 10, status: "Submitted" },
];

export const UPCOMING_EXAMS = [
  { subject: "Database Management Systems", code: "CS301", type: "Mid-Semester", date: "12 Mar 2025", day: "12", month: "Mar", time: "10:00 AM", duration: "2 hours", room: "Hall A-2" },
  { subject: "Computer Networks", code: "CS302", type: "Mid-Semester", date: "14 Mar 2025", day: "14", month: "Mar", time: "10:00 AM", duration: "2 hours", room: "Hall A-2" },
  { subject: "Artificial Intelligence", code: "CS303", type: "Mid-Semester", date: "17 Mar 2025", day: "17", month: "Mar", time: "02:00 PM", duration: "2 hours", room: "Hall B-1" },
];

export const PAST_EXAMS = [
  { exam: "Internal Assessment I", subject: "DBMS • CS301", date: "04 Feb 2025", marks: "22 / 25", status: "Published" },
  { exam: "OS Quiz 1", subject: "OS • CS305", date: "22 Feb 2025", marks: "19 / 25", status: "Published" },
  { exam: "Internal Assessment I", subject: "CN • CS302", date: "06 Feb 2025", marks: "19 / 25", status: "Published" },
];

export const RESULTS = [
  { subject: "Database Management Systems", code: "CS301", internal: 22, mid: 20, end: 46, total: 88, grade: "A" },
  { subject: "Computer Networks", code: "CS302", internal: 19, mid: 17, end: 40, total: 76, grade: "B+" },
  { subject: "Artificial Intelligence", code: "CS303", internal: 24, mid: 22, end: 48, total: 94, grade: "A+" },
  { subject: "Software Engineering", code: "CS304", internal: 20, mid: 18, end: 42, total: 80, grade: "A" },
  { subject: "Operating Systems", code: "CS305", internal: 21, mid: 19, end: 44, total: 84, grade: "A" },
  { subject: "Web Technologies", code: "CS306", internal: 18, mid: 15, end: 38, total: 71, grade: "B+" },
];

export const PERF_TREND = {
  data: [68, 74, 71, 78, 82],
  labels: ["Internal I", "Internal II", "Quiz Avg", "Mid Sem", "Assignments"],
  strengths: [
    "Consistent topper in Database Management Systems",
    "Top 10% of class in AI assessments",
    "Excellent lab record in Operating Systems",
  ],
  improve: [
    "Web Technologies — revise JavaScript frameworks",
    "Computer Networks — practice subnetting numericals",
    "Attempt more timed mock tests before exams",
  ],
};

export const FACULTY_SUBJECTS = [
  { code: "CS301", name: "Database Management Systems", section: "Section B", semester: "Semester 4", students: 64, attendance: 87, pending: 12, credits: 4, schedule: "Mon / Wed / Fri • 09:00 AM" },
  { code: "CS301", name: "Database Management Systems", section: "Section C", semester: "Semester 4", students: 61, attendance: 84, pending: 10, credits: 4, schedule: "Tue / Thu • 11:00 AM" },
  { code: "CS305", name: "Operating Systems", section: "Section A", semester: "Semester 4", students: 58, attendance: 91, pending: 8, credits: 4, schedule: "Mon / Wed • 11:00 AM" },
  { code: "CS301L", name: "DBMS Laboratory", section: "Section B", semester: "Semester 4", students: 64, attendance: 89, pending: 4, credits: 2, schedule: "Thursday • 02:00 PM" },
];

export const FACULTY_CLASSES = [
  { time: "09:00", subject: "Database Management Systems", cls: "CS301 • Section B", type: "Lecture", room: "Room 304", action: "attendance" },
  { time: "11:00", subject: "Operating Systems", cls: "CS305 • Section A", type: "Lab", room: "Lab-2", action: "attendance" },
  { time: "14:00", subject: "Database Management Systems", cls: "CS301 • Section C", type: "Tutorial", room: "Room 210", action: "details" },
];

export const FACULTY_ACTIVITY = [
  { icon: "check-circle", text: "Attendance marked for DBMS — Section B", time: "10 min ago" },
  { icon: "upload", text: "Slides uploaded for Operating Systems", time: "1 hr ago" },
  { icon: "edit", text: "Evaluated 14 submissions of ER Diagram assignment", time: "3 hrs ago" },
  { icon: "plus", text: 'Created assignment "Normalization Exercise Set 2"', time: "Yesterday" },
  { icon: "award", text: "Internal I grades published for CS305 — Section A", time: "2 days ago" },
];

export const FACULTY_DEADLINES = [
  { title: "Evaluate: ER Diagram submissions", meta: "CS301-B • 16 pending", due: "Tomorrow", urgency: "high" },
  { title: "Mid-Sem Exam — DBMS (Invigilation)", meta: "Hall A-2 • 10:00 AM", due: "12 Mar", urgency: "med" },
  { title: "Internal II marks entry", meta: "CS301-C • Before 20 Mar", due: "18 Mar", urgency: "low" },
];

export const FACULTY_STUDENTS = [
  { roll: "CS2024001", name: "Diya Patel", email: "diya.patel@university.edu", att: 94, avg: 86 },
  { roll: "CS2024002", name: "Kabir Singh", email: "kabir.singh@university.edu", att: 81, avg: 74 },
  { roll: "CS2024003", name: "Sneha Kulkarni", email: "sneha.k@university.edu", att: 89, avg: 79 },
  { roll: "CS2024004", name: "Ishita Rao", email: "ishita.rao@university.edu", att: 96, avg: 94 },
  { roll: "CS2024005", name: "Arjun Nair", email: "arjun.nair@university.edu", att: 77, avg: 69 },
  { roll: "CS2024006", name: "Ananya Reddy", email: "ananya.r@university.edu", att: 91, avg: 83 },
  { roll: "CS2024007", name: "Rohan Verma", email: "rohan.verma@university.edu", att: 62, avg: 41 },
  { roll: "CS2024008", name: "Priya Menon", email: "priya.menon@university.edu", att: 92, avg: 90 },
  { roll: "CS2024009", name: "Aditya Joshi", email: "aditya.j@university.edu", att: 71, avg: 47 },
  { roll: "CS2024010", name: "Neha Gupta", email: "neha.gupta@university.edu", att: 68, avg: 44 },
  { roll: "CS2024011", name: "Karan Malhotra", email: "karan.m@university.edu", att: 88, avg: 89 },
  { roll: "CS2024012", name: "Vikram Bose", email: "vikram.bose@university.edu", att: 84, avg: 76 },
  { roll: "CS2024013", name: "Meera Krishnan", email: "meera.k@university.edu", att: 95, avg: 88 },
  { roll: "CS2024031", name: "Aarav Sharma", email: "aarav.sharma@university.edu", att: 93, avg: 92 },
];

export const CLASS_PERF = {
  avg: 78, highest: 94, pass: 92, atRisk: 3,
  trend: { data: [72, 74, 71, 76, 78], labels: ["Internal I", "Quiz", "Assignment", "Internal II", "Mid Sem"] },
  dist: { labels: ["A+", "A", "B+", "B", "C", "D"], data: [6, 14, 18, 12, 8, 4] },
  subjects: { labels: ["DBMS", "OS", "DBMS Lab"], data: [81, 76, 85] },
  top: [
    { name: "Ishita Rao", roll: "CS2024004", avg: 94 }, { name: "Aarav Sharma", roll: "CS2024031", avg: 92 },
    { name: "Priya Menon", roll: "CS2024008", avg: 90 }, { name: "Karan Malhotra", roll: "CS2024011", avg: 89 },
  ],
  risk: [
    { name: "Rohan Verma", roll: "CS2024007", att: 62, avg: 41 },
    { name: "Neha Gupta", roll: "CS2024010", att: 68, avg: 44 },
    { name: "Aditya Joshi", roll: "CS2024009", att: 71, avg: 47 },
  ],
};

export const FACULTY_ASSIGNMENTS = [
  {
    id: 1, title: "ER Diagram & Normalization", subject: "CS301 — DBMS", cls: "Section B",
    due: "28 Feb 2025", marks: 20, submitted: 48, total: 64, status: "Published",
    subs: [
      { id: "s1", name: "Diya Patel", roll: "CS2024001", on: "26 Feb", file: "diya_er_sol.pdf", marks: "18", fb: "Excellent normalization analysis." },
      { id: "s2", name: "Kabir Singh", roll: "CS2024002", on: "27 Feb", file: "kabir_assignment1.pdf", marks: "", fb: "" },
      { id: "s3", name: "Ishita Rao", roll: "CS2024004", on: "25 Feb", file: "ishita_dbms.pdf", marks: "19", fb: "Very clear ER mapping." },
      { id: "s4", name: "Aarav Sharma", roll: "CS2024031", on: "27 Feb", file: "aarav_norm.pdf", marks: "", fb: "" },
    ],
  },
  {
    id: 2, title: "CPU Scheduling Simulation", subject: "CS305 — OS", cls: "Section A",
    due: "02 Mar 2025", marks: 25, submitted: 41, total: 58, status: "Published",
    subs: [
      { id: "s1", name: "Priya Menon", roll: "CS2024008", on: "01 Mar", file: "priya_sched.c", marks: "23", fb: "" },
      { id: "s2", name: "Aditya Joshi", roll: "CS2024009", on: "01 Mar", file: "aditya_os.zip", marks: "", fb: "" },
      { id: "s3", name: "Meera Krishnan", roll: "CS2024013", on: "28 Feb", file: "meera_sim.cpp", marks: "24", fb: "Great Gantt visualization." },
    ],
  },
  { id: 3, title: "Normalization Exercise Set 2", subject: "CS301 — DBMS", cls: "Section C", due: "05 Mar 2025", marks: 15, submitted: 33, total: 61, status: "Published", subs: [] },
  { id: 4, title: "DBMS Mini Project Proposal", subject: "CS301 — DBMS", cls: "Section B", due: "18 Mar 2025", marks: 30, submitted: 12, total: 64, status: "Published", subs: [] },
  { id: 5, title: "File Systems Reading Notes", subject: "CS305 — OS", cls: "Section A", due: "20 Feb 2025", marks: 10, submitted: 55, total: 58, status: "Closed", subs: [] },
];

export const FACULTY_EXAMS = [
  { exam: "Mid-Semester Examination", subject: "CS301 — DBMS", cls: "Section B", date: "12 Mar 2025", time: "10:00 AM", dur: "2 hours", room: "Hall A-2" },
  { exam: "Mid-Semester Examination", subject: "CS305 — OS", cls: "Section A", date: "14 Mar 2025", time: "10:00 AM", dur: "2 hours", room: "Hall B-1" },
  { exam: "Internal Assessment II", subject: "CS301 — DBMS", cls: "Section C", date: "18 Mar 2025", time: "09:00 AM", dur: "1 hour", room: "Room 210" },
];

export const FACULTY_PAST_EXAMS = [
  { exam: "Internal Assessment I", subject: "CS301 — DBMS", cls: "Section B", date: "04 Feb 2025", avg: 71, status: "Evaluated" },
  { exam: "OS Quiz 1", subject: "CS305 — OS", cls: "Section A", date: "22 Feb 2025", avg: 76, status: "Evaluated" },
];

export const ADMIN = {
  stats: { students: 1248, faculty: 86, subjects: 42, attendance: 89 },
  dept: { labels: ["CSE", "ECE", "ME", "CE", "IT"], data: [420, 298, 236, 154, 140] },
  trend: { labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"], data: [84, 86, 85, 87, 88, 89] },
  students: [
    { id: "STU2024001", name: "Aarav Sharma", program: "B.Tech CSE", sem: "4", sec: "B", status: "Active" },
    { id: "STU2024004", name: "Ishita Rao", program: "B.Tech CSE", sem: "4", sec: "B", status: "Active" },
    { id: "STU2024008", name: "Priya Menon", program: "B.Tech CSE", sem: "4", sec: "A", status: "Active" },
    { id: "STU2021012", name: "Vikram Bose", program: "B.Tech CSE", sem: "6", sec: "A", status: "Active" },
    { id: "STU2022044", name: "Sana Sheikh", program: "B.Tech ECE", sem: "4", sec: "C", status: "Active" },
    { id: "STU2020088", name: "Devansh Mehta", program: "B.Tech ME", sem: "8", sec: "A", status: "Active" },
    { id: "STU2023056", name: "Tanvi Kaur", program: "B.Tech IT", sem: "2", sec: "B", status: "Active" },
    { id: "STU2019023", name: "Farhan Ali", program: "B.Tech CE", sem: "10", sec: "A", status: "Inactive" },
  ],
  faculty: [
    { id: "FAC2019002", name: "Dr. Rohan Mehta", dept: "CSE", desig: "Associate Professor", subjects: 3, status: "Active" },
    { id: "FAC2016011", name: "Prof. Anita Desai", dept: "CSE", desig: "Professor", subjects: 2, status: "Active" },
    { id: "FAC2018015", name: "Dr. Vikram Singh", dept: "CSE", desig: "Associate Professor", subjects: 2, status: "Active" },
    { id: "FAC2020021", name: "Prof. Meera Iyer", dept: "CSE", desig: "Assistant Professor", subjects: 3, status: "Active" },
    { id: "FAC2017019", name: "Prof. Sanjay Gupta", dept: "CSE", desig: "Assistant Professor", subjects: 2, status: "Active" },
    { id: "FAC2015004", name: "Dr. S. Kulkarni", dept: "ME", desig: "Professor", subjects: 2, status: "On Leave" },
  ],
  subjects: [
    { code: "CS301", name: "Database Management Systems", dept: "CSE", credits: 4, faculty: "Dr. Rohan Mehta", students: 183 },
    { code: "CS302", name: "Computer Networks", dept: "CSE", credits: 4, faculty: "Prof. Anita Desai", students: 176 },
    { code: "CS303", name: "Artificial Intelligence", dept: "CSE", credits: 3, faculty: "Dr. Vikram Singh", students: 168 },
    { code: "CS304", name: "Software Engineering", dept: "CSE", credits: 3, faculty: "Prof. Meera Iyer", students: 171 },
    { code: "CS305", name: "Operating Systems", dept: "CSE", credits: 4, faculty: "Dr. Rohan Mehta", students: 179 },
    { code: "EC201", name: "Signals & Systems", dept: "ECE", credits: 4, faculty: "Prof. R. Menon", students: 142 },
    { code: "ME101", name: "Thermodynamics", dept: "ME", credits: 4, faculty: "Dr. S. Kulkarni", students: 131 },
    { code: "MA201", name: "Mathematics-III", dept: "Applied Sciences", credits: 4, faculty: "Dr. N. Sharma", students: 356 },
  ],
  notices: [
    { title: "Mid-Semester Examination Schedule Released", audience: "All Students", date: "10 Feb 2025", body: "The mid-sem timetable for all semesters is now published on the Examinations page. Check timings and halls carefully." },
    { title: "Faculty Meeting — Curriculum Review", audience: "Faculty", date: "08 Feb 2025", body: "All departments to attend the curriculum review meeting on 15 Feb, 3:00 PM in the Seminar Hall." },
    { title: "Semester Fee Payment Window Open", audience: "All Students", date: "05 Feb 2025", body: "Fee payment for the current semester is open until 28 February 2025 via the student portal." },
    { title: "Library Hours Extended During Exams", audience: "Everyone", date: "01 Feb 2025", body: "The central library will remain open until 11 PM from 10–20 March for exam preparation." },
  ],
  activity: [
    { icon: "users", text: "32 new student admissions verified", time: "1 hr ago" },
    { icon: "award", text: "Semester 3 results published by Exam Cell", time: "4 hrs ago" },
    { icon: "plus", text: "Subject CS306 assigned to Prof. Sanjay Gupta", time: "Yesterday" },
    { icon: "bell", text: "Notice posted: Library hours extended", time: "3 days ago" },
  ],
};

export const gradeFor = (t) =>
  t >= 90 ? "A+" : t >= 80 ? "A" : t >= 70 ? "B+" : t >= 60 ? "B" : t >= 50 ? "C" : t >= 40 ? "D" : "F";