import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Badge, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { ADMIN } from "../../data/mockData";

export default function Subjects() {
  const [q, setQ] = useState("");
  const list = ADMIN.subjects.filter((s) => (s.name + s.code + s.dept).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Subjects"
        subtitle="Course catalog across all departments"
        actions={<button className="btn btn-primary" onClick={() => showToast("Add subject form (demo)")}><Icon name="plus" size={16} />Add Subject</button>}
      />
      <div className="card">
        <div className="toolbar">
          <div className="search-box" style={{ maxWidth: 320 }}>
            <Icon name="search" size={15} />
            <input placeholder="Search subjects..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          {list.length === 0 ? <EmptyState icon="book" title="No subjects found" /> : (
            <table>
              <thead><tr><th>Code</th><th>Subject</th><th>Department</th><th>Credits</th><th>Faculty Allotted</th><th>Enrolled</th></tr></thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.code}>
                    <td><Badge variant="info">{s.code}</Badge></td>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td className="muted">{s.dept}</td>
                    <td>{s.credits}</td>
                    <td>{s.faculty}</td>
                    <td><Badge variant="muted">{s.students} students</Badge></td>
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