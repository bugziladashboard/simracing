/*
  GA4 is intentionally not activated in Step 2.
  Step 4 will add the production Measurement ID and verify analytics events.
*/
window.BugzilaAnalytics = {
  trackDashboardDownload(dashboard) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "dashboard_download", {
      dashboard_name: dashboard.family,
      dashboard_version: dashboard.version,
      platform: dashboard.platform,
      file_name: dashboard.download?.fileName || ""
    });
  }
};
