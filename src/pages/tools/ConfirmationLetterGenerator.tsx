import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { confirmationLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_full_name: '',
  employee_first_name: '',
  employee_id: '',
  department: '',
  role_title: '',
  date_of_joining: '',
  confirmation_date: '',
  confirmation_effective_date: '',
  reference_number: '',
  appointment_letter_date: '',
  revised_ctc: '',
  notice_period: '60',
  company_name: defaultCompanyContext.companyName,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Enter the employee details including ID and department.',
  'Specify the original joining date and confirmation effective date.',
  'Add any revised compensation if applicable.',
  'Update notice period if different from default.',
  'Review signatory information.',
  'Click "Generate Confirmation Letter" to create the document.',
];

const ConfirmationLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    let document = confirmationLetterTemplate;
    
    document = document.replace(/\{\{employee_full_name\}\}/g, formData.employee_full_name || '[Employee Name]');
    document = document.replace(/\{\{employee_first_name\}\}/g, formData.employee_first_name || '[First Name]');
    document = document.replace(/\{\{employee_id\}\}/g, formData.employee_id || '[Employee ID]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{role_title\}\}/g, formData.role_title || '[Role]');
    document = document.replace(/\{\{date_of_joining\}\}/g, formData.date_of_joining || '[Joining Date]');
    document = document.replace(/\{\{confirmation_date\}\}/g, formData.confirmation_date || '[Date]');
    document = document.replace(/\{\{confirmation_effective_date\}\}/g, formData.confirmation_effective_date || '[Effective Date]');
    document = document.replace(/\{\{reference_number\}\}/g, formData.reference_number || 'CNF-2024-001');
    document = document.replace(/\{\{appointment_letter_date\}\}/g, formData.appointment_letter_date || '[Appointment Date]');
    document = document.replace(/\{\{revised_ctc\}\}/g, formData.revised_ctc || '[As per current structure]');
    document = document.replace(/\{\{notice_period\}\}/g, formData.notice_period);
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Confirmation Letter Generator"
      description="Create confirmation letters for employees completing their probation period."
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
            label="Designation"
            name="role_title"
            value={formData.role_title}
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

      <FormSection title="Confirmation Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Reference Number"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleFieldChange}
          />
          <FormField
            label="Confirmation Letter Date"
            name="confirmation_date"
            value={formData.confirmation_date}
            onChange={handleFieldChange}
            type="date"
            required
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
            label="Confirmation Effective Date"
            name="confirmation_effective_date"
            value={formData.confirmation_effective_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Original Appointment Letter Date"
            name="appointment_letter_date"
            value={formData.appointment_letter_date}
            onChange={handleFieldChange}
            type="date"
          />
        </Box>
      </FormSection>

      <FormSection title="Revised Terms">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Revised Annual CTC (if applicable)"
            name="revised_ctc"
            value={formData.revised_ctc}
            onChange={handleFieldChange}
            helperText="Leave blank if no change"
          />
          <FormField
            label="Notice Period (days)"
            name="notice_period"
            value={formData.notice_period}
            onChange={handleFieldChange}
            type="number"
          />
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

export default ConfirmationLetterGenerator;
