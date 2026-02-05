import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Description as DocumentIcon,
  Edit as EditIcon,
  Visibility as PreviewIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { defaultCompanyContext } from '@/data/companyContext';

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

  const handleDownload = () => {
    const blob = new Blob([editableContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Document downloaded!' });
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
                onClick={handleDownload}
                disabled={!hasContent || isLoading}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Loading indicator */}
      {isLoading && <LinearProgress />}

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
