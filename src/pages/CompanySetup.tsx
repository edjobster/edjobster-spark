import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Avatar } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { defaultCompanyContext } from '@/data/companyContext';

const CompanySetup: React.FC = () => {
  const [company, setCompany] = useState({
    name: defaultCompanyContext.companyName,
    address: defaultCompanyContext.companyAddress,
    email: defaultCompanyContext.companyEmail,
    phone: defaultCompanyContext.companyPhone,
    website: defaultCompanyContext.companyWebsite,
    industry: defaultCompanyContext.industry,
    size: defaultCompanyContext.companySize,
  });

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(prev => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Company Setup</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Configure your company information for generated documents</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Company Logo</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}><BusinessIcon sx={{ fontSize: 40 }} /></Avatar>
          <Box>
            <Button variant="outlined" sx={{ mr: 1 }}>Upload Logo</Button>
            <Button variant="text" color="error">Remove</Button>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>Recommended: 200x200px, PNG or JPG</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Company Information</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Company Name" value={company.name} onChange={handleChange('name')} size="small" required />
          <TextField label="Industry" value={company.industry} onChange={handleChange('industry')} size="small" />
          <TextField label="Company Size" value={company.size} onChange={handleChange('size')} size="small" />
          <TextField label="Website" value={company.website} onChange={handleChange('website')} size="small" />
          <TextField label="Email" value={company.email} onChange={handleChange('email')} size="small" />
          <TextField label="Phone" value={company.phone} onChange={handleChange('phone')} size="small" />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <TextField label="Address" value={company.address} onChange={handleChange('address')} size="small" fullWidth multiline rows={2} />
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" color="primary">Save Company Information</Button>
      </Paper>
    </Box>
  );
};

export default CompanySetup;
