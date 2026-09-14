import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { PageHeader, Badge } from "../../components/UI";
import { FACULTY_SUBJECTS } from "../../data/mockData";

export default function MySubjects() {
  const nav = useNavigate();
  const go = (path) => () => nav(path);

  return (
    <>
      <PageHeader title="My Subjects" subtitle="Subjects assigned to you this semester — manage everything from here" />

      <div className="grid g-2">
        {FACULTY_SUBJECTS.map((s, i) => (
          <div className="card card-pad" key={i}>
            <div className="spread">
              <div className="row">
                <Badge variant="info">{s.code}</Badge>
                <Badge variant="purple">{s.section}</Badge>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <h3 style={{ margin: "13px 0 4px", fontSize: 16.5 }}>{s.name}</h3>
            <div className="muted" style={{ fontSize: 13 }}>{s.semester} • {s.credits} Credits • {s.schedule}</div>

            <div className="row" style={{ gap: 10, margin: "16px 0", flexWrap: "wrap" }}>
              <span className="mini-subject" style={{ padding: "8px 13px", display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600 }}>
                <Icon name="users" size={14} color="var(--primary)" />{s.students} Students
              </span>
              <span className="mini-subject" style={{ padding: "8px 13px", display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600 }}>
                <Icon name="calendar-check" size={14} color="#0E9F6E" />{s.attendance}% Attendance
              </span>
              <span className="mini-subject" style={{ padding: "8px 13px", display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600 }}>
                <Icon name="clipboard" size={14} color="#D97706" />{s.pending} Pending
              </span>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={go("/faculty/students")}><Icon name="users" size={13} />Students</button>
              <button className="btn btn-outline btn-sm" onClick={go("/faculty/attendance")}><Icon name="calendar-check" size={13} />Attend.</button>
              <button className="btn btn-outline btn-sm" onClick={go("/faculty/assignments")}><Icon name="clipboard" size={13} />Assign.</button>
              <button className="btn btn-outline btn-sm" onClick={go("/faculty/grades")}><Icon name="award" size={13} />Grades</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}