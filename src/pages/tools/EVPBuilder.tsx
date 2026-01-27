import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import { evpBuilderTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  company_name: defaultCompanyContext.companyName, version: '1.0', creation_date: '',
  company_mission: '', company_vision: '', core_values: '',
  evp_statement: '',
  compensation_pillar: '- Competitive salary benchmarked to market\n- Performance bonuses\n- Stock options/ESOP\n- Comprehensive health insurance',
  career_pillar: '- Clear career progression paths\n- Learning & development budget\n- Mentorship programs\n- Internal mobility opportunities',
  work_life_pillar: '- Flexible work arrangements\n- Generous PTO policy\n- Mental health support\n- Family-friendly policies',
  culture_pillar: '- Inclusive and diverse environment\n- Regular team events\n- Open communication culture\n- Recognition programs',
  purpose_pillar: '- Meaningful work with impact\n- Sustainability initiatives\n- Community involvement\n- Innovation-driven environment',
  differentiators: '', talent_personas: '', key_messages: '', tagline: '', elevator_pitch: '',
  signatory_name: defaultCompanyContext.signatory.name, signatory_title: defaultCompanyContext.signatory.title,
};

const howToUse = ['Define your company mission and values.', 'Craft your EVP statement.', 'Customize each EVP pillar.', 'Add differentiators and messaging.', 'Click "Generate EVP".'];

const EVPBuilder: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleFieldChange = (name: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [name]: value }));
  const handleClear = () => setFormData(initialFormData);

  const handleGenerate = useCallback(() => {
    let doc = evpBuilderTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') doc = doc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`);
    });
    return doc;
  }, [formData]);

  return (
    <ToolPageLayout title="EVP Builder" description="Build your Employee Value Proposition with key messaging and differentiators." howToUse={howToUse} formData={formData} onGenerate={handleGenerate} onClear={handleClear}>
      <FormSection title="Company Foundation">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Company Name" name="company_name" value={formData.company_name} onChange={handleFieldChange} required />
          <FormField label="Creation Date" name="creation_date" value={formData.creation_date} onChange={handleFieldChange} type="date" />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Mission" name="company_mission" value={formData.company_mission} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Vision" name="company_vision" value={formData.company_vision} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Core Values" name="core_values" value={formData.core_values} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
        </Box>
      </FormSection>
      <FormSection title="EVP Statement">
        <FormField label="Your Promise to Employees" name="evp_statement" value={formData.evp_statement} onChange={handleFieldChange} type="textarea" rows={3} />
      </FormSection>
      <FormSection title="EVP Pillars">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormField label="Compensation & Benefits" name="compensation_pillar" value={formData.compensation_pillar} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Career Growth" name="career_pillar" value={formData.career_pillar} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Work-Life Balance" name="work_life_pillar" value={formData.work_life_pillar} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Culture" name="culture_pillar" value={formData.culture_pillar} onChange={handleFieldChange} type="textarea" rows={3} />
        </Box>
      </FormSection>
      <FormSection title="Messaging">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Tagline" name="tagline" value={formData.tagline} onChange={handleFieldChange} />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Elevator Pitch" name="elevator_pitch" value={formData.elevator_pitch} onChange={handleFieldChange} type="textarea" rows={3} /></Box>
        </Box>
      </FormSection>
    </ToolPageLayout>
  );
};

export default EVPBuilder;
