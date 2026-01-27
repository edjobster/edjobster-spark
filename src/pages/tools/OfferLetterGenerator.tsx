import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { offerLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  candidate_full_name: '',
  candidate_first_name: '',
  candidate_address: '',
  offer_date: '',
  acceptance_deadline: '',
  company_name: defaultCompanyContext.companyName,
  role_title: '',
  department: '',
  reporting_manager: '',
  work_location: '',
  work_model: 'Onsite',
  employment_type: 'Full-time',
  start_date: '',
  probation_months: '3',
  ctc_amount: '',
  work_days: '5',
  work_hours: '8',
  work_timing: '9:00 AM - 6:00 PM',
  weekly_off: ['Saturday', 'Sunday'],
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Fill in the candidate details including full name and address.',
  'Enter the role information such as job title, department, and reporting manager.',
  'Specify compensation details including CTC and start date.',
  'Add working hours and weekly off preferences.',
  'Review signatory details or update if needed.',
  'Click "Generate Offer Letter" to create the document.',
  'Copy or download the generated letter.',
];

const workModelOptions = [
  { value: 'Onsite', label: 'Onsite' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const employmentTypeOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
];

const weeklyOffOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const OfferLetterGenerator: React.FC = () => {
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
    let document = offerLetterTemplate;
    
    // Replace placeholders
    document = document.replace(/\{\{candidate_full_name\}\}/g, formData.candidate_full_name || '[Candidate Name]');
    document = document.replace(/\{\{candidate_first_name\}\}/g, formData.candidate_first_name || '[First Name]');
    document = document.replace(/\{\{candidate_address\}\}/g, formData.candidate_address || '[Address]');
    document = document.replace(/\{\{offer_date\}\}/g, formData.offer_date || '[Offer Date]');
    document = document.replace(/\{\{acceptance_deadline\}\}/g, formData.acceptance_deadline || '[Deadline]');
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name || '[Company Name]');
    document = document.replace(/\{\{role_title\}\}/g, formData.role_title || '[Role Title]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{reporting_manager\}\}/g, formData.reporting_manager || '[Manager]');
    document = document.replace(/\{\{work_location\}\}/g, formData.work_location || '[Location]');
    document = document.replace(/\{\{work_model\}\}/g, formData.work_model);
    document = document.replace(/\{\{employment_type\}\}/g, formData.employment_type);
    document = document.replace(/\{\{start_date\}\}/g, formData.start_date || '[Start Date]');
    document = document.replace(/\{\{probation_months\}\}/g, formData.probation_months);
    document = document.replace(/\{\{ctc_amount\}\}/g, formData.ctc_amount || '[CTC]');
    document = document.replace(/\{\{work_days\}\}/g, formData.work_days);
    document = document.replace(/\{\{work_hours\}\}/g, formData.work_hours);
    document = document.replace(/\{\{work_timing\}\}/g, formData.work_timing);
    document = document.replace(/\{\{weekly_off\}\}/g, formData.weekly_off.join(', '));
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);
    document = document.replace(/\{\{signatory_email\}\}/g, formData.signatory.email);
    document = document.replace(/\{\{signatory_phone\}\}/g, formData.signatory.phone);

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Offer Letter Generator"
      description="Create professional offer letters with compensation details, role information, and company branding."
      howToUse={howToUse}
      formData={formData}
      onGenerate={handleGenerate}
      onClear={handleClear}
    >
      <FormSection title="Candidate Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Candidate Full Name"
            name="candidate_full_name"
            value={formData.candidate_full_name}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Candidate First Name"
            name="candidate_first_name"
            value={formData.candidate_first_name}
            onChange={handleFieldChange}
            required
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Candidate Address"
              name="candidate_address"
              value={formData.candidate_address}
              onChange={handleFieldChange}
              type="textarea"
              rows={2}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Offer Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Offer Date"
            name="offer_date"
            value={formData.offer_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Acceptance Deadline"
            name="acceptance_deadline"
            value={formData.acceptance_deadline}
            onChange={handleFieldChange}
            type="date"
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Role Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Role Title"
            name="role_title"
            value={formData.role_title}
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
            label="Reporting Manager"
            name="reporting_manager"
            value={formData.reporting_manager}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Work Location"
            name="work_location"
            value={formData.work_location}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Work Model"
            name="work_model"
            value={formData.work_model}
            onChange={handleFieldChange}
            type="select"
            options={workModelOptions}
          />
          <FormField
            label="Employment Type"
            name="employment_type"
            value={formData.employment_type}
            onChange={handleFieldChange}
            type="select"
            options={employmentTypeOptions}
          />
        </Box>
      </FormSection>

      <FormSection title="Compensation & Schedule">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Start Date"
            name="start_date"
            value={formData.start_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Probation Period (months)"
            name="probation_months"
            value={formData.probation_months}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Annual CTC"
            name="ctc_amount"
            value={formData.ctc_amount}
            onChange={handleFieldChange}
            required
            helperText="e.g., ₹12,00,000 or $100,000"
          />
          <FormField
            label="Work Days per Week"
            name="work_days"
            value={formData.work_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Work Hours per Day"
            name="work_hours"
            value={formData.work_hours}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Work Timing"
            name="work_timing"
            value={formData.work_timing}
            onChange={handleFieldChange}
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Weekly Off"
              name="weekly_off"
              value={formData.weekly_off}
              onChange={handleFieldChange}
              type="multiselect"
              options={weeklyOffOptions}
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

export default OfferLetterGenerator;
