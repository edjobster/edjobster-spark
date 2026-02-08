

# Add Rich Text Editor Toolbar to Document Preview

## Overview
Add a formatting toolbar to the "Edit" tab in the Document Preview component that allows users to apply text styling, alignment, and link formatting without requiring additional heavy dependencies.

---

## Current State

The Edit mode currently shows a plain `TextField` with monospace font for editing markdown content. Users must manually type markdown syntax for formatting.

```text
+------------------------------------------+
| Document Preview    [Edit] [Preview]     |
|------------------------------------------|
| +--------------------------------------+ |
| | # Offer Letter                       | |
| | Dear **John**,                       | |
| | ...                                  | |
| +--------------------------------------+ |
+------------------------------------------+
```

---

## Proposed Solution

Add a toolbar above the text editor with formatting buttons. Since the content is markdown-based, the toolbar will insert/wrap markdown syntax around selected text or at cursor position.

```text
+------------------------------------------+
| Document Preview    [Edit] [Preview]     |
|------------------------------------------|
| [B] [I] [U] [S] | [H1] [H2] [H3] | [Link]|
| [Left] [Center] [Right] | [•] [1.]       |
|------------------------------------------|
| +--------------------------------------+ |
| | # Offer Letter                       | |
| | Dear **John**,                       | |
| +--------------------------------------+ |
+------------------------------------------+
```

---

## Toolbar Features

### Text Styling Group

| Button | Icon | Markdown Output | Description |
|--------|------|-----------------|-------------|
| Bold | FormatBold | `**text**` | Wraps text in double asterisks |
| Italic | FormatItalic | `*text*` | Wraps text in single asterisks |
| Underline | FormatUnderlined | `<u>text</u>` | HTML underline tag |
| Strikethrough | StrikethroughS | `~~text~~` | Double tildes |

### Heading Group

| Button | Icon | Markdown Output |
|--------|------|-----------------|
| H1 | Title or text "H1" | `# ` prefix |
| H2 | Text "H2" | `## ` prefix |
| H3 | Text "H3" | `### ` prefix |

### Alignment Group

| Button | Icon | Action |
|--------|------|--------|
| Left | FormatAlignLeft | Default (removes alignment tags) |
| Center | FormatAlignCenter | Wraps line with `<center>` |
| Right | FormatAlignRight | Wraps line with `<div align="right">` |

### List Group

| Button | Icon | Markdown Output |
|--------|------|-----------------|
| Bullet List | FormatListBulleted | `- ` prefix |
| Numbered List | FormatListNumbered | `1. ` prefix |

### Link Button

| Button | Icon | Action |
|--------|------|--------|
| Link | Link | Opens dialog to insert `[text](url)` |

---

## Technical Implementation

### Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `src/components/tools/EditorToolbar.tsx` | Create | New toolbar component |
| `src/components/tools/DocumentPreview.tsx` | Modify | Integrate toolbar, use textarea ref for selection |

### EditorToolbar Component

```typescript
interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  onChange: (newContent: string) => void;
}
```

### Toolbar Styling

Uses MUI components for consistent styling:
- `ToggleButtonGroup` for grouped buttons
- `ToggleButton` for individual format buttons
- `Tooltip` for button hints
- `Divider` for visual separation
- `Dialog` for link insertion

### Text Manipulation Logic

```typescript
const wrapSelection = (prefix: string, suffix: string) => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = content.substring(start, end);
  const before = content.substring(0, start);
  const after = content.substring(end);
  
  const newContent = before + prefix + selectedText + suffix + after;
  onChange(newContent);
  
  // Restore cursor position after the wrapped text
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(
      start + prefix.length,
      end + prefix.length
    );
  }, 0);
};

const prefixLine = (prefix: string) => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const lineStart = content.lastIndexOf('\n', start - 1) + 1;
  const before = content.substring(0, lineStart);
  const after = content.substring(lineStart);
  
  onChange(before + prefix + after);
};
```

### Link Dialog

Simple MUI Dialog with:
- Text field for link text (pre-filled with selection)
- Text field for URL
- Cancel/Insert buttons

Generates: `[link text](https://example.com)`

---

## DocumentPreview Changes

### Add textarea ref

```typescript
const textareaRef = useRef<HTMLTextAreaElement>(null);
```

### Updated Edit Mode JSX

```tsx
{viewMode === 'edit' && (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <EditorToolbar
      textareaRef={textareaRef}
      content={editableContent}
      onChange={setEditableContent}
    />
    <TextField
      inputRef={textareaRef}
      multiline
      fullWidth
      value={editableContent}
      onChange={(e) => setEditableContent(e.target.value)}
      // ... existing styles
    />
  </Box>
)}
```

---

## Visual Design

### Toolbar Layout

```text
+------------------------------------------------------------------------+
| [B][I][U][S] | [H1][H2][H3] | [≡L][≡C][≡R] | [•][1.] | [🔗] |          |
+------------------------------------------------------------------------+
|                                                                        |
|  Document content editing area...                                      |
|                                                                        |
+------------------------------------------------------------------------+
```

### Toolbar Styling

- Background: `grey.100` or subtle contrast
- Buttons: Small size, 32x32px
- Dividers: Vertical separators between groups
- Tooltips: Show on hover with shortcut hints
- Active state: Highlight when cursor is in formatted text (optional enhancement)

---

## MUI Icons Used

| Icon | Import |
|------|--------|
| FormatBold | `@mui/icons-material/FormatBold` |
| FormatItalic | `@mui/icons-material/FormatItalic` |
| FormatUnderlined | `@mui/icons-material/FormatUnderlined` |
| StrikethroughS | `@mui/icons-material/StrikethroughS` |
| FormatAlignLeft | `@mui/icons-material/FormatAlignLeft` |
| FormatAlignCenter | `@mui/icons-material/FormatAlignCenter` |
| FormatAlignRight | `@mui/icons-material/FormatAlignRight` |
| FormatListBulleted | `@mui/icons-material/FormatListBulleted` |
| FormatListNumbered | `@mui/icons-material/FormatListNumbered` |
| Link | `@mui/icons-material/Link` |
| Title | `@mui/icons-material/Title` |

---

## User Flow

1. User is in Edit mode with document content
2. User selects text they want to format
3. User clicks a toolbar button (e.g., Bold)
4. Selected text is wrapped with markdown syntax (`**text**`)
5. Content updates and selection is preserved
6. User can continue editing or switch to Preview to see rendered result

---

## Benefits

- No additional dependencies needed
- Works with existing markdown-based workflow
- Consistent with MUI design language
- Formatting visible immediately in Preview mode
- Intuitive for non-technical users

---

## Files to Create/Modify
- `src/components/tools/EditorToolbar.tsx` - New toolbar component
- `src/components/tools/DocumentPreview.tsx` - Integrate toolbar above edit area

