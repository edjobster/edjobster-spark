
# Fix Missing Header Updates

## Problem Identified
The last update created three new components but **failed to update TopNav.tsx** to use them. The components exist but are not integrated:

| Component | File | Status |
|-----------|------|--------|
| SearchDropdown | `src/components/layout/SearchDropdown.tsx` | Created but NOT imported |
| QuickCreateMenu | `src/components/layout/QuickCreateMenu.tsx` | Created but NOT imported |
| RequestToolDialog | `src/components/layout/RequestToolDialog.tsx` | Created but NOT imported |
| Credits Counter | N/A | NOT implemented in TopNav |

---

## Solution
Update `src/components/layout/TopNav.tsx` to:

1. **Import the new components**
2. **Replace the basic search bar** with `<SearchDropdown />`
3. **Add the credits counter** with color-coded chip
4. **Add the quick create button** (`<QuickCreateMenu />`)
5. **Add the request tool button** with `<RequestToolDialog />`

---

## Updated Right Section Layout

```text
Current:  [Search Bar] [Silver Badge] [Avatar]

Updated:  [SearchDropdown] [73 Credits] [+] [Request Tool] [Avatar]
```

---

## Implementation Details

### File to Modify
| File | Changes |
|------|---------|
| `src/pages/TopNav.tsx` | Import and integrate all new components |

### New Imports
```typescript
import SearchDropdown from './SearchDropdown';
import QuickCreateMenu from './QuickCreateMenu';
import RequestToolDialog from './RequestToolDialog';
import { mockAICreditsStats } from '@/data/mockAICredits';
import { CreditCard as CreditCardIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material';
```

### Credits Counter Logic
```typescript
const getCreditsColor = (remaining: number, total: number) => {
  const percentage = (remaining / total) * 100;
  if (percentage <= 10) return '#EF4444'; // red
  if (percentage <= 30) return '#F59E0B'; // yellow
  return '#10B981'; // green
};

const creditsRemaining = mockAICreditsStats.creditsAllotted - mockAICreditsStats.creditsUsed;
const creditsColor = getCreditsColor(creditsRemaining, mockAICreditsStats.creditsAllotted);
```

### Updated Right Section JSX
```tsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  {/* Search with dropdown suggestions */}
  <SearchDropdown />

  {/* Credits counter */}
  <Chip
    icon={<CreditCardIcon sx={{ fontSize: 16 }} />}
    label={`${creditsRemaining} Credits`}
    size="small"
    onClick={() => navigate('/settings')}
    sx={{
      bgcolor: alpha(creditsColor, 0.1),
      color: creditsColor,
      fontWeight: 600,
      cursor: 'pointer',
    }}
  />

  {/* Quick create button */}
  <QuickCreateMenu />

  {/* Request tool button */}
  <Button
    variant="outlined"
    size="small"
    startIcon={<LightbulbIcon />}
    onClick={() => setRequestDialogOpen(true)}
  >
    Request Tool
  </Button>
  <RequestToolDialog 
    open={requestDialogOpen} 
    onClose={() => setRequestDialogOpen(false)} 
  />

  {/* Profile avatar */}
  <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
    <Avatar>PS</Avatar>
  </IconButton>
</Box>
```

---

## Visual Result After Fix

```text
+-----------------------------------------------------------------------------------+
| [E] Edjobster   [AI Tools] [Docs Vault] [Settings] [Company]                      |
|                                                                                    |
|     [Search tools...]  [73 Credits]  [+]  [Request Tool]  [PS]                    |
|           |                 |         |        |                                   |
|           v                 |         v        v                                   |
|     [Dropdown]        Click to    Menu     Opens                                   |
|                       settings             dialog                                  |
+-----------------------------------------------------------------------------------+
```

---

## Files to Modify
- `src/components/layout/TopNav.tsx` - Integrate all new features
