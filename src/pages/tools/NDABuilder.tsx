import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import { ndaTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  agreement_date: '',
  disclosing_party_name: defaultCompanyContext.companyName,
  disclosing_party_address: defaultCompanyContext.companyAddress,
  disclosing_party_signatory: defaultCompanyContext.signatory.name,
  disclosing_party_title: defaultCompanyContext.signatory.title,
  receiving_party_name: '',
  receiving_party_address: '',
  receiving_party_signatory: '',
  receiving_party_title: '',
  purpose: '',
  confidential_info_categories: '- Trade secrets and proprietary information\n- Business strategies and plans\n- Customer and vendor information\n- Technical data and specifications\n- Financial information',
  agreement_duration: '2 years',
  survival_period: '3 years',
  governing_law: 'India',
  dispute_resolution_clause: 'Arbitration in Bangalore, Karnataka under the Arbitration and Conciliation Act',
};

const howToUse = [
  'Enter the disclosing and receiving party details.',
  'Define the purpose of the NDA.',
  'Specify what constitutes confidential information.',
  'Set agreement duration and survival period.',
  'Click "Generate NDA" to create the document.',
];

const NDABuilder: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleFieldChange = (name: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [name]: value }));
  const handleClear = () => setFormData(initialFormData);

  const handleGenerate = useCallback(() => {
    let doc = ndaTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') doc = doc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`);
    });
    return doc;
  }, [formData]);

  return (
    <ToolPageLayout title="Non-Disclosure Agreement (NDA) Builder" description="Generate NDAs with confidentiality terms, duration, and legal provisions." howToUse={howToUse} formData={formData} onGenerate={handleGenerate} onClear={handleClear}>
      <FormSection title="Disclosing Party">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Party Name" name="disclosing_party_name" value={formData.disclosing_party_name} onChange={handleFieldChange} required />
          <FormField label="Signatory Name" name="disclosing_party_signatory" value={formData.disclosing_party_signatory} onChange={handleFieldChange} required />
          <FormField label="Signatory Title" name="disclosing_party_title" value={formData.disclosing_party_title} onChange={handleFieldChange} />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Address" name="disclosing_party_address" value={formData.disclosing_party_address} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
        </Box>
      </FormSection>
      <FormSection title="Receiving Party">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Party Name" name="receiving_party_name" value={formData.receiving_party_name} onChange={handleFieldChange} required />
          <FormField label="Signatory Name" name="receiving_party_signatory" value={formData.receiving_party_signatory} onChange={handleFieldChange} required />
          <FormField label="Signatory Title" name="receiving_party_title" value={formData.receiving_party_title} onChange={handleFieldChange} />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Address" name="receiving_party_address" value={formData.receiving_party_address} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
        </Box>
      </FormSection>
      <FormSection title="Agreement Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Agreement Date" name="agreement_date" value={formData.agreement_date} onChange={handleFieldChange} type="date" required />
          <FormField label="Duration" name="agreement_duration" value={formData.agreement_duration} onChange={handleFieldChange} />
          <FormField label="Survival Period" name="survival_period" value={formData.survival_period} onChange={handleFieldChange} />
          <FormField label="Governing Law" name="governing_law" value={formData.governing_law} onChange={handleFieldChange} />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Purpose" name="purpose" value={formData.purpose} onChange={handleFieldChange} type="textarea" rows={2} /></Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}><FormField label="Confidential Information Categories" name="confidential_info_categories" value={formData.confidential_info_categories} onChange={handleFieldChange} type="textarea" rows={4} /></Box>
        </Box>
      </FormSection>
    </ToolPageLayout>
  );
};

export default NDABuilder;
