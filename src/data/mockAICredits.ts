import { ToolCategory } from './tools';

export interface AIUsageRecord {
  id: string;
  documentName: string;
  documentType: string;
  category: ToolCategory;
  generatedAt: string;
  creditsUsed: number;
}

export interface AICreditsStats {
  totalCredits: number;
  usedCredits: number;
  billingCycleStart: string;
  billingCycleEnd: string;
}

export const mockAIUsageRecords: AIUsageRecord[] = [
  {
    id: '1',
    documentName: 'Offer Letter - John Smith',
    documentType: 'Offer Letter',
    category: 'Letters',
    generatedAt: '2026-02-05',
    creditsUsed: 2,
  },
  {
    id: '2',
    documentName: 'NDA - Vendor ABC Corp',
    documentType: 'NDA',
    category: 'Contracts',
    generatedAt: '2026-02-04',
    creditsUsed: 3,
  },
  {
    id: '3',
    documentName: 'Company Leave Policy 2026',
    documentType: 'Leave Policy',
    category: 'Policies',
    generatedAt: '2026-02-03',
    creditsUsed: 4,
  },
  {
    id: '4',
    documentName: 'Appointment Letter - Sarah Johnson',
    documentType: 'Appointment Letter',
    category: 'Letters',
    generatedAt: '2026-02-02',
    creditsUsed: 2,
  },
  {
    id: '5',
    documentName: 'Engineering Team EVP',
    documentType: 'EVP',
    category: 'Employer Branding',
    generatedAt: '2026-02-01',
    creditsUsed: 2,
  },
  {
    id: '6',
    documentName: 'Freelancer Contract - Design Project',
    documentType: 'Freelancer Contract',
    category: 'Contracts',
    generatedAt: '2026-01-30',
    creditsUsed: 3,
  },
  {
    id: '7',
    documentName: 'Remote Work Guidelines',
    documentType: 'WFH Policy',
    category: 'Policies',
    generatedAt: '2026-01-28',
    creditsUsed: 4,
  },
  {
    id: '8',
    documentName: 'LinkedIn Hiring Post - Q1',
    documentType: 'Branding Post',
    category: 'Employer Branding',
    generatedAt: '2026-01-25',
    creditsUsed: 2,
  },
  {
    id: '9',
    documentName: 'Experience Letter - Mike Chen',
    documentType: 'Experience Letter',
    category: 'Letters',
    generatedAt: '2026-01-22',
    creditsUsed: 2,
  },
  {
    id: '10',
    documentName: 'Confidentiality Agreement - Partner XYZ',
    documentType: 'NDA',
    category: 'Contracts',
    generatedAt: '2026-01-20',
    creditsUsed: 3,
  },
];

export const mockAICreditsStats: AICreditsStats = {
  totalCredits: 100,
  usedCredits: 27,
  billingCycleStart: '2026-02-01',
  billingCycleEnd: '2026-02-28',
};

// Calculate actual used credits from records
export const calculateUsedCredits = (): number => {
  return mockAIUsageRecords.reduce((sum, record) => sum + record.creditsUsed, 0);
};

// Credit Plans for purchase
export interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  pricePerCredit: number;
  popular?: boolean;
}

export const creditPlans: CreditPlan[] = [
  { id: 'starter', name: 'Starter', credits: 25, price: 4.99, pricePerCredit: 0.20 },
  { id: 'standard', name: 'Standard', credits: 50, price: 7.99, pricePerCredit: 0.16, popular: true },
  { id: 'pro', name: 'Pro Pack', credits: 100, price: 12.99, pricePerCredit: 0.13 },
  { id: 'enterprise', name: 'Enterprise', credits: 250, price: 24.99, pricePerCredit: 0.10 },
];

// Get document credit cost based on type
export const getDocumentCreditCost = (documentType: string): number => {
  if (['NDA', 'Freelancer Contract'].includes(documentType)) return 3;
  if (['Leave Policy', 'WFH Policy'].includes(documentType)) return 4;
  return 2; // Default for letters and branding
};
