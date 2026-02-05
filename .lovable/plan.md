

# Add "Buy AI Credits" Button to AI Credits Usage Section

## Overview
Add a "Buy AI Credits" button in the top right corner of the AI Credits Usage section header, allowing users to easily purchase additional credits when running low.

---

## Current State
The AI Credits Usage section has a simple header with just the title:
```tsx
<Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
  AI Credits Usage
</Typography>
```

## Proposed Change
Transform the header into a flex container with the title on the left and the button on the right:

```text
+----------------------------------------------------------+
|  AI Credits Usage                    [Buy AI Credits]    |
+----------------------------------------------------------+
```

---

## Implementation Details

### File to Modify
| File | Changes |
|------|---------|
| `src/pages/ToolsSettings.tsx` | Update section header to include the button |

### UI Changes
- Wrap the section title in a `Box` with `display: flex` and `justifyContent: space-between`
- Add an MUI `Button` with:
  - `variant="outlined"` for a secondary action style
  - `size="small"` to match the section aesthetic
  - Primary color styling (teal theme)
  - Shopping cart or add icon (optional)

### Button Behavior
- For now, the button will be a placeholder (no action)
- Can later be connected to a payment/upgrade flow

---

## Visual Result

```text
+----------------------------------------------------------+
|  AI Credits Usage                    [Buy AI Credits]    |
+----------------------------------------------------------+
|  Credits Used: 27 / 100    [Progress Bar: 27%]           |
|  Billing Cycle: Feb 1 - Feb 28, 2026                     |
+----------------------------------------------------------+
```

