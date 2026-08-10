/**
 * Database & Analytics Service
 * Handles storing feedback messages and tracking visitor analytics.
 * Real-time cloud synchronization ensures visitor counts & feedback submitted on mobile devices
 * appear instantly in the Admin Portal across any device worldwide!
 */

const FEEDBACK_STORAGE_KEY = "scrapbook_feedback_db";
const STATS_STORAGE_KEY = "scrapbook_stats_db";
const INITIALIZED_KEY = "scrapbook_initialized";
const DEFAULT_PASS = "admin123";
const CLOUD_API_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019fecba9c6b1f17";

/**
 * Log a page view for real visitors only (ignores admin visits) & sync to Cloud DB
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

    // Sync visitor stats live to Cloud API
    syncToCloud(null, stats).catch(() => {});
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
    localStorage.setItem(INITIALIZED_KEY, "true");

    // Sync to Cloud API asynchronously
    syncToCloud(feedbackList, null).catch(() => {});

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
    if (data !== null) {
      return JSON.parse(data);
    }
    if (localStorage.getItem(INITIALIZED_KEY) === "true") {
      return [];
    }
    return getDemoFeedback();
  } catch {
    return [];
  }
}

/**
 * Delete a single feedback entry by ID
 */
export function deleteFeedbackById(id) {
  try {
    const list = getFeedback().filter((item) => item.id !== id);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(INITIALIZED_KEY, "true");
    syncToCloud(list, null).catch(() => {});
    return list;
  } catch (err) {
    console.error("Failed to delete feedback entry:", err);
    return getFeedback();
  }
}

/**
 * Fetch & merge live feedback and visitor stats from Cloud DB
 */
export async function syncCloudData() {
  try {
    const res = await fetch(CLOUD_API_URL);
    if (!res.ok) return { feedback: getFeedback(), stats: getStats() };

    const json = await res.json();
    const remoteList = json?.data?.feedback || [];
    const remoteStats = json?.data?.stats || null;
    const localList = getFeedback();
    const localStats = getStats();

    // Merge feedback
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
    localStorage.setItem(INITIALIZED_KEY, "true");

    // Merge visitor stats
    let unifiedStats = localStats;
    if (remoteStats) {
      unifiedStats = {
        totalViews: Math.max(remoteStats.totalViews || 0, localStats.totalViews || 0),
        uniqueVisitors: Math.max(remoteStats.uniqueVisitors || 0, localStats.uniqueVisitors || 0),
        firstVisit: remoteStats.firstVisit || localStats.firstVisit,
        lastVisit: remoteStats.lastVisit || localStats.lastVisit,
        pageBreakdown: { ...(remoteStats.pageBreakdown || {}), ...(localStats.pageBreakdown || {}) },
      };
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(unifiedStats));
    }

    return { feedback: unifiedList, stats: unifiedStats };
  } catch (err) {
    console.warn("Cloud sync offline fallback:", err);
    return { feedback: getFeedback(), stats: getStats() };
  }
}

/**
 * Internal helper to push updated list & stats to Cloud DB
 */
async function syncToCloud(feedbackList, statsObj) {
  try {
    const listToPush = feedbackList !== null && feedbackList !== undefined ? feedbackList : getFeedback();
    const statsToPush = statsObj !== null && statsObj !== undefined ? statsObj : getStats();

    await fetch(CLOUD_API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "vanshika_scrapbook_2026",
        data: {
          feedback: listToPush,
          stats: statsToPush,
        },
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
          firstVisit: null,
          lastVisit: null,
          pageBreakdown: {},
        };
  } catch {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      firstVisit: null,
      lastVisit: null,
      pageBreakdown: {},
    };
  }
}

/**
 * Reset visitor stats globally (clears test counts in local & cloud DB)
 */
export function resetStats() {
  try {
    const emptyStats = {
      totalViews: 0,
      uniqueVisitors: 0,
      firstVisit: null,
      lastVisit: null,
      pageBreakdown: {},
    };
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(emptyStats));
    sessionStorage.removeItem("scrapbook_session_id");
    syncToCloud(null, emptyStats).catch(() => {});
  } catch (err) {
    console.error("Failed to reset stats:", err);
  }
}

/**
 * Clear all stored feedback
 */
export function clearAllFeedback() {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(INITIALIZED_KEY, "true");
    syncToCloud([], null).catch(() => {});
  } catch (err) {
    console.error("Failed to clear feedback:", err);
  }
}

/**
 * Reset ALL stored admin data (clears both visitor analytics AND feedback notes)
 */
export function resetAllAdminData() {
  try {
    const emptyStats = {
      totalViews: 0,
      uniqueVisitors: 0,
      firstVisit: null,
      lastVisit: null,
      pageBreakdown: {},
    };
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(emptyStats));
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(INITIALIZED_KEY, "true");
    sessionStorage.removeItem("scrapbook_session_id");
    syncToCloud([], emptyStats).catch(() => {});
  } catch (err) {
    console.error("Failed to reset all data:", err);
  }
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
