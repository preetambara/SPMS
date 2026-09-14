/**
 * Common formatting helpers across the SPMS application
 */

export function getInitials(name = "") {
  if (!name) return "";
  const clean = name.replace(/^(Dr\.|Prof\.)\s*/i, "");
  return clean
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export function formatPercentage(value, decimals = 0) {
  if (value === undefined || value === null || isNaN(value)) return "0%";
  return `${Number(value).toFixed(decimals)}%`;
}

export function getAttendanceStatus(percentage) {
  if (percentage >= 85) return { status: "Good", variant: "success" };
  if (percentage >= 75) return { status: "Warning", variant: "warning" };
  return { status: "Critical", variant: "danger" };
}
