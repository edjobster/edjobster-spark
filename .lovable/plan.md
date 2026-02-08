

# Add View and Edit Options to Documents Vault

## Overview
Enhance the Documents Vault three-dot menu by adding "View" and "Edit" options for saved documents. The "View" option opens a popup/dialog where users can see the document content, and optionally edit it before closing.

---

## Current State

The three-dot menu currently has:
- Download
- Share  
- Delete

**Issue**: The menu doesn't track which document was clicked (only stores the button anchor element).

---

## Proposed Changes

### 1. Update Menu Options
Add two new menu items in this order:

| Option | Icon | Action |
|--------|------|--------|
| View | Visibility | Opens view dialog |
| Edit | Edit | Opens edit dialog |
| Download | Download | Existing |
| Share | Share | Existing |
| Delete | Delete | Existing (destructive, stays last) |

### 2. View Document Dialog
A popup that displays the document content in read-only mode:

```text
+-----------------------------------------------+
| [X]                                           |
|  Document Title                               |
|  Type: Offer Letter | Category: Letters       |
|  Created: 2024-01-15 | Size: 24 KB           |
|-----------------------------------------------|
|                                               |
|  [Document Content Preview]                   |
|  (Mock markdown/text content)                 |
|                                               |
|-----------------------------------------------|
|           [Edit]              [Close]         |
+-----------------------------------------------+
```

Features:
- Shows document metadata (title, type, category, date, size)
- Displays document content in a scrollable area
- "Edit" button switches to edit mode
- "Close" button closes the dialog

### 3. Edit Document Dialog
When user clicks "Edit" (from menu or view dialog), opens editable mode:

```text
+-----------------------------------------------+
| [X]                                           |
|  Edit Document                                |
|-----------------------------------------------|
|  Title: [________________]                    |
|                                               |
|  Content:                                     |
|  +---------------------------------------+    |
|  | [Editable text area with content]     |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|-----------------------------------------------|
|          [Cancel]         [Save Changes]      |
+-----------------------------------------------+
```

Features:
- Editable title field
- Multi-line text area for content editing
- Cancel discards changes
- Save updates the document (local state for now)

---

## Technical Implementation

### Files to Modify

| File | Changes |
|------|---------|
| `src/data/mockDocuments.ts` | Add `content` field to Document interface and mock data |
| `src/pages/DocumentsVault.tsx` | Add dialogs, update menu, add state management |

### Updated Document Interface

```typescript
export interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  createdAt: string;
  size: string;
  content: string;  // NEW: Document content for view/edit
}
```

### New State Variables

```typescript
const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
const [viewDialogOpen, setViewDialogOpen] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editedContent, setEditedContent] = useState('');
const [editedTitle, setEditedTitle] = useState('');
const [documents, setDocuments] = useState(mockDocuments); // Local state for editing
```

### Menu Click Handler Update

```typescript
const handleMenuClick = (event: React.MouseEvent<HTMLElement>, doc: Document) => {
  setAnchorEl(event.currentTarget);
  setSelectedDocument(doc);
};
```

### Dialog Actions

| Action | Handler |
|--------|---------|
| View click | Opens view dialog with selected doc |
| Edit click (menu) | Opens edit dialog directly |
| Edit click (view dialog) | Closes view, opens edit dialog |
| Save changes | Updates document in local state, closes dialog |
| Cancel | Closes dialog without saving |

### MUI Components Used
- `Dialog` - For both view and edit popups
- `DialogTitle` - With close button
- `DialogContent` - Document display/form
- `DialogActions` - Action buttons
- `TextField` - For title and content editing
- Icons: `Visibility`, `Edit`, `Close`, `Download`, `Share`, `Delete`

---

## Mock Content Examples

Each document will have sample content matching its type:

| Document Type | Sample Content |
|---------------|----------------|
| Offer Letter | "Dear [Candidate], We are pleased to offer you the position of..." |
| Leave Policy | "1. Introduction\nThis policy outlines the leave entitlements..." |
| NDA | "This Non-Disclosure Agreement is entered into between..." |

---

## User Flow

```text
User clicks three-dot menu
        |
        v
Menu shows: View, Edit, Download, Share, Delete
        |
        +-- View --> View Dialog opens
        |               |
        |               +-- Click Edit --> Edit Dialog
        |               +-- Click Close --> Dialog closes
        |
        +-- Edit --> Edit Dialog opens directly
                        |
                        +-- Save --> Updates doc, closes
                        +-- Cancel --> Discards changes, closes
```

---

## Files to Modify
- `src/data/mockDocuments.ts` - Add content field to interface and mock data
- `src/pages/DocumentsVault.tsx` - Add View/Edit dialogs and update menu

