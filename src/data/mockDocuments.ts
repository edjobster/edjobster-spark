export interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  createdAt: string;
  size: string;
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Offer Letter - John Smith',
    type: 'Offer Letter',
    category: 'Letters',
    createdAt: '2024-01-15',
    size: '24 KB',
  },
  {
    id: '2',
    title: 'Appointment Letter - Sarah Johnson',
    type: 'Appointment Letter',
    category: 'Letters',
    createdAt: '2024-01-14',
    size: '56 KB',
  },
  {
    id: '3',
    title: 'Company Leave Policy 2024',
    type: 'Leave Policy',
    category: 'Policies',
    createdAt: '2024-01-10',
    size: '128 KB',
  },
  {
    id: '4',
    title: 'Remote Work Guidelines',
    type: 'WFH Policy',
    category: 'Policies',
    createdAt: '2024-01-08',
    size: '96 KB',
  },
  {
    id: '5',
    title: 'NDA - Vendor ABC Corp',
    type: 'NDA',
    category: 'Contracts',
    createdAt: '2024-01-05',
    size: '42 KB',
  },
  {
    id: '6',
    title: 'Engineering Team EVP',
    type: 'EVP',
    category: 'Employer Branding',
    createdAt: '2024-01-03',
    size: '88 KB',
  },
  {
    id: '7',
    title: 'LinkedIn Hiring Post - Q1',
    type: 'Branding Post',
    category: 'Employer Branding',
    createdAt: '2024-01-02',
    size: '16 KB',
  },
  {
    id: '8',
    title: 'Freelancer Contract - Design Project',
    type: 'Freelancer Contract',
    category: 'Contracts',
    createdAt: '2024-01-01',
    size: '64 KB',
  },
];

export const mockVaultStats = {
  documentsUsed: 8,
  documentsLimit: 100,
  downloadsUsed: 25,
  downloadsLimit: 50,
  storageUsedMB: 2.4,
  storageLimitMB: 100,
  retentionDays: 90,
};

export const mockCategories = [
  { name: 'Letters', count: 2, icon: 'Mail' },
  { name: 'Policies', count: 2, icon: 'FileText' },
  { name: 'Contracts', count: 2, icon: 'FileCheck' },
  { name: 'Employer Branding', count: 2, icon: 'Briefcase' },
];
