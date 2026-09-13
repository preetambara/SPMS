import Icon from "./Icon";

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      {actions && <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>{actions}</div>}
    </div>
  );
}

export function StatCard({ icon, tint = "blue", label, value, trend, warn }) {
  return (
    <div className="card stat-card">
      <div className={`stat-icon tint-${tint}`}><Icon name={icon} size={20} /></div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && <div className={"stat-trend" + (warn ? " warn" : "")}>{trend}</div>}
      </div>
    </div>
  );
}

export function Badge({ variant = "info", children }) {
  return <span className={`badge b-${variant}`}>{children}</span>;
}

const AV_COLORS = ["#2F7DF4", "#7C5CFC", "#0E9F8E", "#D97706", "#DB2777"];
export function Avatar({ name, size = 36 }) {
  const clean = name.replace(/^(Dr\.|Prof\.)\s*/i, "");
  const initials = clean.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const c = AV_COLORS[clean.length % AV_COLORS.length];
  return (
    <div className="avatar" style={{ width: size, height: size, background: c + "1C", color: c, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

export function Progress({ value = 0, color = "var(--primary)" }) {
  return <div className="progress"><i style={{ width: Math.min(100, Math.max(0, value)) + "%", background: color }} /></div>;
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button key={t} className={"tab" + (t === active ? " active" : "")} onClick={() => onChange(t)}>{t}</button>
      ))}
    </div>
  );
}

export function Modal({ open, title, subtitle, onClose, children, footer, width = 560 }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" style={{ width }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3 style={{ fontSize: 16.5 }}>{title}</h3>
            {subtitle && <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>{subtitle}</p>}
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

export function EmptyState({ icon = "inbox", title, sub }) {
  return (
    <div className="empty">
      <Icon name={icon} size={30} />
      <strong style={{ color: "var(--navy)" }}>{title}</strong>
      {sub && <span className="muted" style={{ fontSize: 13 }}>{sub}</span>}
    </div>
  );
}