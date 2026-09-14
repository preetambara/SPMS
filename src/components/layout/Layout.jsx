import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { Avatar } from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";
import { ROLE_LABELS } from "../../constants/roles";
import { ROUTES } from "../../constants/routes";

const NAV = {
  student: [
    { to: "dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "profile", icon: "user", label: "My Profile" },
    { to: "courses", icon: "book", label: "My Courses" },
    { to: "attendance", icon: "calendar-check", label: "Attendance" },
    { to: "assignments", icon: "clipboard", label: "Assignments" },
    { to: "examinations", icon: "file-text", label: "Examinations" },
    { to: "results", icon: "award", label: "Results" },
    { to: "performance", icon: "trending", label: "Performance Analytics" },
    { to: "notices", icon: "bell", label: "Notices" },
    { to: "settings", icon: "settings", label: "Settings" },
  ],
  faculty: [
    { to: "dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "profile", icon: "user", label: "My Profile" },
    { to: "subjects", icon: "book", label: "My Subjects" },
    { to: "students", icon: "users", label: "Students" },
    { to: "attendance", icon: "calendar-check", label: "Attendance" },
    { to: "assignments", icon: "clipboard", label: "Assignments" },
    { to: "examinations", icon: "file-text", label: "Examinations" },
    { to: "grades", icon: "award", label: "Grades / Results" },
    { to: "performance", icon: "trending", label: "Performance" },
    { to: "notices", icon: "bell", label: "Notices" },
    { to: "settings", icon: "settings", label: "Settings" },
  ],
  admin: [
    { to: "dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "students", icon: "users", label: "Students" },
    { to: "faculty", icon: "user", label: "Faculty" },
    { to: "subjects", icon: "book", label: "Subjects" },
    { to: "notices", icon: "bell", label: "Notices" },
    { to: "settings", icon: "settings", label: "Settings" },
  ],
};

export function Layout({ portal }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    logout();
    nav(ROUTES.LOGIN);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-mark">
            <Icon name="graduation" size={20} />
          </div>
          <div className="brand-text">
            <div className="brand-name">SPMS</div>
            <div className="brand-sub">{ROLE_LABELS[portal] || portal}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV[portal]?.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
            >
              <Icon name={item.icon} size={18} />
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="nav-item logout" onClick={handleLogout}>
          <Icon name="logout" size={18} />
          <span className="label">Logout</span>
        </button>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="search-box">
            <Icon name="search" size={16} />
            <input placeholder="Search students, subjects, assignments..." />
          </div>
          <div className="topbar-right">
            <button className="icon-btn" aria-label="Calendar">
              <Icon name="calendar" size={17} />
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <Icon name="bell" size={17} />
              <span className="dot" />
            </button>
            <div className="user-chip" onClick={() => setMenu((o) => !o)}>
              <Avatar name={user?.name || "User"} size={34} />
              <div className="user-meta">
                <strong>{user?.name || "User"}</strong>
                <span>{ROLE_LABELS[portal] || portal}</span>
              </div>
              <Icon name="chevron-down" size={14} />
              {menu && (
                <div className="user-menu" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setMenu(false);
                      nav(`/${portal}/profile`);
                    }}
                  >
                    <Icon name="user" size={15} />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setMenu(false);
                      nav(`/${portal}/settings`);
                    }}
                  >
                    <Icon name="settings" size={15} />
                    Settings
                  </button>
                  <hr />
                  <button onClick={handleLogout}>
                    <Icon name="logout" size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
