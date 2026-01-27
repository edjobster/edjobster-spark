import React, { useState, useCallback } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { leavePolicyTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  effective_date: '',
  version: '1.0',
  employee_scope: 'full-time',
  earned_leave_days: '18',
  earned_leave_accrual: 'Monthly (1.5 days per month)',
  earned_leave_carry_forward: 'Up to 30 days',
  earned_leave_encashment: 'Up to 15 days annually',
  sick_leave_days: '12',
  sick_leave_certificate_days: '3',
  sick_leave_carry_forward: 'Not allowed',
  casual_leave_days: '6',
  casual_leave_max_consecutive: '3',
  maternity_leave_enabled: true,
  maternity_leave_days: '182',
  maternity_leave_eligibility: 'Female employees with 80+ days of service',
  paternity_leave_enabled: true,
  paternity_leave_days: '15',
  paternity_leave_eligibility: 'Male employees',
  comp_off_validity: '30',
  comp_off_approval: 'Manager approval required',
  leave_application_system: 'HRMS Portal',
  advance_notice_days: '7',
  approval_authority: 'Reporting Manager',
  annual_holidays: '10-12',
  lwp_approval_authority: 'Department Head and HR',
  hr_contact: defaultCompanyContext.companyEmail,
  company_name: defaultCompanyContext.companyName,
  approval_date: '',
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Set the policy effective date and version.',
  'Configure leave entitlements for each leave type.',
  'Enable or disable maternity and paternity leave.',
  'Set up approval workflows and application processes.',
  'Review and update HR contact information.',
  'Click "Generate Leave Policy" to create the document.',
];

const employeeScopeOptions = [
  { value: 'full-time', label: 'Full-time employees only' },
  { value: 'all', label: 'All employees' },
  { value: 'permanent', label: 'Permanent employees only' },
];

const LeavePolicyGenerator: React.FC = () => {
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
    let document = leavePolicyTemplate;
    
    // Replace all placeholders
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        document = document.replace(regex, value || `[${key}]`);
      }
    });

    document = document.replace(/\{\{company_name\}\}/g, formData.company_name);
    document = document.replace(/\{\{signatory_name\}\}/g, formData.signatory.name);
    document = document.replace(/\{\{signatory_title\}\}/g, formData.signatory.title);

    // Handle conditional sections
    if (!formData.maternity_leave_enabled) {
      document = document.replace(/\{\{#if maternity_leave_enabled\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if maternity_leave_enabled\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    if (!formData.paternity_leave_enabled) {
      document = document.replace(/\{\{#if paternity_leave_enabled\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if paternity_leave_enabled\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="Leave Policy Generator"
      description="Create comprehensive leave policies with accrual rules and approval workflows."
      howToUse={howToUse}
      formData={formData}
      onGenerate={handleGenerate}
      onClear={handleClear}
    >
      <FormSection title="Policy Information">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Effective Date"
            name="effective_date"
            value={formData.effective_date}
            onChange={handleFieldChange}
            type="date"
            required
          />
          <FormField
            label="Version"
            name="version"
            value={formData.version}
            onChange={handleFieldChange}
          />
          <FormField
            label="Employee Scope"
            name="employee_scope"
            value={formData.employee_scope}
            onChange={handleFieldChange}
            type="select"
            options={employeeScopeOptions}
          />
        </Box>
      </FormSection>

      <FormSection title="Earned Leave (EL)">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Annual Entitlement (days)"
            name="earned_leave_days"
            value={formData.earned_leave_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Accrual Method"
            name="earned_leave_accrual"
            value={formData.earned_leave_accrual}
            onChange={handleFieldChange}
          />
          <FormField
            label="Carry Forward Limit"
            name="earned_leave_carry_forward"
            value={formData.earned_leave_carry_forward}
            onChange={handleFieldChange}
          />
          <FormField
            label="Encashment Policy"
            name="earned_leave_encashment"
            value={formData.earned_leave_encashment}
            onChange={handleFieldChange}
          />
        </Box>
      </FormSection>

      <FormSection title="Sick Leave (SL)">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Annual Entitlement (days)"
            name="sick_leave_days"
            value={formData.sick_leave_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Medical Certificate Required After (days)"
            name="sick_leave_certificate_days"
            value={formData.sick_leave_certificate_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Carry Forward"
            name="sick_leave_carry_forward"
            value={formData.sick_leave_carry_forward}
            onChange={handleFieldChange}
          />
        </Box>
      </FormSection>

      <FormSection title="Casual Leave (CL)">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Annual Entitlement (days)"
            name="casual_leave_days"
            value={formData.casual_leave_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Max Consecutive Days"
            name="casual_leave_max_consecutive"
            value={formData.casual_leave_max_consecutive}
            onChange={handleFieldChange}
            type="number"
          />
        </Box>
      </FormSection>

      <FormSection title="Parental Leave">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.maternity_leave_enabled}
                onChange={handleToggleChange('maternity_leave_enabled')}
                color="primary"
              />
            }
            label="Include Maternity Leave"
          />
          {formData.maternity_leave_enabled && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, ml: 4 }}>
              <FormField
                label="Maternity Leave (days)"
                name="maternity_leave_days"
                value={formData.maternity_leave_days}
                onChange={handleFieldChange}
                type="number"
              />
              <FormField
                label="Eligibility"
                name="maternity_leave_eligibility"
                value={formData.maternity_leave_eligibility}
                onChange={handleFieldChange}
              />
            </Box>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={formData.paternity_leave_enabled}
                onChange={handleToggleChange('paternity_leave_enabled')}
                color="primary"
              />
            }
            label="Include Paternity Leave"
          />
          {formData.paternity_leave_enabled && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, ml: 4 }}>
              <FormField
                label="Paternity Leave (days)"
                name="paternity_leave_days"
                value={formData.paternity_leave_days}
                onChange={handleFieldChange}
                type="number"
              />
              <FormField
                label="Eligibility"
                name="paternity_leave_eligibility"
                value={formData.paternity_leave_eligibility}
                onChange={handleFieldChange}
              />
            </Box>
          )}
        </Box>
      </FormSection>

      <FormSection title="Application Process">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Leave Application System"
            name="leave_application_system"
            value={formData.leave_application_system}
            onChange={handleFieldChange}
          />
          <FormField
            label="Advance Notice (days)"
            name="advance_notice_days"
            value={formData.advance_notice_days}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Approval Authority"
            name="approval_authority"
            value={formData.approval_authority}
            onChange={handleFieldChange}
          />
          <FormField
            label="Annual Holidays"
            name="annual_holidays"
            value={formData.annual_holidays}
            onChange={handleFieldChange}
          />
          <FormField
            label="HR Contact"
            name="hr_contact"
            value={formData.hr_contact}
            onChange={handleFieldChange}
          />
          <FormField
            label="Approval Date"
            name="approval_date"
            value={formData.approval_date}
            onChange={handleFieldChange}
            type="date"
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

export default LeavePolicyGenerator;
