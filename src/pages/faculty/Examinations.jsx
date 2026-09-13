import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Modal, Field } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY_EXAMS, FACULTY_PAST_EXAMS } from "../../data/mockData";

export default function Examinations() {
  const nav = useNavigate();
  const [exams, setExams] = useState(FACULTY_EXAMS);
  const [open, setOpen] = useState(false);
  const empty = { subject: "CS301 — DBMS", exam: "Internal Assessment II", date: "", time: "10:00", dur: "1 hour", room: "" };
  const [form, setForm] = useState(empty);

  const add = () => {
    if (!form.date || !form.room) return showToast("Please fill date and room", "info");
    setExams((l) => [{ ...form, cls: "Section B", time: form.time + " AM" }, ...l]);
    setOpen(false);
    setForm(empty);
    showToast("Exam scheduled successfully 🎉");
  };

  return (
    <>
      <PageHeader
        title="Examinations"
        subtitle="Your assigned exams, schedules and marks entry"
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Schedule Exam</button>}
      />

      <div className="grid g-4">
        <StatCard icon="file-text" tint="blue" label="Upcoming Exams" value={exams.length} trend="Next: 12 Mar" />
        <StatCard icon="clipboard" tint="amber" label="Answer Sheets Pending" value="18" trend="Internal I evaluation" warn />
        <StatCard icon="check-circle" tint="green" label="Evaluated" value="2" trend="Avg class score 74%" />
        <StatCard icon="clock" tint="purple" label="Invigilation Duties" value="2" trend="Mid-sem week" />
      </div>

      <div className="grid g-21 mt">
        <div className="card">
          <div className="card-pad" style={{ paddingBottom: 8 }}><div className="card-title">Upcoming Examinations</div><div className="card-sub">Exams assigned to you</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Exam</th><th>Subject</th><th>Class</th><th>Date &amp; Time</th><th>Duration</th><th>Room</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {exams.map((e, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{e.exam}</td>
                    <td className="muted">{e.subject}</td>
                    <td>{e.cls}</td>
                    <td>{e.date} • {e.time}</td>
                    <td className="muted">{e.dur}</td>
                    <td><Badge variant="info">{e.room}</Badge></td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <button className="btn btn-primary btn-sm" onClick={() => nav("/faculty/grades")}><Icon name="award" size={13} />Enter Marks</button>{" "}
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast("Edit coming soon", "info")}><Icon name="edit" size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-pad">
          <div className="spread mb"><div className="card-title">Invigilation Duty</div><Icon name="clock" size={16} color="var(--muted)" /></div>
          {[
            { t: "Mid-Sem — CN (CS302)", d: "14 Mar • 10:00 AM", r: "Hall A-2" },
            { t: "Mid-Sem — SE (CS304)", d: "17 Mar • 02:00 PM", r: "Hall B-1" },
          ].map((d) => (
            <div className="deadline-row" key={d.t}>
              <div className="urgency med" />
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.t}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{d.d} • {d.r}</div>
              </div>
            </div>
          ))}
          <p className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>Report 15 minutes before the exam and carry your ID card.</p>
        </div>
      </div>

      <div className="card mt">
        <div className="card-pad" style={{ paddingBottom: 8 }}><div className="card-title">Past Examinations</div><div className="card-sub">Evaluated exams</div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Exam</th><th>Subject</th><th>Class</th><th>Date</th><th>Class Avg</th><th>Status</th></tr></thead>
            <tbody>
              {FACULTY_PAST_EXAMS.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{e.exam}</td>
                  <td className="muted">{e.subject}</td>
                  <td>{e.cls}</td>
                  <td>{e.date}</td>
                  <td><Badge variant="success">{e.avg}%</Badge></td>
                  <td><Badge variant="info">{e.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule Exam" subtitle="Add a new exam for your subject" width={560}
        footer={<><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={add}><Icon name="plus" size={15} />Schedule</button></>}>
        <div className="grid" style={{ gap: 14 }}>
          <div className="grid g-2">
            <Field label="Subject">
              <select className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                <option>CS301 — DBMS</option><option>CS305 — OS</option>
              </select>
            </Field>
            <Field label="Exam Type">
              <select className="input" value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value })}>
                <option>Internal Assessment II</option><option>Mid-Semester Examination</option><option>Practical Exam</option><option>Quiz</option>
              </select>
            </Field>
          </div>
          <div className="grid g-3">
            <Field label="Date"><input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
            <Field label="Time"><input className="input" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></Field>
            <Field label="Duration">
              <select className="input" value={form.dur} onChange={(e) => setForm({ ...form, dur: e.target.value })}>
                <option>1 hour</option><option>2 hours</option><option>3 hours</option>
              </select>
            </Field>
          </div>
          <Field label="Room / Hall"><input className="input" placeholder="e.g. Hall A-2 or Room 210" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} /></Field>
        </div>
      </Modal>
    </>
  );
}