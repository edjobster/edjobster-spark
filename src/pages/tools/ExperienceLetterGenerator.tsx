import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { experienceLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_full_name: '',
  employee_first_name: '',
  employee_id: '',
  department: '',
  joining_designation: '',
  last_designation: '',
  date_of_joining: '',
  last_working_date: '',
  tenure: '',
  issue_date: '',
  reference_number: '',
  responsibilities: '',
  performance_summary: '',
  company_name: defaultCompanyContext.companyName,
  company_address: defaultCompanyContext.companyAddress,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Enter employee details including joining and last designations.',
  'Specify the employment dates to calculate tenure.',
  'Add key responsibilities held during the tenure.',
  'Provide a brief performance summary.',
  'Review signatory and company information.',
  'Click "Generate Experience Letter" to create the document.',
];

const ExperienceLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | string[]) => {
    let updatedData = { ...formData, [name]: value };
    
    // Auto-calculate tenure
    if (name === 'date_of_joining' || name === 'last_working_date') {
      const joinDate = new Date(updatedData.date_of_joining);
      const lastDate = new Date(updatedData.last_working_date);
      
      if (joinDate && lastDate && lastDate > joinDate) {
        const diffTime = Math.abs(lastDate.getTime() - joinDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        
        let tenure = '';
        if (years > 0) tenure += `${years} year${years > 1 ? 's' : ''}`;
        if (months > 0) tenure += `${years > 0 ? ' and ' : ''}${months} month${months > 1 ? 's' : ''}`;
        
        updatedData = { ...updatedData, tenure };
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
    let document = experienceLetterTemplate;
    
    document = document.replace(/\{\{employee_full_name\}\}/g, formData.employee_full_name || '[Employee Name]');
    document = document.replace(/\{\{employee_first_name\}\}/g, formData.employee_first_name || '[First Name]');
    document = document.replace(/\{\{employee_id\}\}/g, formData.employee_id || '[Employee ID]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{joining_designation\}\}/g, formData.joining_designation || '[Joining Designation]');
    document = document.replace(/\{\{last_designation\}\}/g, formData.last_designation || '[Last Designation]');
    document = document.replace(/\{\{date_of_joining\}\}/g, formData.date_of_joining || '[Joining Date]');
    document = document.replace(/\{\{last_working_date\}\}/g, formData.last_working_date || '[Last Working Date]');
    document = document.replace(/\{\{tenure\}\}/g, formData.tenure || '[Tenure]');
    document = document.replace(/\{\{issue_date\}\}/g, formData.issue_date || '[Issue Date]');
    document = document.replace(/\{\{reference_number\}\}/g, formData.reference_number || 'EXP-2024-001');
    document = document.replace(/\{\{responsibilities\}\}/g, formData.responsibilities || '[Key responsibilities]');
    document = document.replace(/\{\{performance_summary\}\}/g, formData.performance_summary || 'a dedicated and hardworking professional');
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{company_address\}\}/g, formData.company_address);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Experience Letter Generator"
      description="Create experience certificates for departing employees with tenure details."
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
        </Box>
      </FormSection>

      <FormSection title="Employment Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Designation at Joining"
            name="joining_designation"
            value={formData.joining_designation}
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
            label="Tenure"
            name="tenure"
            value={formData.tenure}
            onChange={handleFieldChange}
            helperText="Auto-calculated from dates"
          />
        </Box>
      </FormSection>

      <FormSection title="Certificate Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Issue Date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Reference Number"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleFieldChange}
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Key Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleFieldChange}
              type="textarea"
              rows={3}
              helperText="List main responsibilities and achievements"
            />
          </Box>
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Performance Summary"
              name="performance_summary"
              value={formData.performance_summary}
              onChange={handleFieldChange}
              helperText="e.g., a dedicated and reliable professional"
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Company Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleFieldChange}
            required
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Company Address"
              name="company_address"
              value={formData.company_address}
              onChange={handleFieldChange}
              type="textarea"
              rows={2}
            />
          </Box>
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

export default ExperienceLetterGenerator;
