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
  // Additional company details
  registrationNumber: string;
  gstNumber: string;
  tagline: string;
  foundedYear: string;
  legalEntityType: string;
  // Header settings
  headerSettings: {
    showLogo: boolean;
    showCompanyName: boolean;
    showReleaseDate: boolean;
    headerTagline: string;
    headerBgColor: string;
  };
  // Footer settings
  footerSettings: {
    showAddress: boolean;
    showContactDetails: boolean;
    customFooterText: string;
    footerBgColor: string;
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
  // Additional company details defaults
  registrationNumber: 'U72200KA2020PTC123456',
  gstNumber: '29AABCU9603R1ZM',
  tagline: 'Innovating for Tomorrow',
  foundedYear: '2020',
  legalEntityType: 'Private Limited',
  // Header settings defaults
  headerSettings: {
    showLogo: true,
    showCompanyName: true,
    showReleaseDate: true,
    headerTagline: '',
    headerBgColor: '#FFFFFF',
  },
  // Footer settings defaults
  footerSettings: {
    showAddress: true,
    showContactDetails: true,
    customFooterText: '',
    footerBgColor: '#F5F5F5',
  },
};
