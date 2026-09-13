import Icon from "../../components/Icon";
import { PageHeader, Badge, Avatar, Progress } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { STUDENT, STUDENT_SUBJECTS } from "../../data/mockData";

export default function Courses() {
  return (
    <>
      <PageHeader title="My Courses" subtitle={`${STUDENT.program} — ${STUDENT.semester}`} />

      <div className="hero-banner card">
        <div>
          <h2>B.Tech Computer Science &amp; Engineering</h2>
          <p>One program. Multiple subjects. Everything in one place.</p>
          <div className="row" style={{ gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <span className="chip">{STUDENT.semester}</span>
            <span className="chip">Section {STUDENT.section}</span>
            <span className="chip">Batch {STUDENT.batch}</span>
            <span className="chip">6 Subjects</span>
            <span className="chip">21 Credits</span>
          </div>
        </div>
        <div className="logo-mark lg" style={{ width: 74, height: 74, borderRadius: 20 }}>
          <Icon name="graduation" size={36} />
        </div>
      </div>

      <div className="grid g-3 mt">
        {STUDENT_SUBJECTS.map((s) => (
          <div className="card card-pad" key={s.code} style={{ transition: ".15s" }}>
            <div className="spread">
              <Badge variant="info">{s.code}</Badge>
              <Badge variant={s.attendance >= 85 ? "success" : s.attendance >= 75 ? "warning" : "danger"}>{s.attendance}% Att.</Badge>
            </div>
            <h3 style={{ margin: "13px 0 6px", fontSize: 15.5 }}>{s.name}</h3>
            <div className="row muted" style={{ fontSize: 13, gap: 8 }}>
              <Avatar name={s.faculty} size={24} />{s.faculty}
            </div>
            <div style={{ margin: "15px 0 7px" }}><Progress value={s.progress} /></div>
            <div className="spread" style={{ fontSize: 12.5 }}>
              <span className="muted">{s.progress}% completed</span>
              <span className="muted">{s.credits} Credits</span>
            </div>
            <div className="row mt" style={{ gap: 8, marginTop: 14 }}>
              <button className="btn btn-outline btn-sm grow" onClick={() => showToast(`Opening ${s.name} materials`)}><Icon name="book" size={14} />Materials</button>
              <button className="btn btn-ghost btn-sm grow" onClick={() => showToast(`Showing ${s.name} syllabus`)}>Syllabus</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}