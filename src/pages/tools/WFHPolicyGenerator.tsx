import React, { useState, useCallback } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import SignatorySection from '@/components/forms/SignatorySection';
import { wfhPolicyTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  effective_date: '',
  version: '1.0',
  employee_scope: 'All eligible employees based on role requirements',
  minimum_tenure: '3 months',
  performance_requirement: 'Meets expectations or above',
  work_model_name: 'Hybrid Work',
  work_model_description: 'A flexible work arrangement combining remote work and office presence.',
  office_days_required: '3',
  remote_days_allowed: '2',
  core_hours: '10:00 AM - 4:00 PM',
  equipment_provided: true,
  equipment_list: 'Laptop, headset, and necessary software licenses',
  expense_reimbursement: true,
  expense_details: 'Up to ₹1,500/month for internet expenses',
  communication_tools: 'Slack, Microsoft Teams, Zoom',
  checkin_frequency: 'Weekly',
  approval_authority: 'Reporting Manager',
  advance_notice: '24 hours',
  emergency_wfh_process: 'Notify manager via email/chat before work hours',
  policy_review_frequency: 'annually',
  approval_date: '',
  company_name: defaultCompanyContext.companyName,
  signatory: {
    name: defaultCompanyContext.signatory.name,
    title: defaultCompanyContext.signatory.title,
    email: defaultCompanyContext.signatory.email,
    phone: defaultCompanyContext.signatory.phone,
  },
};

const howToUse = [
  'Set the policy effective date and version.',
  'Define eligibility criteria for remote work.',
  'Configure work model specifics (office days, remote days, core hours).',
  'Specify equipment and expense provisions.',
  'Set approval processes and communication tools.',
  'Click "Generate WFH Policy" to create the document.',
];

const WFHPolicyGenerator: React.FC = () => {
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
    let document = wfhPolicyTemplate;
    
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
    if (!formData.equipment_provided) {
      document = document.replace(/\{\{#if equipment_provided\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if equipment_provided\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    if (!formData.expense_reimbursement) {
      document = document.replace(/\{\{#if expense_reimbursement\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    } else {
      document = document.replace(/\{\{#if expense_reimbursement\}\}/g, '');
      document = document.replace(/\{\{\/if\}\}/g, '');
    }

    return document;
  }, [formData]);

  return (
    <ToolPageLayout
      title="WFH / Hybrid Policy Generator"
      description="Generate remote work and hybrid work policies with guidelines and expectations."
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
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Employee Scope"
              name="employee_scope"
              value={formData.employee_scope}
              onChange={handleFieldChange}
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Eligibility">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Minimum Tenure Required"
            name="minimum_tenure"
            value={formData.minimum_tenure}
            onChange={handleFieldChange}
          />
          <FormField
            label="Performance Requirement"
            name="performance_requirement"
            value={formData.performance_requirement}
            onChange={handleFieldChange}
          />
        </Box>
      </FormSection>

      <FormSection title="Work Model">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Work Model Name"
            name="work_model_name"
            value={formData.work_model_name}
            onChange={handleFieldChange}
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Work Model Description"
              name="work_model_description"
              value={formData.work_model_description}
              onChange={handleFieldChange}
              type="textarea"
              rows={2}
            />
          </Box>
          <FormField
            label="Office Days Required (per week)"
            name="office_days_required"
            value={formData.office_days_required}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Remote Days Allowed (per week)"
            name="remote_days_allowed"
            value={formData.remote_days_allowed}
            onChange={handleFieldChange}
            type="number"
          />
          <FormField
            label="Core Hours"
            name="core_hours"
            value={formData.core_hours}
            onChange={handleFieldChange}
            helperText="Hours when all employees must be available"
          />
        </Box>
      </FormSection>

      <FormSection title="Equipment & Expenses">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.equipment_provided}
                onChange={handleToggleChange('equipment_provided')}
                color="primary"
              />
            }
            label="Company Provides Equipment"
          />
          {formData.equipment_provided && (
            <Box sx={{ ml: 4 }}>
              <FormField
                label="Equipment List"
                name="equipment_list"
                value={formData.equipment_list}
                onChange={handleFieldChange}
              />
            </Box>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={formData.expense_reimbursement}
                onChange={handleToggleChange('expense_reimbursement')}
                color="primary"
              />
            }
            label="Expense Reimbursement Available"
          />
          {formData.expense_reimbursement && (
            <Box sx={{ ml: 4 }}>
              <FormField
                label="Expense Details"
                name="expense_details"
                value={formData.expense_details}
                onChange={handleFieldChange}
              />
            </Box>
          )}
        </Box>
      </FormSection>

      <FormSection title="Communication & Performance">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Approved Communication Tools"
            name="communication_tools"
            value={formData.communication_tools}
            onChange={handleFieldChange}
          />
          <FormField
            label="Check-in Frequency"
            name="checkin_frequency"
            value={formData.checkin_frequency}
            onChange={handleFieldChange}
          />
        </Box>
      </FormSection>

      <FormSection title="Approval Process">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField
            label="Approval Authority"
            name="approval_authority"
            value={formData.approval_authority}
            onChange={handleFieldChange}
          />
          <FormField
            label="Advance Notice Required"
            name="advance_notice"
            value={formData.advance_notice}
            onChange={handleFieldChange}
          />
          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <FormField
              label="Emergency WFH Process"
              name="emergency_wfh_process"
              value={formData.emergency_wfh_process}
              onChange={handleFieldChange}
            />
          </Box>
          <FormField
            label="Policy Review Frequency"
            name="policy_review_frequency"
            value={formData.policy_review_frequency}
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

export default WFHPolicyGenerator;
