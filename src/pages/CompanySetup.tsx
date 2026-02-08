import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Business as BusinessIcon,
  PersonAdd as PersonAddIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
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
    registrationNumber: defaultCompanyContext.registrationNumber,
    gstNumber: defaultCompanyContext.gstNumber,
    tagline: defaultCompanyContext.tagline,
    foundedYear: defaultCompanyContext.foundedYear,
    legalEntityType: defaultCompanyContext.legalEntityType,
  });

  const [signatory, setSignatory] = useState({
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  });

  const [headerSettings, setHeaderSettings] = useState({
    showLogo: defaultCompanyContext.headerSettings.showLogo,
    showCompanyName: defaultCompanyContext.headerSettings.showCompanyName,
    showReleaseDate: defaultCompanyContext.headerSettings.showReleaseDate,
    headerTagline: defaultCompanyContext.headerSettings.headerTagline,
    headerBgColor: defaultCompanyContext.headerSettings.headerBgColor,
  });

  const [footerSettings, setFooterSettings] = useState({
    showAddress: defaultCompanyContext.footerSettings.showAddress,
    showContactDetails: defaultCompanyContext.footerSettings.showContactDetails,
    customFooterText: defaultCompanyContext.footerSettings.customFooterText,
    footerBgColor: defaultCompanyContext.footerSettings.footerBgColor,
  });

  const handleCompanyChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSignatoryChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatory((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleHeaderToggle = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSettings((prev) => ({ ...prev, [name]: e.target.checked }));
  };

  const handleHeaderChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSettings((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleFooterToggle = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterSettings((prev) => ({ ...prev, [name]: e.target.checked }));
  };

  const handleFooterChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterSettings((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Company Setup
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure your company information for generated documents
      </Typography>

      {/* ATS Call-to-Action Banner */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #00897B 0%, #00695C 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <PersonAddIcon sx={{ fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Ready to Hire Your Next Star?
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
          Use our ATS app to manage candidates and streamline your hiring process. Post jobs,
          track applications, and find the perfect fit for your team.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: '#00897B',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
            endIcon={<OpenInNewIcon />}
          >
            Go to Hiring Portal
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Paper>

      {/* Company Logo Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Company Logo
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            <BusinessIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Upload Logo
            </Button>
            <Button variant="text" color="error">
              Remove
            </Button>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              Recommended: 200x200px, PNG or JPG
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Company Information Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Company Information
        </Typography>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
        >
          <TextField
            label="Company Name"
            value={company.name}
            onChange={handleCompanyChange('name')}
            size="small"
            required
          />
          <TextField
            label="Industry"
            value={company.industry}
            onChange={handleCompanyChange('industry')}
            size="small"
          />
          <TextField
            label="Company Size"
            value={company.size}
            onChange={handleCompanyChange('size')}
            size="small"
          />
          <TextField
            label="Website"
            value={company.website}
            onChange={handleCompanyChange('website')}
            size="small"
          />
          <TextField
            label="Email"
            value={company.email}
            onChange={handleCompanyChange('email')}
            size="small"
          />
          <TextField
            label="Phone"
            value={company.phone}
            onChange={handleCompanyChange('phone')}
            size="small"
          />
          <TextField
            label="Registration Number (CIN)"
            value={company.registrationNumber}
            onChange={handleCompanyChange('registrationNumber')}
            size="small"
          />
          <TextField
            label="GST Number"
            value={company.gstNumber}
            onChange={handleCompanyChange('gstNumber')}
            size="small"
          />
          <TextField
            label="Founded Year"
            value={company.foundedYear}
            onChange={handleCompanyChange('foundedYear')}
            size="small"
          />
          <TextField
            label="Legal Entity Type"
            value={company.legalEntityType}
            onChange={handleCompanyChange('legalEntityType')}
            size="small"
            placeholder="e.g., Pvt. Ltd., LLP"
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <TextField
              label="Address"
              value={company.address}
              onChange={handleCompanyChange('address')}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <TextField
              label="Company Tagline / Motto"
              value={company.tagline}
              onChange={handleCompanyChange('tagline')}
              size="small"
              fullWidth
              placeholder="e.g., Innovating for Tomorrow"
            />
          </Box>
        </Box>
      </Paper>

      {/* Default Signatory Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Default Signatory
        </Typography>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
        >
          <TextField
            label="Signatory Name"
            value={signatory.name}
            onChange={handleSignatoryChange('name')}
            size="small"
            required
          />
          <TextField
            label="Signatory Title"
            value={signatory.title}
            onChange={handleSignatoryChange('title')}
            size="small"
            required
          />
          <TextField
            label="Signatory Email"
            value={signatory.email}
            onChange={handleSignatoryChange('email')}
            size="small"
            type="email"
          />
          <TextField
            label="Signatory Phone"
            value={signatory.phone}
            onChange={handleSignatoryChange('phone')}
            size="small"
          />
        </Box>
      </Paper>

      {/* Document Header Settings Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Document Header Settings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={headerSettings.showLogo}
                  onChange={handleHeaderToggle('showLogo')}
                />
              }
              label="Show Company Logo"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={headerSettings.showCompanyName}
                  onChange={handleHeaderToggle('showCompanyName')}
                />
              }
              label="Show Company Name"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={headerSettings.showReleaseDate}
                  onChange={handleHeaderToggle('showReleaseDate')}
                />
              }
              label="Show Release Date"
            />
          </Box>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
          >
            <TextField
              label="Header Tagline"
              value={headerSettings.headerTagline}
              onChange={handleHeaderChange('headerTagline')}
              size="small"
              placeholder="Custom text below company name"
            />
            <TextField
              label="Header Background Color"
              value={headerSettings.headerBgColor}
              onChange={handleHeaderChange('headerBgColor')}
              size="small"
              placeholder="#FFFFFF"
            />
          </Box>
        </Box>
      </Paper>

      {/* Document Footer Settings Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Document Footer Settings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={footerSettings.showAddress}
                  onChange={handleFooterToggle('showAddress')}
                />
              }
              label="Show Address"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={footerSettings.showContactDetails}
                  onChange={handleFooterToggle('showContactDetails')}
                />
              }
              label="Show Contact Details"
            />
          </Box>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
          >
            <TextField
              label="Custom Footer Text"
              value={footerSettings.customFooterText}
              onChange={handleFooterChange('customFooterText')}
              size="small"
              multiline
              rows={2}
              placeholder="Legal disclaimers, confidentiality notices, etc."
            />
            <TextField
              label="Footer Background Color"
              value={footerSettings.footerBgColor}
              onChange={handleFooterChange('footerBgColor')}
              size="small"
              placeholder="#F5F5F5"
            />
          </Box>
        </Box>
      </Paper>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" size="large">
          Save Company Information
        </Button>
      </Box>
    </Box>
  );
};

export default CompanySetup;
