# Bugzila Dashboard Hub — GA4 Analytics Setup

## Current state
Step 5 includes GA4 infrastructure but analytics is intentionally disabled until a real Measurement ID is entered.

## Activate
1. Create a Google Analytics 4 property and a Web data stream for `https://bugziladashboard.github.io/simracing/`.
2. Copy the Measurement ID (format `G-XXXXXXXXXX`).
3. Edit `data/analytics.json`:

```json
{
  "enabled": true,
  "provider": "ga4",
  "measurementId": "G-XXXXXXXXXX",
  "debugMode": false
}
```

4. Commit the file and wait for GitHub Pages deployment.
5. Open the website and verify traffic in GA4 Realtime.

## Events included
- `page_view` — sent by the Google tag
- `dashboard_view` — View Details
- `dashboard_download` — dashboard release asset download click
- `quick_comments_open` — opens giscus Quick Comments
- `community_discussion_open` — Bug / Feature / Q&A link
- `car_play_google_play_click` — Bugzila Car Play Google Play button
- `screenshot_preview` — opens a dashboard screenshot
- `back_to_top` — uses the Top button

## Suggested GA4 custom dimensions
If deeper reporting by dashboard is needed, create event-scoped custom dimensions for:
- `dashboard_id`
- `dashboard_name`
- `dashboard_version`
- `platform`
- `discussion_type`

GitHub Release API remains the public source of truth for the visible Dashboard download counters. GA4 is used for visitor and interaction analysis.
