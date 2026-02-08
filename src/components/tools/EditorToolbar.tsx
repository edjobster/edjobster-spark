import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
} from '@mui/icons-material';

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  onChange: (newContent: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  textareaRef,
  content,
  onChange,
}) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

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

    // Remove existing heading prefixes before adding new one
    const cleanedAfter = after.replace(/^#{1,3}\s*/, '');
    onChange(before + prefix + cleanedAfter);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleBold = () => wrapSelection('**', '**');
  const handleItalic = () => wrapSelection('*', '*');
  const handleUnderline = () => wrapSelection('<u>', '</u>');
  const handleStrikethrough = () => wrapSelection('~~', '~~');

  const handleHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    prefixLine(prefix);
  };

  const handleAlignLeft = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = content.indexOf('\n', start);
    const actualEnd = lineEnd === -1 ? content.length : lineEnd;
    
    const line = content.substring(lineStart, actualEnd);
    const before = content.substring(0, lineStart);
    const after = content.substring(actualEnd);

    // Remove alignment tags
    const cleanedLine = line
      .replace(/<center>/g, '')
      .replace(/<\/center>/g, '')
      .replace(/<div align="right">/g, '')
      .replace(/<\/div>/g, '');

    onChange(before + cleanedLine + after);
  };

  const handleAlignCenter = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = content.indexOf('\n', start);
    const actualEnd = lineEnd === -1 ? content.length : lineEnd;
    
    const line = content.substring(lineStart, actualEnd);
    const before = content.substring(0, lineStart);
    const after = content.substring(actualEnd);

    // Remove existing alignment and add center
    const cleanedLine = line
      .replace(/<center>/g, '')
      .replace(/<\/center>/g, '')
      .replace(/<div align="right">/g, '')
      .replace(/<\/div>/g, '');

    onChange(before + '<center>' + cleanedLine + '</center>' + after);
  };

  const handleAlignRight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = content.indexOf('\n', start);
    const actualEnd = lineEnd === -1 ? content.length : lineEnd;
    
    const line = content.substring(lineStart, actualEnd);
    const before = content.substring(0, lineStart);
    const after = content.substring(actualEnd);

    // Remove existing alignment and add right
    const cleanedLine = line
      .replace(/<center>/g, '')
      .replace(/<\/center>/g, '')
      .replace(/<div align="right">/g, '')
      .replace(/<\/div>/g, '');

    onChange(before + '<div align="right">' + cleanedLine + '</div>' + after);
  };

  const handleBulletList = () => prefixLine('- ');
  const handleNumberedList = () => prefixLine('1. ');

  const handleLinkClick = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      setLinkText(selectedText);
    }
    setLinkUrl('');
    setLinkDialogOpen(true);
  };

  const handleInsertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);

    const linkMarkdown = `[${linkText}](${linkUrl})`;
    onChange(before + linkMarkdown + after);

    setLinkDialogOpen(false);
    setLinkText('');
    setLinkUrl('');

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const buttonStyle = {
    minWidth: 32,
    width: 32,
    height: 32,
    p: 0.5,
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          p: 1,
          bgcolor: 'grey.100',
          borderRadius: 1,
          mb: 1,
          flexWrap: 'wrap',
        }}
      >
        {/* Text Styling Group */}
        <Tooltip title="Bold">
          <IconButton size="small" onClick={handleBold} sx={buttonStyle}>
            <FormatBold fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton size="small" onClick={handleItalic} sx={buttonStyle}>
            <FormatItalic fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline">
          <IconButton size="small" onClick={handleUnderline} sx={buttonStyle}>
            <FormatUnderlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Strikethrough">
          <IconButton size="small" onClick={handleStrikethrough} sx={buttonStyle}>
            <StrikethroughS fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Heading Group */}
        <Tooltip title="Heading 1">
          <IconButton
            size="small"
            onClick={() => handleHeading(1)}
            sx={{ ...buttonStyle, fontSize: '0.75rem', fontWeight: 700 }}
          >
            H1
          </IconButton>
        </Tooltip>
        <Tooltip title="Heading 2">
          <IconButton
            size="small"
            onClick={() => handleHeading(2)}
            sx={{ ...buttonStyle, fontSize: '0.75rem', fontWeight: 700 }}
          >
            H2
          </IconButton>
        </Tooltip>
        <Tooltip title="Heading 3">
          <IconButton
            size="small"
            onClick={() => handleHeading(3)}
            sx={{ ...buttonStyle, fontSize: '0.75rem', fontWeight: 700 }}
          >
            H3
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Alignment Group */}
        <Tooltip title="Align Left">
          <IconButton size="small" onClick={handleAlignLeft} sx={buttonStyle}>
            <FormatAlignLeft fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Center">
          <IconButton size="small" onClick={handleAlignCenter} sx={buttonStyle}>
            <FormatAlignCenter fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Right">
          <IconButton size="small" onClick={handleAlignRight} sx={buttonStyle}>
            <FormatAlignRight fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* List Group */}
        <Tooltip title="Bullet List">
          <IconButton size="small" onClick={handleBulletList} sx={buttonStyle}>
            <FormatListBulleted fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton size="small" onClick={handleNumberedList} sx={buttonStyle}>
            <FormatListNumbered fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Link Button */}
        <Tooltip title="Insert Link">
          <IconButton size="small" onClick={handleLinkClick} sx={buttonStyle}>
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Link Dialog */}
      <Dialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Link Text"
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="URL"
            fullWidth
            variant="outlined"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleInsertLink}
            variant="contained"
            disabled={!linkText || !linkUrl}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditorToolbar;
