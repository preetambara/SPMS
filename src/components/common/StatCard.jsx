import Icon from "../Icon";

export function StatCard({ icon, tint = "blue", label, value, trend, warn }) {
  return (
    <div className="card stat-card">
      <div className={`stat-icon tint-${tint}`}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && <div className={"stat-trend" + (warn ? " warn" : "")}>{trend}</div>}
      </div>
    </div>
  );
}

export default StatCard;
