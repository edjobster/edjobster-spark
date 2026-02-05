

# Make Document Preview Editable

## Overview
Convert the Document Preview section from read-only (ReactMarkdown rendering) to an editable mode, allowing users to modify the generated document content directly before copying or downloading.

---

## Current Implementation
- Uses `ReactMarkdown` to render the generated markdown content
- Content is passed as a prop and displayed as read-only formatted text
- Copy and Download actions use the original `content` prop

## Proposed Changes

### 1. Add Local Editable State
- Create internal state `editableContent` that initializes from the `content` prop
- Sync when new content is generated (using `useEffect` on `content` changes)
- Copy/Download will use `editableContent` instead of original `content`

### 2. Replace ReactMarkdown with Editable TextField
- Replace the `ReactMarkdown` component with MUI `TextField` in multiline mode
- Full-height textarea that fills the preview area
- Clean, document-like styling with monospace font for markdown editing

### 3. Add View Mode Toggle (Optional Enhancement)
- Toggle button in header to switch between "Edit" and "Preview" modes
- Edit mode: Shows raw markdown in textarea
- Preview mode: Shows formatted markdown (current behavior)
- Default to Edit mode when content is generated

### 4. Update Copy/Download to Use Edited Content
- Both actions will use the local `editableContent` state
- Users get their edited version, not the original generated content

---

## Technical Implementation

### State Changes
```typescript
const [editableContent, setEditableContent] = useState(content);
const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

// Sync when new content is generated
useEffect(() => {
  if (content) {
    setEditableContent(content);
    setViewMode('edit'); // Switch to edit mode on new generation
  }
}, [content]);
```

### UI Changes
- Add Edit/Preview toggle buttons in the header
- In Edit mode: Full-height `TextField` with multiline
- In Preview mode: Keep existing `ReactMarkdown` display
- Both modes use `editableContent` as the source

---

## File to Modify
| File | Changes |
|------|---------|
| `src/components/tools/DocumentPreview.tsx` | Add editable state, view mode toggle, and editable textarea |

---

## UX Benefits
- Users can make quick edits without going back to the form
- One-way flow: Form → Generate → Edit → Download
- Toggle allows switching between editing and previewing formatted output
- Familiar markdown editing experience

