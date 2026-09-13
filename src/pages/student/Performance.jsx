import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge } from "../../components/UI";
import { LineChart, BarChart, Donut } from "../../components/Charts";
import { PERF_TREND, RESULTS, STUDENT_SUBJECTS } from "../../data/mockData";

export default function Performance() {
  return (
    <>
      <PageHeader title="Performance Analytics" subtitle="Deep-dive into your academic performance" />

      <div className="grid g-4">
        <StatCard icon="users" tint="blue" label="Class Rank" value="#7 / 64" trend="Top 11%" />
        <StatCard icon="trending" tint="green" label="Percentile" value="89th" trend="+6 vs last sem" />
        <StatCard icon="star" tint="purple" label="Strongest Subject" value="AI • 94%" trend="Keep it up!" />
        <StatCard icon="alert" tint="amber" label="Focus Area" value="WT • 71%" trend="Needs attention" warn />
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb">
            <div><div className="card-title">Score Trend</div><div className="card-sub">Performance across assessment types</div></div>
            <Badge variant="success">Improving</Badge>
          </div>
          <LineChart data={PERF_TREND.data} labels={PERF_TREND.labels} height={210} />
        </div>
        <div className="card card-pad col" style={{ alignItems: "center", gap: 12 }}>
          <div className="card-title" style={{ alignSelf: "flex-start" }}>Overall Average</div>
          <Donut value={82} label="82%" sublabel="Average Score" size={160} />
          <div className="row" style={{ gap: 18, marginTop: 4 }}>
            <div className="col" style={{ alignItems: "center" }}><strong>82.2%</strong><span className="muted" style={{ fontSize: 12 }}>Mid-Sem</span></div>
            <div className="col" style={{ alignItems: "center" }}><strong>84.3%</strong><span className="muted" style={{ fontSize: 12 }}>Internal</span></div>
          </div>
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Subject-wise Scores</div><Badge variant="muted">Mid-Sem</Badge></div>
          <BarChart labels={RESULTS.map((r) => r.code)} data={RESULTS.map((r) => r.total)} height={170} />
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Subject Attendance</div><Badge variant="muted">Correlation</Badge></div>
          <BarChart labels={STUDENT_SUBJECTS.map((s) => s.code)} data={STUDENT_SUBJECTS.map((s) => s.attendance)} height={170} />
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon" style={{ background: "var(--green-bg)", color: "#0E9F6E" }}><Icon name="check-circle" size={17} /></div>
            <div><div className="card-title">Strengths</div><div className="card-sub">Keep building on these</div></div></div>
          {PERF_TREND.strengths.map((s) => (
            <div className="deadline-row" key={s}><Icon name="check-circle" size={16} color="var(--green)" /><span style={{ fontSize: 13 }}>{s}</span></div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon" style={{ background: "var(--amber-bg)", color: "#D97706" }}><Icon name="alert" size={17} /></div>
            <div><div className="card-title">Areas to Improve</div><div className="card-sub">Small changes, big gains</div></div></div>
          {PERF_TREND.improve.map((s) => (
            <div className="deadline-row" key={s}><Icon name="info" size={16} color="var(--amber)" /><span style={{ fontSize: 13 }}>{s}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}