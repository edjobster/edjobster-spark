import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

interface DocumentPreviewProps {
  content: string;
  isLoading: boolean;
  title: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  content,
  isLoading,
  title,
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setSnackbar({ open: true, message: 'Copied to clipboard!' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to copy' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
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
        <Typography variant="subtitle1" fontWeight={600}>
          Document Preview
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy to clipboard">
            <span>
              <IconButton
                size="small"
                onClick={handleCopy}
                disabled={!content || isLoading}
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
                disabled={!content || isLoading}
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
        {content ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'background.paper',
              minHeight: '100%',
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 2,
                mb: 1,
              },
              '& p': {
                mb: 1.5,
                lineHeight: 1.7,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 1.5,
              },
              '& li': {
                mb: 0.5,
              },
              '& strong': {
                fontWeight: 600,
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </Paper>
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
