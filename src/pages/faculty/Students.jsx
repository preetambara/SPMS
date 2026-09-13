import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Avatar, Progress, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY_STUDENTS } from "../../data/mockData";

export default function Students() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("CS301 — DBMS");
  const rows = FACULTY_STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader title="Students" subtitle="Students enrolled in your assigned subjects" />

      <div className="grid g-4">
        <StatCard icon="users" tint="blue" label="Total Students" value="183" trend="Across 4 subjects" />
        <StatCard icon="calendar-check" tint="green" label="Avg Attendance" value="86%" trend="+1.8% this month" />
        <StatCard icon="award" tint="purple" label="Avg Score" value="78%" trend="Mid-semester exams" />
        <StatCard icon="alert" tint="amber" label="At Risk" value="3" trend="Low attendance/scores" warn />
      </div>

      <div className="card mt">
        <div className="toolbar">
          <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>CS301 — DBMS</option><option>CS305 — OS</option><option>CS301L — DBMS Lab</option>
          </select>
          <select className="input"><option>Section B</option><option>Section C</option><option>Section A</option></select>
          <div className="search-box grow" style={{ maxWidth: 300 }}>
            <Icon name="search" size={15} />
            <input placeholder="Search by name or roll number..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginLeft: "auto" }} onClick={() => showToast("Student list exported as CSV")}>
            <Icon name="download" size={14} />Export
          </button>
        </div>
        <div className="table-wrap">
          {rows.length === 0 ? <EmptyState icon="users" title="No students found" sub={`Nothing matches "${q}".`} /> : (
            <table>
              <thead><tr><th>Roll No</th><th>Student</th><th>Attendance</th><th>%</th><th>Avg Score</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
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
                    <td style={{ width: 130 }}><Progress value={s.att} color={s.att >= 85 ? "var(--green)" : s.att >= 75 ? "var(--primary)" : "var(--red)"} /></td>
                    <td style={{ fontWeight: 700 }}>{s.att}%</td>
                    <td>{s.avg}%</td>
                    <td><Badge variant={s.att >= 75 && s.avg >= 50 ? "success" : s.avg >= 50 ? "warning" : "danger"}>
                      {s.att >= 75 && s.avg >= 50 ? "Good" : s.avg >= 50 ? "Average" : "At Risk"}</Badge></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast(`Opening profile of ${s.name}`)}><Icon name="eye" size={13} />View</button>
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