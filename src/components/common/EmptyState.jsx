import Icon from "../Icon";

export function EmptyState({ icon = "inbox", title, sub }) {
  return (
    <div className="empty">
      <Icon name={icon} size={30} />
      {title && <strong style={{ color: "var(--navy)" }}>{title}</strong>}
      {sub && <span className="muted" style={{ fontSize: 13 }}>{sub}</span>}
    </div>
  );
}

export default EmptyState;
