export function Badge({ variant = "info", children }) {
  return <span className={`badge b-${variant}`}>{children}</span>;
}

export default Badge;
