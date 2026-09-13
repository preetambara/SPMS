import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Badge, Avatar, Modal, Field, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { ADMIN } from "../../data/mockData";

export default function Faculty() {
  const [rows, setRows] = useState(ADMIN.faculty);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", dept: "CSE", desig: "Assistant Professor" });

  const list = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));

  const add = () => {
    if (!form.name) return showToast("Please enter a name", "info");
    setRows((l) => [{ id: "FAC2025" + (10 + l.length), ...form, subjects: 0, status: "Active" }, ...l]);
    setOpen(false);
    setForm({ name: "", dept: "CSE", desig: "Assistant Professor" });
    showToast("Faculty member added 🎉");
  };

  return (
    <>
      <PageHeader
        title="Faculty"
        subtitle="All faculty members across departments"
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add Faculty</button>}
      />
      <div className="card">
        <div className="toolbar">
          <div className="search-box" style={{ maxWidth: 320 }}>
            <Icon name="search" size={15} />
            <input placeholder="Search faculty..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input"><option>All Departments</option><option>CSE</option><option>ECE</option><option>ME</option><option>CE</option></select>
        </div>
        <div className="table-wrap">
          {list.length === 0 ? <EmptyState icon="users" title="No faculty found" /> : (
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Subjects</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {list.map((f) => (
                  <tr key={f.id}>
                    <td className="muted" style={{ fontWeight: 600 }}>{f.id}</td>
                    <td><div className="row" style={{ gap: 10 }}><Avatar name={f.name} size={30} /><span style={{ fontWeight: 600 }}>{f.name}</span></div></td>
                    <td className="muted">{f.dept}</td>
                    <td>{f.desig}</td>
                    <td>{f.subjects}</td>
                    <td><Badge variant={f.status === "Active" ? "success" : "warning"}>{f.status}</Badge></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast(`Opening ${f.name}'s profile`)}><Icon name="eye" size={13} />View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Faculty" subtitle="Register a new faculty member"
        footer={<><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={add}><Icon name="plus" size={15} />Add Faculty</button></>}>
        <div className="grid" style={{ gap: 14 }}>
          <Field label="Full Name"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dr. Anjali Sharma" /></Field>
          <div className="grid g-2">
            <Field label="Department">
              <select className="input" value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                <option>CSE</option><option>ECE</option><option>ME</option><option>CE</option><option>IT</option>
              </select>
            </Field>
            <Field label="Designation">
              <select className="input" value={form.desig} onChange={(e) => setForm({ ...form, desig: e.target.value })}>
                <option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option>
              </select>
            </Field>
          </div>
        </div>
      </Modal>
    </>
  );
}