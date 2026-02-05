

# Enhance Document Preview to Match Professional Document Format

## Overview
Transform the document preview panel to display generated documents like genuine, professional HR documents with proper letterhead styling, company branding, and formatted footer.

---

## Visual Concept

```text
+--------------------------------------------------+
|  [COMPANY LOGO]                 Release Date:    |
|  Acme Technologies             DD/MM/YYYY        |
+--------------------------------------------------+
|                                                   |
|                 DOCUMENT TITLE                    |
|                                                   |
|  Date: ...                                        |
|  To: ...                                          |
|                                                   |
|  [Document Body with proper formatting]           |
|  - Bold headings                                  |
|  - Italic emphasis                                |
|  - Bulleted lists                                 |
|  - Tables                                         |
|                                                   |
|  Signatory section...                             |
|                                                   |
+--------------------------------------------------+
|         123 Business Park, Tech City             |
|         State - 560001 | www.acmetech.com        |
|            hr@acmetech.com | +91 80 1234 5678    |
+--------------------------------------------------+
```

---

## Implementation Details

### 1. Add Sample Company Logo
Create a sample company logo image in the public folder for use in the preview mode.

**File**: `public/sample-logo.svg`
- Professional-looking placeholder logo
- SVG format for crisp rendering at any size
- Teal/green color scheme matching the app theme

### 2. Enhance DocumentPreview Component
Update the preview mode (not edit mode) to wrap content with letterhead and footer.

**Key Changes to `src/components/tools/DocumentPreview.tsx`:**

**Header/Letterhead Section:**
- Company logo (left-aligned, ~60px height)
- Company name next to logo
- Release Date in DD/MM/YYYY format (right-aligned)
- Subtle divider line below

**Body Section:**
- Enhanced markdown styling for professional appearance
- Proper typography hierarchy (h1, h2, h3 styling)
- **Bold** text for emphasis
- *Italic* for secondary emphasis
- Table styling with borders
- List styling with proper indentation

**Footer Section:**
- Centered company address
- Contact details (website, email, phone)
- Subtle top border separator

### 3. Update Company Context
Add a `logoUrl` field to the company context to store the logo reference.

**File**: `src/data/companyContext.ts`
- Add `logoUrl` property defaulting to sample logo path

### 4. Format Date as DD/MM/YYYY
Create a utility or inline formatter to display dates in the DD/MM/YYYY format that matches Indian business document conventions.

---

## Technical Implementation

### Files to Modify

| File | Changes |
|------|---------|
| `public/sample-logo.svg` | Create new sample company logo |
| `src/data/companyContext.ts` | Add `logoUrl` field |
| `src/components/tools/DocumentPreview.tsx` | Add letterhead header and footer wrapper in preview mode |

### Preview Mode Structure (Pseudocode)

```tsx
// In preview mode, wrap ReactMarkdown with document structure
<Box className="document-wrapper">
  {/* Letterhead */}
  <Box className="letterhead">
    <Box className="logo-section">
      <img src={logoUrl} alt="Company Logo" />
      <Typography>{companyName}</Typography>
    </Box>
    <Box className="date-section">
      <Typography>Release Date:</Typography>
      <Typography>{formatDate(new Date())}</Typography>
    </Box>
  </Box>
  
  <Divider />
  
  {/* Document Body */}
  <Box className="document-body">
    <ReactMarkdown>{editableContent}</ReactMarkdown>
  </Box>
  
  {/* Footer */}
  <Box className="document-footer">
    <Typography>{companyAddress}</Typography>
    <Typography>{website} | {email} | {phone}</Typography>
  </Box>
</Box>
```

### Styling Specifications

**Letterhead:**
- Background: white
- Logo: max-height 60px
- Company name: 16px, semibold, primary color
- Release date: 12px, right-aligned, gray

**Body (ReactMarkdown):**
- Font: System sans-serif, 14px base
- Headings: Bold, varying sizes (h1: 20px, h2: 16px, h3: 14px)
- Paragraphs: 1.7 line-height
- Lists: Proper indentation with bullets/numbers
- Tables: Full-width, bordered cells

**Footer:**
- Border-top: 1px solid divider
- Text: Centered, 11px, gray
- Padding: 16px top

---

## Notes

- The letterhead and footer appear **only in Preview mode**, not in Edit mode (raw markdown)
- Company data pulled from `defaultCompanyContext` for now (can be made dynamic later)
- Sample logo is a placeholder; in production, this would come from Company Setup upload
- Date format follows Indian standard (DD/MM/YYYY)

