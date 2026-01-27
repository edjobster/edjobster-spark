import React from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';

interface SignatoryData {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface SignatorySectionProps {
  signatory: SignatoryData;
  onChange: (field: keyof SignatoryData, value: string) => void;
}

const SignatorySection: React.FC<SignatorySectionProps> = ({ signatory, onChange }) => {
  const handleChange = (field: keyof SignatoryData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(field, e.target.value);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Signatory Details
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="Signatory Name"
          value={signatory.name}
          onChange={handleChange('name')}
          required
        />
        <TextField
          fullWidth
          size="small"
          label="Signatory Title"
          value={signatory.title}
          onChange={handleChange('title')}
          required
        />
        <TextField
          fullWidth
          size="small"
          label="Signatory Email"
          type="email"
          value={signatory.email}
          onChange={handleChange('email')}
          required
        />
        <TextField
          fullWidth
          size="small"
          label="Signatory Phone"
          value={signatory.phone}
          onChange={handleChange('phone')}
          required
        />
      </Box>
    </Paper>
  );
};

export default SignatorySection;
