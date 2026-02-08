import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { useCredits } from '@/hooks/useCredits';
import BuyCreditsDialog from './BuyCreditsDialog';

const LowCreditsWarning: React.FC = () => {
  const { remaining, isLow } = useCredits();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!isLow) return null;

  return (
    <>
      <Alert
        severity="warning"
        icon={<WarningIcon />}
        action={
          <Button
            color="warning"
            size="small"
            variant="outlined"
            onClick={() => setDialogOpen(true)}
            sx={{ fontWeight: 600 }}
          >
            Buy Now
          </Button>
        }
        sx={{ mb: 2 }}
      >
        You have only {remaining} credit{remaining !== 1 ? 's' : ''} left.
      </Alert>
      <BuyCreditsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default LowCreditsWarning;
