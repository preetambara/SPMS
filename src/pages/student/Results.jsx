import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge } from "../../components/UI";
import { BarChart } from "../../components/Charts";
import { showToast } from "../../components/Toast";
import { RESULTS } from "../../data/mockData";

const gVariant = (g) => (g.startsWith("A") ? "success" : g.startsWith("B") ? "info" : "warning");

export default function Results() {
  const [sem, setSem] = useState("Semester 4 — Mid-Semester");
  const total = RESULTS.reduce((a, r) => a + r.total, 0);

  return (
    <>
      <PageHeader
        title="Results"
        subtitle="Your examination results and grades"
        actions={
          <>
            <select className="input" style={{ width: 230 }} value={sem} onChange={(e) => setSem(e.target.value)}>
              <option>Semester 4 — Mid-Semester</option>
              <option>Semester 3 — End-Semester</option>
              <option>Semester 3 — Mid-Semester</option>
            </select>
            <button className="btn btn-primary" onClick={() => showToast("Result sheet downloaded")}><Icon name="download" size={16} />Download</button>
          </>
        }
      />

      <div className="grid g-4">
        <StatCard icon="award" tint="blue" label="Total Marks" value={`${total} / 600`} trend="All 6 subjects" />
        <StatCard icon="trending" tint="green" label="Percentage" value={(total / 6).toFixed(1) + "%"} trend="+4.2% vs last sem" />
        <StatCard icon="star" tint="purple" label="CGPA" value="8.42" trend="Cumulative" />
        <StatCard icon="users" tint="amber" label="Class Rank" value="#7" trend="Of 64 students" />
      </div>

      <div className="grid g-21 mt">
        <div className="card">
          <div className="card-pad" style={{ paddingBottom: 8 }}><div className="card-title">Subject-wise Result</div><div className="card-sub">{sem}</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Subject</th><th>Code</th><th>Internal /25</th><th>Mid-Sem /25</th><th>End-Sem /50</th><th>Total /100</th><th>Grade</th><th>Remark</th></tr></thead>
              <tbody>
                {RESULTS.map((r) => (
                  <tr key={r.code}>
                    <td style={{ fontWeight: 600 }}>{r.subject}</td>
                    <td className="muted">{r.code}</td>
                    <td>{r.internal}</td>
                    <td>{r.mid}</td>
                    <td>{r.end}</td>
                    <td style={{ fontWeight: 700 }}>{r.total}</td>
                    <td><Badge variant={gVariant(r.grade)}>{r.grade}</Badge></td>
                    <td className="muted">{r.total >= 80 ? "Excellent" : r.total >= 70 ? "Very Good" : "Good"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Grade Distribution</div><Icon name="award" size={16} color="var(--muted)" /></div>
          <BarChart labels={["A+", "A", "B+", "B", "C"]} data={[1, 3, 2, 0, 0]} height={170} />
          <p className="muted" style={{ fontSize: 12.5, marginTop: 12 }}>Number of subjects per grade in the selected examination.</p>
        </div>
      </div>
    </>
  );
}