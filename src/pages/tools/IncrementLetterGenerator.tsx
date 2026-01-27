import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { incrementLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_full_name: '',
  employee_first_name: '',
  employee_id: '',
  department: '',
  effective_date: '',
  reference_number: '',
  current_ctc: '',
  revised_ctc: '',
  increment_amount: '',
  increment_percentage: '',
  company_name: defaultCompanyContext.companyName,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Enter employee details including current designation.',
  'Specify the effective date for the increment.',
  'Enter current and revised CTC amounts.',
  'The system will calculate increment amount and percentage.',
  'Review signatory information.',
  'Click "Generate Increment Letter" to create the document.',
];

const IncrementLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | string[]) => {
    let updatedData = { ...formData, [name]: value };
    
    // Auto-calculate increment details
    if (name === 'current_ctc' || name === 'revised_ctc') {
      const current = parseFloat(updatedData.current_ctc.replace(/[^0-9.]/g, '')) || 0;
      const revised = parseFloat(updatedData.revised_ctc.replace(/[^0-9.]/g, '')) || 0;
      
      if (current > 0 && revised > current) {
        const incrementAmount = revised - current;
        const incrementPercentage = ((incrementAmount / current) * 100).toFixed(1);
        updatedData = {
          ...updatedData,
          increment_amount: `₹${incrementAmount.toLocaleString()}`,
          increment_percentage: incrementPercentage,
        };
      }
    }
    
    setFormData(updatedData);
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
    let document = incrementLetterTemplate;
    
    document = document.replace(/\{\{employee_full_name\}\}/g, formData.employee_full_name || '[Employee Name]');
    document = document.replace(/\{\{employee_first_name\}\}/g, formData.employee_first_name || '[First Name]');
    document = document.replace(/\{\{employee_id\}\}/g, formData.employee_id || '[Employee ID]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{effective_date\}\}/g, formData.effective_date || '[Effective Date]');
    document = document.replace(/\{\{reference_number\}\}/g, formData.reference_number || 'INC-2024-001');
    document = document.replace(/\{\{current_ctc\}\}/g, formData.current_ctc || '[Current CTC]');
    document = document.replace(/\{\{revised_ctc\}\}/g, formData.revised_ctc || '[Revised CTC]');
    document = document.replace(/\{\{increment_amount\}\}/g, formData.increment_amount || '[Increment Amount]');
    document = document.replace(/\{\{increment_percentage\}\}/g, formData.increment_percentage || '[Percentage]');
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Increment Letter Generator"
      description="Generate salary revision letters with updated compensation and effective dates."
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
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleFieldChange}
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Increment Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Reference Number"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleFieldChange}
          />
          <FormField
            label="Effective Date"
            name="effective_date"
            value={formData.effective_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Compensation">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Current Annual CTC"
            name="current_ctc"
            value={formData.current_ctc}
            onChange={handleFieldChange}
            required
            helperText="e.g., ₹10,00,000"
          />
          <FormField
            label="Revised Annual CTC"
            name="revised_ctc"
            value={formData.revised_ctc}
            onChange={handleFieldChange}
            required
            helperText="e.g., ₹12,00,000"
          />
          <FormField
            label="Increment Amount"
            name="increment_amount"
            value={formData.increment_amount}
            onChange={handleFieldChange}
            helperText="Auto-calculated"
          />
          <FormField
            label="Increment Percentage"
            name="increment_percentage"
            value={formData.increment_percentage}
            onChange={handleFieldChange}
            helperText="Auto-calculated"
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

export default IncrementLetterGenerator;
