import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge } from "../../components/UI";
import { Donut } from "../../components/Charts";
import { showToast } from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";
import { useNotices } from "../../hooks/useNotices";
import { FACULTY_CLASSES, FACULTY_SUBJECTS, FACULTY_ACTIVITY, FACULTY_DEADLINES, CLASS_PERF } from "../../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const { notices } = useNotices();
  const nav = useNavigate();
  const h = new Date().getHours();
  const greet = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";

  const quick = [
    { icon: "plus", label: "Add Assignment", go: () => nav("/faculty/assignments") },
    { icon: "calendar-check", label: "Mark Attendance", go: () => nav("/faculty/attendance") },
    { icon: "file-text", label: "Add Exam", go: () => nav("/faculty/examinations") },
    { icon: "award", label: "Enter Grades", go: () => nav("/faculty/grades") },
    { icon: "upload", label: "Upload Materials", go: () => showToast("Material upload started") },
  ];

  return (
    <>
      <PageHeader
        title={`${greet}, ${user.name}`}
        subtitle="Monday, 17 February 2025 • Here's your day at a glance"
        actions={<button className="btn btn-outline" onClick={() => showToast("Schedule exported")}><Icon name="download" size={16} />Export Schedule</button>}
      />

      <div className="grid g-4">
        <StatCard icon="users" tint="blue" label="Total Students" value="248" trend="Across 4 subjects" />
        <StatCard icon="book" tint="purple" label="Subjects Assigned" value={FACULTY_SUBJECTS.length} trend="Semester 4" />
        <StatCard icon="clipboard" tint="amber" label="Pending Evaluations" value="18" trend="Due this week" warn />
        <StatCard icon="file-text" tint="green" label="Upcoming Exams" value="3" trend="Mid-sem from 12 Mar" />
      </div>

      <div className="mt">
        <div className="card-title" style={{ marginBottom: 12 }}>Quick Actions</div>
        <div className="qa-grid">
          {quick.map((q) => (
            <button className="qa-tile" key={q.label} onClick={q.go}>
              <div className="qa-icon"><Icon name={q.icon} size={18} /></div>
              <strong>{q.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card">
          <div className="spread card-pad" style={{ paddingBottom: 8 }}>
            <div><div className="card-title">Today's Classes</div><div className="card-sub">Monday • 3 sessions</div></div>
            <Badge variant="info">Timetable</Badge>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Time</th><th>Subject</th><th>Class / Section</th><th>Type</th><th>Room</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {FACULTY_CLASSES.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{c.time}</td>
                    <td style={{ fontWeight: 600 }}>{c.subject}</td>
                    <td className="muted">{c.cls}</td>
                    <td><Badge variant={c.type === "Lab" ? "purple" : "info"}>{c.type}</Badge></td>
                    <td className="muted">{c.room}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-primary btn-sm" onClick={() => nav("/faculty/attendance")}>
                        <Icon name="calendar-check" size={13} />{c.action === "attendance" ? "Take Attendance" : "View Details"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-pad col" style={{ alignItems: "center", gap: 12 }}>
          <div className="card-title" style={{ alignSelf: "flex-start" }}>Class Performance</div>
          <Donut value={CLASS_PERF.avg} label={CLASS_PERF.avg + "%"} sublabel="Class Average" size={140} />
          <div className="row" style={{ gap: 20 }}>
            <div className="col" style={{ alignItems: "center" }}><strong style={{ color: "#0E9F6E" }}>{CLASS_PERF.highest}%</strong><span className="muted" style={{ fontSize: 12 }}>Highest</span></div>
            <div className="col" style={{ alignItems: "center" }}><strong>{CLASS_PERF.pass}%</strong><span className="muted" style={{ fontSize: 12 }}>Pass Rate</span></div>
          </div>
          <button className="btn btn-outline btn-sm" style={{ width: "100%" }} onClick={() => nav("/faculty/performance")}>View Analytics</button>
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">My Subjects</div>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("/faculty/subjects")}>View All <Icon name="chevron-right" size={14} /></button></div>
          <div className="mini-subject-grid">
            {FACULTY_SUBJECTS.map((s, i) => (
              <div className="mini-subject" key={i}>
                <div className="spread"><Badge variant="info">{s.code} • {s.section.replace("Section ", "Sec ")}</Badge><span className="muted" style={{ fontSize: 12 }}>{s.credits} Credits</span></div>
                <div style={{ fontWeight: 600, margin: "10px 0 2px", fontSize: 13.5 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12.5, marginBottom: 10 }}>{s.students} students • {s.schedule}</div>
                <div className="row" style={{ gap: 8 }}>
                  <Badge variant="success">{s.attendance}% Att.</Badge>
                  {s.pending > 0 && <Badge variant="warning">{s.pending} pending</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Upcoming Deadlines</div><Icon name="clock" size={16} color="var(--muted)" /></div>
          {FACULTY_DEADLINES.map((d) => (
            <div className="deadline-row" key={d.title}>
              <div className={"urgency " + d.urgency} />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.title}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{d.meta}</div>
              </div>
              <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{d.due}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Recent Activity</div><Icon name="refresh" size={16} color="var(--muted)" /></div>
          <div className="timeline">
            {FACULTY_ACTIVITY.map((a, i) => (
              <div className="t-item" key={i}>
                <div className="t-dot"><Icon name={a.icon} size={15} /></div>
                <div className="grow">
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.text}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Announcements</div><Icon name="bell" size={16} color="var(--muted)" /></div>
          {(notices || []).slice(0, 4).map((n) => (
            <div className="notice-item" key={n.title}>
              <strong style={{ fontSize: 13.5 }}>{n.title}</strong>
              <p className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>{n.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}