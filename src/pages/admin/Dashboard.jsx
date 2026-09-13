import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge } from "../../components/UI";
import { LineChart, BarChart } from "../../components/Charts";
import { useAuth } from "../../context/AuthContext";
import { ADMIN } from "../../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const nav = useNavigate();

  const quick = [
    { icon: "plus", label: "Add Student", go: () => nav("/admin/students") },
    { icon: "users", label: "Add Faculty", go: () => nav("/admin/faculty") },
    { icon: "bell", label: "Post Notice", go: () => nav("/admin/notices") },
    { icon: "download", label: "Generate Reports", go: () => {} },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome, ${user.name}`}
        subtitle="Institute-wide overview and quick administration"
        actions={<button className="btn btn-outline" onClick={() => { quick[3].go(); }}><Icon name="download" size={16} />Generate Reports</button>}
      />

      <div className="grid g-4">
        <StatCard icon="users" tint="blue" label="Total Students" value={ADMIN.stats.students.toLocaleString()} trend="+32 this month" />
        <StatCard icon="user" tint="purple" label="Faculty Members" value={ADMIN.stats.faculty} trend="6 departments" />
        <StatCard icon="book" tint="green" label="Active Subjects" value={ADMIN.stats.subjects} trend="Semester 4 running" />
        <StatCard icon="calendar-check" tint="amber" label="Avg Attendance" value={ADMIN.stats.attendance + "%"} trend="+1.2% vs last month" />
      </div>

      <div className="mt">
        <div className="card-title" style={{ marginBottom: 12 }}>Quick Actions</div>
        <div className="qa-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {quick.map((q) => (
            <button className="qa-tile" key={q.label} onClick={q.go}>
              <div className="qa-icon"><Icon name={q.icon} size={18} /></div>
              <strong>{q.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Students by Department</div><Badge variant="muted">Current session</Badge></div>
          <BarChart labels={ADMIN.dept.labels} data={ADMIN.dept.data} height={180} />
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Institute Attendance</div><Icon name="trending" size={16} color="var(--muted)" /></div>
          <LineChart data={ADMIN.trend.data} labels={ADMIN.trend.labels} height={180} />
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Recent Activity</div><Icon name="refresh" size={16} color="var(--muted)" /></div>
          <div className="timeline">
            {ADMIN.activity.map((a, i) => (
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
          <div className="spread mb"><div className="card-title">Latest Notices</div>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("/admin/notices")}>View All</button></div>
          {ADMIN.notices.slice(0, 3).map((n) => (
            <div className="notice-item" key={n.title}>
              <strong style={{ fontSize: 13.5 }}>{n.title}</strong>
              <p className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>{n.date} • {n.audience}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}