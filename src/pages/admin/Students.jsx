import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Badge, Avatar, Modal, Field, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { ADMIN } from "../../data/mockData";

export default function Students() {
  const [rows, setRows] = useState(ADMIN.students);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", program: "B.Tech CSE", sem: "4", sec: "B" });

  const list = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.id.toLowerCase().includes(q.toLowerCase()));

  const add = () => {
    if (!form.name) return showToast("Please enter a name", "info");
    setRows((l) => [{ id: "STU2025" + (100 + l.length), ...form, status: "Active" }, ...l]);
    setOpen(false);
    setForm({ name: "", program: "B.Tech CSE", sem: "4", sec: "B" });
    showToast("Student admitted successfully 🎉");
  };

  return (
    <>
      <PageHeader
        title="Students"
        subtitle="All enrolled students across programs"
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add Student</button>}
      />
      <div className="card">
        <div className="toolbar">
          <div className="search-box" style={{ maxWidth: 320 }}>
            <Icon name="search" size={15} />
            <input placeholder="Search by name or ID..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input"><option>All Programs</option><option>B.Tech CSE</option><option>B.Tech ECE</option><option>B.Tech ME</option></select>
          <button className="btn btn-outline btn-sm" style={{ marginLeft: "auto" }} onClick={() => showToast("Exported as CSV")}><Icon name="download" size={14} />Export</button>
        </div>
        <div className="table-wrap">
          {list.length === 0 ? <EmptyState icon="users" title="No students found" /> : (
            <table>
              <thead><tr><th>ID</th><th>Student</th><th>Program</th><th>Sem</th><th>Section</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id}>
                    <td className="muted" style={{ fontWeight: 600 }}>{s.id}</td>
                    <td><div className="row" style={{ gap: 10 }}><Avatar name={s.name} size={30} /><span style={{ fontWeight: 600 }}>{s.name}</span></div></td>
                    <td className="muted">{s.program}</td>
                    <td>{s.sem}</td>
                    <td>{s.sec}</td>
                    <td><Badge variant={s.status === "Active" ? "success" : "muted"}>{s.status}</Badge></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast(`Opening ${s.name}'s profile`)}><Icon name="eye" size={13} />View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Student" subtitle="Register a new student admission"
        footer={<><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={add}><Icon name="plus" size={15} />Add Student</button></>}>
        <div className="grid" style={{ gap: 14 }}>
          <Field label="Full Name"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rahul Verma" /></Field>
          <div className="grid g-3">
            <Field label="Program">
              <select className="input" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}>
                <option>B.Tech CSE</option><option>B.Tech ECE</option><option>B.Tech ME</option><option>B.Tech CE</option><option>B.Tech IT</option>
              </select>
            </Field>
            <Field label="Semester">
              <select className="input" value={form.sem} onChange={(e) => setForm({ ...form, sem: e.target.value })}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Section">
              <select className="input" value={form.sec} onChange={(e) => setForm({ ...form, sec: e.target.value })}>
                <option>A</option><option>B</option><option>C</option>
              </select>
            </Field>
          </div>
        </div>
      </Modal>
    </>
  );
}