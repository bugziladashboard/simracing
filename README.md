# Step 5.11 — Ko-fi + PromptPay Support

Current production package.

- Base: Step 5.10 Support Bugzila package supplied by the user.
- Keeps dashboard downloads free and support completely optional.
- Embeds the Bugzila Labs Ko-fi tip panel directly in the Support section.
- Adds the supplied SCB PromptPay QR image for supporters in Thailand.
- Removes the standalone card-payment option from the Support section.
- Updates support wording for Bugzila Labs, international supporters and Thai PromptPay users.
- Keeps GA4 support-payment click tracking for support links.
- Ko-fi page: `https://ko-fi.com/bugzilalabs`.
- Preserves all unrelated Step 5.10 functionality.

# Step 5.10 — Support Bugzila

Historical release. Introduced the Support Bugzila section before the Dashboard catalog.

# Step 5.7

- Base: Step 5.6 MOZA Hardware Compatibility.
- Visual rollback only: restored the Racing Flag background exactly from Step 5.3 Dashboard Package Outer Frame.
- All Step 5.6 hardware compatibility, GA4, Community/giscus, Discussions, download counter, hamburger/mobile UI and package grouping are preserved.

# Step 5.6 — MOZA Hardware Compatibility Expansion

- Base: Step 5.5.
- Adds MOZA CS Pro as supported/shared-format hardware for all Bugzila KS Pro dashboard families, based on MOZA's official Dash Community cross-tagging of CS Pro + KS Pro dashboard files.
- Adds Porsche Mission R as a same-720P candidate for CM2 families, explicitly marked NOT VERIFIED for .mzdash/device-profile compatibility.
- Adds newly announced 2.99-inch Mercedes-Benz GT and Ford Mustang GTD wheels as future candidates only; exact pixel resolution/import compatibility must be verified before support status is upgraded.
- Preserves GA4, Community/giscus, Discussions, download counters, hamburger menu, mobile fit, Dashboard Package frame, black/white checkered flag background, and all Step 5.5 behavior.

# Step 5.5

- Base: Step 5.4
- Change: replace the decorative racing-flag background with a custom black-and-white checkered flag style that looks closer to a waving motorsport flag.
- Preserved: GA4, Community, giscus, download tracking, hamburger menu, mobile fit, dashboard package frame, and all Step 5.4 features.

# Step 5.4

- Base: Step 5.3
- Change: refined racing-flag background corners with larger inward reach, more visible opacity, and a more flowing fade.
- Preserved: GA4, Community, giscus, download tracking, mobile fit, hamburger menu, dashboard package frame.

# Bugzila Sim Racing Dashboard Hub — Step 4.2

Community UX polish release.

Changes:
- Renames the embedded giscus action to **Quick Comments** and explains when to use it.
- Keeps **Report a Bug**, **Request a Feature**, and **Ask a Question** as dedicated GitHub Discussions opened in a new tab.
- Prefills the dashboard/version in dedicated Discussion titles.
- Adds subtle fading checkered-flag graphics to the top-left and bottom-right page corners.
- Adds a floating **Top** button with smooth scroll.
- Keeps the permanent hero phrase **BUILT FOR THE TRACK.**
- Keeps live giscus configuration for `bugziladashboard/simracing`.


## Step 5.1 — Production GA4 Analytics

- Removed the central Compatibility section because each Dashboard already includes Supported / Tested Games.
- Added staged GA4 analytics infrastructure in `data/analytics.json` and `js/analytics.js`.
- See `ANALYTICS_SETUP_GUIDE.md` to activate with a real Measurement ID.


### Production GA4
- Enabled: Yes
- Measurement ID: `G-6DFKT3H8ZE`
- Property/Web Stream: Bugzila Dashboard GitHub Pages
- Production debug mode: Off


## Step 5.2 — Production UI Merge

Source of Truth: Step 5.1 Production GA4.

Merged without removing Step 5.1 production features:
- Mobile hamburger navigation using the Step 5.1 menu destinations.
- Mobile width/spacing improvements to better fit phone screens left-to-right.
- A grouped outer preview frame for multi-page dashboard sets with Page 1 / Page 2 / Page 3 badges.
- GA4, giscus, Community, GitHub Discussions, download counters, Back-to-Top and racing corner treatment are retained.


## Step 5.3 — Dashboard Package Outer Frame
- Added one large outer frame around every complete dashboard package.
- The outer frame groups title, download, specifications, page previews, design concept, release history and community feedback as one dashboard.
- The existing multi-page preview frame remains nested inside the package frame.
- Mobile Back-to-Top was reduced to a compact arrow button to obstruct less content.
- Step 5.2 Production GA4, Community, giscus, Discussions and download systems remain the baseline.
