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
