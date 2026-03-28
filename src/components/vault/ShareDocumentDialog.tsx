import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Document } from '@/data/mockDocuments';

interface ShareDocumentDialogProps {
  open: boolean;
  document: Document | null;
  onClose: () => void;
}

const ShareDocumentDialog: React.FC<ShareDocumentDialogProps> = ({ open, document, onClose }) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  if (!document) return null;

  const shareUrl = `${window.location.origin}/vault/doc/${document.id}`;
  const shareText = `Check out this document: ${document.title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setSnackbar({ open: true, message: 'Link copied to clipboard!' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to copy link' });
    }
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
  };

  const handleShareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`, '_blank');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>Share Document</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Share "{document.title}" via link or social media:
          </Typography>

          {/* Copy Link */}
          <TextField
            fullWidth
            value={shareUrl}
            size="small"
            sx={{ mb: 3 }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} size="small"><CopyIcon fontSize="small" /></IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Social Share Buttons */}
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Share on Social Media</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<LinkedInIcon />} onClick={handleShareLinkedIn} sx={{ textTransform: 'none' }}>
              LinkedIn
            </Button>
            <Button variant="outlined" onClick={handleShareTwitter} sx={{ textTransform: 'none' }}>
              𝕏 Twitter
            </Button>
            <Button variant="outlined" color="success" onClick={handleShareWhatsApp} sx={{ textTransform: 'none' }}>
              WhatsApp
            </Button>
            <Button variant="outlined" startIcon={<EmailIcon />} onClick={handleShareEmail} sx={{ textTransform: 'none' }}>
              Email
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" onClick={onClose}>Done</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default ShareDocumentDialog;
