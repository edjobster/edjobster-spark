import React, { useState, useCallback } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { relievingLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_full_name: '',
  employee_first_name: '',
  employee_id: '',
  department: '',
  last_designation: '',
  date_of_joining: '',
  last_working_date: '',
  relieving_date: '',
  reference_number: '',
  separation_reason: 'Resignation',
  all_clearances_done: true,
  pending_clearances: '',
  company_name: defaultCompanyContext.companyName,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Enter the departing employee details.',
  'Specify joining date and last working date.',
  'Select the reason for separation.',
  'Confirm clearance status.',
  'Review signatory information.',
  'Click "Generate Relieving Letter" to create the document.',
];

const separationReasonOptions = [
  { value: 'Resignation', label: 'Resignation' },
  { value: 'Mutual Separation', label: 'Mutual Separation' },
  { value: 'End of Contract', label: 'End of Contract' },
  { value: 'Retirement', label: 'Retirement' },
];

const RelievingLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.checked,
    }));
  };

  const handleSignatoryChange = (field: keyof typeof formData.signatory, value: string) => {
    setFormData((prev) => ({
      ...prev,
      signatory: {
        ...prev.signatory,
        [field]: value,
      },
    }));
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleGenerate = useCallback(() => {
    let document = relievingLetterTemplate;
    
    document = document.replace(/\{\{employee_full_name\}\}/g, formData.employee_full_name || '[Employee Name]');
    document = document.replace(/\{\{employee_first_name\}\}/g, formData.employee_first_name || '[First Name]');
    document = document.replace(/\{\{employee_id\}\}/g, formData.employee_id || '[Employee ID]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{last_designation\}\}/g, formData.last_designation || '[Designation]');
    document = document.replace(/\{\{date_of_joining\}\}/g, formData.date_of_joining || '[Joining Date]');
    document = document.replace(/\{\{last_working_date\}\}/g, formData.last_working_date || '[Last Working Date]');
    document = document.replace(/\{\{relieving_date\}\}/g, formData.relieving_date || '[Relieving Date]');
    document = document.replace(/\{\{reference_number\}\}/g, formData.reference_number || 'REL-2024-001');
    document = document.replace(/\{\{separation_reason\}\}/g, formData.separation_reason);
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);

    // Handle conditional clearance section
    if (formData.all_clearances_done) {
      document = document.replace(/\{\{#if all_clearances_done\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
      document = document.replace(/\{\{#else\}\}[\s\S]*?\{\{\/else\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if all_clearances_done\}\}[\s\S]*?\{\{#else\}\}/g, '');
      document = document.replace(/\{\{\/else\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
      document = document.replace(/\{\{pending_clearances\}\}/g, formData.pending_clearances || '[Pending items]');
    }

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Relieving Letter Generator"
      description="Generate relieving letters confirming employment termination and clearances."
      howToUse={howToUse}
      formData={formData}
      onGenerate={handleGenerate}
      onClear={handleClear}
    >
      <FormSection title="Employee Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Employee Full Name"
            name="employee_full_name"
            value={formData.employee_full_name}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Employee First Name"
            name="employee_first_name"
            value={formData.employee_first_name}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Employee ID"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Last Designation"
            name="last_designation"
            value={formData.last_designation}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleFieldChange}
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Separation Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Reference Number"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleFieldChange}
          />
          <FormField
            label="Reason for Separation"
            name="separation_reason"
            value={formData.separation_reason}
            onChange={handleFieldChange}
            type="select"
            options={separationReasonOptions}
          />
          <FormField
            label="Date of Joining"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Last Working Date"
            name="last_working_date"
            value={formData.last_working_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Relieving Letter Date"
            name="relieving_date"
            value={formData.relieving_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Clearance Status">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.all_clearances_done}
                onChange={handleToggleChange('all_clearances_done')}
                color="primary"
              />
            }
            label="All clearances completed"
          />
          {!formData.all_clearances_done && (
            <FormField
              label="Pending Clearances"
              name="pending_clearances"
              value={formData.pending_clearances}
              onChange={handleFieldChange}
              type="textarea"
              rows={2}
              helperText="List any pending clearances or dues"
            />
          )}
        </Box>
      </FormSection>

      <FormSection title="Signatory">
        <SignatorySection
          signatory={formData.signatory}
          onChange={handleSignatoryChange}
        />
      </FormSection>
    </ToolPageLayout>
  );
};

export default RelievingLetterGenerator;
