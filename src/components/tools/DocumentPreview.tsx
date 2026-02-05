import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Snackbar,
  Alert,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Description as DocumentIcon,
  Edit as EditIcon,
  Visibility as PreviewIcon,
  PictureAsPdf as PdfIcon,
  Article as DocxIcon,
  Code as MarkdownIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { defaultCompanyContext } from '@/data/companyContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

interface DocumentPreviewProps {
  content: string;
  isLoading: boolean;
  title: string;
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  content,
  isLoading,
  title,
}) => {
  const [editableContent, setEditableContent] = useState(content);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const company = defaultCompanyContext;

  // Sync when new content is generated
  useEffect(() => {
    if (content) {
      setEditableContent(content);
      setViewMode('edit');
    }
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editableContent);
      setSnackbar({ open: true, message: 'Copied to clipboard!' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to copy' });
    }
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([editableContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Markdown downloaded!' });
    handleDownloadClose();
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    handleDownloadClose();

    // Switch to preview mode temporarily for PDF generation
    const previousMode = viewMode;
    if (viewMode === 'edit') {
      setViewMode('preview');
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    try {
      if (previewRef.current) {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        setSnackbar({ open: true, message: 'PDF downloaded!' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to generate PDF' });
    } finally {
      setIsExporting(false);
      if (previousMode === 'edit') {
        setViewMode('edit');
      }
    }
  };

  const parseMarkdownToDocx = (markdown: string) => {
    const lines = markdown.split('\n');
    const children: Paragraph[] = [];

    // Add company header
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: company.companyName,
            bold: true,
            size: 28,
          }),
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Release Date: ${formatDate(new Date())}`,
            size: 20,
            italics: true,
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 300 },
      })
    );

    // Parse markdown content
    lines.forEach((line) => {
      if (line.startsWith('# ')) {
        children.push(
          new Paragraph({
            text: line.replace('# ', ''),
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          })
        );
      } else if (line.startsWith('## ')) {
        children.push(
          new Paragraph({
            text: line.replace('## ', ''),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
          })
        );
      } else if (line.startsWith('### ')) {
        children.push(
          new Paragraph({
            text: line.replace('### ', ''),
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          })
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        children.push(
          new Paragraph({
            text: line.replace(/^[-*] /, ''),
            bullet: { level: 0 },
            spacing: { after: 50 },
          })
        );
      } else if (line.match(/^\d+\. /)) {
        children.push(
          new Paragraph({
            text: line.replace(/^\d+\. /, ''),
            numbering: { reference: 'default-numbering', level: 0 },
            spacing: { after: 50 },
          })
        );
      } else if (line.trim() === '---') {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: '' })],
            border: { bottom: { style: 'single' as const, size: 6, color: 'auto' } },
            spacing: { before: 200, after: 200 },
          })
        );
      } else if (line.trim()) {
        // Handle bold and italic in text
        const runs: TextRun[] = [];
        let remaining = line;
        const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(remaining)) !== null) {
          if (match.index > lastIndex) {
            runs.push(new TextRun({ text: remaining.slice(lastIndex, match.index) }));
          }
          const text = match[0];
          if (text.startsWith('**') && text.endsWith('**')) {
            runs.push(new TextRun({ text: text.slice(2, -2), bold: true }));
          } else if (text.startsWith('*') && text.endsWith('*')) {
            runs.push(new TextRun({ text: text.slice(1, -1), italics: true }));
          }
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < remaining.length) {
          runs.push(new TextRun({ text: remaining.slice(lastIndex) }));
        }

        children.push(
          new Paragraph({
            children: runs.length > 0 ? runs : [new TextRun({ text: line })],
            spacing: { after: 100 },
          })
        );
      } else {
        children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });

    // Add footer
    children.push(
      new Paragraph({
        children: [new TextRun({ text: '' })],
        spacing: { before: 400 },
      })
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: company.companyAddress,
            size: 18,
            color: '666666',
          }),
        ],
        alignment: AlignmentType.CENTER,
      })
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${company.companyWebsite} | ${company.companyEmail} | ${company.companyPhone}`,
            size: 18,
            color: '666666',
          }),
        ],
        alignment: AlignmentType.CENTER,
      })
    );

    return children;
  };

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    handleDownloadClose();

    try {
      const doc = new Document({
        numbering: {
          config: [
            {
              reference: 'default-numbering',
              levels: [
                {
                  level: 0,
                  format: 'decimal' as const,
                  text: '%1.',
                  alignment: AlignmentType.START,
                },
              ],
            },
          ],
        },
        sections: [
          {
            children: parseMarkdownToDocx(editableContent),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '-')}.docx`);
      setSnackbar({ open: true, message: 'DOCX downloaded!' });
    } catch (error) {
      console.error('DOCX generation error:', error);
      setSnackbar({ open: true, message: 'Failed to generate DOCX' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'edit' | 'preview' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const hasContent = editableContent || content;

  return (
    <Paper
      sx={{
        p: 0,
        height: 'calc(100vh - 200px)',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 80,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Document Preview
          </Typography>
          {hasContent && !isLoading && (
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  py: 0.5,
                  px: 1.5,
                  fontSize: '0.75rem',
                },
              }}
            >
              <ToggleButton value="edit" aria-label="edit mode">
                <EditIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Edit
              </ToggleButton>
              <ToggleButton value="preview" aria-label="preview mode">
                <PreviewIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Preview
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy to clipboard">
            <span>
              <IconButton
                size="small"
                onClick={handleCopy}
                disabled={!hasContent || isLoading}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Download">
            <span>
              <IconButton
                size="small"
                onClick={handleDownloadClick}
                disabled={!hasContent || isLoading || isExporting}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Menu
            anchorEl={downloadAnchor}
            open={Boolean(downloadAnchor)}
            onClose={handleDownloadClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleDownloadPDF}>
              <ListItemIcon>
                <PdfIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Download as PDF</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDownloadDocx}>
              <ListItemIcon>
                <DocxIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText>Download as DOCX</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDownloadMarkdown}>
              <ListItemIcon>
                <MarkdownIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Download as Markdown</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Loading indicator */}
      {(isLoading || isExporting) && <LinearProgress />}

      {/* Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 3,
          bgcolor: 'grey.50',
        }}
      >
        {hasContent ? (
          viewMode === 'edit' ? (
            <TextField
              multiline
              fullWidth
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              variant="outlined"
              sx={{
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  bgcolor: 'background.paper',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                },
                '& .MuiOutlinedInput-input': {
                  height: '100% !important',
                  overflow: 'auto !important',
                },
              }}
            />
          ) : (
            <Paper
              ref={previewRef}
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Letterhead */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  p: 3,
                  pb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={company.logoUrl}
                    alt={`${company.companyName} Logo`}
                    style={{ height: 50, width: 'auto' }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      fontSize: '1rem',
                    }}
                  >
                    {company.companyName}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', display: 'block' }}
                  >
                    Release Date:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: 'text.primary' }}
                  >
                    {formatDate(new Date())}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Document Body */}
              <Box
                sx={{
                  flexGrow: 1,
                  p: 4,
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    mt: 2,
                    mb: 1,
                    fontWeight: 600,
                  },
                  '& h1': { fontSize: '1.25rem' },
                  '& h2': { fontSize: '1.1rem' },
                  '& h3': { fontSize: '1rem' },
                  '& p': {
                    mb: 1.5,
                    lineHeight: 1.7,
                    fontSize: '0.875rem',
                  },
                  '& ul, & ol': {
                    pl: 3,
                    mb: 1.5,
                  },
                  '& li': {
                    mb: 0.5,
                    fontSize: '0.875rem',
                  },
                  '& strong': {
                    fontWeight: 600,
                  },
                  '& em': {
                    fontStyle: 'italic',
                  },
                  '& hr': {
                    my: 3,
                    border: 'none',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  },
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    my: 2,
                    fontSize: '0.875rem',
                  },
                  '& th, & td': {
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 1,
                    textAlign: 'left',
                  },
                  '& th': {
                    bgcolor: 'grey.100',
                    fontWeight: 600,
                  },
                }}
              >
                <ReactMarkdown>{editableContent}</ReactMarkdown>
              </Box>

              <Divider />

              {/* Footer */}
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    fontSize: '0.7rem',
                  }}
                >
                  {company.companyAddress}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    fontSize: '0.7rem',
                    mt: 0.5,
                  }}
                >
                  {company.companyWebsite} | {company.companyEmail} | {company.companyPhone}
                </Typography>
              </Box>
            </Paper>
          )
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            <DocumentIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
            <Typography variant="body1" color="text.secondary">
              {isLoading ? 'Generating document...' : 'Fill in the form and click Generate'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Your document preview will appear here
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DocumentPreview;