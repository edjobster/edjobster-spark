import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Switch, FormControlLabel, Button, Divider } from '@mui/material';
import { defaultCompanyContext } from '@/data/companyContext';

const ToolsSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    useCompanyContext: true,
    autoSaveDrafts: true,
    defaultSignatoryName: defaultCompanyContext.signatory.name,
    defaultSignatoryTitle: defaultCompanyContext.signatory.title,
    defaultSignatoryEmail: defaultCompanyContext.signatory.email,
    defaultSignatoryPhone: defaultCompanyContext.signatory.phone,
    brandColor: '#00897B',
    letterheadEnabled: false,
  });

  const handleToggle = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [name]: e.target.checked }));
  };

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Tools AI Settings</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Configure default settings for all AI tools</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>General Settings</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel control={<Switch checked={settings.useCompanyContext} onChange={handleToggle('useCompanyContext')} />} label="Use Company Context by default" />
          <FormControlLabel control={<Switch checked={settings.autoSaveDrafts} onChange={handleToggle('autoSaveDrafts')} />} label="Auto-save drafts" />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Default Signatory</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Name" value={settings.defaultSignatoryName} onChange={handleChange('defaultSignatoryName')} size="small" />
          <TextField label="Title" value={settings.defaultSignatoryTitle} onChange={handleChange('defaultSignatoryTitle')} size="small" />
          <TextField label="Email" value={settings.defaultSignatoryEmail} onChange={handleChange('defaultSignatoryEmail')} size="small" />
          <TextField label="Phone" value={settings.defaultSignatoryPhone} onChange={handleChange('defaultSignatoryPhone')} size="small" />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Branding</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Brand Color" value={settings.brandColor} onChange={handleChange('brandColor')} size="small" sx={{ maxWidth: 200 }} />
          <FormControlLabel control={<Switch checked={settings.letterheadEnabled} onChange={handleToggle('letterheadEnabled')} />} label="Include company letterhead in documents" />
        </Box>
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" color="primary">Save Settings</Button>
      </Paper>
    </Box>
  );
};

export default ToolsSettings;
