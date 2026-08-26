# Bugzila Sim Racing Dashboard Hub — Step 3

Repository:

`https://github.com/bugziladashboard/simracing`

GitHub Pages:

`https://bugziladashboard.github.io/simracing/`

## Step 3

Step 3 adds production GitHub Release downloads and download statistics.

### Included website changes

- Fixes screenshot captions so page titles remain readable on the dark gallery cards.
- Changes the Hero status panel from `LATEST DASHBOARDS` to `CURRENT RELEASES`.
- Hero release rows are generated automatically from `data/dashboards.json`.
- Current release rows now include:
  - MOZA KS Pro
  - MOZA CM2 V1
  - MOZA CM2 V2RQP
  - SimHub remains `COMING`.
- Adds a real download count to each Featured Dashboard card and detail section.
- Adds `TOTAL DASHBOARD DOWNLOADS` to the Hero status panel.
- Uses the GitHub Releases API to retrieve each release asset's real `download_count`.
- Download buttons remain disabled until the matching GitHub Release asset is found.
- Uses session caching for 10 minutes to reduce GitHub API requests.
- Keeps GA4 event support staged in `analytics.js`; a production GA4 Measurement ID is still a later analytics step.
- Uses Step 3 cache-busting query strings for CSS, JavaScript and dashboard JSON.

## Required GitHub Release tags

- `ks-pro-v3.p3.006`
- `cm2-v1.p3.020`
- `cm2-v2rqp.p3.003`

The exact release asset names are defined in `data/dashboards.json`.

## Upload

Upload the contents of this package directly to the repository root, replacing the existing Step 2.1 files.

Do not upload the separate Step 3 Release Assets package into the repository. Those `.mzdash` files belong in **GitHub Releases**.


## Step 3.1 download-count hotfix
- Keeps normal GitHub API release-stat caching at 10 minutes.
- Forces a fresh GitHub API check 5 seconds after a dashboard download click.
- Forces a fresh check when the page regains focus.
- Uses a new cache key and cache-busted JavaScript URL.
