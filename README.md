# Bugzila Sim Racing Dashboard Hub — Step 4

This package adds Community Feedback & Comments infrastructure to the existing dashboard hub.

## Added
- Community navigation and overview section
- Per-dashboard Comments & Feedback action
- Report a Bug, Request a Feature and Q&A actions
- giscus / GitHub Discussions integration scaffold
- One persistent feedback thread per Dashboard Family via `mapping=specific`
- Lazy comment loading in a modal so the page does not load multiple discussion iframes at once
- `data/community.json` configuration file
- `giscus.json` origin restriction for the GitHub Pages domain

## Important
Comments remain in setup mode until GitHub Discussions is enabled, the giscus app is installed, and `repoId` / `categoryId` are copied into `data/community.json`.

Permanent brand phrase: **BUILT FOR THE TRACK.**
