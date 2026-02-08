import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Lightbulb as LightbulbIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface RequestToolDialogProps {
  open: boolean;
  onClose: () => void;
}

const RequestToolDialog: React.FC<RequestToolDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    toolName: '',
    description: '',
    category: '',
    useCase: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.toolName.length < 3) {
      newErrors.toolName = 'Tool name must be at least 3 characters';
    }
    if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // In a real app, this would send to a backend
      console.log('Tool request submitted:', formData);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setFormData({ toolName: '', description: '', category: '', useCase: '' });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
        <LightbulbIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" component="span">
          Request a Tool
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {submitted ? (
          <Alert severity="success" sx={{ mt: 1 }}>
            Thank you! Your tool request has been submitted. We'll review it and get back to you soon.
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Have an idea for a new HR tool? Let us know and we'll consider adding it to the platform.
            </Typography>

            <TextField
              label="Tool Name"
              placeholder="e.g., Performance Review Template"
              value={formData.toolName}
              onChange={handleChange('toolName')}
              error={!!errors.toolName}
              helperText={errors.toolName}
              size="small"
              fullWidth
              required
            />

            <TextField
              label="Description"
              placeholder="Describe what the tool should do..."
              value={formData.description}
              onChange={handleChange('description')}
              error={!!errors.description}
              helperText={errors.description}
              size="small"
              fullWidth
              multiline
              rows={3}
              required
            />

            <FormControl size="small" fullWidth required error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleChange('category')({ target: { value: e.target.value } })}
              >
                <MenuItem value="Letters">Letters</MenuItem>
                <MenuItem value="Policies">Policies</MenuItem>
                <MenuItem value="Contracts">Contracts</MenuItem>
                <MenuItem value="Employer Branding">Employer Branding</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            <TextField
              label="Use Case (Optional)"
              placeholder="How would you use this tool?"
              value={formData.useCase}
              onChange={handleChange('useCase')}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {submitted ? (
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Submit Request
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RequestToolDialog;
