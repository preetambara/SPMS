import { useState } from "react";
import Icon from "../../components/Icon";
import { PageHeader, Avatar, Badge } from "../../components/UI";
import { showToast } from "../../components/Toast";
import { FACULTY } from "../../data/mockData";

const Item = ({ label, value }) => (
  <div className="info-item"><span>{label}</span><strong>{value}</strong></div>
);

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: FACULTY.name, email: FACULTY.email, phone: FACULTY.phone,
    dob: FACULTY.dob, gender: FACULTY.gender, office: FACULTY.office, address: FACULTY.address,
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const save = () => { setEdit(false); showToast("Profile updated successfully"); };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="View and manage your personal information"
        actions={edit
          ? <>
              <button className="btn btn-ghost" onClick={() => setEdit(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}><Icon name="save" size={15} />Save Changes</button>
            </>
          : <button className="btn btn-outline" onClick={() => setEdit(true)}><Icon name="edit" size={15} />Edit Profile</button>}
      />

      <div className="card profile-hero">
        <Avatar name={FACULTY.name} size={84} />
        <div className="grow">
          <h2 style={{ fontSize: 20 }}>{FACULTY.name}</h2>
          <p className="muted" style={{ marginTop: 3 }}>{FACULTY.designation} • {FACULTY.department}</p>
          <div className="row muted" style={{ gap: 18, marginTop: 12, flexWrap: "wrap", fontSize: 13 }}>
            <span className="row" style={{ gap: 7 }}><Icon name="mail" size={14} color="var(--primary)" />{form.email}</span>
            <span className="row" style={{ gap: 7 }}><Icon name="phone" size={14} color="var(--primary)" />{form.phone}</span>
            <span className="row" style={{ gap: 7 }}><Icon name="map-pin" size={14} color="var(--primary)" />{FACULTY.location}</span>
          </div>
        </div>
        <div className="col" style={{ alignItems: "flex-end", gap: 8 }}>
          <Badge variant="success">{FACULTY.status}</Badge>
          <span className="muted" style={{ fontSize: 12 }}>Employee ID: {FACULTY.employeeId}</span>
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
              <label className="field"><span>Full Name</span><input className="input" value={form.name} onChange={set("name")} /></label>
              <label className="field"><span>Email Address</span><input className="input" value={form.email} onChange={set("email")} /></label>
              <label className="field"><span>Phone Number</span><input className="input" value={form.phone} onChange={set("phone")} /></label>
              <div className="grid g-2">
                <label className="field"><span>Date of Birth</span><input className="input" value={form.dob} onChange={set("dob")} /></label>
                <label className="field"><span>Gender</span>
                  <select className="input" value={form.gender} onChange={set("gender")}><option>Male</option><option>Female</option><option>Other</option></select>
                </label>
              </div>
            </div>
          ) : (
            <div className="info-grid">
              <Item label="Full Name" value={form.name} />
              <Item label="Email Address" value={form.email} />
              <Item label="Phone Number" value={form.phone} />
              <Item label="Date of Birth" value={form.dob} />
              <Item label="Gender" value={form.gender} />
              <Item label="Location" value={FACULTY.location} />
            </div>
          )}
        </div>

        <div className="card card-pad">
          <div className="sec-head">
            <div className="sec-icon"><Icon name="book" size={17} /></div>
            <div><div className="card-title">Professional Details</div><div className="card-sub">Your employment information</div></div>
          </div>
          <div className="info-grid">
            <Item label="Employee ID" value={FACULTY.employeeId} />
            <Item label="Joining Date" value={FACULTY.joiningDate} />
            <Item label="Designation" value={FACULTY.designation} />
            <Item label="Department" value={FACULTY.department} />
            <Item label="Employment Type" value={FACULTY.type} />
            <Item label="Status" value={FACULTY.status} />
            <Item label="Experience" value={FACULTY.experience} />
          </div>
        </div>
      </div>

      <div className="card card-pad mt">
        <div className="sec-head">
          <div className="sec-icon"><Icon name="map-pin" size={17} /></div>
          <div><div className="card-title">Contact &amp; Address</div><div className="card-sub">Office and residential contact details</div></div>
        </div>
        {edit ? (
          <div className="grid" style={{ gap: 12 }}>
            <label className="field"><span>Office Address</span><input className="input" value={form.office} onChange={set("office")} /></label>
            <label className="field"><span>Residential Address</span><textarea className="input" value={form.address} onChange={set("address")} /></label>
          </div>
        ) : (
          <div className="info-grid">
            <Item label="Office Address" value={form.office} />
            <Item label="Residential Address" value={form.address} />
          </div>
        )}
      </div>
    </>
  );
}