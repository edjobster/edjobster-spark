export interface CompanyContext {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  logoUrl: string;
  signatory: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
}

export const defaultCompanyContext: CompanyContext = {
  companyName: 'Acme Technologies Pvt. Ltd.',
  companyAddress: '123 Business Park, Tech City, State - 560001',
  companyEmail: 'hr@acmetech.com',
  companyPhone: '+91 80 1234 5678',
  companyWebsite: 'www.acmetech.com',
  industry: 'Information Technology',
  companySize: '50-200 employees',
  logoUrl: '/sample-logo.svg',
  signatory: {
    name: 'Priya Sharma',
    title: 'Head of Human Resources',
    email: 'priya.sharma@acmetech.com',
    phone: '+91 98765 43210',
  },
};
