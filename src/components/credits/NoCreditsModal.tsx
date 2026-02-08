import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import BuyCreditsDialog from './BuyCreditsDialog';

interface NoCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

const NoCreditsModal: React.FC<NoCreditsModalProps> = ({ open, onClose }) => {
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const handleBuyCredits = () => {
    onClose();
    setBuyDialogOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        
        <DialogContent sx={{ textAlign: 'center', py: 5, px: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'error.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <BlockIcon sx={{ fontSize: 40, color: 'error.main' }} />
          </Box>
          
          <Typography variant="h6" fontWeight={600} gutterBottom>
            You've run out of AI credits
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Purchase more credits to continue generating professional HR documents.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleBuyCredits}
              fullWidth
            >
              Buy Credits
            </Button>
            <Button
              variant="text"
              onClick={onClose}
              color="inherit"
            >
              Maybe Later
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <BuyCreditsDialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
      />
    </>
  );
};

export default NoCreditsModal;
