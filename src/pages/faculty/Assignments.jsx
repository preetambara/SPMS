import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Tabs, Modal, Field, Avatar, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY_ASSIGNMENTS } from "../../data/mockData";

const TABS = ["All", "To Evaluate", "Published", "Closed"];
const statusVariant = (s) => ({ Published: "info", Evaluated: "success", Closed: "muted", Draft: "warning" }[s] || "info");

export default function Assignments() {
  const [list, setList] = useState(FACULTY_ASSIGNMENTS);
  const [tab, setTab] = useState("All");
  const [creating, setCreating] = useState(false);
  const [evalId, setEvalId] = useState(null);
  const [draft, setDraft] = useState({});
  const empty = { title: "", subject: "CS301 — DBMS", cls: "Section B", due: "", marks: "20", desc: "" };
  const [form, setForm] = useState(empty);

  const evalA = list.find((a) => a.id === evalId);

  const openEval = (a) => {
    const d = {};
    a.subs.forEach((s) => (d[s.id] = { marks: s.marks, fb: s.fb }));
    setDraft(d);
    setEvalId(a.id);
  };

  const saveEval = () => {
    setList((l) => l.map((a) => {
      if (a.id !== evalId) return a;
      const subs = a.subs.map((s) => ({ ...s, marks: draft[s.id]?.marks ?? s.marks, fb: draft[s.id]?.fb ?? s.fb }));
      const done = subs.length > 0 && subs.every((s) => String(s.marks) !== "");
      return { ...a, subs, status: done ? "Evaluated" : a.status };
    }));
    showToast("Evaluations saved successfully");
    setEvalId(null);
  };

  const create = (status) => {
    if (!form.title || !form.due) return showToast("Please fill title and due date", "info");
    setList((l) => [{ id: Date.now(), ...form, marks: +form.marks, submitted: 0, total: 64, status, subs: [] }, ...l]);
    setCreating(false);
    setForm(empty);
    showToast(status === "Published" ? "Assignment published to students 🎉" : "Draft saved");
  };

  const remove = (id) => { setList((l) => l.filter((a) => a.id !== id)); showToast("Assignment deleted", "info"); };

  const filtered = list.filter((a) =>
    tab === "All" ? true : tab === "To Evaluate" ? a.status === "Published" : a.status === tab
  );

  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Create, publish and evaluate assignments"
        actions={<button className="btn btn-primary" onClick={() => setCreating(true)}><Icon name="plus" size={16} />Create Assignment</button>}
      />

      <div className="grid g-4">
        <StatCard icon="clipboard" tint="blue" label="Total Assignments" value={list.length} trend="This semester" />
        <StatCard icon="clock" tint="amber" label="To Evaluate" value={list.filter((a) => a.status === "Published").length} trend="Submissions waiting" warn />
        <StatCard icon="upload" tint="purple" label="Total Submissions" value={list.reduce((a, b) => a + b.submitted, 0)} trend="Across all assignments" />
        <StatCard icon="check-circle" tint="green" label="Evaluated" value={list.filter((a) => a.status === "Closed" || a.status === "Evaluated").length} trend="Completed" />
      </div>

      <div className="card mt">
        <div className="toolbar"><Tabs tabs={TABS} active={tab} onChange={setTab} /></div>
        <div className="table-wrap">
          {filtered.length === 0 ? <EmptyState title="No assignments" sub="Create one with the button above." /> : (
            <table>
              <thead><tr><th>Assignment</th><th>Class</th><th>Due Date</th><th>Submissions</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{a.title}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{a.subject} • {a.marks} marks</div>
                    </td>
                    <td className="muted">{a.cls}</td>
                    <td>{a.due}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{a.submitted} / {a.total}</div>
                      <div className="muted" style={{ fontSize: 11.5 }}>submitted</div>
                    </td>
                    <td><Badge variant={statusVariant(a.status)}>{a.status}</Badge></td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <button className="btn btn-primary btn-sm" onClick={() => openEval(a)}><Icon name="check-circle" size={13} />Evaluate</button>{" "}
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast("Edit coming soon", "info")}><Icon name="edit" size={13} /></button>{" "}
                      <button className="btn btn-ghost btn-sm" onClick={() => remove(a.id)}><Icon name="trash" size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Assignment modal */}
      <Modal open={creating} onClose={() => setCreating(false)} title="Create Assignment" subtitle="Publish a new assignment to your class" width={600}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => create("Draft")}>Save as Draft</button>
            <button className="btn btn-primary" onClick={() => create("Published")}><Icon name="send" size={15} />Publish</button>
          </>
        }>
        <div className="grid" style={{ gap: 14 }}>
          <Field label="Assignment Title"><input className="input" placeholder="e.g. ER Diagram & Normalization" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <div className="grid g-3">
            <Field label="Subject">
              <select className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                <option>CS301 — DBMS</option><option>CS305 — OS</option><option>CS301L — DBMS Lab</option>
              </select>
            </Field>
            <Field label="Class">
              <select className="input" value={form.cls} onChange={(e) => setForm({ ...form, cls: e.target.value })}>
                <option>Section B</option><option>Section C</option><option>Section A</option>
              </select>
            </Field>
            <Field label="Total Marks"><input className="input" type="number" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} /></Field>
          </div>
          <Field label="Due Date"><input className="input" type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} /></Field>
          <Field label="Description / Instructions"><textarea className="input" rows={4} placeholder="Describe the assignment, format, and expectations..." value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} /></Field>
          <button className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => showToast("Attachment attached (demo)")}><Icon name="upload" size={15} />Attach Reference Material</button>
        </div>
      </Modal>

      {/* Evaluate modal */}
      <Modal open={!!evalA} onClose={() => setEvalId(null)} width={720}
        title={`Evaluate — ${evalA?.title ?? ""}`}
        subtitle={`${evalA?.subject ?? ""} • ${evalA?.cls ?? ""} • ${evalA?.submitted ?? 0}/${evalA?.total ?? 0} submissions • Max ${evalA?.marks ?? 0} marks`}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setEvalId(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={saveEval}><Icon name="save" size={15} />Save Evaluations</button>
          </>
        }>
        {!evalA || evalA.subs.length === 0
          ? <EmptyState title="No submissions to evaluate yet" sub="Students haven't submitted this assignment." />
          : evalA.subs.map((s) => (
              <div className="eval-row" key={s.id}>
                <Avatar name={s.name} size={36} />
                <div className="grow">
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name} <span className="muted" style={{ fontWeight: 400 }}>• {s.roll}</span></div>
                  <div className="muted" style={{ fontSize: 12 }}>Submitted {s.on} • <span style={{ color: "var(--primary)", fontWeight: 600 }}>{s.file}</span></div>
                </div>
                <input className="cell-input" type="number" min="0" max={evalA.marks} placeholder={`/${evalA.marks}`}
                  value={draft[s.id]?.marks ?? ""}
                  onChange={(e) => setDraft({ ...draft, [s.id]: { ...draft[s.id], marks: e.target.value } })} />
                <input className="input" style={{ width: 200 }} placeholder="Feedback..."
                  value={draft[s.id]?.fb ?? ""}
                  onChange={(e) => setDraft({ ...draft, [s.id]: { ...draft[s.id], fb: e.target.value } })} />
              </div>
            ))}
      </Modal>
    </>
  );
}