import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge } from "../../components/UI";
import { useNavigate } from "react-router-dom";
import { UPCOMING_EXAMS, PAST_EXAMS } from "../../data/mockData";

export default function Examinations() {
  const nav = useNavigate();
  return (
    <>
      <PageHeader title="Examinations" subtitle="Your exam schedule and assessment history" />

      <div className="grid g-4">
        <StatCard icon="clock" tint="amber" label="Next Exam In" value="5 Days" trend="DBMS • Mid-Semester" warn />
        <StatCard icon="file-text" tint="blue" label="Upcoming Exams" value={UPCOMING_EXAMS.length} trend="All mid-semester" />
        <StatCard icon="award" tint="green" label="Avg Internal Score" value="84%" trend="Top 15% of class" />
        <StatCard icon="check-circle" tint="purple" label="Hall Ticket" value="Ready" trend="Download from Results" />
      </div>

      <div className="grid g-21 mt">
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Upcoming Examinations</div><Badge variant="warning">Mid-Sem • March 2025</Badge></div>
          {UPCOMING_EXAMS.map((e) => (
            <div className="sched-row" key={e.code}>
              <div className="date-block">{e.day}<small>{e.month}</small></div>
              <div className="grow">
                <div style={{ fontWeight: 600 }}>{e.subject} <span className="muted" style={{ fontWeight: 400 }}>• {e.code}</span></div>
                <div className="muted" style={{ fontSize: 13 }}>{e.time} • {e.duration} • {e.room}</div>
              </div>
              <Badge variant="info">{e.type}</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Exam Guidelines</div><Icon name="info" size={16} color="var(--muted)" /></div>
          {[
            "Report 20 minutes before the scheduled time",
            "Carry your hall ticket and college ID",
            "No electronic devices allowed in the hall",
            "Calculators permitted only where specified",
            "Maintain silence until answer sheets are collected",
          ].map((g) => (
            <div className="deadline-row" key={g}>
              <Icon name="check-circle" size={16} color="var(--green)" />
              <span style={{ fontSize: 13 }}>{g}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt">
        <div className="spread card-pad" style={{ paddingBottom: 8 }}>
          <div><div className="card-title">Previous Assessments</div><div className="card-sub">Internal and quiz performance so far</div></div>
          <button className="btn btn-outline btn-sm" onClick={() => nav("/student/results")}>View Full Results</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Assessment</th><th>Subject</th><th>Date</th><th>Score</th><th>Status</th></tr></thead>
            <tbody>
              {PAST_EXAMS.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{e.exam}</td>
                  <td className="muted">{e.subject}</td>
                  <td>{e.date}</td>
                  <td><Badge variant="success">{e.marks}</Badge></td>
                  <td><Badge variant="info">{e.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}