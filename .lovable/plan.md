

# Enhance Header Navigation with Advanced Features

## Overview
Upgrade the TopNav header with five new features: search suggestions dropdown, Edjobster blue brand color, AI credits balance counter, quick-create circular "+" button, and a "Request a Tool" button that opens a form dialog.

---

## Visual Concept

```text
+-------------------------------------------------------------------------------------------+
| [E] Edjobster   [Resources & Tools] [Documents Vault] [Settings] [Company]               |
|                                                                                           |
|     [Search tools & documents...]  [73 Credits]  [+]  [Request Tool]  [PS]               |
|           |                                                                               |
|           v                                                                               |
|     +------------------+                                                                  |
|     | Suggested        |                                                                  |
|     | - Offer Letter   |                                                                  |
|     | - NDA Builder    |                                                                  |
|     | Recent Documents |                                                                  |
|     | - Leave Policy   |                                                                  |
|     +------------------+                                                                  |
+-------------------------------------------------------------------------------------------+
```

---

## Feature Breakdown

### 1. Search Bar with Suggestions Dropdown
When the user focuses on the search bar or types, a dropdown appears showing:
- **Suggested Tools**: Matching tools from the tools list
- **Recent Documents**: Recently generated documents from the vault
- **Categories**: Quick filter by category (Letters, Policies, etc.)

| Behavior | Description |
|----------|-------------|
| On focus | Show popular/recent items |
| On typing | Filter tools and documents by search term |
| On select | Navigate to tool or document |
| Keyboard | Arrow keys to navigate, Enter to select |

### 2. Edjobster Blue Brand Color
Update the theme and logo to use blue instead of teal:
- Primary color change: `#00897B` (teal) to `#1976D2` (Edjobster blue)
- Logo background updates accordingly
- Active nav buttons use the new blue

### 3. AI Credits Balance Counter
Display remaining credits in the header:
- Shows: "73 Credits" (calculated from mockAICreditsStats)
- Chip/badge style with icon
- Color-coded: green when healthy, yellow when < 30%, red when < 10%
- Clicking navigates to Settings page

### 4. Circular "+" Quick Create Button
An ATS-style floating action button with dropdown menu:
- Circular button with "+" icon
- Dropdown shows frequently used document generators:
  - Offer Letter
  - Appointment Letter
  - NDA
  - Leave Policy
  - Experience Letter
- Each item navigates to the respective tool page

### 5. Request a Tool Button
A button that opens a dialog for submitting tool requests:
- Button with icon in the header
- Opens modal/dialog with form fields:
  - Tool Name (required)
  - Description (required)
  - Category (select)
  - Priority (optional)
- Submit shows success toast

---

## Technical Implementation

### Files to Modify/Create

| File | Action | Changes |
|------|--------|---------|
| `src/theme/muiTheme.ts` | Modify | Update primary color to Edjobster blue |
| `src/components/layout/TopNav.tsx` | Modify | Add all new header features |
| `src/components/layout/SearchDropdown.tsx` | Create | Search suggestions component |
| `src/components/layout/QuickCreateMenu.tsx` | Create | "+" button with dropdown menu |
| `src/components/layout/RequestToolDialog.tsx` | Create | Dialog form for requesting tools |

### Component Architecture

```text
TopNav
  ├── Logo (updated to blue)
  ├── NavButtons
  ├── SearchDropdown (NEW)
  │     ├── SearchInput
  │     └── SuggestionsPanel
  │           ├── ToolSuggestions
  │           └── RecentDocuments
  ├── CreditsChip (NEW)
  ├── QuickCreateMenu (NEW)
  │     └── Menu with tool shortcuts
  ├── RequestToolButton (NEW)
  │     └── Dialog with form
  └── ProfileMenu
```

### Search Dropdown Implementation

```typescript
interface SearchSuggestion {
  type: 'tool' | 'document' | 'category';
  id: string;
  title: string;
  subtitle?: string;
  route: string;
  icon?: React.ReactNode;
}
```

Features:
- Controlled `Popover` anchored to search input
- Opens on focus/typing
- Closes on blur or selection
- Filters tools and documents based on input
- Shows keyboard navigation hints

### Quick Create Menu Items

| Action | Route |
|--------|-------|
| Create Offer Letter | `/tools/offer-letter` |
| Create Appointment Letter | `/tools/appointment-letter` |
| Create NDA | `/tools/nda` |
| Create Leave Policy | `/tools/leave-policy` |
| Create Experience Letter | `/tools/experience-letter` |

### Request Tool Form Fields

| Field | Type | Validation |
|-------|------|------------|
| Tool Name | TextField | Required, min 3 chars |
| Description | TextField (multiline) | Required, min 10 chars |
| Category | Select | Letters, Policies, Contracts, Other |
| Use Case | TextField (multiline) | Optional |

### Credits Display Logic

```typescript
const getCreditsColor = (remaining: number, total: number) => {
  const percentage = (remaining / total) * 100;
  if (percentage <= 10) return '#EF4444'; // red
  if (percentage <= 30) return '#F59E0B'; // yellow
  return '#10B981'; // green
};
```

---

## UI Components Used
- MUI `Popover` for search dropdown
- MUI `Menu` and `MenuItem` for quick create
- MUI `Dialog` for request tool form
- MUI `TextField`, `Select` for form inputs
- MUI `Chip` for credits display
- MUI `IconButton` with `Fab` styling for "+" button
- MUI Icons: `Add`, `Search`, `CreditCard`, `Lightbulb`

---

## Styling Notes
- Blue brand color: `#1976D2` (primary), `#1565C0` (dark), `#42A5F5` (light)
- Search dropdown: white background, subtle shadow, max-height with scroll
- Quick create button: circular, blue background, white "+" icon
- Credits chip: compact, shows icon + number
- Request tool button: outline style, positioned before profile avatar
- All dropdowns/menus: solid white background, z-index 1300+

