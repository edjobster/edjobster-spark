import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import ToolPageLayout from '@/components/tools/ToolPageLayout';
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField';
import { onboardingPlanTemplate } from '@/data/templates';
import { defaultCompanyContext } from '@/data/companyContext';

const initialFormData = {
  employee_name: '', role_title: '', department: '', start_date: '', manager_name: '', manager_email: '', buddy_name: '', buddy_email: '',
  first_30_objectives: '- Understand company culture and values\n- Complete all onboarding training\n- Build relationships with team members',
  first_30_tasks: '- Complete compliance training\n- Set up development environment\n- Shadow team members\n- Attend all team meetings',
  days_31_60_objectives: '- Begin contributing to projects\n- Develop role-specific skills\n- Expand cross-functional relationships',
  days_31_60_tasks: '- Take ownership of assigned tasks\n- Complete advanced training\n- Participate in code reviews\n- Present progress to team',
  days_61_90_objectives: '- Demonstrate independent work capability\n- Contribute measurably to team goals\n- Develop a growth plan',
  days_61_90_tasks: '- Lead small initiatives\n- Mentor new joiners\n- Propose process improvements\n- Complete 90-day review',
  day_30_metrics: 'Training completion, team integration feedback',
  day_60_metrics: 'Quality of contributions, stakeholder feedback',
  day_90_metrics: 'Independent work capability, goal achievement',
  hr_contact: defaultCompanyContext.companyEmail, it_support: 'it@company.com',
  approval_date: '', signatory_name: defaultCompanyContext.signatory.name,
};

const howToUse = ['Enter new hire details.', 'Customize objectives for each phase.', 'Define tasks and success metrics.', 'Click "Generate Onboarding Plan".'];

const OnboardingPlanGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleFieldChange = (name: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [name]: value }));
  const handleClear = () => setFormData(initialFormData);

  const handleGenerate = useCallback(() => {
    let doc = onboardingPlanTemplate;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') doc = doc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`);
    });
    return doc;
  }, [formData]);

  return (
    <ToolPageLayout title="30-60-90 Onboarding Plan + Checklist" description="Create structured onboarding plans with milestones and task checklists." howToUse={howToUse} formData={formData} onGenerate={handleGenerate} onClear={handleClear}>
      <FormSection title="Employee Details">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormField label="Employee Name" name="employee_name" value={formData.employee_name} onChange={handleFieldChange} required />
          <FormField label="Role" name="role_title" value={formData.role_title} onChange={handleFieldChange} required />
          <FormField label="Department" name="department" value={formData.department} onChange={handleFieldChange} />
          <FormField label="Start Date" name="start_date" value={formData.start_date} onChange={handleFieldChange} type="date" required />
          <FormField label="Manager Name" name="manager_name" value={formData.manager_name} onChange={handleFieldChange} required />
          <FormField label="Manager Email" name="manager_email" value={formData.manager_email} onChange={handleFieldChange} />
          <FormField label="Buddy/Mentor Name" name="buddy_name" value={formData.buddy_name} onChange={handleFieldChange} />
          <FormField label="Buddy Email" name="buddy_email" value={formData.buddy_email} onChange={handleFieldChange} />
        </Box>
      </FormSection>
      <FormSection title="First 30 Days">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormField label="Objectives" name="first_30_objectives" value={formData.first_30_objectives} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Tasks" name="first_30_tasks" value={formData.first_30_tasks} onChange={handleFieldChange} type="textarea" rows={4} />
        </Box>
      </FormSection>
      <FormSection title="Days 31-60">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormField label="Objectives" name="days_31_60_objectives" value={formData.days_31_60_objectives} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Tasks" name="days_31_60_tasks" value={formData.days_31_60_tasks} onChange={handleFieldChange} type="textarea" rows={4} />
        </Box>
      </FormSection>
      <FormSection title="Days 61-90">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormField label="Objectives" name="days_61_90_objectives" value={formData.days_61_90_objectives} onChange={handleFieldChange} type="textarea" rows={3} />
          <FormField label="Tasks" name="days_61_90_tasks" value={formData.days_61_90_tasks} onChange={handleFieldChange} type="textarea" rows={4} />
        </Box>
      </FormSection>
    </ToolPageLayout>
  );
};

export default OnboardingPlanGenerator;
