import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import DocumentPreview from './DocumentPreview';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  howToUse: string[];
  children: React.ReactNode;
  formData: Record<string, any>;
  onGenerate: () => string;
  onClear: () => void;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  title,
  description,
  howToUse,
  children,
  formData,
  onGenerate,
  onClear,
}) => {
  const navigate = useNavigate();
  const [useCompanyContext, setUseCompanyContext] = useState(true);
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'success' });

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    try {
      const document = onGenerate();
      setGeneratedDocument(document);
      setLastSaved(new Date());
      setSnackbar({
        open: true,
        message: 'Document generated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error generating document. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [onGenerate]);

  const handleClearDraft = () => {
    onClear();
    setGeneratedDocument('');
    setLastSaved(null);
    setSnackbar({
      open: true,
      message: 'Draft cleared.',
      severity: 'info',
    });
  };

  const handleReloadDraft = () => {
    setSnackbar({
      open: true,
      message: 'Draft reloaded.',
      severity: 'info',
    });
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2, color: 'text.secondary' }}
        >
          Back to Tools
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Left Panel - Form */}
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            {/* How to Use Accordion */}
            <Accordion 
              defaultExpanded={false}
              sx={{ 
                mb: 3, 
                boxShadow: 'none', 
                border: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  How to use this tool
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="ol" sx={{ pl: 2, m: 0 }}>
                  {howToUse.map((step, index) => (
                    <Typography
                      component="li"
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {step}
                    </Typography>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Draft Controls */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {lastSaved ? (
                  <Chip
                    icon={<SaveIcon sx={{ fontSize: 16 }} />}
                    label={`Last saved: ${lastSaved.toLocaleTimeString()}`}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    No draft saved
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Reload draft">
                  <IconButton size="small" onClick={handleReloadDraft}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Clear draft">
                  <IconButton size="small" onClick={handleClearDraft}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Company Context Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={useCompanyContext}
                  onChange={(e) => setUseCompanyContext(e.target.checked)}
                  color="primary"
                />
              }
              label="Use Company Context"
              sx={{ mb: 3 }}
            />

            {/* Form Fields */}
            <Box sx={{ mb: 3 }}>{children}</Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerate}
                disabled={isGenerating}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {isGenerating ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                    Generating...
                  </>
                ) : (
                  `Generate ${title.replace(' Generator', '').replace(' Builder', '')}`
                )}
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Right Panel - Preview */}
        <Box>
          <DocumentPreview
            content={generatedDocument}
            isLoading={isGenerating}
            title={title}
          />
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ToolPageLayout;
