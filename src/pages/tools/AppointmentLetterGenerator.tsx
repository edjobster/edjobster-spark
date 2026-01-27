import React, { useState, useCallback } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { appointmentLetterTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_full_name: '',
  employee_first_name: '',
  employee_address: '',
  appointment_date: '',
  reference_number: '',
  company_name: defaultCompanyContext.companyName,
  role_title: '',
  department: '',
  reporting_manager: '',
  work_location: '',
  work_model: 'Onsite',
  start_date: '',
  probation_months: '6',
  ctc_amount: '',
  work_days: '5',
  work_hours: '8',
  work_timing: '9:00 AM - 6:00 PM',
  weekly_off: ['Saturday', 'Sunday'],
  notice_period_probation: '15',
  notice_period_confirmed: '60',
  governing_law_jurisdiction: 'Bangalore, Karnataka, India',
  background_check_consent: true,
  arbitration_clause: true,
  include_annexure: true,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Enter employee personal details including full name and address.',
  'Fill in the appointment date and reference number.',
  'Specify role details, reporting structure, and work location.',
  'Configure probation period and notice period terms.',
  'Toggle legal clauses like background check consent and arbitration.',
  'Review and update signatory information if needed.',
  'Click "Generate Appointment Letter" to create the document.',
];

const workModelOptions = [
  { value: 'Onsite', label: 'Onsite' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
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

const AppointmentLetterGenerator: React.FC = () => {
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
    let document = appointmentLetterTemplate;
    
    // Replace all placeholders
    document = document.replace(/\{\{employee_full_name\}\}/g, formData.employee_full_name || '[Employee Name]');
    document = document.replace(/\{\{employee_first_name\}\}/g, formData.employee_first_name || '[First Name]');
    document = document.replace(/\{\{employee_address\}\}/g, formData.employee_address || '[Address]');
    document = document.replace(/\{\{appointment_date\}\}/g, formData.appointment_date || '[Date]');
    document = document.replace(/\{\{reference_number\}\}/g, formData.reference_number || 'APT-2024-001');
    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{role_title\}\}/g, formData.role_title || '[Role]');
    document = document.replace(/\{\{department\}\}/g, formData.department || '[Department]');
    document = document.replace(/\{\{reporting_manager\}\}/g, formData.reporting_manager || '[Manager]');
    document = document.replace(/\{\{work_location\}\}/g, formData.work_location || '[Location]');
    document = document.replace(/\{\{work_model\}\}/g, formData.work_model);
    document = document.replace(/\{\{start_date\}\}/g, formData.start_date || '[Start Date]');
    document = document.replace(/\{\{probation_months\}\}/g, formData.probation_months);
    document = document.replace(/\{\{ctc_amount\}\}/g, formData.ctc_amount || '[CTC]');
    document = document.replace(/\{\{work_days\}\}/g, formData.work_days);
    document = document.replace(/\{\{work_hours\}\}/g, formData.work_hours);
    document = document.replace(/\{\{work_timing\}\}/g, formData.work_timing);
    document = document.replace(/\{\{weekly_off\}\}/g, formData.weekly_off.join(', '));
    document = document.replace(/\{\{notice_period_probation\}\}/g, formData.notice_period_probation);
    document = document.replace(/\{\{notice_period_confirmed\}\}/g, formData.notice_period_confirmed);
    document = document.replace(/\{\{governing_law_jurisdiction\}\}/g, formData.governing_law_jurisdiction);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);
    document = document.replace(/\{\{signatory_email\}\}/g, formData.signatory.email);
    document = document.replace(/\{\{signatory_phone\}\}/g, formData.signatory.phone);

    // Handle conditional sections
    if (!formData.background_check_consent) {
      document = document.replace(/\{\{#if background_check_consent\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if background_check_consent\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    if (!formData.arbitration_clause) {
      document = document.replace(/\{\{#if arbitration_clause\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if arbitration_clause\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    if (!formData.include_annexure) {
      document = document.replace(/\{\{#if include_annexure\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if include_annexure\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Appointment Letter Generator"
      description="Generate legally compliant appointment letters with all required clauses and terms."
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
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Employee Address"
              name="employee_address"
              value={formData.employee_address}
              onChange={handleFieldChange}
              type="textarea"
              rows={2}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Appointment Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Appointment Date"
            name="appointment_date"
            value={formData.appointment_date}
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
        </Box>
      </FormSection>

      <FormSection title="Role & Work Details">
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
            label="Start Date"
            name="start_date"
            value={formData.start_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Annual CTC"
            name="ctc_amount"
            value={formData.ctc_amount}
            onChange={handleFieldChange}
            required
          />
        </Box>
      </FormSection>

      <FormSection title="Working Hours">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
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
          <FormField
            label="Weekly Off"
            name="weekly_off"
            value={formData.weekly_off}
            onChange={handleFieldChange}
            type="multiselect"
            options={weeklyOffOptions}
          />
        </Box>
      </FormSection>

      <FormSection title="Terms & Notice Period">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Probation Period (months)"
            name="probation_months"
            value={formData.probation_months}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Notice Period - Probation (days)"
            name="notice_period_probation"
            value={formData.notice_period_probation}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Notice Period - Confirmed (days)"
            name="notice_period_confirmed"
            value={formData.notice_period_confirmed}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Governing Law Jurisdiction"
            name="governing_law_jurisdiction"
            value={formData.governing_law_jurisdiction}
            onChange={handleFieldChange}
          />
        </Box>
      </FormSection>

      <FormSection title="Legal Clauses">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.background_check_consent}
                onChange={handleToggleChange('background_check_consent')}
                color="primary"
              />
            }
            label="Include Background Check Consent Clause"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.arbitration_clause}
                onChange={handleToggleChange('arbitration_clause')}
                color="primary"
              />
            }
            label="Include Arbitration Clause"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.include_annexure}
                onChange={handleToggleChange('include_annexure')}
                color="primary"
              />
            }
            label="Include Compensation Annexure"
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

export default AppointmentLetterGenerator;
