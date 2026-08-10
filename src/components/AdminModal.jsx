import { useState, useEffect } from "react";
import {
  getFeedback,
  getStats,
  verifyAdminPassword,
  setAdminPassword,
  clearAllFeedback,
  deleteFeedbackById,
  resetStats,
  resetAllAdminData,
  syncCloudFeedback,
} from "../utils/db.js";

export default function AdminModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("feedback");
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshData();
    }
  }, [isOpen, isAuthenticated]);

  const refreshData = async () => {
    setIsSyncing(true);
    setFeedbackList(getFeedback());
    setStats(getStats());

    // Fetch live feedback from cloud database across devices
    try {
      const liveFeedback = await syncCloudFeedback();
      setFeedbackList(liveFeedback);
    } catch {}
    setIsSyncing(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      setLoginError("");
      refreshData();
    } else {
      setLoginError("Incorrect Password! Default is 'admin123'");
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPassMsg("Password must be at least 4 characters long");
      return;
    }
    setAdminPassword(newPassword);
    setPassMsg("Password updated successfully! ✅");
    setNewPassword("");
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all feedback notes?")) {
      clearAllFeedback();
      setFeedbackList([]);
      refreshData();
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Delete this feedback note?")) {
      const updated = deleteFeedbackById(id);
      setFeedbackList(updated);
    }
  };

  const handleResetStats = () => {
    if (window.confirm("Are you sure you want to reset visitor analytics counts?")) {
      resetStats();
      setStats(getStats());
      refreshData();
    }
  };

  const handleResetAllData = () => {
    if (
      window.confirm(
        "⚠️ DANGER ZONE: Are you sure you want to RESET ALL ADMIN DATA? This will wipe both Visitor Analytics AND Feedback Notes!"
      )
    ) {
      resetAllAdminData();
      setFeedbackList([]);
      setStats(getStats());
      refreshData();
    }
  };

  const exportJSON = () => {
    const data = {
      feedback: getFeedback(),
      stats: getStats(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scrapbook-admin-export-${Date.now()}.json`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="admin-close" onClick={onClose} aria-label="Close Admin">
          ✕
        </button>

        {!isAuthenticated ? (
          <div className="admin-login-box">
            <div className="admin-icon">🔐</div>
            <h2>Admin Control Portal</h2>
            <p>Enter your password to view feedback notes & visitor stats.</p>

            <form onSubmit={handleLogin} className="admin-form">
              <input
                type="password"
                className="admin-input"
                placeholder="Enter password (default: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {loginError && <p className="admin-error">{loginError}</p>}

              <button type="submit" className="admin-btn">
                Unlock Dashboard 🔓
              </button>
            </form>
          </div>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-header">
              <h2>👑 Scrapbook Admin Panel</h2>
              <div className="admin-tabs">
                <button
                  className={`admin-tab ${activeTab === "feedback" ? "admin-tab--active" : ""}`}
                  onClick={() => {
                    setActiveTab("feedback");
                    refreshData();
                  }}
                >
                  💌 Feedback ({feedbackList.length})
                </button>
                <button
                  className={`admin-tab ${activeTab === "stats" ? "admin-tab--active" : ""}`}
                  onClick={() => setActiveTab("stats")}
                >
                  📊 Visitor Analytics
                </button>
                <button
                  className={`admin-tab ${activeTab === "settings" ? "admin-tab--active" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>

            <div className="admin-content">
              {activeTab === "feedback" && (
                <div className="admin-feedback-list">
                  <div className="admin-feedback-toolbar">
                    <span className="admin-cloud-badge">
                      {isSyncing ? "Syncing Cloud DB... ⏳" : "Connected to Live Cloud DB 🌐"}
                    </span>
                    <div className="admin-toolbar-actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                        onClick={refreshData}
                        disabled={isSyncing}
                      >
                        Refresh 🔄
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={handleClear}
                      >
                        Clear All Notes 🗑️
                      </button>
                    </div>
                  </div>

                  {feedbackList.length === 0 ? (
                    <div className="admin-empty-box">
                      <span className="admin-empty-icon">💌</span>
                      <p>No feedback notes right now.</p>
                    </div>
                  ) : (
                    feedbackList.map((item) => (
                      <div key={item.id} className="admin-feedback-card">
                        <div className="admin-fb-header">
                          <span className="admin-fb-rating">{item.rating}</span>
                          <span className="admin-fb-name">{item.name}</span>
                          <span className="admin-fb-time">{item.timestamp}</span>
                          <button
                            type="button"
                            className="admin-delete-item-btn"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete note"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="admin-fb-msg">"{item.message}"</p>
                        <div className="admin-fb-footer">
                          <span className="admin-fb-device">{item.device}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "stats" && (
                <div className="admin-stats-wrap">
                  <div className="admin-feedback-toolbar">
                    <span className="admin-cloud-badge">📊 Visitor Analytics Counter</span>
                    <button
                      type="button"
                      className="admin-btn admin-btn--danger admin-btn--sm"
                      onClick={handleResetStats}
                    >
                      Reset Visitor Stats 🔄
                    </button>
                  </div>

                  <div className="admin-stats-grid">
                    <div className="stat-card">
                      <span className="stat-number">{stats.totalViews || 0}</span>
                      <span className="stat-label">Total Page Views</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-number">{stats.uniqueVisitors || 0}</span>
                      <span className="stat-label">Unique Sessions</span>
                    </div>
                    <div className="stat-card stat-card--full">
                      <h4>🕒 Activity History</h4>
                      <p><strong>First Visit:</strong> {stats.firstVisit ? new Date(stats.firstVisit).toLocaleString() : "No visits logged yet"}</p>
                      <p><strong>Latest Visit:</strong> {stats.lastVisit ? new Date(stats.lastVisit).toLocaleString() : "No visits logged yet"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="admin-settings">
                  <h3>🔑 Change Admin Password</h3>
                  <form onSubmit={handlePasswordChange} className="admin-form">
                    <input
                      type="password"
                      className="admin-input"
                      placeholder="New Admin Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="submit" className="admin-btn">
                      Update Password
                    </button>
                    {passMsg && <p className="admin-success">{passMsg}</p>}
                  </form>

                  <hr className="admin-divider" />

                  <h3>📥 Data Management & Reset</h3>
                  <div className="admin-actions">
                    <button onClick={exportJSON} className="admin-btn admin-btn--ghost">
                      Export Data to JSON 📄
                    </button>
                    <button onClick={handleResetStats} className="admin-btn admin-btn--ghost">
                      Reset Visitor Analytics 📊
                    </button>
                    <button onClick={handleClear} className="admin-btn admin-btn--ghost">
                      Clear Feedback DB 💌
                    </button>
                    <button onClick={handleResetAllData} className="admin-btn admin-btn--danger">
                      Reset ALL Admin Data 🚨
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
