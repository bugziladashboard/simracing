window.BugzilaDashboards = window.BugzilaDashboards || {};

(function () {
  const statusClass = (status) => `status-${status.toLowerCase()}`;
  const statusBadge = (status) => `<span class="status-badge ${statusClass(status)}">${status}</span>`;
  const esc = (value = "") => String(value).replace(/[&<>"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));

  const gameLabel = (g) => g.label || String(g.level || "unverified").replace(/-/g, " ").toUpperCase();
  const gameTag = (g, showFullName = false) => {
    const title = g.note ? ` title="${esc(g.note)}"` : "";
    const name = showFullName ? g.name : (g.short || g.name);
    return `<span class="game-pill"${title}><span class="compat-tag compat-${esc(g.level)}">${esc(gameLabel(g))}</span><b>${esc(name)}</b></span>`;
  };

  function supportedGames(d) {
    const games = d.compatibility?.games || [];
    if (!games.length) return `<span class="muted-inline">Verification pending</span>`;
    return `<div class="game-support-list">${games.map(g => gameTag(g)).join("")}</div>`;
  }

  function bestFor(d) {
    const items = d.useProfile?.bestFor || [];
    return items.length ? `<div class="spec-chips">${items.map(item => `<span>${esc(item)}</span>`).join("")}</div>` : `<span class="muted-inline">General sim racing</span>`;
  }

  function downloadStat(d) {
    return `<span class="download-stat" data-download-count="${esc(d.id)}">Checking downloads…</span>`;
  }

  function dashboardCard(d) {
    const preview = d.pages?.[0]?.image || "";
    return `
      <article class="dashboard-card">
        <img class="card-image" src="${esc(preview)}" alt="${esc(d.title)} dashboard preview" loading="lazy">
        <div class="card-body">
          <p class="card-kicker">${esc(d.platform)}</p>
          <h3>${esc(d.title)}</h3>
          <div class="status-row">${d.status.map(statusBadge).join("")}</div>
          <p class="card-summary">${esc(d.summary)}</p>
          <div class="card-meta">
            <span class="meta-pill">${esc(d.resolution)}</span>
            <span class="meta-pill">${d.pages.length} Pages</span>
            <span class="meta-pill">${esc(d.deviceProfile)}</span>
          </div>
          <div class="download-line">${downloadStat(d)}</div>
          <div class="card-actions">
            <a class="button secondary small" href="#${esc(d.id)}">View Details</a>
            <button class="button primary small download-button" type="button" data-dashboard-id="${esc(d.id)}">Download</button>
          </div>
        </div>
      </article>`;
  }

  function dashboardDetail(d) {
    const gallery = d.pages.map((p) => `
      <button class="gallery-item" type="button" data-image="${esc(p.image)}" data-caption="${esc(`${d.title} — ${p.name}`)}">
        <img src="${esc(p.image)}" alt="${esc(`${d.title} ${p.name}`)}" loading="lazy">
        <span class="gallery-caption"><strong>${esc(p.name)}</strong><span>${esc(p.description)}</span></span>
      </button>`).join("");

    const features = d.features.map(f => `<span>${esc(f)}</span>`).join("");
    const history = d.releaseHistory.map(r => `
      <div class="release-item"><strong>${esc(r.version)}</strong><div class="release-statuses">${r.status.map(statusBadge).join("")}</div></div>`).join("");

    const fileExtension = d.download?.fileName?.endsWith(".simhubdash") ? ".simhubdash" : ".mzdash";

    return `
      <section id="${esc(d.id)}" class="dashboard-detail">
        <div class="detail-header">
          <div class="detail-title">
            <p class="eyebrow">${esc(d.platform)} // ${esc(d.version)}</p>
            <h2>${esc(d.family)}</h2>
            <div class="status-row">${d.status.map(statusBadge).join("")}</div>
            <p>${esc(d.summary)}</p>
            <div class="detail-download-row">
              <button class="button primary download-button" type="button" data-dashboard-id="${esc(d.id)}">Download ${esc(fileExtension)}</button>
              ${downloadStat(d)}
            </div>
          </div>
          <div class="detail-specs">
            <div class="spec"><span>Current Version</span><strong>${esc(d.version)}</strong></div>
            <div class="spec"><span>Display</span><strong>${esc(d.resolution)}</strong></div>
            <div class="spec"><span>Hardware</span><strong>${esc(d.platform)}</strong></div>
            <div class="spec"><span>Pages</span><strong>${d.pages.length}</strong></div>
            <div class="spec spec-wide"><span>Recommended Driver Level</span><strong>${esc(d.useProfile?.driverLevel || "General")}</strong></div>
            <div class="spec spec-wide"><span>Best For</span>${bestFor(d)}</div>
            <div class="spec spec-wide"><span>Supported / Tested Games</span>${supportedGames(d)}</div>
          </div>
        </div>

        <div class="gallery">${gallery}</div>

        <div class="detail-grid">
          <div class="info-panel">
            <h3>Design Concept</h3>
            <p>${esc(d.concept)}</p>
            <div class="feature-list">${features}</div>
            <p class="preview-note"><strong>Preview note:</strong> ${esc(d.previewNote)}</p>
          </div>
          <div class="info-panel">
            <h3>Release History</h3>
            <p>Only the latest version is featured. Older versions remain listed for reference.</p>
            <div class="release-list">${history}</div>
          </div>
        </div>
      </section>`;
  }

  function updates(dashboards) {
    return [...dashboards]
      .sort((a,b) => b.releaseDate.localeCompare(a.releaseDate))
      .map(d => `<article class="update-card"><time datetime="${esc(d.releaseDate)}">${esc(d.releaseDate)}</time><h3>${esc(d.title)}</h3><p>${esc(d.platform)} · ${d.status.map(s => s.toUpperCase()).join(" / ")}</p></article>`)
      .join("");
  }

  function compatibility(dashboards) {
    const rows = dashboards.map(d => {
      const games = d.compatibility.games.length
        ? d.compatibility.games.map(g => `<div class="compat-game-row"><span class="compat-tag compat-${esc(g.level)}">${esc(gameLabel(g))}</span> <strong>${esc(g.short || g.name)}</strong> <span>${esc(g.name)}</span>${g.note ? `<br><small>${esc(g.note)}</small>` : ""}</div>`).join("")
        : `<span class="compat-tag compat-unverified">NOT TESTED</span> <span>Game verification will be added after confirmed testing.</span>`;
      const recommendedUse = `<strong>${esc(d.useProfile?.driverLevel || "General")}</strong><br><small>${esc((d.useProfile?.bestFor || []).join(" · "))}</small>`;
      return `<tr><td><strong>${esc(d.family)}</strong><br><small>${esc(d.version)}</small></td><td>${esc(d.platform)}</td><td>${esc(d.resolution)}</td><td>${recommendedUse}</td><td>${games}</td></tr>`;
    }).join("");
    return `<table class="compat-table"><thead><tr><th>Dashboard</th><th>Hardware</th><th>Resolution</th><th>Recommended Use</th><th>Game Compatibility</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function legend(defs) {
    return Object.entries(defs).map(([key, value]) => `<div class="legend-item">${statusBadge(key)}<span>${esc(value)}</span></div>`).join("");
  }

  function gameLegend(defs) {
    const labels = { verified: "VERIFIED", tested: "TESTED", expected: "EXPECTED", partial: "PARTIAL", unverified: "NOT TESTED" };
    return Object.entries(defs || {}).map(([key, value]) => `<div class="legend-item"><span class="compat-tag compat-${esc(key)}">${esc(labels[key] || key.replace(/-/g, " "))}</span><span>${esc(value)}</span></div>`).join("");
  }

  function heroRows(dashboards) {
    return dashboards
      .map(d => `<div class="telemetry-row"><span>${esc(d.heroLabel || d.platform)}</span><b>READY</b></div>`)
      .join("");
  }

  function setupModal() {
    const modal = document.getElementById("image-modal");
    const image = document.getElementById("modal-image");
    const caption = document.getElementById("modal-caption");
    if (!modal) return;
    document.addEventListener("click", (event) => {
      const item = event.target.closest(".gallery-item");
      if (!item) return;
      image.src = item.dataset.image;
      caption.textContent = item.dataset.caption;
      modal.showModal();
    });
    modal.querySelector(".modal-close")?.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  }

  async function init() {
    try {
      const response = await fetch("./data/dashboards.json?v=20260827-step3-4", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      window.BugzilaDashboards.data = data;

      document.getElementById("hero-dashboard-count").textContent = data.dashboards.length;
      document.getElementById("hero-release-rows").innerHTML = heroRows(data.dashboards);
      document.getElementById("dashboard-grid").innerHTML = data.dashboards.map(dashboardCard).join("");
      document.getElementById("dashboard-details").innerHTML = data.dashboards.map(dashboardDetail).join("");
      document.getElementById("updates-list").innerHTML = updates(data.dashboards);
      document.getElementById("compatibility-table").innerHTML = compatibility(data.dashboards);
      document.getElementById("compatibility-legend").innerHTML = gameLegend(data.gameStatusDefinitions);
      document.getElementById("status-legend").innerHTML = legend(data.statusDefinitions);
      setupModal();
      document.dispatchEvent(new CustomEvent("bugzila:dashboards-ready", { detail: data }));
    } catch (error) {
      console.error("Unable to load dashboard catalog", error);
      document.getElementById("dashboard-grid").innerHTML = `<article class="dashboard-card"><div class="card-body"><h3>Catalog unavailable</h3><p class="card-summary">The dashboard data could not be loaded. Open this site through GitHub Pages or another web server rather than directly from the local file system.</p></div></article>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
