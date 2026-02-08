

# Watermark, Usage Limits & Credit Purchase Flow

## Overview
Implement a monetization strategy with three interconnected features:
1. **Watermark** on document previews to encourage premium upgrades
2. **Usage limits** with clear enforcement to drive credit purchases  
3. **Credit purchase flow** for easy and fast payments

---

## 1. Document Preview Watermark

### Visual Design
Add a diagonal "Edjobster" watermark across the document preview background in light grey.

```text
+-----------------------------------------------+
|                                               |
|     E d j o b s t e r                        |
|          E d j o b s t e r                   |
|               E d j o b s t e r              |
|     [Actual Document Content]                 |
|          E d j o b s t e r                   |
|               E d j o b s t e r              |
|                                               |
+-----------------------------------------------+
```

### Watermark Specifications

| Property | Value |
|----------|-------|
| Text | "Edjobster" |
| Color | `rgba(0, 0, 0, 0.06)` (very light grey) |
| Font Size | 48px |
| Rotation | -35 degrees |
| Pattern | Repeated diagonally across background |
| Visibility | Preview mode only (appears behind content) |

### Monetization Strategy

| User Type | Watermark Behavior |
|-----------|-------------------|
| Free tier | Watermark always visible in preview AND exported documents |
| Paid/Premium | No watermark in preview or exports |
| Credits exhausted | Watermark appears with upgrade prompt |

### Implementation Location
- In `DocumentPreview.tsx` Preview mode section (lines 507-654)
- Add CSS pseudo-element or absolute positioned overlay
- Watermark should be behind the actual content (z-index layering)

### Watermark CSS Pattern
```tsx
{/* Watermark Overlay */}
<Box
  sx={{
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }}
>
  {/* Repeated watermark text pattern */}
  {Array.from({ length: 8 }).map((_, i) => (
    <Typography
      key={i}
      sx={{
        position: 'absolute',
        top: `${i * 120}px`,
        left: '-50%',
        right: '-50%',
        textAlign: 'center',
        fontSize: '48px',
        fontWeight: 700,
        color: 'rgba(0, 0, 0, 0.06)',
        transform: 'rotate(-35deg)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      Edjobster &nbsp; Edjobster &nbsp; Edjobster &nbsp; Edjobster
    </Typography>
  ))}
</Box>
```

---

## 2. Usage Limits & Credit System

### Credit Cost Structure

| Document Type | Credits Cost | Rationale |
|--------------|--------------|-----------|
| Letters (Offer, Appointment, etc.) | 2 credits | Simple templates |
| Contracts (NDA, Freelancer) | 3 credits | Legal complexity |
| Policies (Leave, WFH) | 4 credits | Comprehensive docs |
| Branding (EVP, Posts) | 2 credits | Marketing content |

### Usage Limit Rules

| Scenario | Behavior |
|----------|----------|
| Credits available | Normal generation |
| Low credits (< 5) | Warning banner shown |
| Zero credits | Block generation, show purchase modal |

### Credit Check Flow

```text
User clicks "Generate"
        |
        v
Check remaining credits
        |
        +-- Sufficient --> Generate document
        |
        +-- Insufficient --> Show "Buy Credits" modal
                              |
                              +-- User purchases --> Generate document
                              +-- User cancels --> Stay on page
```

### UI Elements

**Low Credits Warning Banner** (shown when < 5 credits):
```text
+----------------------------------------------------------+
| ⚠️ You have only 3 credits left.                 [Buy Now] |
+----------------------------------------------------------+
```

**Zero Credits Block Modal**:
```text
+-----------------------------------------------+
|                                               |
|  🚫 You've run out of AI credits              |
|                                               |
|  Purchase more credits to continue            |
|  generating professional documents.           |
|                                               |
|  [View Plans]        [Buy 50 Credits - $9.99] |
|                                               |
+-----------------------------------------------+
```

### Data Structure Updates

Add to `mockAICredits.ts`:
```typescript
export interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  pricePerCredit: number;
  popular?: boolean;
}

export const creditPlans: CreditPlan[] = [
  { id: 'starter', name: 'Starter', credits: 25, price: 4.99, pricePerCredit: 0.20 },
  { id: 'standard', name: 'Standard', credits: 50, price: 7.99, pricePerCredit: 0.16, popular: true },
  { id: 'pro', name: 'Pro Pack', credits: 100, price: 12.99, pricePerCredit: 0.13 },
  { id: 'enterprise', name: 'Enterprise', credits: 250, price: 24.99, pricePerCredit: 0.10 },
];

export const getDocumentCreditCost = (documentType: string): number => {
  if (['NDA', 'Freelancer Contract'].includes(documentType)) return 3;
  if (['Leave Policy', 'WFH Policy'].includes(documentType)) return 4;
  return 2; // Default for letters and branding
};
```

---

## 3. Credit Purchase Flow

### Purchase Flow Diagram

