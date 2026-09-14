import { useId } from "react";

export function LineChart({ data, labels, height = 200, color = "#2F7DF4" }) {
  const generatedId = useId();
  const gid = "g" + generatedId.replace(/:/g, "");
  const w = 600, pl = 34, pr = 12, pt = 14, pb = 28;
  const h = height;
  const max = Math.max(...data) * 1.12 || 1;
  const iw = w - pl - pr, ih = h - pt - pb;
  const px = (i) => pl + (i / (data.length - 1)) * iw;
  const py = (v) => pt + ih - (v / max) * ih;
  const pts = data.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  const area = `${pl},${pt + ih} ${pts} ${px(data.length - 1)},${pt + ih}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={pl} x2={w - pr} y1={pt + ih * t} y2={pt + ih * t} stroke="#E6EFFB" />
          <text x={pl - 8} y={pt + ih * t + 3.5} fontSize="10" fill="#94A3B8" textAnchor="end">
            {Math.round(max * (1 - t))}
          </text>
        </g>
      ))}
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => <circle key={i} cx={px(i)} cy={py(v)} r="4" fill="#fff" stroke={color} strokeWidth="2.5" />)}
      {labels.map((l, i) => <text key={i} x={px(i)} y={h - 8} fontSize="10.5" fill="#94A3B8" textAnchor="middle">{l}</text>)}
    </svg>
  );
}

export function BarChart({ data, labels, height = 170, suffix = "" }) {
  const max = Math.max(...data, 1);
  return (
    <div>
      <div className="bar-chart" style={{ height }}>
        {data.map((v, i) => (
          <div className="bar-col" key={i} title={`${labels[i]}: ${v}${suffix}`}>
            <span className="bar-val">{v}{suffix}</span>
            <div className="bar" style={{ height: (v / max) * 100 + "%" }} />
          </div>
        ))}
      </div>
      <div className="bar-labels">{labels.map((l, i) => <span key={i}>{l}</span>)}</div>
    </div>
  );
}

export function Donut({ value, size = 150, stroke = 13, color = "#2F7DF4", label, sublabel }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3EEFC" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, value)) / 100} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: size * 0.19, fontWeight: 800 }}>{label ?? value + "%"}</div>
          {sublabel && <div style={{ fontSize: 11, color: "var(--muted)" }}>{sublabel}</div>}
        </div>
      </div>
    </div>
  );
}