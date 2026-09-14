import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Progress } from "../../components/UI";
import { LineChart, Donut } from "../../components/Charts";
import { showToast } from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";
import { useNotices } from "../../hooks/useNotices";
import { TODAY_CLASSES, DEADLINES, STUDENT_SUBJECTS, ATTENDANCE, PERF_TREND } from "../../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const { notices } = useNotices();
  const nav = useNavigate();
  const h = new Date().getHours();
  const greet = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  
  return (
    <>
      <PageHeader
        title={`${greet}, ${user.name.split(" ")[0]} 👋`}
        subtitle="Here's what's happening with your academics today."
        actions={
          <>
            <button className="btn btn-outline" onClick={() => showToast("Weekly report downloaded")}><Icon name="download" size={16} />Download Report</button>
            <button className="btn btn-primary" onClick={() => nav("assignments")}><Icon name="clipboard" size={16} />My Assignments</button>
          </>
        }
      />

      <div className="grid g-4">
        <StatCard icon="calendar-check" tint="blue" label="Attendance" value={ATTENDANCE.overall + "%"} trend="+2.1% this month" />
        <StatCard icon="award" tint="purple" label="CGPA" value="8.42" trend="Top 12% of class" />
        <StatCard icon="clipboard" tint="amber" label="Pending Assignments" value="3" trend="2 due this week" warn />
        <StatCard icon="file-text" tint="green" label="Upcoming Exams" value="3" trend="Mid-sem from 12 Mar" />
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb">
            <div><div className="card-title">Performance Trend</div><div className="muted card-sub">Your scores across recent assessments</div></div>
            <Badge variant="success">+6% upward</Badge>
          </div>
          <LineChart data={PERF_TREND.data} labels={PERF_TREND.labels} />
        </div>
        <div className="card card-pad col" style={{ alignItems: "center", gap: 14 }}>
          <div className="card-title" style={{ alignSelf: "flex-start" }}>Attendance Overview</div>
          <Donut value={ATTENDANCE.overall} label={ATTENDANCE.overall + "%"} sublabel="Overall" />
          <div className="row" style={{ gap: 22, marginTop: 4 }}>
            <div className="col" style={{ alignItems: "center" }}><strong>{ATTENDANCE.present}</strong><span className="muted" style={{ fontSize: 12 }}>Present</span></div>
            <div className="col" style={{ alignItems: "center" }}><strong>{ATTENDANCE.absent}</strong><span className="muted" style={{ fontSize: 12 }}>Absent</span></div>
            <div className="col" style={{ alignItems: "center" }}><strong>{ATTENDANCE.leaves}</strong><span className="muted" style={{ fontSize: 12 }}>Leaves</span></div>
          </div>
          <button className="btn btn-outline btn-sm" style={{ width: "100%" }} onClick={() => nav("attendance")}>View Details</button>
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Today's Classes</div><Badge variant="info">{TODAY_CLASSES.length} classes</Badge></div>
          {TODAY_CLASSES.map((c) => (
            <div className="sched-row" key={c.time}>
              <div className="sched-time">{c.time}</div>
              <div className="grow">
                <div style={{ fontWeight: 600 }}>{c.subject}</div>
                <div className="muted" style={{ fontSize: 13 }}>{c.type} • {c.room} • {c.faculty}</div>
              </div>
              <Badge variant={c.type === "Lab" ? "purple" : "info"}>{c.type}</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Upcoming Deadlines</div><Icon name="clock" size={16} color="var(--muted)" /></div>
          {DEADLINES.map((d) => (
            <div className="deadline-row" key={d.title}>
              <div className={"urgency " + d.urgency} />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.title}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{d.subject} • {d.due}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb">
            <div className="card-title">My Subjects</div>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("courses")}>View All <Icon name="chevron-right" size={14} /></button>
          </div>
          <div className="mini-subject-grid">
            {STUDENT_SUBJECTS.map((s) => (
              <div className="mini-subject" key={s.code}>
                <div className="spread"><Badge variant="muted">{s.code}</Badge><span className="muted" style={{ fontSize: 12 }}>{s.credits} Credits</span></div>
                <div style={{ fontWeight: 600, margin: "10px 0 2px", fontSize: 13.5 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12.5, marginBottom: 10 }}>{s.faculty}</div>
                <Progress value={s.progress} />
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{s.progress}% syllabus covered</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Announcements</div><Icon name="bell" size={16} color="var(--muted)" /></div>
          {(notices || []).slice(0, 4).map((n) => (
            <div className="notice-item" key={n.title}>
              <strong style={{ fontSize: 13.5 }}>{n.title}</strong>
              <p className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>{n.body}</p>
              <span className="muted" style={{ fontSize: 11.5 }}>{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}