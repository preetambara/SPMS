import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { Field } from "../components/UI";
import { showToast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";

const ROLES = [
  { key: "student", label: "Student", icon: "graduation" },
  { key: "faculty", label: "Faculty", icon: "users" },
  { key: "admin", label: "Admin", icon: "shield" },
];
const DEMO = { student: ["STU2024001", "student123"], faculty: ["FAC2019002", "faculty123"], admin: ["ADM2024001", "admin123"] };

function CampusArt() {
  return (
    <svg viewBox="0 0 420 200" fill="none" style={{ width: "100%", maxWidth: 400 }}>
      <circle cx="360" cy="36" r="22" fill="rgba(255,255,255,.25)" />
      <polygon points="50,80 170,34 290,80" fill="rgba(255,255,255,.22)" />
      <rect x="60" y="78" width="220" height="16" rx="4" fill="rgba(255,255,255,.22)" />
      <rect x="60" y="90" width="220" height="80" rx="6" fill="rgba(255,255,255,.14)" />
      {[86, 126, 166, 206, 246].map((x) => <rect key={x} x={x} y="92" width="10" height="76" rx="2" fill="rgba(255,255,255,.30)" />)}
      <rect x="158" y="132" width="24" height="38" rx="3" fill="rgba(255,255,255,.45)" />
      <rect x="300" y="110" width="52" height="60" rx="6" fill="rgba(255,255,255,.12)" />
      {[122, 144].map((y) => [312, 330].map((x) => <rect key={x + "" + y} x={x} y={y} width="12" height="14" rx="2" fill="rgba(255,255,255,.30)" />))}
      <line x1="170" y1="34" x2="170" y2="10" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
      <path d="M170 10 L192 15 L170 21 Z" fill="rgba(255,255,255,.6)" />
      <circle cx="36" cy="140" r="16" fill="rgba(255,255,255,.18)" /><rect x="33" y="152" width="6" height="18" rx="2" fill="rgba(255,255,255,.3)" />
      <circle cx="392" cy="146" r="14" fill="rgba(255,255,255,.18)" /><rect x="389" y="156" width="6" height="16" rx="2" fill="rgba(255,255,255,.3)" />
      <rect x="0" y="168" width="420" height="4" rx="2" fill="rgba(255,255,255,.25)" />
    </svg>
  );
}

const GoogleG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.27 2.04 6.86l3.66 2.84C6.6 7.02 9.05 5.04 12 5.04z"/>
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
    <path fill="#FBBC05" d="M5.7 14.29A7.06 7.06 0 0 1 5.32 12c0-.8.14-1.57.38-2.29L2.04 6.87A11.24 11.24 0 0 0 .75 12c0 1.85.44 3.6 1.29 5.13l3.66-2.84z"/>
    <path fill="#34A853" d="M12 23.25c3.04 0 5.6-1 7.46-2.72l-3.86-3c-1.07.72-2.44 1.16-3.6 1.16-2.95 0-5.4-1.98-6.3-4.66l-3.66 2.84c1.8 3.59 5.58 6.38 9.96 6.38z"/>
  </svg>
);
const MsLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/>
    <rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/>
  </svg>
);

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState("student");
  const [id, setId] = useState(DEMO.student[0]);
  const [pw, setPw] = useState(DEMO.student[1]);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={`/${user.role}/dashboard`} replace />;

  const pickRole = (r) => { setRole(r); setId(DEMO[r][0]); setPw(DEMO[r][1]); setError(""); };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    setTimeout(() => {
      const res = login(role, id, pw);
      setLoading(false);
      if (res.ok) nav(`/${role}/dashboard`);
      else setError(res.error);
    }, 450);
  };

  const idLabel = role === "student" ? "Roll No / Email" : role === "faculty" ? "Faculty ID / Email" : "Admin ID / Email";

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-main">
          <aside className="login-left">
            <div className="row">
              <div className="logo-mark lg"><Icon name="graduation" size={22} /></div>
              <div className="brand-name light">SPMS</div>
            </div>
            <h1 className="login-heading">Student Performance Management System</h1>
            <p className="login-tagline">Empowering Education.<br />Enriching Performance.</p>
            <p className="login-desc">A unified platform to manage courses, attendance, assignments, examinations and performance analytics for students, faculty and administrators.</p>
            <div className="login-illustration"><CampusArt /></div>
          </aside>

          <section className="login-right">
            <div className="login-card-inner">
              <h2>Welcome Back!</h2>
              <p className="login-sub">Login to your SPMS account to continue</p>

              <div className="role-tabs">
                {ROLES.map((r) => (
                  <button key={r.key} type="button" className={"role-tab" + (role === r.key ? " active" : "")} onClick={() => pickRole(r.key)}>
                    <Icon name={r.icon} size={15} />{r.label}
                  </button>
                ))}
              </div>

              <form className="login-form" onSubmit={submit}>
                <Field label={idLabel}>
                  <div className="input-icon">
                    <Icon name="user" size={15} />
                    <input className="input" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter your ID or email" />
                  </div>
                </Field>
                <Field label="Password">
                  <div className="input-icon">
                    <Icon name="lock" size={15} />
                    <input className="input" type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter your password" />
                    <button type="button" className="eye" onClick={() => setShow((s) => !s)}>
                      <Icon name={show ? "eye-off" : "eye"} size={15} />
                    </button>
                  </div>
                </Field>
                <div className="spread">
                  <label className="check">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
                  </label>
                  <a className="link" onClick={() => showToast("Password reset link sent to your email", "info")}>Forgot Password?</a>
                </div>
                {error && <div className="alert-error"><Icon name="alert" size={15} />{error}</div>}
                <button className="btn btn-primary btn-block" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
              </form>

              <div className="login-divider"><span>or continue with</span></div>
              <div className="sso-row">
                <button type="button" className="sso-btn" onClick={() => showToast("Google SSO is not configured in the demo", "info")}><GoogleG />Google</button>
                <button type="button" className="sso-btn" onClick={() => showToast("Microsoft SSO is not configured in the demo", "info")}><MsLogo />Microsoft</button>
              </div>
              <p className="contact-admin">Having trouble? <a className="link" onClick={() => showToast("The administrator has been notified", "info")}>Contact Administrator</a></p>
              <div className="demo-note"><Icon name="info" size={14} />Demo logins are pre-filled — just press <strong>&nbsp;Login</strong>.</div>
            </div>
          </section>
        </div>

        <footer className="login-footer">
          <div className="footer-item"><Icon name="shield" size={16} />Secure &amp; Reliable</div>
          <div className="footer-item"><Icon name="refresh" size={16} />Real-time Updates</div>
          <div className="footer-item"><Icon name="trending" size={16} />Performance Insights</div>
        </footer>
      </div>
    </div>
  );
}