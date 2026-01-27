

# Edjobster AI Tools Platform - Implementation Plan

## Overview
A production-ready HR productivity platform with 13 AI tools, document vault, and professional SaaS UI using **Material UI (MUI)** styling.

---

## 🏗️ App Architecture

### Main Layout
- **Left Sidebar** - Collapsible navigation with 4 main sections
- **Top Header** - Global search bar, Silver plan badge, user avatar
- **Content Area** - Dynamic page content

### Navigation Structure
1. Tools AI Settings
2. Resources & Tools (active by default)
3. Documents Vault
4. Company Setup

---

## 📄 Pages to Build

### 1. Resources & Tools Library (Homepage)
- Page title with subtitle
- **Tool grid** displaying all 13 tools as cards
- Each card shows: category pill, plan badge, title, description, "Open →" button
- Categories: Letters, Policies, Contracts, Employer Branding
- Clicking "Open" routes to the specific tool page

### 2. Documents Vault
Based on your screenshot reference:
- **Vault Status** card with progress bars (Documents: 2/100, Downloads: 8/25)
- **Vault Limits** card showing storage limits and retention info
- Search documents input
- **Categories grid** (Employer Branding, Letters folders)
- **All Documents list** with document rows showing title, type, date, actions menu

### 3. Tools AI Settings
- Company context configuration
- Default signatory settings
- Branding preferences

### 4. Company Setup
- Company information form
- Logo upload placeholder
- Address and contact details

---

## 🛠️ Individual Tool Pages (13 Total)

Each tool follows a consistent **two-panel layout**:

**Left Panel - Input Form:**
- Back navigation link
- Tool title and description
- "How to use" collapsible section
- Draft controls (save timestamp, reload, clear)
- "Use Company Context" toggle
- Form fields organized in responsive columns
- Generate and Preview buttons

**Right Panel - Document Preview:**
- Live preview of generated document
- Professional HR document formatting
- Copy and Download buttons
- Loading state during "generation"

### Tools to Build:

**Letters Category (6 tools):**
1. **Offer Letter Generator** - Candidate info, role details, compensation, signatory
2. **Appointment Letter Generator** - Extended legal fields, arbitration clause, annexures
3. **Confirmation Letter Generator** - Post-probation confirmation
4. **Increment Letter Generator** - Salary revision details
5. **Experience Letter Generator** - Employment verification
6. **Relieving Letter Generator** - Exit documentation

**Policies Category (2 tools):**
7. **Leave Policy Generator** - Leave types, accrual rules, approval process
8. **WFH/Hybrid Policy Generator** - Remote work guidelines

**Contracts Category (2 tools):**
9. **Freelancer Contract Generator** - Project scope, payment terms, deliverables
10. **NDA Builder** - Confidentiality terms, duration, exclusions

**Employer Branding Category (3 tools):**
11. **30-60-90 Onboarding Plan** - Phased onboarding checklist
12. **EVP Builder** - Employee value proposition framework
13. **Employer Branding Post Builder** - Social media content generator

---

## 📋 Form Fields Per Tool

### Offer Letter (Core example):
- Candidate full name, first name, address
- Offer date, acceptance deadline
- Company name, role title, department
- Reporting manager, work location
- Work model dropdown (Onsite/Remote/Hybrid)
- Employment type dropdown (Full-time/Part-time/Contract)
- Start date, probation period, CTC amount
- Work days, hours, timing, weekly off (multi-select)
- Signatory section (name, title, email, phone)

### Appointment Letter (Extended):
- All offer letter fields plus:
- Background check consent toggle
- Arbitration clause toggle
- Notice period fields
- Governing law/jurisdiction
- Annexure toggle for detailed policies

*(Each of the 13 tools will have context-appropriate fields)*

---

## 🎨 UI/UX Design

### Material UI Components:
- MUI Card for tool cards and sections
- MUI TextField, Select, DatePicker for forms
- MUI Accordion for collapsible sections
- MUI Chip for category and plan badges
- MUI AppBar and Drawer for layout
- MUI Button with primary/secondary variants
- MUI Paper for document preview panel
- MUI LinearProgress for loading states
- MUI Snackbar for toast notifications

### Visual Style:
- Clean, professional SaaS aesthetic
- Teal/green accent color (matching your screenshot)
- Generous whitespace
- Clear typography hierarchy
- Desktop-first responsive layout

---

## 📦 Mock Data & State

### Tool Definitions:
- JSON object with all 13 tools (title, description, category, route, form schema)

### Document Templates:
- Pre-written letter/document templates with placeholder variables
- Variable substitution logic for "generation"

### Draft State:
- React state for form data per tool
- Simulated auto-save with timestamp
- Clear draft functionality

### Mock Documents Vault:
- Array of sample generated documents
- Category grouping
- Search/filter functionality

---

## 🔄 Interactions & Flows

### Document Generation Flow:
1. User fills form fields
2. Clicks "Generate" button
3. 2-second simulated loading with progress indicator
4. Template populated with form values
5. Preview displays formatted document
6. Success toast notification
7. Copy/Download buttons enabled

### Draft Management:
- Form state preserved during session
- "Last saved" timestamp display
- Reload draft button restores previous values
- Clear draft resets form

---

## 📁 Component Structure

```
components/
├── layout/
│   ├── AppLayout
│   ├── Sidebar
│   └── TopNav
├── tools/
│   ├── ToolGrid
│   ├── ToolCard
│   ├── ToolPageLayout
│   └── DocumentPreview
├── forms/
│   ├── FormSection
│   ├── FormField
│   └── SignatorySection
├── vault/
│   ├── VaultStatus
│   ├── CategoryGrid
│   └── DocumentList
└── common/
    ├── Loader
    └── Toast
```

---

## 🚀 Deliverables

1. **Fully navigable multi-page React app**
2. **Complete sidebar and header navigation**
3. **13 functional tool pages with forms**
4. **Document preview with mock generation**
5. **Documents Vault with mock data**
6. **Settings and Company Setup pages**
7. **Professional MUI-styled interface**
8. **Production-quality UX suitable for demos**

