import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {children}
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

export default FormSection;
