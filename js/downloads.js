window.BugzilaDashboards = window.BugzilaDashboards || {};

(function () {
  function findDashboard(id) {
    return window.BugzilaDashboards.data?.dashboards?.find(d => d.id === id);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".download-button");
    if (!button) return;
    const dashboard = findDashboard(button.dataset.dashboardId);
    if (!dashboard) return;

    const url = dashboard.download?.releaseAssetUrl;
    if (!url) {
      alert(`Download setup is coming in the next release step.\n\n${dashboard.title}\n${dashboard.download?.fileName || ""}`);
      return;
    }

    window.BugzilaAnalytics?.trackDashboardDownload?.(dashboard);
    window.location.href = url;
  });
})();
