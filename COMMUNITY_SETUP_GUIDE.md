# Step 4 — GitHub Discussions + giscus Setup

Repository: `bugziladashboard/simracing`

## 1. Enable GitHub Discussions
Open the repository -> Settings -> General -> Features -> Discussions -> Set up discussions.

## 2. Create discussion categories
Recommended categories:

- `Dashboard Feedback` — use the Announcements format if available. This is the category giscus will use for embedded per-dashboard threads.
- `Bug Reports` — Open-ended discussion.
- `Feature Requests` — Open-ended discussion.
- `Q&A` — Question / Answer format.
- `Announcements` — Announcement format.

## 3. Install giscus
Open https://github.com/apps/giscus and install it for the `bugziladashboard/simracing` repository.

## 4. Generate the giscus configuration
Open https://giscus.app/ and configure:

- Repository: `bugziladashboard/simracing`
- Mapping: `Discussion title contains a specific term`
- Category: `Dashboard Feedback`
- Only search in this category: enabled
- Reactions: enabled
- Comment box position: top
- Theme: dark
- Language: English
- Lazy loading: enabled

Copy the generated `data-repo-id` and `data-category-id`.

## 5. Activate comments
Edit `data/community.json`:

```json
{
  "enabled": true,
  "repo": "bugziladashboard/simracing",
  "repoId": "PASTE_REPO_ID_HERE",
  "category": "Dashboard Feedback",
  "categoryId": "PASTE_CATEGORY_ID_HERE"
}
```

Do not change the mapping from `specific`. The website creates a stable term from each Dashboard Family ID, so comments continue when the Dashboard version changes.

## 6. Verify
Open the GitHub Pages site, choose a dashboard and press `Comments & Feedback`. Sign in with GitHub through giscus and post a test comment. A matching Discussion should be created under Dashboard Feedback.
