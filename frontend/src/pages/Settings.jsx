import { useState } from "react";

function Settings() {
  const [email, setEmail] = useState("user@citricloud.com");
  const [fullName, setFullName] = useState("User");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deploymentAlerts, setDeploymentAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = () => {
    setSaveStatus("Changes saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSaveStatus("Passwords do not match!");
      return;
    }
    setSaveStatus("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <div className="stack">
      {/* Settings Header */}
      <section className="section-hero settings-hero">
        <h1>Settings</h1>
        <p className="text-large">Manage your profile, preferences, and security settings</p>
      </section>

      {/* Tabs Navigation */}
      <section className="settings-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="material-symbols-outlined">person</span>
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <span className="material-symbols-outlined">security</span>
            Security
          </button>
          <button 
            className={`tab-button ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </button>
          <button 
            className={`tab-button ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            <span className="material-symbols-outlined">tune</span>
            Preferences
          </button>
        </div>
      </section>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <section className="section soft">
          <h2>Profile Information</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
              />
            </div>

            <div className="form-group">
              <label>Avatar</label>
              <div className="avatar-upload">
                <div className="avatar-preview">
                  <div className="avatar-circle">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button type="button" className="button button-secondary">
                  <span className="material-symbols-outlined">upload</span>
                  Upload Photo
                </button>
              </div>
            </div>

            {saveStatus && <div className="status success">{saveStatus}</div>}
            <button onClick={handleSave} className="button primary">
              Save Changes
            </button>
          </div>
        </section>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <section className="section soft">
          <h2>Security Settings</h2>

          {/* Change Password */}
          <div className="settings-card">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              {saveStatus && <div className="status success">{saveStatus}</div>}
              <button type="submit" className="button primary">
                Update Password
              </button>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="settings-card">
            <div className="setting-header">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p className="setting-description">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="settings-card">
            <h3>Active Sessions</h3>
            <div className="session-item">
              <div className="session-info">
                <p className="session-device">Chrome on Windows</p>
                <p className="session-time">Last active: 2 minutes ago</p>
              </div>
              <button type="button" className="button button-secondary">
                Sign Out
              </button>
            </div>
            <button type="button" className="button button-secondary" style={{width: '100%', marginTop: '12px'}}>
              Sign Out All Sessions
            </button>
          </div>
        </section>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <section className="section soft">
          <h2>Notification Preferences</h2>

          <div className="settings-card">
            <div className="notification-item">
              <div>
                <h4>Email Notifications</h4>
                <p className="setting-description">Receive general account notifications via email</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div>
                <h4>Deployment Alerts</h4>
                <p className="setting-description">Get notified when deployments start or complete</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={deploymentAlerts}
                  onChange={(e) => setDeploymentAlerts(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div>
                <h4>Security Alerts</h4>
                <p className="setting-description">Critical security notifications (always enabled)</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={securityAlerts}
                  onChange={(e) => setSecurityAlerts(e.target.checked)}
                  disabled
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <button onClick={handleSave} className="button primary">
            Save Notification Settings
          </button>
        </section>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <section className="section soft">
          <h2>Preferences</h2>

          <div className="settings-card">
            <h3>Theme</h3>
            <div className="theme-selector">
              <label className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={(e) => setTheme(e.target.value)}
                />
                <span className="material-symbols-outlined">light_mode</span>
                Light
              </label>
              <label className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={(e) => setTheme(e.target.value)}
                />
                <span className="material-symbols-outlined">dark_mode</span>
                Dark
              </label>
              <label className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value="auto"
                  checked={theme === "auto"}
                  onChange={(e) => setTheme(e.target.value)}
                />
                <span className="material-symbols-outlined">brightness_auto</span>
                Auto
              </label>
            </div>
          </div>

          <div className="settings-card">
            <h3 style={{marginBottom: '12px'}}>Danger Zone</h3>
            <p className="setting-description" style={{marginBottom: '20px'}}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="button button-danger">
              Delete Account
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Settings;
