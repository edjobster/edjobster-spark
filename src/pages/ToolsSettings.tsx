import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { defaultCompanyContext } from '@/data/companyContext';
import { mockAIUsageRecords, mockAICreditsStats } from '@/data/mockAICredits';
import { getCategoryColor, ToolCategory } from '@/data/tools';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatBillingCycle = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
};

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
    setSettings((prev) => ({ ...prev, [name]: e.target.checked }));
  };

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const usagePercentage = (mockAICreditsStats.usedCredits / mockAICreditsStats.totalCredits) * 100;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Tools AI Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure default settings for all AI tools
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          General Settings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={<Switch checked={settings.useCompanyContext} onChange={handleToggle('useCompanyContext')} />}
            label="Use Company Context by default"
          />
          <FormControlLabel
            control={<Switch checked={settings.autoSaveDrafts} onChange={handleToggle('autoSaveDrafts')} />}
            label="Auto-save drafts"
          />
        </Box>
      </Paper>

      {/* AI Credits Usage Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          AI Credits Usage
        </Typography>

        {/* Usage Summary */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Credits Used: {mockAICreditsStats.usedCredits} / {mockAICreditsStats.totalCredits}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {usagePercentage.toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={usagePercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E2E8F0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: usagePercentage > 80 ? '#EF4444' : '#00897B',
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Billing Cycle: {formatBillingCycle(mockAICreditsStats.billingCycleStart, mockAICreditsStats.billingCycleEnd)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Usage Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Credits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAIUsageRecords.map((record) => (
                <TableRow
                  key={record.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {record.documentName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.category}
                      size="small"
                      sx={{
                        backgroundColor: `${getCategoryColor(record.category as ToolCategory)}15`,
                        color: getCategoryColor(record.category as ToolCategory),
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(record.generatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {record.creditsUsed} credits
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Default Signatory
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Name"
            value={settings.defaultSignatoryName}
            onChange={handleChange('defaultSignatoryName')}
            size="small"
          />
          <TextField
            label="Title"
            value={settings.defaultSignatoryTitle}
            onChange={handleChange('defaultSignatoryTitle')}
            size="small"
          />
          <TextField
            label="Email"
            value={settings.defaultSignatoryEmail}
            onChange={handleChange('defaultSignatoryEmail')}
            size="small"
          />
          <TextField
            label="Phone"
            value={settings.defaultSignatoryPhone}
            onChange={handleChange('defaultSignatoryPhone')}
            size="small"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Branding
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Brand Color"
            value={settings.brandColor}
            onChange={handleChange('brandColor')}
            size="small"
            sx={{ maxWidth: 200 }}
          />
          <FormControlLabel
            control={<Switch checked={settings.letterheadEnabled} onChange={handleToggle('letterheadEnabled')} />}
            label="Include company letterhead in documents"
          />
        </Box>
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Paper>
    </Box>
  );
};

export default ToolsSettings;
