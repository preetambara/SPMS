import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Badge, Avatar, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY_STUDENTS } from "../../data/mockData";

export default function Attendance() {
  const [subject, setSubject] = useState("CS301 — DBMS");
  const [section, setSection] = useState("Section B");
  const [date, setDate] = useState("2025-02-17");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(() =>
    Object.fromEntries(FACULTY_STUDENTS.map((s, i) => [s.roll, i % 7 === 3 ? "A" : "P"]))
  );

  const rows = FACULTY_STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.toLowerCase().includes(q.toLowerCase())
  );
  const present = Object.values(status).filter((v) => v === "P").length;
  const absent = FACULTY_STUDENTS.length - present;

  const markAll = () => {
    setStatus(Object.fromEntries(FACULTY_STUDENTS.map((s) => [s.roll, "P"])));
    showToast("All students marked present", "info");
  };
  const save = () => showToast(`Attendance saved • ${subject} ${section} • ${present} present, ${absent} absent`);

  return (
    <>
      <PageHeader
        title="Mark Attendance"
        subtitle="Select the class, pick a date and mark attendance in seconds"
        actions={
          <>
            <button className="btn btn-outline" onClick={markAll}><Icon name="check-circle" size={15} />Mark All Present</button>
            <button className="btn btn-primary" onClick={save}><Icon name="save" size={15} />Save Attendance</button>
          </>
        }
      />

      <div className="card toolbar">
        <label className="field" style={{ width: 210 }}><span>Subject</span>
          <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>CS301 — DBMS</option><option>CS305 — OS</option><option>CS301L — DBMS Lab</option>
          </select>
        </label>
        <label className="field" style={{ width: 150 }}><span>Class / Section</span>
          <select className="input" value={section} onChange={(e) => setSection(e.target.value)}>
            <option>Section B</option><option>Section C</option><option>Section A</option>
          </select>
        </label>
        <label className="field" style={{ width: 170 }}><span>Date</span>
          <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div className="search-box" style={{ maxWidth: 260, alignSelf: "flex-end", height: 42 }}>
          <Icon name="search" size={15} />
          <input placeholder="Search students..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="row" style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
          <Badge variant="success">{present} Present</Badge>
          <Badge variant="danger">{absent} Absent</Badge>
        </div>
      </div>

      <div className="card mt">
        <div className="table-wrap">
          {rows.length === 0 ? <EmptyState icon="users" title="No students found" /> : (
            <table>
              <thead><tr><th>Roll No</th><th>Student</th><th>Overall %</th><th>Today's Status</th></tr></thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.roll}>
                    <td className="muted" style={{ fontWeight: 600 }}>{s.roll}</td>
                    <td>
                      <div className="row" style={{ gap: 10 }}>
                        <Avatar name={s.name} size={32} />
                        <div><div style={{ fontWeight: 600 }}>{s.name}</div><div className="muted" style={{ fontSize: 12 }}>{s.email}</div></div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: s.att >= 75 ? "var(--green)" : "var(--red)" }}>{s.att}%</td>
                    <td>
                      <div className="att-toggle">
                        <button className={"att-btn present" + (status[s.roll] === "P" ? " on" : "")}
                          onClick={() => setStatus({ ...status, [s.roll]: "P" })}>
                          <Icon name="check" size={13} />Present
                        </button>
                        <button className={"att-btn absent" + (status[s.roll] === "A" ? " on" : "")}
                          onClick={() => setStatus({ ...status, [s.roll]: "A" })}>
                          <Icon name="x" size={13} />Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}