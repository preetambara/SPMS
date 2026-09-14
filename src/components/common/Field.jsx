export function Field({ label, children, error }) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      {children}
      {error && <span className="field-error" style={{ color: "var(--danger)", fontSize: 12 }}>{error}</span>}
    </label>
  );
}

export default Field;
