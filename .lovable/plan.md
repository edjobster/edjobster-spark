

# Enhance Company Setup Page

## Overview
Expand the Company Setup page with additional company customization options, document header/footer content settings, and a call-to-action to an ATS (Applicant Tracking System) app for hiring candidates.

---

## Current State Analysis

The Company Setup page currently has:
- Company Logo section (upload/remove)
- Basic Company Information (name, industry, size, website, email, phone, address)

Missing elements:
- Signatory details (currently only in ToolsSettings)
- Header/Footer customization for documents
- Additional branding options
- Integration with external hiring tools

---

## Proposed Changes

### 1. Additional Company Details Section
Add more customization fields to capture comprehensive company information:

| Field | Description |
|-------|-------------|
| Company Registration Number | CIN/Registration ID |
| GST Number | Tax identification |
| Tagline/Motto | Company slogan for branding |
| Founded Year | Establishment year |
| Legal Entity Type | Pvt. Ltd., LLP, etc. |

### 2. Default Signatory Section
Move signatory configuration from Tools Settings to Company Setup for centralized management:

| Field | Description |
|-------|-------------|
| Signatory Name | Name of the authorized signatory |
| Signatory Title | Designation/Role |
| Signatory Email | Contact email |
| Signatory Phone | Contact number |

### 3. Document Header Settings Section
Allow customization of what appears in document headers:

| Setting | Description |
|---------|-------------|
| Show Company Logo | Toggle to display logo in header |
| Show Company Name | Toggle to display company name |
| Show Release Date | Toggle to show document date |
| Header Tagline | Custom text below company name |
| Header Background Color | Color picker for header background |

### 4. Document Footer Settings Section
Allow customization of footer content:

| Setting | Description |
|---------|-------------|
| Show Address | Toggle for address line |
| Show Contact Details | Toggle for website/email/phone |
| Custom Footer Text | Additional text (legal disclaimers, etc.) |
| Footer Background Color | Color picker for footer background |

### 5. ATS Integration Call-to-Action
A prominent banner/card encouraging users to hire candidates through an ATS app:

```text
+----------------------------------------------------------+
|  [Icon]  Ready to Hire Your Next Star?                   |
|                                                           |
|  Use our ATS app to manage candidates and streamline     |
|  your hiring process.                                     |
|                                                           |
|           [Go to Hiring Portal]  [Learn More]            |
+----------------------------------------------------------+
```

---

## Technical Implementation

### Files to Modify

| File | Changes |
|------|---------|
| `src/data/companyContext.ts` | Add new fields for additional details, header/footer settings |
| `src/pages/CompanySetup.tsx` | Add new sections with forms and ATS CTA |

### Updated CompanyContext Interface

```typescript
export interface CompanyContext {
  // Existing fields
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  logoUrl: string;
  signatory: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  
  // New fields
  registrationNumber: string;
  gstNumber: string;
  tagline: string;
  foundedYear: string;
  legalEntityType: string;
  
  // Header settings
  headerSettings: {
    showLogo: boolean;
    showCompanyName: boolean;
    showReleaseDate: boolean;
    headerTagline: string;
    headerBgColor: string;
  };
  
  // Footer settings
  footerSettings: {
    showAddress: boolean;
    showContactDetails: boolean;
    customFooterText: string;
    footerBgColor: string;
  };
}
```

### Page Layout Structure

```text
+----------------------------------------------------------+
|  Company Setup                                            |
|  Configure your company information for generated docs    |
+----------------------------------------------------------+

[ATS Call-to-Action Banner - Prominent teal accent card]

+----------------------------------------------------------+
|  Company Logo                                             |
|  [Avatar] [Upload] [Remove]                               |
+----------------------------------------------------------+

+----------------------------------------------------------+
|  Company Information                                      |
|  [Name] [Industry] [Size] [Website]                      |
|  [Email] [Phone] [Registration] [GST]                    |
|  [Founded Year] [Legal Entity Type]                       |
|  [Address - full width, multiline]                        |
|  [Tagline - full width]                                   |
+----------------------------------------------------------+

+----------------------------------------------------------+
|  Default Signatory                                        |
|  [Name] [Title] [Email] [Phone]                          |
+----------------------------------------------------------+

+----------------------------------------------------------+
|  Document Header Settings                                 |
|  [x] Show Company Logo  [x] Show Company Name            |
|  [x] Show Release Date                                    |
|  [Header Tagline text field]                              |
|  [Header Background Color picker]                         |
+----------------------------------------------------------+

+----------------------------------------------------------+
|  Document Footer Settings                                 |
|  [x] Show Address  [x] Show Contact Details              |
|  [Custom Footer Text - multiline]                         |
|  [Footer Background Color picker]                         |
+----------------------------------------------------------+

                                   [Save Company Information]
```

### UI Components Used
- MUI `Paper` for section cards
- MUI `TextField` for text inputs
- MUI `Switch` with `FormControlLabel` for toggles
- MUI `Button` for actions
- MUI `Alert` or custom card for ATS CTA
- MUI Icons (`PersonAdd`, `OpenInNew`, `Business`, etc.)

---

## Visual Design Notes

- ATS CTA card should use primary teal color with white text to stand out
- All sections maintain consistent spacing (mb: 3 between papers)
- Form fields use size="small" for compact appearance
- Grid layout: 2 columns on desktop, 1 column on mobile
- Color pickers can be simple text fields with hex input (can enhance later)

