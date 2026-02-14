import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    deployments: 12,
    services: 5,
    uptime: "99.98%",
    users: 24
  });

  useEffect(() => {
    // Get profile from localStorage or API
    const token = localStorage.getItem("cc_token");
    const email = localStorage.getItem("cc_email") || "user@citricloud.com";
    
    setProfile({
      email: email,
      name: email.split("@")[0],
      initials: email.charAt(0).toUpperCase(),
      joinDate: "January 2026",
      status: "Active"
    });
  }, []);

  return (
    <div className="stack">
      {/* Profile Hero Section */}
      <section className="section-hero dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {profile?.initials || "U"}
            </div>
            <div className="profile-info">
              <h1>{profile?.name || "User"}</h1>
              <p className="text-large">{profile?.email}</p>
              <div className="profile-meta">
                <span className="profile-status">
                  <span className="status-dot"></span>
                  {profile?.status}
                </span>
                <span className="profile-joined">Joined {profile?.joinDate}</span>
              </div>
            </div>
            <Link to="/settings" className="button button-secondary">
              Edit Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="section soft">
        <h2>Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">cloud_upload</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Deployments</p>
              <p className="stat-value">{stats.deployments}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">apps</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Services</p>
              <p className="stat-value">{stats.services}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Uptime</p>
              <p className="stat-value">{stats.uptime}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Team Members</p>
              <p className="stat-value">{stats.users}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section soft">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/documentation" className="action-card">
            <span className="material-symbols-outlined">library_books</span>
            <h3>Documentation</h3>
            <p>View guides and API docs</p>
          </Link>

          <Link to="/support" className="action-card">
            <span className="material-symbols-outlined">support_agent</span>
            <h3>Support</h3>
            <p>Get help from our team</p>
          </Link>

          <Link to="/settings" className="action-card">
            <span className="material-symbols-outlined">settings</span>
            <h3>Settings</h3>
            <p>Manage your account</p>
          </Link>

          <Link to="/notifications" className="action-card">
            <span className="material-symbols-outlined">notifications</span>
            <h3>Notifications</h3>
            <p>Update alert preferences</p>
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section soft">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">
              <span className="material-symbols-outlined">cloud_upload</span>
            </span>
            <div className="activity-content">
              <p className="activity-title">Deployed new version</p>
              <p className="activity-time">2 hours ago</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">
              <span className="material-symbols-outlined">person_add</span>
            </span>
            <div className="activity-content">
              <p className="activity-title">Added team member</p>
              <p className="activity-time">1 day ago</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">
              <span className="material-symbols-outlined">security</span>
            </span>
            <div className="activity-content">
              <p className="activity-title">Updated security settings</p>
              <p className="activity-time">3 days ago</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">
              <span className="material-symbols-outlined">folder_open</span>
            </span>
            <div className="activity-content">
              <p className="activity-title">Created new project</p>
              <p className="activity-time">1 week ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
