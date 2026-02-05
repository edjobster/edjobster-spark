

# Add AI Credits Usage Table to Settings Page

## Overview
Add a new section to the Settings page that displays a table tracking all AI credits used for document generation. This will include mock usage data showing which documents were generated, when, and how many credits were consumed.

---

## Visual Concept

```text
+----------------------------------------------------------+
|  AI Credits Usage                                        |
+----------------------------------------------------------+
|  Credits Used: 45 / 100    [Progress Bar: 45%]          |
|  Billing Cycle: Jan 1 - Jan 31, 2024                     |
+----------------------------------------------------------+
|  Document         | Type       | Date       | Credits    |
|----------------------------------------------------------|
|  Offer Letter ... | Letter     | 05/02/2026 | 2 credits  |
|  NDA - Vendor ... | Contract   | 04/02/2026 | 3 credits  |
|  Leave Policy ... | Policy     | 03/02/2026 | 4 credits  |
|  ...              |            |            |            |
+----------------------------------------------------------+
```

---

## Implementation Details

### 1. Create Mock AI Credits Usage Data
Create a new data file with mock usage history to simulate AI credit consumption.

**File**: `src/data/mockAICredits.ts`

Data structure:
```typescript
interface AIUsageRecord {
  id: string;
  documentName: string;
  documentType: string;
  category: 'Letters' | 'Policies' | 'Contracts' | 'Employer Branding';
  generatedAt: string; // ISO date string
  creditsUsed: number;
}

interface AICreditsStats {
  totalCredits: number;
  usedCredits: number;
  billingCycleStart: string;
  billingCycleEnd: string;
}
```

Sample mock data:
- 8-10 usage records across different document types
- Different credit costs per document type (Letters: 2, Policies: 4, Contracts: 3, Branding: 2)
- Total credits: 100, Used: 45

### 2. Update Settings Page
Add a new Paper section with the AI Credits Usage table.

**File**: `src/pages/ToolsSettings.tsx`

**Components to add:**
- Summary section with progress bar showing credits used
- Billing cycle date range
- MUI Table with columns: Document, Type, Date, Credits
- Category chips for visual distinction

---

## Technical Implementation

### Files to Create/Modify

| File | Action | Changes |
|------|--------|---------|
| `src/data/mockAICredits.ts` | Create | Mock usage data and stats |
| `src/pages/ToolsSettings.tsx` | Modify | Add AI Credits Usage section with table |

### Table Columns

| Column | Description |
|--------|-------------|
| Document | Name of the generated document |
| Type | Category chip (Letters, Policies, etc.) |
| Date | Generation date in DD/MM/YYYY format |
| Credits | Number of credits consumed |

### UI Components Used
- MUI `Paper` for section container
- MUI `LinearProgress` for credits usage bar
- MUI `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell` for the usage table
- MUI `Chip` for category badges with color coding
- MUI `Typography` for labels and values

### Styling Notes
- Place section between "General Settings" and "Default Signatory" sections
- Use the same category colors from `tools.ts` for type chips
- Date formatted as DD/MM/YYYY (consistent with document preview)
- Credits column right-aligned
- Subtle row hover effect

