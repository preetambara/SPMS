import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Avatar } from "../../components/UI";
import { LineChart, BarChart, Donut } from "../../components/Charts";
import { showToast } from "../../components/Toast";
import { CLASS_PERF } from "../../data/mockData";

export default function Performance() {
  return (
    <>
      <PageHeader title="Class Performance" subtitle="How your students are performing across subjects" />

      <div className="grid g-4">
        <StatCard icon="trending" tint="blue" label="Class Average" value={CLASS_PERF.avg + "%"} trend="+2% vs Internal I" />
        <StatCard icon="star" tint="green" label="Highest Score" value={CLASS_PERF.highest + "%"} trend="Ishita Rao" />
        <StatCard icon="check-circle" tint="purple" label="Pass Rate" value={CLASS_PERF.pass + "%"} trend="Above institute avg" />
        <StatCard icon="alert" tint="amber" label="At-Risk Students" value={CLASS_PERF.atRisk} trend="Needs intervention" warn />
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb">
            <div><div className="card-title">Performance Trend</div><div className="card-sub">Class average across assessments</div></div>
            <Badge variant="success">Improving</Badge>
          </div>
          <LineChart data={CLASS_PERF.trend.data} labels={CLASS_PERF.trend.labels} height={210} />
        </div>
        <div className="card card-pad col" style={{ alignItems: "center", gap: 12 }}>
          <div className="card-title" style={{ alignSelf: "flex-start" }}>Class Average</div>
          <Donut value={CLASS_PERF.avg} label={CLASS_PERF.avg + "%"} sublabel="Overall" size={150} />
          <div className="row" style={{ gap: 20 }}>
            <div className="col" style={{ alignItems: "center" }}><strong>52</strong><span className="muted" style={{ fontSize: 12 }}>Passed</span></div>
            <div className="col" style={{ alignItems: "center" }}><strong>4</strong><span className="muted" style={{ fontSize: 12 }}>Failed</span></div>
          </div>
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Grade Distribution</div><Badge variant="muted">58 students</Badge></div>
          <BarChart labels={CLASS_PERF.dist.labels} data={CLASS_PERF.dist.data} height={170} />
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Subject-wise Average</div><Badge variant="muted">Your subjects</Badge></div>
          <BarChart labels={CLASS_PERF.subjects.labels} data={CLASS_PERF.subjects.data} suffix="%" height={170} />
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon" style={{ background: "var(--green-bg)", color: "#0E9F6E" }}><Icon name="star" size={17} /></div>
            <div><div className="card-title">Top Performers</div><div className="card-sub">Recognize their consistency</div></div></div>
          {CLASS_PERF.top.map((s) => (
            <div className="deadline-row" key={s.roll}>
              <Avatar name={s.name} size={34} />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{s.roll}</div>
              </div>
              <Badge variant="success">{s.avg}%</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon" style={{ background: "var(--red-bg)", color: "#DC2626" }}><Icon name="alert" size={17} /></div>
            <div><div className="card-title">At-Risk Students</div><div className="card-sub">Low attendance or scores</div></div></div>
          {CLASS_PERF.risk.map((s) => (
            <div className="deadline-row" key={s.roll}>
              <Avatar name={s.name} size={34} />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{s.roll} • Att {s.att}% • Avg {s.avg}%</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => showToast(`Notification sent to ${s.name}`)}>Notify</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}