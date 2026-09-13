import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Avatar, Badge } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { STUDENT } from "../../data/mockData";

const Item = ({ label, value }) => (
  <div className="info-item"><span>{label}</span><strong>{value}</strong></div>
);

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: STUDENT.name, phone: STUDENT.phone, dob: STUDENT.dob, address: STUDENT.address });

  const save = () => { setEdit(false); showToast("Profile updated successfully"); };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Your personal and academic identity information"
        actions={edit
          ? <>
              <button className="btn btn-ghost" onClick={() => setEdit(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}><Icon name="save" size={15} />Save Changes</button>
            </>
          : <button className="btn btn-outline" onClick={() => setEdit(true)}><Icon name="edit" size={15} />Edit Profile</button>}
      />

      <div className="card profile-hero">
        <Avatar name={STUDENT.name} size={84} />
        <div className="grow">
          <h2 style={{ fontSize: 20 }}>{STUDENT.name}</h2>
          <p className="muted" style={{ marginTop: 3 }}>{STUDENT.program} • {STUDENT.semester} • Section {STUDENT.section}</p>
          <div className="row" style={{ gap: 18, marginTop: 12, flexWrap: "wrap", fontSize: 13 }} className="row muted">
            <span className="row" style={{ gap: 7 }}><Icon name="mail" size={14} color="var(--primary)" />{STUDENT.email}</span>
            <span className="row" style={{ gap: 7 }}><Icon name="phone" size={14} color="var(--primary)" />{STUDENT.phone}</span>
            <span className="row" style={{ gap: 7 }}><Icon name="map-pin" size={14} color="var(--primary)" />Pune, Maharashtra</span>
          </div>
        </div>
        <div className="col" style={{ alignItems: "flex-end", gap: 8 }}>
          <Badge variant="success">{STUDENT.status}</Badge>
          <span className="muted" style={{ fontSize: 12 }}>Roll No: {STUDENT.roll}</span>
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="user" size={17} /></div>
            <div><div className="card-title">Personal Information</div><div className="card-sub">Basic details about you</div></div>
          </div>
          {edit ? (
            <div className="grid" style={{ gap: 12 }}>
              <label className="field"><span>Full Name</span><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field"><span>Phone Number</span><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              <label className="field"><span>Date of Birth</span><input className="input" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} /></label>
            </div>
          ) : (
            <div className="info-grid">
              <Item label="Full Name" value={form.name} />
              <Item label="Date of Birth" value={form.dob} />
              <Item label="Gender" value={STUDENT.gender} />
              <Item label="Phone Number" value={form.phone} />
              <Item label="Email Address" value={STUDENT.email} />
              <Item label="Guardian" value={STUDENT.guardian} />
            </div>
          )}
        </div>

        <div className="card card-pad">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="graduation" size={17} /></div>
            <div><div className="card-title">Academic Identity</div><div className="card-sub">Institution-issued academic details</div></div>
          </div>
          <div className="info-grid">
            <Item label="Enrollment Number" value={STUDENT.enrollment} />
            <Item label="Roll Number" value={STUDENT.roll} />
            <Item label="Program" value="B.Tech CSE" />
            <Item label="Department" value={STUDENT.dept} />
            <Item label="Batch" value={STUDENT.batch} />
            <Item label="Admission Year" value={STUDENT.admissionYear} />
            <Item label="Current Semester" value={STUDENT.semester} />
            <Item label="Section" value={STUDENT.section} />
          </div>
        </div>
      </div>

      <div className="grid g-2 mt">
        <div className="card card-pad">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="lock" size={17} /></div>
            <div><div className="card-title">Account Information</div><div className="card-sub">Your SPMS account details</div></div>
          </div>
          <div className="info-grid">
            <Item label="User ID" value={STUDENT.id} />
            <Item label="Role" value="Student" />
            <Item label="Account Status" value="Active" />
            <Item label="Email Verification" value="Verified ✓" />
            <Item label="Last Login" value={STUDENT.lastLogin} />
            <Item label="Account Created" value={STUDENT.created} />
          </div>
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Change Password</div>
            <div className="grid g-3">
              <input className="input" type="password" placeholder="Current password" />
              <input className="input" type="password" placeholder="New password" />
              <input className="input" type="password" placeholder="Confirm password" />
            </div>
            <button className="btn btn-outline btn-sm mt" style={{ marginTop: 12 }} onClick={() => showToast("Password updated successfully")}>Update Password</button>
          </div>
        </div>

        <div className="card card-pad">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="map-pin" size={17} /></div>
            <div><div className="card-title">Contact & Address</div><div className="card-sub">Where we can reach you</div></div>
          </div>
          {edit ? (
            <label className="field"><span>Residential Address</span><textarea className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
          ) : (
            <>
              <div className="info-item"><span>Residential Address</span><strong style={{ fontWeight: 500 }}>{form.address}</strong></div>
              <div className="info-item"><span>Emergency Contact</span><strong>{STUDENT.emergency}</strong></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}