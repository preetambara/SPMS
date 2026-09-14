export function Progress({ value = 0, color = "var(--primary)" }) {
  return (
    <div className="progress">
      <i
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
        }}
      />
    </div>
  );
}

export default Progress;
