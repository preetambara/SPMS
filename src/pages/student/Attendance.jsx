import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Progress } from "../../components/UI";
import { BarChart, Donut } from "../../components/Charts";
import { showToast } from "../../components/Toast";
import { ATTENDANCE } from "../../data/mockData";

const pct = (p, t) => Math.round((p / t) * 100);

export default function Attendance() {
  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="Semester 4 • Section B"
        actions={<button className="btn btn-outline" onClick={() => showToast("Attendance report downloaded")}><Icon name="download" size={16} />Download Report</button>}
      />

      <div className="grid g-4">
        <StatCard icon="calendar-check" tint="blue" label="Overall Attendance" value={ATTENDANCE.overall + "%"} trend="Above 75% requirement" />
        <StatCard icon="check-circle" tint="green" label="Total Present" value={ATTENDANCE.present} trend={`Out of ${ATTENDANCE.total} classes`} />
        <StatCard icon="x-circle" tint="amber" label="Total Absent" value={ATTENDANCE.absent} trend="9 recorded absences" warn />
        <StatCard icon="trending" tint="purple" label="This Month" value="91%" trend="Feb attendance" />
      </div>

      <div className="grid g-21 mt">
        <div className="card">
          <div className="spread card-pad" style={{ paddingBottom: 8 }}>
            <div><div className="card-title">Subject-wise Attendance</div><div className="card-sub">Minimum 75% required per subject</div></div>
            <Badge variant="info">6 subjects</Badge>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Subject</th><th>Code</th><th>Present / Total</th><th style={{ width: "26%" }}>Progress</th><th>%</th><th>Status</th></tr></thead>
              <tbody>
                {ATTENDANCE.subjects.map((s) => {
                  const p = pct(s.present, s.total);
                  return (
                    <tr key={s.code}>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td className="muted">{s.code}</td>
                      <td>{s.present} / {s.total}</td>
                      <td><Progress value={p} color={p >= 85 ? "var(--green)" : p >= 75 ? "var(--primary)" : "var(--red)"} /></td>
                      <td style={{ fontWeight: 700 }}>{p}%</td>
                      <td><Badge variant={p >= 85 ? "success" : p >= 75 ? "info" : "danger"}>{p >= 75 ? "Safe" : "At Risk"}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-pad col" style={{ alignItems: "center", gap: 12 }}>
          <div className="card-title" style={{ alignSelf: "flex-start" }}>Overall</div>
          <Donut value={ATTENDANCE.overall} label={ATTENDANCE.overall + "%"} sublabel="Present" size={160} />
          <p className="muted" style={{ fontSize: 12.5, textAlign: "center" }}>
            You need to attend <strong style={{ color: "var(--navy)" }}>at least 75%</strong> in every subject to be eligible for end-semester examinations.
          </p>
        </div>
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Monthly Attendance %</div><Badge variant="muted">Last 7 months</Badge></div>
          <BarChart data={ATTENDANCE.monthly.data} labels={ATTENDANCE.monthly.labels} suffix="%" height={160} />
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Recent Log</div><Icon name="clock" size={16} color="var(--muted)" /></div>
          {ATTENDANCE.recent.map((r, i) => (
            <div className="deadline-row" key={i}>
              <div className={"urgency " + (r.status === "P" ? "low" : "high")} />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.subject}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{r.date}</div>
              </div>
              <Badge variant={r.status === "P" ? "success" : "danger"}>{r.status === "P" ? "Present" : "Absent"}</Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}