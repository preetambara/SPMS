import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Badge, Avatar } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY_STUDENTS, gradeFor } from "../../data/mockData";

export default function Grades() {
  const [subject, setSubject] = useState("CS301 — DBMS");
  const [exam, setExam] = useState("Mid-Semester Examination");
  const [rows, setRows] = useState(() =>
    FACULTY_STUDENTS.map((s) => ({
      roll: s.roll, name: s.name,
      int: Math.min(25, Math.round(s.avg * 0.25)),
      mid: Math.min(25, Math.round(s.avg * 0.22)),
      end: "",
    }))
  );

  const set = (roll, k, v) => setRows((r) => r.map((x) => (x.roll === roll ? { ...x, [k]: v } : x)));
  const totalOf = (r) => (r.end === "" ? null : (Number(r.int) || 0) + (Number(r.mid) || 0) + (Number(r.end) || 0));
  const entered = rows.filter((r) => totalOf(r) !== null);
  const classAvg = entered.length ? Math.round(entered.reduce((a, r) => a + totalOf(r), 0) / entered.length) : 0;

  return (
    <>
      <PageHeader
        title="Grades / Results"
        subtitle="Enter, edit and publish student grades"
        actions={
          <>
            <button className="btn btn-outline" onClick={() => showToast("Grades saved as draft")}><Icon name="save" size={15} />Save Grades</button>
            <button className="btn btn-primary" onClick={() => showToast("Results published to students 🎉")}><Icon name="send" size={15} />Publish Results</button>
          </>
        }
      />

      <div className="card toolbar">
        <label className="field" style={{ width: 200 }}><span>Subject</span>
          <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>CS301 — DBMS</option><option>CS305 — OS</option>
          </select>
        </label>
        <label className="field" style={{ width: 220 }}><span>Examination</span>
          <select className="input" value={exam} onChange={(e) => setExam(e.target.value)}>
            <option>Mid-Semester Examination</option><option>Internal Assessment I</option><option>Internal Assessment II</option>
          </select>
        </label>
        <div className="row" style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
          <Badge variant="info">{entered.length}/{rows.length} entered</Badge>
          <Badge variant="success">Class Avg {classAvg}%</Badge>
        </div>
      </div>

      <div className="card mt">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Roll No</th><th>Student</th>
                <th>Internal /25</th><th>Mid-Sem /25</th><th>End-Sem /50</th>
                <th>Total /100</th><th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const t = totalOf(r);
                return (
                  <tr key={r.roll}>
                    <td className="muted" style={{ fontWeight: 600 }}>{r.roll}</td>
                    <td>
                      <div className="row" style={{ gap: 10 }}>
                        <Avatar name={r.name} size={30} />
                        <span style={{ fontWeight: 600 }}>{r.name}</span>
                      </div>
                    </td>
                    <td><input className="cell-input" type="number" min="0" max="25" value={r.int} onChange={(e) => set(r.roll, "int", e.target.value)} /></td>
                    <td><input className="cell-input" type="number" min="0" max="25" value={r.mid} onChange={(e) => set(r.roll, "mid", e.target.value)} /></td>
                    <td><input className="cell-input" type="number" min="0" max="50" placeholder="—" value={r.end} onChange={(e) => set(r.roll, "end", e.target.value)} /></td>
                    <td style={{ fontWeight: 800, fontSize: 15 }}>{t ?? "—"}</td>
                    <td>{t === null ? <span className="muted">—</span> :
                      <Badge variant={gradeFor(t).startsWith("A") ? "success" : gradeFor(t).startsWith("B") ? "info" : gradeFor(t) === "F" ? "danger" : "warning"}>
                        {gradeFor(t)}</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 12.5, marginTop: 12 }}>
        💡 Tip: enter <strong>End-Sem marks</strong> for any student — the <strong>Total and Grade update instantly</strong>.
      </p>
    </>
  );
}