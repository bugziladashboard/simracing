window.BugzilaDashboards = window.BugzilaDashboards || {};

(function () {
  const CACHE_KEY = "bugzila-release-stats-v2";
  const CACHE_TTL_MS = 10 * 60 * 1000;
  const POST_DOWNLOAD_REFRESH_MS = 5000;
  let lastData = null;
  let refreshTimer = null;

  function findDashboard(id) {
    return window.BugzilaDashboards.data?.dashboards?.find(d => d.id === id);
  }

  function formatCount(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function setCount(id, value, available) {
    const text = available ? `${formatCount(value)} downloads` : "Release pending";
    document.querySelectorAll(`[data-download-count="${CSS.escape(id)}"]`).forEach(el => {
      el.textContent = text;
      el.classList.toggle("pending", !available);
    });
  }

  function setButtonState(id, available) {
    document.querySelectorAll(`.download-button[data-dashboard-id="${CSS.escape(id)}"]`).forEach(button => {
      button.disabled = !available;
      button.classList.toggle("is-pending", !available);
      button.title = available ? "Download the latest dashboard release" : "GitHub Release asset is not published yet";
    });
  }

  function getCachedReleases() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      if (!cached?.time || Date.now() - cached.time > CACHE_TTL_MS) return null;
      return cached.releases;
    } catch {
      return null;
    }
  }

  function setCachedReleases(releases) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), releases }));
    } catch {}
  }

  function clearCachedReleases() {
    try { sessionStorage.removeItem(CACHE_KEY); } catch {}
  }

  async function fetchReleases(apiUrl, force = false) {
    if (!force) {
      const cached = getCachedReleases();
      if (cached) return cached;
    }

    const separator = apiUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${apiUrl}${separator}_=${Date.now()}`, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`GitHub releases API returned HTTP ${response.status}`);
    const releases = await response.json();
    setCachedReleases(releases);
    return releases;
  }

  function resolveDashboardRelease(dashboard, releases) {
    const tag = dashboard.download?.releaseTag;
    const fileName = dashboard.download?.fileName;
    const release = releases.find(item => item.tag_name === tag);
    const asset = release?.assets?.find(item => item.name === fileName);

    if (!asset) {
      dashboard.download.resolvedUrl = "";
      dashboard.download.downloadCount = 0;
      setCount(dashboard.id, 0, false);
      setButtonState(dashboard.id, false);
      return;
    }

    dashboard.download.resolvedUrl = asset.browser_download_url;
    dashboard.download.downloadCount = asset.download_count || 0;
    dashboard.download.releasePageUrl = release.html_url || dashboard.download.releasePageUrl;
    setCount(dashboard.id, dashboard.download.downloadCount, true);
    setButtonState(dashboard.id, true);
  }

  function dashboardAsset(asset) {
    const name = String(asset?.name || "").toLowerCase();
    return name.endsWith(".mzdash") || name.endsWith(".simhubdash");
  }

  async function hydrateDownloads(data, force = false) {
    const apiUrl = data.site?.githubApiReleases;
    if (!apiUrl) return;
    lastData = data;

    try {
      const releases = await fetchReleases(apiUrl, force);
      data.dashboards.forEach(d => resolveDashboardRelease(d, releases));

      const total = releases
        .flatMap(release => release.assets || [])
        .filter(dashboardAsset)
        .reduce((sum, asset) => sum + Number(asset.download_count || 0), 0);

      const heroTotal = document.getElementById("hero-total-downloads");
      if (heroTotal) heroTotal.textContent = formatCount(total);
    } catch (error) {
      console.warn("Unable to load GitHub download counts", error);
      if (!force) {
        data.dashboards.forEach(d => {
          setCount(d.id, 0, false);
          setButtonState(d.id, false);
        });
        const heroTotal = document.getElementById("hero-total-downloads");
        if (heroTotal) heroTotal.textContent = "—";
      }
    }
  }

  function schedulePostDownloadRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      if (!lastData) return;
      clearCachedReleases();
      hydrateDownloads(lastData, true);
    }, POST_DOWNLOAD_REFRESH_MS);
  }

  document.addEventListener("bugzila:dashboards-ready", (event) => {
    hydrateDownloads(event.detail);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".download-button");
    if (!button || button.disabled) return;

    const dashboard = findDashboard(button.dataset.dashboardId);
    if (!dashboard) return;

    const url = dashboard.download?.resolvedUrl;
    if (!url) return;

    window.BugzilaAnalytics?.trackDashboardDownload?.(dashboard);

    // GitHub increments release-asset download_count after the asset request.
    // Re-check a few seconds after the click so the visible counter does not
    // remain stale for the normal 10-minute session cache window.
    schedulePostDownloadRefresh();
    window.location.href = url;
  });

  window.addEventListener("focus", () => {
    if (!lastData) return;
    // Useful when the browser hands the download to another UI and then returns.
    clearCachedReleases();
    hydrateDownloads(lastData, true);
  });
})();
