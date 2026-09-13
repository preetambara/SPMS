import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Tabs, EmptyState } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { STUDENT_ASSIGNMENTS } from "../../data/mockData";

const TABS = ["All", "Pending", "Submitted", "Graded"];

export default function Assignments() {
  const [items, setItems] = useState(STUDENT_ASSIGNMENTS);
  const [tab, setTab] = useState("All");

  const submit = (id) => {
    setItems((l) => l.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a)));
    showToast("Assignment submitted successfully 🎉");
  };

  const filtered = items.filter((a) => (tab === "All" ? true : a.status === tab));

  return (
    <>
      <PageHeader title="Assignments" subtitle="Track, submit and review your assignments" />

      <div className="grid g-4">
        <StatCard icon="clipboard" tint="blue" label="Total Assignments" value={items.length} trend="Semester 4" />
        <StatCard icon="clock" tint="amber" label="Pending" value={items.filter((i) => i.status === "Pending").length} trend="Due soon" warn />
        <StatCard icon="upload" tint="purple" label="Submitted" value={items.filter((i) => i.status !== "Pending" && i.status !== "Graded").length} trend="Awaiting evaluation" />
        <StatCard icon="award" tint="green" label="Graded" value={items.filter((i) => i.status === "Graded").length} trend="Avg score 84%" />
      </div>

      <div className="card mt">
        <div className="toolbar" style={{ justifyContent: "space-between" }}>
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
          <button className="btn btn-outline btn-sm" onClick={() => showToast("All assignments up to date")}><Icon name="refresh" size={14} />Refresh</button>
        </div>
        <div className="table-wrap">
          {filtered.length === 0 ? <EmptyState title="Nothing here" sub={`No ${tab.toLowerCase()} assignments right now.`} /> : (
            <table>
              <thead><tr><th>Assignment</th><th>Subject</th><th>Due Date</th><th>Marks</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600 }}>{a.title}</td>
                    <td className="muted">{a.subject}</td>
                    <td>{a.due}</td>
                    <td>{a.status === "Graded" ? <Badge variant="success">{a.scored} / {a.marks}</Badge> : <span className="muted">{a.marks} total</span>}</td>
                    <td>
                      <Badge variant={a.status === "Pending" ? "warning" : a.status === "Graded" ? "success" : "info"}>{a.status}</Badge>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {a.status === "Pending"
                        ? <button className="btn btn-primary btn-sm" onClick={() => submit(a.id)}><Icon name="upload" size={13} />Submit</button>
                        : a.status === "Graded"
                        ? <button className="btn btn-ghost btn-sm" onClick={() => showToast("Feedback: Well-structured work. Watch the edge cases.")}><Icon name="eye" size={13} />Feedback</button>
                        : <button className="btn btn-outline btn-sm" onClick={() => showToast("Opening your submission")}><Icon name="eye" size={13} />View</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}