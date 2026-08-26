# Bugzila Sim Racing Dashboard Hub — Step 2

This package is prepared for the repository:

`https://github.com/bugziladashboard/simracing`

GitHub Pages target:

`https://bugziladashboard.github.io/simracing/`

## Step 2 content

- Latest MOZA KS Pro dashboard: `V3.P3.006`
  - Preview screenshots intentionally sourced from `V3.P3.004` per project requirement.
  - V3.P3.006 keeps the same layout/telemetry behavior and changes the background to flat dark gray `#1C1F24`.
- Latest MOZA CM2 V1 dashboard: `V1.P3.020`
- Latest MOZA CM2 V2RQP dashboard: `V2RQP.P3.003`
- Real screenshots for all three pages of each dashboard.
- Data-driven catalog in `data/dashboards.json`.
- Release Status badges: Latest, Stable, Beta, Experimental, Legacy.
- Release history metadata.
- Responsive screenshot gallery with full-screen preview.
- Conservative compatibility table.
- Bugzila Car Play Google Play promotion.
- Download buttons are intentionally staged for the GitHub Releases step.
- GA4 is intentionally staged for the analytics step.

## Upload to GitHub

Upload the **contents of this folder directly to the repository root**.

The root should contain:

- `index.html`
- `css/`
- `js/`
- `data/`
- `assets/`
- `README.md`

Do not place the package inside another `dashboards/` folder.


## Step 2.1 cache fix
CSS, JavaScript and dashboard JSON URLs include a build query string to prevent stale Step 1 assets from being served after deployment.
