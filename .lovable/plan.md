
# Three Updates: API Section, Watermark Change, and ATS Link

## Overview
Three targeted changes across Settings, Document Preview, and the Top Navigation header.

---

## 1. Add API Section to Settings

Add a new `Paper` section in `ToolsSettings.tsx` between the Branding section and the Save button area, with a heading "API Integration", a short description, and a "Request API" button.

**Visual:**
```text
+------------------------------------------+
| API Integration                          |
|------------------------------------------|
| Integrate Edjobster AI tools directly    |
| into your platform via API.              |
|                                          |
| [Request API]                            |
+------------------------------------------+
```

- The "Request API" button opens a simple dialog (or links to a mailto/form) confirming the request has been submitted.
- Uses MUI `Api` icon for visual flair.

### File: `src/pages/ToolsSettings.tsx`
- Add a new `Paper` block after the Branding section (before the Buy Credits Dialog).
- Add a `requestApiDialogOpen` state and a simple confirmation `Dialog` or `Snackbar` on click.

---

## 2. Replace Watermark with "Created with Edjobster" Footer Line

Remove the large diagonal watermark overlay from the document preview. Instead, add a subtle "Created with Edjobster" text line at the bottom of the document footer area.

### File: `src/components/tools/DocumentPreview.tsx`
- **Remove**: The watermark overlay block (lines 522-555) -- the `{showWatermark && (...)}` section with rotated text.
- **Add**: A small "Created with Edjobster" line in the existing footer section (after the company contact info, around line 690), styled in light grey, small font.

```text
Footer area will look like:
+------------------------------------------+
| 123 Business Park, Mumbai                |
| acmetech.com | hr@acmetech.com | +91...  |
| Created with Edjobster                   |
+------------------------------------------+
```

- The `showWatermark` prop can be repurposed to control this footer line visibility.

---

## 3. Add "Go to Edjobster ATS" Link in Top Nav

Add a menu item in the profile dropdown menu in the header, linking to the Edjobster ATS platform.

### File: `src/components/layout/TopNav.tsx`
- Add a new `MenuItem` before the Logout option (around line 301) with an `OpenInNew` icon and text "Go to Edjobster ATS".
- On click, opens `https://www.edjobster.com` (or relevant ATS URL) in a new tab.

```text
Profile Menu:
+---------------------------+
| Priya Sharma              |
| priya@acmetech.com        |
|---------------------------|
| Profile                   |
| Settings                  |
|---------------------------|
| Go to Edjobster ATS  ↗   |
|---------------------------|
| Logout                    |
+---------------------------+
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ToolsSettings.tsx` | Add API Integration section with "Request API" button |
| `src/components/tools/DocumentPreview.tsx` | Remove watermark overlay, add "Created with Edjobster" in footer |
| `src/components/layout/TopNav.tsx` | Add "Go to Edjobster ATS" menu item in profile dropdown |
