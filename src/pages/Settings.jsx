import { useState } from "react";
import Icon from "../components/Icon";
import { PageHeader, Avatar, Badge } from "../components/UI";
import { showToast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";

function Toggle({ on, onChange }) {
  return <label className="switch"><input type="checkbox" checked={on} onChange={onChange} /><span className="slider" /></label>;
}

export default function Settings() {
  const { user } = useAuth();
  const [notif, setNotif] = useState({ email: true, push: true, assignments: true, grades: true, exams: false });
  const [twofa, setTwofa] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const roleLabel = { student: "Student", faculty: "Faculty", admin: "Administrator" }[user.role];

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your account preferences" />

      <div className="grid g-2">
        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon"><Icon name="user" size={17} /></div>
            <div><div className="card-title">Account Information</div><div className="card-sub">Read-only account details</div></div></div>
          <div className="row" style={{ gap: 14, padding: "6px 0 16px" }}>
            <Avatar name={user.name} size={52} />
            <div>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{user.id}</div>
            </div>
            <Badge variant="info" >{roleLabel}</Badge>
          </div>
          <div className="info-grid">
            <div className="info-item"><span>Email</span><strong>{user.id.toLowerCase()}@university.edu</strong></div>
            <div className="info-item"><span>Account Status</span><strong><Badge variant="success">Active</Badge></strong></div>
            <div className="info-item"><span>Role</span><strong>{roleLabel}</strong></div>
            <div className="info-item"><span>Last Login</span><strong>Today</strong></div>
          </div>
        </div>

        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon"><Icon name="bell" size={17} /></div>
            <div><div className="card-title">Notifications</div><div className="card-sub">Choose what you want to hear about</div></div></div>
          {[
            ["email", "Email Notifications", "Announcements and important updates"],
            ["push", "Push Notifications", "Real-time alerts in the browser"],
            ["assignments", "Assignment Updates", "New assignments and due-date reminders"],
            ["grades", "Grade Published", "When results are announced"],
            ["exams", "Exam Reminders", "Reminders before scheduled exams"],
          ].map(([k, t, s]) => (
            <div className="switch-row" key={k}>
              <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{t}</div><div className="muted" style={{ fontSize: 12 }}>{s}</div></div>
              <Toggle on={notif[k]} onChange={() => setNotif({ ...notif, [k]: !notif[k] })} />
            </div>
          ))}
        </div>

        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon"><Icon name="moon" size={17} /></div>
            <div><div className="card-title">Appearance</div><div className="card-sub">Customize how SPMS looks</div></div></div>
          <div className="row" style={{ gap: 12 }}>
            <div className="theme-opt sel"><Icon name="sun" size={0} /><Icon name="check-circle" size={17} />Light (Default)</div>
            <div className="theme-opt dis" onClick={() => showToast("Dark mode is coming soon", "info")}><Icon name="moon" size={17} />Dark <Badge variant="muted">Soon</Badge></div>
          </div>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 14 }}>The light theme uses the official SPMS palette optimized for readability.</p>
        </div>

        <div className="card card-pad">
          <div className="sec-head"><div className="sec-icon"><Icon name="lock" size={17} /></div>
            <div><div className="card-title">Privacy &amp; Security</div><div className="card-sub">Keep your account safe</div></div></div>
          <div className="grid g-3" style={{ marginBottom: 12 }}>
            <input className="input" type="password" placeholder="Current password" />
            <input className="input" type="password" placeholder="New password" />
            <input className="input" type="password" placeholder="Confirm password" />
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => showToast("Password updated successfully")}>Update Password</button>
          <div style={{ marginTop: 8 }}>
            <div className="switch-row">
              <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Two-Factor Authentication</div><div className="muted" style={{ fontSize: 12 }}>Extra security via OTP on login</div></div>
              <Toggle on={twofa} onChange={() => { setTwofa(!twofa); showToast(!twofa ? "2FA enabled" : "2FA disabled", "info"); }} />
            </div>
            <div className="switch-row">
              <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Login Alerts</div><div className="muted" style={{ fontSize: 12 }}>Email me on new device logins</div></div>
              <Toggle on={alerts} onChange={() => setAlerts(!alerts)} />
            </div>
          </div>
        </div>

        <div className="card card-pad" style={{ gridColumn: "1 / -1" }}>
          <div className="sec-head"><div className="sec-icon"><Icon name="globe" size={17} /></div>
            <div><div className="card-title">System</div><div className="card-sub">Regional and display preferences</div></div></div>
          <div className="grid g-3">
            <label className="field"><span>Language</span>
              <select className="input"><option>English</option><option>हिन्दी</option><option>मराठी</option></select>
            </label>
            <label className="field"><span>Timezone</span>
              <select className="input"><option>(GMT+5:30) India Standard Time</option><option>(GMT+0:00) UTC</option></select>
            </label>
            <label className="field"><span>Date Format</span>
              <select className="input"><option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select>
            </label>
          </div>
          <button className="btn btn-primary mt" style={{ marginTop: 16 }} onClick={() => showToast("Preferences saved")}><Icon name="save" size={15} />Save Preferences</button>
        </div>
      </div>
    </>
  );
}