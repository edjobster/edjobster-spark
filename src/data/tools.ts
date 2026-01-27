export type ToolCategory = 'Letters' | 'Policies' | 'Contracts' | 'Employer Branding';

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  route: string;
  plan: string;
}

export const tools: Tool[] = [
  {
    id: 'offer-letter',
    title: 'Offer Letter Generator',
    description: 'Create professional offer letters with compensation details, role information, and company branding.',
    category: 'Letters',
    route: '/tools/offer-letter',
    plan: 'Silver',
  },
  {
    id: 'appointment-letter',
    title: 'Appointment Letter Generator',
    description: 'Generate legally compliant appointment letters with all required clauses and terms.',
    category: 'Letters',
    route: '/tools/appointment-letter',
    plan: 'Silver',
  },
  {
    id: 'confirmation-letter',
    title: 'Confirmation Letter Generator',
    description: 'Create confirmation letters for employees completing their probation period.',
    category: 'Letters',
    route: '/tools/confirmation-letter',
    plan: 'Silver',
  },
  {
    id: 'increment-letter',
    title: 'Increment Letter Generator',
    description: 'Generate salary revision letters with updated compensation and effective dates.',
    category: 'Letters',
    route: '/tools/increment-letter',
    plan: 'Silver',
  },
  {
    id: 'experience-letter',
    title: 'Experience Letter Generator',
    description: 'Create experience certificates for departing employees with tenure details.',
    category: 'Letters',
    route: '/tools/experience-letter',
    plan: 'Silver',
  },
  {
    id: 'relieving-letter',
    title: 'Relieving Letter Generator',
    description: 'Generate relieving letters confirming employment termination and clearances.',
    category: 'Letters',
    route: '/tools/relieving-letter',
    plan: 'Silver',
  },
  {
    id: 'leave-policy',
    title: 'Leave Policy Generator',
    description: 'Create comprehensive leave policies with accrual rules and approval workflows.',
    category: 'Policies',
    route: '/tools/leave-policy',
    plan: 'Silver',
  },
  {
    id: 'wfh-policy',
    title: 'WFH / Hybrid Policy Generator',
    description: 'Generate remote work and hybrid work policies with guidelines and expectations.',
    category: 'Policies',
    route: '/tools/wfh-policy',
    plan: 'Silver',
  },
  {
    id: 'freelancer-contract',
    title: 'Freelancer Contract Generator',
    description: 'Create freelancer agreements with project scope, payment terms, and deliverables.',
    category: 'Contracts',
    route: '/tools/freelancer-contract',
    plan: 'Silver',
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement (NDA) Builder',
    description: 'Generate NDAs with confidentiality terms, duration, and legal provisions.',
    category: 'Contracts',
    route: '/tools/nda',
    plan: 'Silver',
  },
  {
    id: 'onboarding-plan',
    title: '30-60-90 Onboarding Plan + Checklist',
    description: 'Create structured onboarding plans with milestones and task checklists.',
    category: 'Employer Branding',
    route: '/tools/onboarding-plan',
    plan: 'Silver',
  },
  {
    id: 'evp-builder',
    title: 'EVP Builder',
    description: 'Build your Employee Value Proposition with key messaging and differentiators.',
    category: 'Employer Branding',
    route: '/tools/evp-builder',
    plan: 'Silver',
  },
  {
    id: 'branding-post',
    title: 'Employer Branding Post Builder',
    description: 'Create engaging social media content for employer branding and recruitment.',
    category: 'Employer Branding',
    route: '/tools/branding-post',
    plan: 'Silver',
  },
];

export const getCategoryColor = (category: ToolCategory): string => {
  const colors: Record<ToolCategory, string> = {
    Letters: '#3B82F6',
    Policies: '#8B5CF6',
    Contracts: '#F59E0B',
    'Employer Branding': '#10B981',
  };
  return colors[category];
};

export const getToolById = (id: string): Tool | undefined => {
  return tools.find((tool) => tool.id === id);
};
