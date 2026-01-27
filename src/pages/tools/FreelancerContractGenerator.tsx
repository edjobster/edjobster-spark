import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { freelancerContractTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  agreement_date: '',
  freelancer_name: '',
  freelancer_address: '',
  freelancer_email: '',
  freelancer_phone: '',
  client_representative: defaultCompanyContext.signatory.name,
  client_title: defaultCompanyContext.signatory.title,
  project_description: '',
  deliverables_list: '',
  start_date: '',
  end_date: '',
  milestones: '',
  total_fee: '',
  payment_structure: '50% upfront, 50% on completion',
  payment_terms: 'Net 15 days from invoice',
  payment_method: 'Bank Transfer',
  termination_notice: '14',
  jurisdiction: 'Bangalore, Karnataka',
  governing_law: 'India',
  company_name: defaultCompanyContext.companyName,
  company_address: defaultCompanyContext.companyAddress,
  signatory: defaultCompanyContext.signatory,
};

const howToUse = [
  'Enter freelancer contact details.',
  'Describe the project scope and deliverables.',
  'Set project timeline and milestones.',
  'Configure payment terms.',
  'Review legal clauses.',
  'Click "Generate Freelancer Contract" to create the document.',
];

const FreelancerContractGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignatoryChange = (field: keyof typeof formData.signatory, value: string) => {
    setFormData((prev) => ({ ...prev, signatory: { ...prev.signatory, [field]: value } }));
  };

  const handleClear = () => setFormData(initialFormData);

  const handleGenerate = useCallback(() => {
    let doc = freelancerContractTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        doc = doc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`);
      }
    });
    doc = doc.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    doc = doc.replace(/\{\{signatory_email\}\}/g, formData.signatory.email);
    return doc;
  }, [formData]);

  return (
    <ToolPageLayout title="Freelancer Contract Generator" description="Create freelancer agreements with project scope, payment terms, and deliverables." howToUse={howToUse} formData={formData} onGenerate={handleGenerate} onClear={handleClear}>
      <FormSection title="Freelancer Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Freelancer Name" name="freelancer_name" value={formData.freelancer_name} onChange={handleFieldChange} required />
          <FormField label="Email" name="freelancer_email" value={formData.freelancer_email} onChange={handleFieldChange} required />
          <FormField label="Phone" name="freelancer_phone" value={formData.freelancer_phone} onChange={handleFieldChange} />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField label="Address" name="freelancer_address" value={formData.freelancer_address} onChange={handleFieldChange} type="textarea" rows={2} />
          </Box>
        </Box>
      </FormSection>
      <FormSection title="Project Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Agreement Date" name="agreement_date" value={formData.agreement_date} onChange={handleFieldChange} type="date" required />
          <FormField label="Start Date" name="start_date" value={formData.start_date} onChange={handleFieldChange} type="date" required />
          <FormField label="End Date" name="end_date" value={formData.end_date} onChange={handleFieldChange} type="date" required />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField label="Project Description" name="project_description" value={formData.project_description} onChange={handleFieldChange} type="textarea" rows={3} />
          </Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField label="Deliverables" name="deliverables_list" value={formData.deliverables_list} onChange={handleFieldChange} type="textarea" rows={3} />
          </Box>
        </Box>
      </FormSection>
      <FormSection title="Payment Terms">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Total Fee" name="total_fee" value={formData.total_fee} onChange={handleFieldChange} required />
          <FormField label="Payment Structure" name="payment_structure" value={formData.payment_structure} onChange={handleFieldChange} />
          <FormField label="Payment Terms" name="payment_terms" value={formData.payment_terms} onChange={handleFieldChange} />
          <FormField label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleFieldChange} />
        </Box>
      </FormSection>
      <FormSection title="Signatory">
        <SignatorySection signatory={formData.signatory} onChange={handleSignatoryChange} />
      </FormSection>
    </ToolPageLayout>
  );
};

export default FreelancerContractGenerator;
