/**
 * Database & Analytics Service
 * Handles storing feedback messages and tracking visitor analytics.
 * Real-time cloud synchronization ensures feedback submitted on mobile devices
 * appears instantly in the Admin Portal across any device worldwide!
 */

const FEEDBACK_STORAGE_KEY = "scrapbook_feedback_db";
const STATS_STORAGE_KEY = "scrapbook_stats_db";
const DEFAULT_PASS = "admin123";
const CLOUD_API_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019fecba9c6b1f17";

/**
 * Log a page view for real visitors only (ignores admin visits)
 */
export function trackPageView(pageName) {
  try {
    const isAdmin =
      localStorage.getItem("scrapbook_is_admin") === "true" ||
      sessionStorage.getItem("scrapbook_is_admin") === "true" ||
      window.location.pathname.toLowerCase().includes("admin") ||
      window.location.search.toLowerCase().includes("admin") ||
      window.location.hash.toLowerCase().includes("admin");

    if (isAdmin) {
      return;
    }

    const stats = getStats();
    const now = new Date().toISOString();

    stats.totalViews = (stats.totalViews || 0) + 1;
    stats.lastVisit = now;

    if (!stats.firstVisit) stats.firstVisit = now;

    stats.pageBreakdown = stats.pageBreakdown || {};
    stats.pageBreakdown[pageName] = (stats.pageBreakdown[pageName] || 0) + 1;

    let sessionId = sessionStorage.getItem("scrapbook_session_id");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("scrapbook_session_id", sessionId);
      stats.uniqueVisitors = (stats.uniqueVisitors || 0) + 1;
    }

    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error("Failed to log page view:", err);
  }
}

/**
 * Flag browser session as Admin (prevents self-counting)
 */
export function markAsAdmin() {
  try {
    localStorage.setItem("scrapbook_is_admin", "true");
    sessionStorage.setItem("scrapbook_is_admin", "true");
  } catch {}
}

/**
 * Save a new feedback entry & sync to Cloud API
 */
export function saveFeedback(entry) {
  try {
    const feedbackList = getFeedback();
    const newEntry = {
      id: "fb_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      name: entry.name || "Anonymous",
      message: entry.message || "",
      rating: entry.rating || "❤️",
      timestamp: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      rawTimestamp: Date.now(),
      device: getDeviceSummary(),
    };

    feedbackList.unshift(newEntry);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackList));

    // Sync to Cloud API asynchronously for cross-device viewing
    syncToCloud(feedbackList).catch(() => {});

    return newEntry;
  } catch (err) {
    console.error("Failed to save feedback:", err);
    return null;
  }
}

/**
 * Get all feedback entries from localStorage
 */
export function getFeedback() {
  try {
    const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return data ? JSON.parse(data) : getDemoFeedback();
  } catch {
    return getDemoFeedback();
  }
}

/**
 * Fetch & merge live feedback from Cloud DB
 */
export async function syncCloudFeedback() {
  try {
    const res = await fetch(CLOUD_API_URL);
    if (!res.ok) return getFeedback();

    const json = await res.json();
    const remoteList = json?.data?.feedback || [];
    const localList = getFeedback();

    // Merge remote and local by unique id
    const map = new Map();
    [...remoteList, ...localList].forEach((item) => {
      if (item && item.id) {
        map.set(item.id, item);
      }
    });

    const unifiedList = Array.from(map.values()).sort(
      (a, b) => (b.rawTimestamp || 0) - (a.rawTimestamp || 0)
    );

    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(unifiedList));
    return unifiedList;
  } catch (err) {
    console.warn("Cloud sync offline fallback to local data:", err);
    return getFeedback();
  }
}

/**
 * Internal helper to push updated list to Cloud DB
 */
async function syncToCloud(feedbackList) {
  try {
    await fetch(CLOUD_API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "vanshika_scrapbook_2026",
        data: { feedback: feedbackList },
      }),
    });
  } catch (err) {
    console.error("Cloud push failed:", err);
  }
}

/**
 * Get visitor analytics stats
 */
export function getStats() {
  try {
    const data = localStorage.getItem(STATS_STORAGE_KEY);
    return data
      ? JSON.parse(data)
      : {
          totalViews: 0,
          uniqueVisitors: 0,
          firstVisit: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
          pageBreakdown: {},
        };
  } catch {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      pageBreakdown: {},
    };
  }
}

/**
 * Reset visitor stats (clears admin test counts)
 */
export function resetStats() {
  try {
    localStorage.removeItem(STATS_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to reset stats:", err);
  }
}

/**
 * Clear all stored feedback
 */
export function clearAllFeedback() {
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  syncToCloud([]).catch(() => {});
}

/**
 * Validate admin password
 */
export function verifyAdminPassword(pass) {
  const customPass = localStorage.getItem("scrapbook_admin_pass") || DEFAULT_PASS;
  const valid = pass === customPass;
  if (valid) {
    markAsAdmin();
  }
  return valid;
}

/**
 * Update admin password
 */
export function setAdminPassword(newPass) {
  localStorage.setItem("scrapbook_admin_pass", newPass);
}

function getDeviceSummary() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile Device 📱";
  if (/tablet|ipad/i.test(ua)) return "Tablet 📱";
  return "Desktop / Laptop 💻";
}

function getDemoFeedback() {
  return [
    {
      id: "demo_1",
      name: "Vanshika",
      message: "This is so beautiful! Thank you so much for this amazing surprise ❤️",
      rating: "💖",
      timestamp: "Today at " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      rawTimestamp: Date.now(),
      device: "Mobile Device 📱",
    },
  ];
}
