export interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  createdAt: string;
  size: string;
  content: string;
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Offer Letter - John Smith',
    type: 'Offer Letter',
    category: 'Letters',
    createdAt: '2024-01-15',
    size: '24 KB',
    content: `Dear John Smith,

We are pleased to offer you the position of Senior Software Engineer at TechCorp Inc. This offer is contingent upon successful completion of our standard background check.

**Position Details:**
- Title: Senior Software Engineer
- Department: Engineering
- Start Date: February 1, 2024
- Reporting To: Engineering Manager

**Compensation:**
- Base Salary: $120,000 per annum
- Annual Bonus: Up to 15% of base salary
- Stock Options: 5,000 shares vesting over 4 years

Please sign and return this offer letter by January 20, 2024.

Best regards,
HR Department`,
  },
  {
    id: '2',
    title: 'Appointment Letter - Sarah Johnson',
    type: 'Appointment Letter',
    category: 'Letters',
    createdAt: '2024-01-14',
    size: '56 KB',
    content: `Dear Sarah Johnson,

With reference to your application and subsequent interviews, we are pleased to appoint you as Product Manager effective January 28, 2024.

**Terms of Appointment:**
- Position: Product Manager
- Department: Product Development
- Location: San Francisco Office
- Probation Period: 3 months

**Responsibilities:**
- Lead product strategy and roadmap
- Coordinate with engineering and design teams
- Manage stakeholder communications

Welcome to the team!

Sincerely,
Human Resources`,
  },
  {
    id: '3',
    title: 'Company Leave Policy 2024',
    type: 'Leave Policy',
    category: 'Policies',
    createdAt: '2024-01-10',
    size: '128 KB',
    content: `# Company Leave Policy 2024

## 1. Introduction
This policy outlines the leave entitlements and procedures for all employees.

## 2. Annual Leave
- Full-time employees: 20 days per year
- Part-time employees: Pro-rated based on hours worked
- Unused leave may be carried forward (max 5 days)

## 3. Sick Leave
- 10 days per year
- Medical certificate required for absences exceeding 3 consecutive days

## 4. Public Holidays
All employees are entitled to company-designated public holidays as per the annual holiday calendar.

## 5. Leave Application Process
Submit leave requests through the HR portal at least 5 business days in advance.`,
  },
  {
    id: '4',
    title: 'Remote Work Guidelines',
    type: 'WFH Policy',
    category: 'Policies',
    createdAt: '2024-01-08',
    size: '96 KB',
    content: `# Remote Work Guidelines

## Purpose
This document establishes guidelines for employees working remotely.

## Eligibility
All employees who have completed their probation period are eligible for remote work.

## Work Hours
- Core hours: 10:00 AM - 4:00 PM (local time)
- Flexible hours for remaining work time
- Must be available for scheduled meetings

## Equipment
- Company-provided laptop and peripherals
- Monthly internet allowance: $50
- Ergonomic equipment upon request

## Communication
- Daily check-ins via Slack
- Weekly team video calls
- Respond to messages within 2 hours during work hours`,
  },
  {
    id: '5',
    title: 'NDA - Vendor ABC Corp',
    type: 'NDA',
    category: 'Contracts',
    createdAt: '2024-01-05',
    size: '42 KB',
    content: `# Non-Disclosure Agreement

This Non-Disclosure Agreement ("Agreement") is entered into between TechCorp Inc. ("Disclosing Party") and ABC Corp ("Receiving Party").

## 1. Confidential Information
All business, technical, and financial information disclosed by either party.

## 2. Obligations
The Receiving Party agrees to:
- Maintain strict confidentiality
- Use information only for intended business purposes
- Not disclose to third parties without written consent

## 3. Term
This Agreement shall remain in effect for 3 years from the date of signing.

## 4. Return of Materials
Upon termination, all confidential materials must be returned or destroyed.

Signed on: January 5, 2024`,
  },
  {
    id: '6',
    title: 'Engineering Team EVP',
    type: 'EVP',
    category: 'Employer Branding',
    createdAt: '2024-01-03',
    size: '88 KB',
    content: `# Engineering Team Employee Value Proposition

## Why Join Our Engineering Team?

### Cutting-Edge Technology
Work with the latest technologies including React, TypeScript, and cloud-native architectures.

### Growth Opportunities
- Structured career paths
- Mentorship programs
- Conference sponsorships
- Learning budget: $2,000/year

### Work-Life Balance
- Flexible hours
- Remote-first culture
- Unlimited PTO policy

### Competitive Compensation
- Top-quartile salaries
- Equity participation
- Comprehensive benefits

### Culture
- Collaborative environment
- Innovation-focused
- Diverse and inclusive team`,
  },
  {
    id: '7',
    title: 'LinkedIn Hiring Post - Q1',
    type: 'Branding Post',
    category: 'Employer Branding',
    createdAt: '2024-01-02',
    size: '16 KB',
    content: `🚀 We're Hiring! Join Our Amazing Team

TechCorp is growing, and we're looking for talented individuals to join our journey!

**Open Positions:**
✅ Senior Software Engineer
✅ Product Manager
✅ UX Designer
✅ Data Analyst

**What We Offer:**
🌟 Competitive salary & equity
🏠 Remote-first culture
📚 Learning & development budget
🏥 Comprehensive health benefits

Ready to make an impact? Apply now!

#Hiring #TechJobs #RemoteWork #Engineering #Careers

Link: careers.techcorp.com`,
  },
  {
    id: '8',
    title: 'Freelancer Contract - Design Project',
    type: 'Freelancer Contract',
    category: 'Contracts',
    createdAt: '2024-01-01',
    size: '64 KB',
    content: `# Freelancer Service Agreement

**Project:** Website Redesign
**Freelancer:** Jane Designer
**Client:** TechCorp Inc.

## Scope of Work
- Complete website UI/UX redesign
- Deliver responsive designs for web and mobile
- Provide design system documentation

## Timeline
- Project Start: January 1, 2024
- Milestone 1: January 15, 2024 (Wireframes)
- Milestone 2: February 1, 2024 (High-fidelity designs)
- Project Completion: February 15, 2024

## Compensation
- Total Fee: $8,000
- Payment Schedule: 50% upfront, 50% upon completion

## Intellectual Property
All deliverables become property of TechCorp Inc. upon final payment.`,
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
