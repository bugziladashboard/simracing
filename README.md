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


## Step 5 — Analytics + Compatibility Cleanup

- Removed the central Compatibility section because each Dashboard already includes Supported / Tested Games.
- Added staged GA4 analytics infrastructure in `data/analytics.json` and `js/analytics.js`.
- See `ANALYTICS_SETUP_GUIDE.md` to activate with a real Measurement ID.
