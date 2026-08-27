window.BugzilaCommunity = window.BugzilaCommunity || {};

(function () {
  const CONFIG_URL = "./data/community.json?v=20260827-step5-1";
  let config = null;
  let dashboards = [];

  const esc = (value = "") => String(value).replace(/[&<>\"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));

  function dashboardById(id) {
    return dashboards.find((d) => d.id === id);
  }

  function discussionTerm(dashboard) {
    return dashboard.id;
  }

  function clearGiscus() {
    const container = document.getElementById("giscus-container");
    if (container) container.innerHTML = "";
  }

  function setupPending(container) {
    const allUrl = config?.discussionUrls?.all || "https://github.com/bugziladashboard/simracing/discussions";
    container.innerHTML = `
      <div class="community-pending">
        <strong>Comments setup is ready for activation.</strong>
        <p>GitHub Discussions and giscus must be enabled once by the repository owner. Until then, feedback can be opened directly on GitHub.</p>
        <a class="button secondary" href="${esc(allUrl)}" target="_blank" rel="noopener noreferrer">Open GitHub Discussions</a>
      </div>`;
  }

  function mountGiscus(dashboard) {
    const container = document.getElementById("giscus-container");
    if (!container) return;
    clearGiscus();

    if (!config?.enabled || !config.repoId || !config.categoryId) {
      setupPending(container);
      return;
    }

    const guide = document.createElement("div");
    guide.className = "quick-comment-guide";
    guide.innerHTML = `
      <strong>Quick Comments</strong>
      <span>Best for short feedback, impressions and usage notes. For a bug that needs follow-up, a feature idea or a support question, use the dedicated GitHub Discussion buttons above.</span>`;
    container.appendChild(guide);

    const mount = document.createElement("div");
    mount.className = "giscus";
    container.appendChild(mount);

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs = {
      "data-repo": config.repo,
      "data-repo-id": config.repoId,
      "data-category": config.category,
      "data-category-id": config.categoryId,
      "data-mapping": config.mapping || "specific",
      "data-term": discussionTerm(dashboard),
      "data-strict": config.strict || "1",
      "data-reactions-enabled": config.reactionsEnabled || "1",
      "data-emit-metadata": config.emitMetadata || "0",
      "data-input-position": config.inputPosition || "top",
      "data-theme": config.theme || "dark",
      "data-lang": config.lang || "en",
      "data-loading": config.loading || "lazy"
    };
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    mount.appendChild(script);
  }

  function modalActions(dashboard) {
    const box = document.getElementById("community-modal-actions");
    if (!box) return;
    const urls = config?.discussionUrls || {};
    const suffix = encodeURIComponent(`${dashboard.title} ${dashboard.version}`);
    const links = [
      ["bug", "Report a Bug"],
      ["feature", "Request a Feature"],
      ["qa", "Ask a Question"]
    ];
    box.innerHTML = links.map(([key,label]) => {
      let href = urls[key] || urls.all || "https://github.com/bugziladashboard/simracing/discussions";
      if (href.includes("?")) href += `&title=${suffix}`;
      return `<a class="button secondary small" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }).join("");
  }

  function openCommunity(dashboardId) {
    const dashboard = dashboardById(dashboardId);
    const modal = document.getElementById("community-modal");
    if (!dashboard || !modal) return;
    document.getElementById("community-modal-title").textContent = `Quick Comments — ${dashboard.title}`;
    document.getElementById("community-modal-copy").textContent = `Share short feedback, impressions or usage notes for ${dashboard.title}. Comments stay attached to the ${dashboard.family} family across future versions. Use Report a Bug, Request a Feature or Ask a Question when the topic needs a dedicated GitHub Discussion.`;
    modalActions(dashboard);
    mountGiscus(dashboard);
    modal.showModal();
  }

  function wireLinks() {
    document.querySelectorAll(".community-link").forEach((link) => {
      const type = link.dataset.communityLink;
      let href = config?.discussionUrls?.[type];
      if (!href) return;
      const dashboard = dashboardById(link.dataset.dashboardId);
      if (dashboard && href.includes("?")) {
        const title = encodeURIComponent(`${dashboard.title} ${dashboard.version}`);
        href += `&title=${title}`;
      }
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  function wireEvents() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".community-comments-button");
      if (button) openCommunity(button.dataset.dashboardId);
    });
    const modal = document.getElementById("community-modal");
    modal?.querySelector(".community-close")?.addEventListener("click", () => {
      modal.close();
      clearGiscus();
    });
    modal?.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
        clearGiscus();
      }
    });
  }

  async function loadConfig() {
    try {
      const response = await fetch(CONFIG_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      config = await response.json();
      window.BugzilaCommunity.config = config;
      wireLinks();
    } catch (error) {
      console.error("Unable to load community config", error);
    }
  }

  document.addEventListener("bugzila:dashboards-ready", async (event) => {
    dashboards = event.detail?.dashboards || [];
    window.BugzilaCommunity.dashboards = dashboards;
    await loadConfig();
    wireEvents();
  }, { once: true });
})();
