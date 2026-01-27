import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import { brandingPostTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  company_name: defaultCompanyContext.companyName, platform: 'LinkedIn', post_type: 'Hiring Announcement', campaign_name: '', post_date: '',
  headline: '', main_copy: '', call_to_action: 'Apply now! Link in comments 👇', hashtags: '#Hiring #Careers #JoinOurTeam',
  visual_description: '', logo_placement: 'Bottom right corner', brand_colors: 'Primary teal, white background',
  linkedin_version: '', instagram_version: '', twitter_version: '',
  response_guidelines: '', talking_points: '',
  signatory_name: defaultCompanyContext.signatory.name, signatory_title: defaultCompanyContext.signatory.title, creation_date: '',
};

const platformOptions = [{ value: 'LinkedIn', label: 'LinkedIn' }, { value: 'Instagram', label: 'Instagram' }, { value: 'Twitter/X', label: 'Twitter/X' }, { value: 'Multi-platform', label: 'Multi-platform' }];
const postTypeOptions = [{ value: 'Hiring Announcement', label: 'Hiring Announcement' }, { value: 'Company Culture', label: 'Company Culture' }, { value: 'Employee Spotlight', label: 'Employee Spotlight' }, { value: 'Achievement/Award', label: 'Achievement/Award' }, { value: 'Event Promotion', label: 'Event Promotion' }];

const howToUse = ['Select platform and post type.', 'Write your headline and main copy.', 'Add call-to-action and hashtags.', 'Click "Generate Branding Post".'];

const BrandingPostBuilder: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleFieldChange = (name: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [name]: value }));
  const handleClear = () => setFormData(initialFormData);

  const handleGenerate = useCallback(() => {
    let doc = brandingPostTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') doc = doc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`);
    });
    return doc;
  }, [formData]);

  return (
    <ToolPageLayout title="Employer Branding Post Builder" description="Create engaging social media content for employer branding and recruitment." howToUse={howToUse} formData={formData} onGenerate={handleGenerate} onClear={handleClear}>
      <FormSection title="Post Settings">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Platform" name="platform" value={formData.platform} onChange={handleFieldChange} type="select" options={platformOptions} />
          <FormField label="Post Type" name="post_type" value={formData.post_type} onChange={handleFieldChange} type="select" options={postTypeOptions} />
          <FormField label="Campaign Name" name="campaign_name" value={formData.campaign_name} onChange={handleFieldChange} />
          <FormField label="Post Date" name="post_date" value={formData.post_date} onChange={handleFieldChange} type="date" />
        </Box>
      </FormSection>
      <FormSection title="Post Content">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormField label="Headline/Hook" name="headline" value={formData.headline} onChange={handleFieldChange} helperText="Attention-grabbing first line" />
          <FormField label="Main Copy" name="main_copy" value={formData.main_copy} onChange={handleFieldChange} type="textarea" rows={5} />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <FormField label="Call to Action" name="call_to_action" value={formData.call_to_action} onChange={handleFieldChange} />
            <FormField label="Hashtags" name="hashtags" value={formData.hashtags} onChange={handleFieldChange} />
          </Box>
        </Box>
      </FormSection>
      <FormSection title="Visual Guidelines">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Visual Description" name="visual_description" value={formData.visual_description} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
          <FormField label="Logo Placement" name="logo_placement" value={formData.logo_placement} onChange={handleFieldChange} />
          <FormField label="Brand Colors" name="brand_colors" value={formData.brand_colors} onChange={handleFieldChange} />
        </Box>
      </FormSection>
    </ToolPageLayout>
  );
};

export default BrandingPostBuilder;
