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
            <a class="button secondary small view-details-button" data-dashboard-id="${esc(d.id)}" href="#${esc(d.id)}">View Details</a>
            <button class="button primary small download-button" type="button" data-dashboard-id="${esc(d.id)}">Download</button>
          </div>
        </div>
      </article>`;
  }

  function dashboardDetail(d) {
    const gallery = d.pages.map((p, index) => `
      <button class="gallery-item" type="button" data-image="${esc(p.image)}" data-caption="${esc(`${d.title} — ${p.name}`)}">
        <span class="gallery-page-badge">${esc(`Page ${index + 1}`)}</span>
        <img src="${esc(p.image)}" alt="${esc(`${d.title} ${p.name}`)}" loading="lazy">
        <span class="gallery-caption"><strong>${esc(p.name)}</strong><span>${esc(p.description)}</span></span>
      </button>`).join("");

    const pageSetTitle = d.pages.length > 1 ? `${d.pages.length}-Page Dashboard Set` : `Single Dashboard Page`;
    const pageSetCopy = d.pages.length > 1
      ? `These ${d.pages.length} pages belong to the same dashboard package and are grouped together for easier review on desktop and mobile.`
      : `This dashboard is presented as a single-page layout.`;

    const features = d.features.map(f => `<span>${esc(f)}</span>`).join("");
    const history = d.releaseHistory.map(r => `
      <div class="release-item"><strong>${esc(r.version)}</strong><div class="release-statuses">${r.status.map(statusBadge).join("")}</div></div>`).join("");

    const fileExtension = d.download?.fileName?.endsWith(".simhubdash") ? ".simhubdash" : ".mzdash";

    return `
      <section id="${esc(d.id)}" class="dashboard-detail">
        <div class="dashboard-package-shell">
          <div class="dashboard-package-marker">
            <span>BUGZILA DASHBOARD PACKAGE</span>
            <strong>${esc(d.platform)} // ${esc(d.version)}</strong>
          </div>
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

        <div class="page-set-panel ${d.pages.length > 1 ? 'is-grouped-set' : 'is-single-set'}">
          <div class="page-set-header">
            <div>
              <p class="eyebrow mini-eyebrow">DASHBOARD PREVIEW SET</p>
              <h3>${esc(pageSetTitle)}</h3>
            </div>
            <p>${esc(pageSetCopy)}</p>
          </div>
          <div class="gallery">${gallery}</div>
        </div>

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
        <div class="dashboard-community-panel">
          <div>
            <p class="eyebrow mini-eyebrow">COMMUNITY FEEDBACK</p>
            <h3>Used this dashboard?</h3>
            <p>Leave a quick comment, or open a dedicated discussion for bugs, feature requests and questions.</p>
          </div>
          <div class="dashboard-community-actions">
            <button class="button primary community-comments-button" type="button" data-dashboard-id="${esc(d.id)}">Quick Comments</button>
            <a class="button secondary community-link" data-community-link="bug" data-dashboard-id="${esc(d.id)}" href="https://github.com/bugziladashboard/simracing/discussions" target="_blank" rel="noopener noreferrer">Report a Bug</a>
            <a class="button secondary community-link" data-community-link="feature" data-dashboard-id="${esc(d.id)}" href="https://github.com/bugziladashboard/simracing/discussions" target="_blank" rel="noopener noreferrer">Request a Feature</a>
            <a class="button secondary community-link" data-community-link="qa" data-dashboard-id="${esc(d.id)}" href="https://github.com/bugziladashboard/simracing/discussions" target="_blank" rel="noopener noreferrer">Ask a Question</a>
          </div>
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
      const response = await fetch("./data/dashboards.json?v=20260827-step5-3", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      window.BugzilaDashboards.data = data;

      document.getElementById("hero-dashboard-count").textContent = data.dashboards.length;
      document.getElementById("hero-release-rows").innerHTML = heroRows(data.dashboards);
      document.getElementById("dashboard-grid").innerHTML = data.dashboards.map(dashboardCard).join("");
      document.getElementById("dashboard-details").innerHTML = data.dashboards.map(dashboardDetail).join("");
      document.getElementById("updates-list").innerHTML = updates(data.dashboards);
      setupModal();
      document.dispatchEvent(new CustomEvent("bugzila:dashboards-ready", { detail: data }));
    } catch (error) {
      console.error("Unable to load dashboard catalog", error);
      document.getElementById("dashboard-grid").innerHTML = `<article class="dashboard-card"><div class="card-body"><h3>Catalog unavailable</h3><p class="card-summary">The dashboard data could not be loaded. Open this site through GitHub Pages or another web server rather than directly from the local file system.</p></div></article>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
