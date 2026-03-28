import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Document } from '@/data/mockDocuments';

interface DeleteDocumentDialogProps {
  open: boolean;
  document: Document | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDocumentDialog: React.FC<DeleteDocumentDialogProps> = ({ open, document, onClose, onConfirm }) => {
  if (!document) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600} color="error.main">Delete Document</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
          <WarningIcon sx={{ fontSize: 48, color: 'error.main' }} />
          <Typography variant="body1">
            Are you sure you want to delete <strong>"{document.title}"</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. The document will be permanently removed from your vault.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'center', gap: 1 }}>
        <Button variant="outlined" onClick={onClose} sx={{ minWidth: 100 }}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm} sx={{ minWidth: 100 }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDocumentDialog;
