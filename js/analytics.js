window.BugzilaAnalytics = window.BugzilaAnalytics || {};

(function () {
  const CONFIG_URL = "./data/analytics.json?v=20260827-step5-1";
  let config = null;
  let ready = false;

  function validMeasurementId(value) {
    return /^G-[A-Z0-9]+$/i.test(String(value || "").trim());
  }

  function clean(value, max = 100) {
    return String(value ?? "").slice(0, max);
  }

  function dashboardById(id) {
    return window.BugzilaDashboards?.data?.dashboards?.find((d) => d.id === id) || null;
  }

  function loadGoogleTag(measurementId) {
    if (document.querySelector(`script[data-bugzila-ga4="${measurementId}"]`)) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      debug_mode: Boolean(config?.debugMode)
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.bugzilaGa4 = measurementId;
    document.head.appendChild(script);
  }

  function track(eventName, parameters = {}) {
    if (!ready || typeof window.gtag !== "function") return;
    const safe = {};
    Object.entries(parameters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      safe[key] = typeof value === "number" ? value : clean(value);
    });
    window.gtag("event", eventName, safe);
  }

  function dashboardParams(dashboard) {
    return {
      dashboard_id: dashboard?.id || "",
      dashboard_name: dashboard?.family || dashboard?.title || "",
      dashboard_version: dashboard?.version || "",
      platform: dashboard?.platform || "",
      device_profile: dashboard?.deviceProfile || ""
    };
  }

  window.BugzilaAnalytics.track = track;
  window.BugzilaAnalytics.trackDashboardDownload = function (dashboard) {
    if (config?.events?.dashboardDownload === false) return;
    track("dashboard_download", {
      ...dashboardParams(dashboard),
      file_name: dashboard?.download?.fileName || ""
    });
  };

  function wireClickEvents() {
    document.addEventListener("click", (event) => {
      const view = event.target.closest(".view-details-button");
      if (view && config?.events?.dashboardView !== false) {
        const dashboard = dashboardById(view.dataset.dashboardId);
        track("dashboard_view", dashboardParams(dashboard));
        return;
      }

      const quick = event.target.closest(".community-comments-button");
      if (quick && config?.events?.quickComments !== false) {
        const dashboard = dashboardById(quick.dataset.dashboardId);
        track("quick_comments_open", dashboardParams(dashboard));
        return;
      }

      const discussion = event.target.closest(".community-link");
      if (discussion && config?.events?.communityDiscussion !== false) {
        const dashboard = dashboardById(discussion.dataset.dashboardId);
        track("community_discussion_open", {
          ...dashboardParams(dashboard),
          discussion_type: discussion.dataset.communityLink || "discussion"
        });
        return;
      }

      const play = event.target.closest(".google-play");
      if (play && config?.events?.googlePlay !== false) {
        track("car_play_google_play_click", {
          link_url: play.href,
          link_text: play.textContent?.trim() || "Get it on Google Play"
        });
        return;
      }

      const gallery = event.target.closest(".gallery-item");
      if (gallery && config?.events?.screenshotPreview !== false) {
        const detail = gallery.closest(".dashboard-detail");
        const dashboard = dashboardById(detail?.id);
        track("screenshot_preview", {
          ...dashboardParams(dashboard),
          image_caption: gallery.dataset.caption || ""
        });
        return;
      }

      const top = event.target.closest("#back-to-top");
      if (top && config?.events?.backToTop !== false) {
        track("back_to_top", { page_path: location.pathname });
      }
    });
  }

  async function init() {
    try {
      const response = await fetch(CONFIG_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      config = await response.json();
      window.BugzilaAnalytics.config = config;

      if (!config.enabled || !validMeasurementId(config.measurementId)) {
        console.info("Bugzila Analytics: GA4 is staged but not activated. Add a G- Measurement ID to data/analytics.json.");
        return;
      }

      loadGoogleTag(config.measurementId.trim());
      ready = true;
      window.BugzilaAnalytics.ready = true;
      wireClickEvents();
      console.info("Bugzila Analytics: GA4 active", config.measurementId);
    } catch (error) {
      console.warn("Bugzila Analytics: unable to load analytics configuration", error);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
