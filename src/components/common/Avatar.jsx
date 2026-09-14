const AV_COLORS = ["#2F7DF4", "#7C5CFC", "#0E9F8E", "#D97706", "#DB2777"];

export function Avatar({ name = "", size = 36 }) {
  const clean = name.replace(/^(Dr\.|Prof\.)\s*/i, "");
  const initials = clean
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const c = AV_COLORS[clean.length % AV_COLORS.length];

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: c + "1C",
        color: c,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;
