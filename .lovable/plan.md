

# Enhance Home Page Heading and Tool Card CTAs

## Overview
Make two impactful changes to the home page: update the heading to be more engaging and visually prominent, and change the tool card button text from "Open" to action-oriented CTAs.

---

## Changes

### 1. Update Page Heading

**Current State:**
- Heading: "Resources & Tools Library"
- Subtitle: "HR tools, templates, and frameworks for SMB founders"
- Uses `variant="h4"` which doesn't feel like a main hero heading

**Proposed Update:**

| Element | Current | New |
|---------|---------|-----|
| Heading | "Resources & Tools Library" | "Build HR Documents in Minutes" |
| Subtitle | "HR tools, templates, and frameworks for SMB founders" | "AI-powered tools to create professional letters, policies, and contracts for your growing team" |
| Style | `variant="h4"` | `variant="h3"` with larger font size and enhanced styling |

**Alternative Heading Options:**
- "Your AI HR Assistant" 
- "Create Professional HR Documents Instantly"
- "HR Made Simple for Growing Teams"

The heading will be styled with:
- Larger typography (2rem on mobile, 2.5rem on desktop)
- Slightly darker color for emphasis
- Subtle gradient or accent color on key word (optional)

### 2. Update Tool Card CTA Button

**Current:** "Open" with arrow icon

**Proposed:** Context-aware CTA based on tool type

| Tool Type | CTA Text |
|-----------|----------|
| Generators (Letters, Policies, Contracts) | "Generate" |
| Builders (EVP, NDA, Branding Post) | "Create" |

**Logic:**
```typescript
const getCtaText = (title: string) => {
  if (title.includes('Builder')) return 'Create';
  return 'Generate';
};
```

This makes the button more action-oriented and indicates that clicking will produce something, not just open a page.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ResourcesTools.tsx` | Update heading text and typography styling |
| `src/components/tools/ToolCard.tsx` | Change button text from "Open" to dynamic CTA |

---

## Visual Result

**Before:**
```text
Resources & Tools Library
HR tools, templates, and frameworks for SMB founders
[Silver Offerings (13 tools)]

[Card: Offer Letter Generator] [Open ->]
```

**After:**
```text
Build HR Documents in Minutes
AI-powered tools to create professional letters, policies, and contracts for your growing team
[Silver Offerings (13 tools)]

[Card: Offer Letter Generator] [Generate ->]
[Card: EVP Builder] [Create ->]
```

---

## Technical Details

### ResourcesTools.tsx Changes
```tsx
<Typography 
  variant="h3" 
  component="h1" 
  sx={{ 
    fontWeight: 800, 
    mb: 1.5,
    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
    color: 'text.primary',
  }}
>
  Build HR Documents in Minutes
</Typography>
<Typography 
  variant="body1" 
  color="text.secondary" 
  sx={{ 
    mb: 3, 
    fontSize: { xs: '1rem', md: '1.125rem' },
    maxWidth: 600,
  }}
>
  AI-powered tools to create professional letters, policies, and contracts for your growing team
</Typography>
```

### ToolCard.tsx Changes
```tsx
const getCtaText = (title: string): string => {
  if (title.includes('Builder')) return 'Create';
  return 'Generate';
};

// In the Button:
<Button
  variant="text"
  color="primary"
  endIcon={<ArrowForwardIcon />}
  onClick={handleOpen}
  sx={{ fontWeight: 600 }}
>
  {getCtaText(tool.title)}
</Button>
```

