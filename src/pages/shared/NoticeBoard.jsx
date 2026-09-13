import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, StatCard, Badge, Tabs, EmptyState, Field } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";
import { useNotices } from "../../context/NoticesContext";

const variant = (a) => ({ "All Students": "info", Faculty: "purple", Everyone: "success" }[a] || "muted");

export default function NoticeBoard() {
  const { user } = useAuth();
  const { notices, addNotice, removeNotice } = useNotices();
  const isAdmin = user.role === "admin";

  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ title: "", audience: "All Students", body: "" });

  // Role-based visibility: students never see Faculty-only notices & vice versa
  const visible = notices.filter((n) =>
    isAdmin ? true
    : user.role === "student" ? n.audience !== "Faculty"
    : n.audience !== "All Students"
  );
  const tabs = isAdmin ? ["All", "All Students", "Faculty", "Everyone"] : ["All", "Everyone"];

  const filtered = visible.filter(
    (n) =>
      (tab === "All" || n.audience === tab) &&
      (n.title + n.body).toLowerCase().includes(q.toLowerCase())
  );

  const post = () => {
    if (!form.title || !form.body) return showToast("Please fill title and message", "info");
    addNotice({ ...form });
    setForm({ title: "", audience: "All Students", body: "" });
    showToast("Notice published 🎉");
  };

  const countFor = (role) =>
    visible.filter((n) =>
      role === "student" ? n.audience === "All Students" || n.audience === "Everyone"
      : n.audience === "Faculty" || n.audience === "Everyone"
    ).length;

  return (
    <>
      <PageHeader
        title="Notice Board"
        subtitle={isAdmin ? "Publish and manage announcements for the institute" : "Announcements from the administration"}
        actions={
          <div className="search-box" style={{ maxWidth: 260 }}>
            <Icon name="search" size={15} />
            <input placeholder="Search notices..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        }
      />

      <div className="grid g-4">
        <StatCard icon="bell" tint="blue" label="Total Notices" value={visible.length} trend="Active board" />
        <StatCard icon="users" tint="purple" label="For Students" value={countFor("student")} trend="Student audience" />
        <StatCard icon="user" tint="amber" label="For Faculty" value={countFor("faculty")} trend="Faculty audience" />
        <StatCard icon="clock" tint="green" label="Latest Posted" value={visible[0]?.date ?? "—"} trend={visible[0]?.title?.slice(0, 28) + "…" ?? ""} />
      </div>

      {/* Admin-only compose */}
      {isAdmin && (
        <div className="card card-pad mt">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="send" size={17} /></div>
            <div><div className="card-title">Compose Notice</div><div className="card-sub">It will instantly appear on the target audience's board</div></div>
          </div>
          <div className="grid" style={{ gap: 14 }}>
            <div className="grid g-21">
              <Field label="Title"><input className="input" placeholder="Notice title..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
              <Field label="Audience">
                <select className="input" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}>
                  <option>All Students</option><option>Faculty</option><option>Everyone</option>
                </select>
              </Field>
            </div>
            <Field label="Message"><textarea className="input" rows={3} placeholder="Write your announcement..." value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></Field>
            <div><button className="btn btn-primary" onClick={post}><Icon name="send" size={15} />Publish Notice</button></div>
          </div>
        </div>
      )}

      {/* Notices list */}
      <div className="mt">
        <div className="spread" style={{ marginBottom: 12 }}>
          <div className="card-title">All Notices ({filtered.length})</div>
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>

        {filtered.length === 0 ? (
          <div className="card"><EmptyState icon="bell" title="No notices found" sub={q ? `Nothing matches "${q}".` : "The board is clear."} /></div>
        ) : (
          <div className="grid" style={{ gap: 12 }}>
            {filtered.map((n, i) => (
              <div className="card card-pad" key={n.title + i} style={{ padding: 18 }}>
                <div className="spread" style={{ flexWrap: "wrap" }}>
                  <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
                    <div className="sec-icon" style={{ width: 38, height: 38 }}><Icon name="bell" size={17} /></div>
                    <strong style={{ fontSize: 14.5 }}>{n.title}</strong>
                    {i === 0 && <Badge variant="success">New</Badge>}
                    <Badge variant={variant(n.audience)}>{n.audience}</Badge>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <span className="muted" style={{ fontSize: 12.5 }}>{n.date}</span>
                    {isAdmin && (
                      <button className="btn btn-ghost btn-sm" onClick={() => { removeNotice(i); showToast("Notice removed", "info"); }}>
                        <Icon name="trash" size={13} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="muted" style={{ fontSize: 13.5, marginTop: 10, marginLeft: 48 }}>{n.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}