```text
User clicks "Buy Credits" (from navbar, settings, or modal)
        |
        v
+-----------------------------------+
| Choose Your Credit Pack           |
|-----------------------------------|
| [ ] 25 credits - $4.99            |
| [x] 50 credits - $7.99 ⭐ POPULAR  |
| [ ] 100 credits - $12.99          |
| [ ] 250 credits - $24.99          |
|-----------------------------------|
|        [Continue to Payment]      |
+-----------------------------------+
        |
        v
+-----------------------------------+
| Secure Checkout                   |
|-----------------------------------|
| Card Number: [________________]   |
| Expiry: [__/__]  CVV: [___]      |
| Name: [________________________]  |
|-----------------------------------|
|     [Pay $7.99]    [Cancel]       |
+-----------------------------------+
        |
        v
+-----------------------------------+
|  ✅ Payment Successful!           |
|                                   |
|  50 credits added to your account |
|                                   |
|        [Start Creating]           |
+-----------------------------------+
```

### New Component: BuyCreditsDialog

```tsx
interface BuyCreditsDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
```

**Features**:
- Credit pack selection with visual cards
- Price comparison showing per-credit cost
- "Popular" badge on recommended plan
- Simulated payment form (for now, can integrate Stripe later)
- Success confirmation with animation

### Purchase Modal Design

```text
+------------------------------------------------------------+
| [X]                                                        |
|  💳 Buy AI Credits                                         |
|------------------------------------------------------------|
|                                                            |
|  +------------------+  +------------------+ ⭐              |
|  | 25 Credits       |  | 50 Credits       |                |
|  | $4.99            |  | $7.99            |                |
|  | $0.20/credit     |  | $0.16/credit     |                |
|  +------------------+  +------------------+                |
|                                                            |
|  +------------------+  +------------------+                |
|  | 100 Credits      |  | 250 Credits      |                |
|  | $12.99           |  | $24.99           |                |
|  | $0.13/credit     |  | $0.10/credit     |                |
|  +------------------+  +------------------+                |
|                                                            |
|------------------------------------------------------------|
|  Summary: 50 credits for $7.99                             |
|                                                            |
|           [Complete Purchase]                              |
+------------------------------------------------------------+
```

### Integration Points

| Location | Action |
|----------|--------|
| TopNav Credits Chip | Click opens BuyCreditsDialog |
| Settings "Buy AI Credits" button | Opens BuyCreditsDialog |
| ToolPageLayout Generate button | Shows dialog if 0 credits |
| Low credits warning banner | Links to BuyCreditsDialog |

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/data/mockAICredits.ts` | Modify | Add credit plans, cost function |
| `src/components/tools/DocumentPreview.tsx` | Modify | Add watermark overlay |
| `src/components/credits/BuyCreditsDialog.tsx` | Create | Credit purchase modal |
| `src/components/credits/LowCreditsWarning.tsx` | Create | Warning banner component |
| `src/components/credits/NoCreditsModal.tsx` | Create | Blocking modal for zero credits |
| `src/components/tools/ToolPageLayout.tsx` | Modify | Add credit check before generation |
| `src/components/layout/TopNav.tsx` | Modify | Wire up credits chip to open dialog |
| `src/pages/ToolsSettings.tsx` | Modify | Wire up Buy Credits button |
| `src/hooks/useCredits.ts` | Create | Hook for credit management logic |

---

## Technical Details

### useCredits Hook

```typescript
export const useCredits = () => {
  const [credits, setCredits] = useState(mockAICreditsStats);
  
  const hasEnoughCredits = (cost: number) => {
    return (credits.totalCredits - credits.usedCredits) >= cost;
  };
  
  const useCredits = (cost: number, documentInfo: AIUsageRecord) => {
    setCredits(prev => ({
      ...prev,
      usedCredits: prev.usedCredits + cost,
    }));
    // Add to usage records
  };
  
  const addCredits = (amount: number) => {
    setCredits(prev => ({
      ...prev,
      totalCredits: prev.totalCredits + amount,
    }));
  };
  
  const remaining = credits.totalCredits - credits.usedCredits;
  const isLow = remaining < 5;
  const isEmpty = remaining <= 0;
  
  return { credits, remaining, isLow, isEmpty, hasEnoughCredits, useCredits, addCredits };
};
```

### Watermark Removal Logic

```typescript
// In DocumentPreview.tsx
interface DocumentPreviewProps {
  content: string;
  isLoading: boolean;
  title: string;
  showWatermark?: boolean; // Prop to control watermark visibility
}

// Default to true (free users), set to false for paid/premium
```

---

## User Experience Flow Summary

```text
Free User Journey:
1. Visits tool page
2. Fills form, clicks Generate (2 credits deducted)
3. Sees document with "Edjobster" watermark
4. Downloads document (watermark included)
5. Sees "Remove watermark - Upgrade to Pro" prompt
6. As credits run low, sees warning banner
7. At zero credits, sees purchase modal

Paid User Journey:
1. Purchases credit pack
2. Generates documents without watermark
3. Downloads clean, professional documents
4. Gets notified when credits are running low
5. Easy one-click repurchase
```

---

## Benefits

| Feature | User Impact | Business Impact |
|---------|-------------|-----------------|
| Watermark | Professional reminder of free tier | Brand visibility, upgrade motivation |
| Usage limits | Clear value of paid credits | Predictable revenue model |
| Easy purchase | Reduces friction to pay | Higher conversion rate |

