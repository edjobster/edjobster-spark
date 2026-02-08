import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { creditPlans, CreditPlan } from '@/data/mockAICredits';
import { useCredits } from '@/hooks/useCredits';

interface BuyCreditsDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = 'select' | 'payment' | 'success';

const BuyCreditsDialog: React.FC<BuyCreditsDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { addCredits } = useCredits();
  const [step, setStep] = useState<Step>('select');
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(
    creditPlans.find(p => p.popular) || creditPlans[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePlanSelect = (plan: CreditPlan) => {
    setSelectedPlan(plan);
  };

  const handleContinueToPayment = () => {
    if (selectedPlan) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (selectedPlan) {
      addCredits(selectedPlan.credits);
    }
    
    setIsProcessing(false);
    setStep('success');
  };

  const handleClose = () => {
    setStep('select');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    onClose();
    if (step === 'success' && onSuccess) {
      onSuccess();
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {step === 'success' ? 'Purchase Complete!' : 'Buy AI Credits'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {step === 'select' && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose a credit pack to continue generating professional HR documents.
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {creditPlans.map((plan) => (
                <Card
                  key={plan.id}
                  variant="outlined"
                  onClick={() => handlePlanSelect(plan)}
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    borderWidth: 2,
                    borderColor: selectedPlan?.id === plan.id ? 'primary.main' : 'divider',
                    bgcolor: selectedPlan?.id === plan.id ? 'primary.50' : 'background.paper',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Popular"
                      size="small"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 12,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                      }}
                    />
                  )}
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {plan.credits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Credits
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      ${plan.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ${plan.pricePerCredit.toFixed(2)}/credit
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {selectedPlan && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body2" fontWeight={500}>
                  Summary: {selectedPlan.credits} credits for ${selectedPlan.price.toFixed(2)}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {step === 'payment' && selectedPlan && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              This is a demo checkout. No real payment will be processed.
            </Alert>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Complete your purchase of {selectedPlan.credits} credits.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                inputProps={{ maxLength: 19 }}
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputProps={{ maxLength: 5 }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  inputProps={{ maxLength: 3 }}
                  type="password"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" fontWeight={500}>
                Total: ${selectedPlan.price.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        )}

        {step === 'success' && selectedPlan && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {selectedPlan.credits} credits have been added to your account.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {step === 'select' && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleContinueToPayment}
            disabled={!selectedPlan}
            size="large"
          >
            Continue to Payment
          </Button>
        )}

        {step === 'payment' && (
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => setStep('select')}
              disabled={isProcessing}
              sx={{ flex: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={isProcessing || !cardNumber || !expiry || !cvv}
              sx={{ flex: 2 }}
            >
              {isProcessing ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  Processing...
                </>
              ) : (
                `Pay $${selectedPlan?.price.toFixed(2)}`
              )}
            </Button>
          </Box>
        )}

        {step === 'success' && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleClose}
            size="large"
          >
            Start Creating
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BuyCreditsDialog;
