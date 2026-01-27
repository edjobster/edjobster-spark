// Document templates with placeholder variables for mock AI generation

export const offerLetterTemplate = `
**OFFER LETTER**

Date: {{offer_date}}

To,
{{candidate_full_name}}
{{candidate_address}}

**Subject: Offer of Employment as {{role_title}}**

Dear {{candidate_first_name}},

We are pleased to extend this offer of employment to you for the position of **{{role_title}}** in the **{{department}}** department at **{{company_name}}**.

**Position Details:**
- **Job Title:** {{role_title}}
- **Department:** {{department}}
- **Reporting To:** {{reporting_manager}}
- **Work Location:** {{work_location}}
- **Work Model:** {{work_model}}
- **Employment Type:** {{employment_type}}

**Compensation:**
- **Annual CTC:** {{ctc_amount}}
- **Start Date:** {{start_date}}
- **Probation Period:** {{probation_months}} months

**Working Hours:**
- **Work Days:** {{work_days}} days per week
- **Work Hours:** {{work_hours}} hours per day
- **Work Timing:** {{work_timing}}
- **Weekly Off:** {{weekly_off}}

This offer is contingent upon successful completion of background verification and submission of required documents.

Please confirm your acceptance of this offer by {{acceptance_deadline}}.

We look forward to welcoming you to our team!

Warm regards,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
Email: {{signatory_email}}
Phone: {{signatory_phone}}

---

**ACCEPTANCE**

I, {{candidate_full_name}}, accept the offer of employment as outlined above.

Signature: ____________________
Date: ____________________
`;

export const appointmentLetterTemplate = `
**APPOINTMENT LETTER**

Date: {{appointment_date}}
Ref: {{reference_number}}

To,
{{employee_full_name}}
{{employee_address}}

**Subject: Letter of Appointment as {{role_title}}**

Dear {{employee_first_name}},

With reference to your application and subsequent discussions, we are pleased to appoint you as **{{role_title}}** in our organization, **{{company_name}}**, subject to the following terms and conditions:

**1. POSITION AND DUTIES**
You will be employed as {{role_title}} in the {{department}} department, reporting to {{reporting_manager}}. Your duties and responsibilities will be as communicated to you from time to time.

**2. PLACE OF WORK**
Your primary place of work will be {{work_location}}. However, you may be required to travel or relocate as per business requirements.

**3. WORK MODEL**
Your work arrangement will be {{work_model}}.

**4. DATE OF JOINING**
Your employment will commence from {{start_date}}.

**5. PROBATION PERIOD**
You will be on probation for a period of {{probation_months}} months from the date of joining. Upon successful completion, you will be confirmed in your position.

**6. COMPENSATION**
Your annual Cost to Company (CTC) will be {{ctc_amount}}. Detailed compensation breakdown is provided in Annexure A.

**7. WORKING HOURS**
- Standard work week: {{work_days}} days
- Daily work hours: {{work_hours}} hours
- Work timing: {{work_timing}}
- Weekly off: {{weekly_off}}

**8. LEAVE ENTITLEMENT**
You will be entitled to leave as per the company's leave policy, details of which will be shared during onboarding.

**9. NOTICE PERIOD**
During probation, either party may terminate employment with {{notice_period_probation}} days' notice. Post-confirmation, the notice period will be {{notice_period_confirmed}} days.

**10. CONFIDENTIALITY**
You agree to maintain strict confidentiality regarding all company information, trade secrets, and proprietary data during and after your employment.

{{#if background_check_consent}}
**11. BACKGROUND VERIFICATION**
This appointment is subject to successful completion of background verification. By accepting this letter, you consent to the verification process.
{{/if}}

{{#if arbitration_clause}}
**12. DISPUTE RESOLUTION**
Any disputes arising out of or in connection with this employment shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, in {{governing_law_jurisdiction}}.
{{/if}}

**GOVERNING LAW**
This agreement shall be governed by and construed in accordance with the laws of {{governing_law_jurisdiction}}.

Please sign the duplicate copy of this letter as a token of your acceptance of the above terms and conditions.

We look forward to a long and mutually beneficial association.

Warm regards,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
Email: {{signatory_email}}
Phone: {{signatory_phone}}

---

**ACCEPTANCE**

I, {{employee_full_name}}, have read and understood the terms and conditions mentioned above and accept this appointment.

Signature: ____________________
Date: ____________________

{{#if include_annexure}}
---

**ANNEXURE A: COMPENSATION STRUCTURE**

| Component | Annual Amount |
|-----------|--------------|
| Basic Salary | [As per structure] |
| HRA | [As per structure] |
| Special Allowance | [As per structure] |
| Other Benefits | [As per structure] |
| **Total CTC** | **{{ctc_amount}}** |

*Note: Actual components may vary based on company policy.*
{{/if}}
`;

export const confirmationLetterTemplate = `
**CONFIRMATION LETTER**

Date: {{confirmation_date}}
Ref: {{reference_number}}

To,
{{employee_full_name}}
{{employee_id}}
{{department}}

**Subject: Confirmation of Employment**

Dear {{employee_first_name}},

We are pleased to inform you that based on your performance during the probation period, you have been confirmed as a permanent employee of **{{company_name}}** with effect from **{{confirmation_effective_date}}**.

**Employment Details:**
- **Employee ID:** {{employee_id}}
- **Designation:** {{role_title}}
- **Department:** {{department}}
- **Date of Joining:** {{date_of_joining}}
- **Confirmation Date:** {{confirmation_effective_date}}

**Revised Terms:**
- **Annual CTC:** {{revised_ctc}} (if applicable)
- **Notice Period:** {{notice_period}} days

All other terms and conditions of your employment as mentioned in your appointment letter dated {{appointment_letter_date}} remain unchanged unless specifically modified herein.

We appreciate your contributions during the probation period and look forward to your continued growth and success at {{company_name}}.

Congratulations on your confirmation!

Warm regards,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
`;

export const incrementLetterTemplate = `
**SALARY REVISION LETTER**

Date: {{effective_date}}
Ref: {{reference_number}}

To,
{{employee_full_name}}
{{employee_id}}
{{department}}

**Subject: Annual Salary Revision - Effective {{effective_date}}**

Dear {{employee_first_name}},

We are pleased to inform you about your salary revision based on your performance and contribution to **{{company_name}}**.

**Current Compensation:**
Annual CTC: {{current_ctc}}

**Revised Compensation (Effective {{effective_date}}):**
Annual CTC: {{revised_ctc}}

**Increment Details:**
- Increment Amount: {{increment_amount}}
- Increment Percentage: {{increment_percentage}}%

This revision is a recognition of your dedication, hard work, and the value you bring to our organization. We appreciate your contributions and look forward to your continued growth.

All other terms and conditions of your employment remain unchanged.

Congratulations on your well-deserved increment!

Best regards,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
`;

export const experienceLetterTemplate = `
**EXPERIENCE CERTIFICATE**

Date: {{issue_date}}
Ref: {{reference_number}}

**TO WHOM IT MAY CONCERN**

This is to certify that **{{employee_full_name}}** was employed with **{{company_name}}** from **{{date_of_joining}}** to **{{last_working_date}}**.

**Employment Details:**
- **Employee ID:** {{employee_id}}
- **Designation at Joining:** {{joining_designation}}
- **Last Designation:** {{last_designation}}
- **Department:** {{department}}
- **Duration of Employment:** {{tenure}}

During their tenure, {{employee_first_name}} was responsible for:
{{responsibilities}}

We found {{employee_first_name}} to be {{performance_summary}}.

We wish {{employee_first_name}} all the best for their future endeavors.

This certificate is issued upon request for official purposes.

Sincerely,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
{{company_address}}
`;

export const relievingLetterTemplate = `
**RELIEVING LETTER**

Date: {{relieving_date}}
Ref: {{reference_number}}

To,
{{employee_full_name}}

**Subject: Relieving from Services**

Dear {{employee_first_name}},

This is to confirm that you have been relieved from your duties at **{{company_name}}** effective **{{last_working_date}}**.

**Employment Summary:**
- **Employee ID:** {{employee_id}}
- **Designation:** {{last_designation}}
- **Department:** {{department}}
- **Date of Joining:** {{date_of_joining}}
- **Last Working Date:** {{last_working_date}}
- **Reason for Separation:** {{separation_reason}}

**Clearance Status:**
{{#if all_clearances_done}}
All dues have been settled and necessary clearances have been obtained.
{{else}}
Pending clearances: {{pending_clearances}}
{{/if}}

We thank you for your contributions during your tenure at {{company_name}} and wish you success in your future endeavors.

Best regards,

**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
`;

export const leavePolicyTemplate = `
**LEAVE POLICY**

**{{company_name}}**
Effective Date: {{effective_date}}
Version: {{version}}

---

**1. INTRODUCTION**
This Leave Policy outlines the various types of leave available to employees of {{company_name}} and the procedures for availing them.

**2. SCOPE**
This policy applies to all {{employee_scope}} employees of {{company_name}}.

**3. TYPES OF LEAVE**

**3.1 Earned Leave (EL) / Privilege Leave (PL)**
- Annual Entitlement: {{earned_leave_days}} days
- Accrual: {{earned_leave_accrual}}
- Carry Forward: {{earned_leave_carry_forward}}
- Encashment: {{earned_leave_encashment}}

**3.2 Sick Leave (SL)**
- Annual Entitlement: {{sick_leave_days}} days
- Medical Certificate: Required for {{sick_leave_certificate_days}}+ consecutive days
- Carry Forward: {{sick_leave_carry_forward}}

**3.3 Casual Leave (CL)**
- Annual Entitlement: {{casual_leave_days}} days
- Maximum Consecutive Days: {{casual_leave_max_consecutive}}
- Carry Forward: Not allowed

{{#if maternity_leave_enabled}}
**3.4 Maternity Leave**
- Entitlement: {{maternity_leave_days}} days
- Eligibility: {{maternity_leave_eligibility}}
{{/if}}

{{#if paternity_leave_enabled}}
**3.5 Paternity Leave**
- Entitlement: {{paternity_leave_days}} days
- Eligibility: {{paternity_leave_eligibility}}
{{/if}}

**3.6 Compensatory Off**
- Eligibility: Working on holidays/weekends
- Validity: {{comp_off_validity}} days
- Approval Required: {{comp_off_approval}}

**4. LEAVE APPLICATION PROCESS**
- All leave applications must be submitted through {{leave_application_system}}
- Advance Notice Required: {{advance_notice_days}} days for planned leave
- Approval Authority: {{approval_authority}}

**5. HOLIDAY LIST**
The company observes {{annual_holidays}} holidays annually. The holiday list is published at the beginning of each year.

**6. LEAVE WITHOUT PAY (LWP)**
Leave without pay may be granted in exceptional circumstances with prior approval from {{lwp_approval_authority}}.

**7. POLICY ADMINISTRATION**
This policy is administered by the Human Resources department. For queries, contact {{hr_contact}}.

---

Approved by:

**{{signatory_name}}**
{{signatory_title}}
Date: {{approval_date}}
`;

export const wfhPolicyTemplate = `
**WORK FROM HOME / HYBRID WORK POLICY**

**{{company_name}}**
Effective Date: {{effective_date}}
Version: {{version}}

---

**1. PURPOSE**
This policy establishes guidelines for remote work and hybrid work arrangements at {{company_name}}.

**2. SCOPE**
This policy applies to {{employee_scope}}.

**3. ELIGIBILITY**
- Minimum tenure required: {{minimum_tenure}}
- Performance rating: {{performance_requirement}}
- Role suitability: As determined by department head

**4. WORK ARRANGEMENT OPTIONS**

**4.1 {{work_model_name}}**
{{work_model_description}}

- Office Days Required: {{office_days_required}} days per week
- Remote Days Allowed: {{remote_days_allowed}} days per week
- Core Hours: {{core_hours}}

**5. EMPLOYEE RESPONSIBILITIES**
- Maintain regular communication with team and manager
- Be available during core hours: {{core_hours}}
- Ensure secure and reliable internet connection
- Maintain data security and confidentiality
- Attend mandatory in-office meetings as scheduled
- Submit timely work reports as required

**6. EQUIPMENT AND EXPENSES**
{{#if equipment_provided}}
Company will provide: {{equipment_list}}
{{/if}}
{{#if expense_reimbursement}}
Eligible expense reimbursement: {{expense_details}}
{{/if}}

**7. DATA SECURITY**
- Use only company-approved devices and software
- Connect through VPN when accessing company systems
- Follow all IT security protocols
- Report any security incidents immediately

**8. COMMUNICATION TOOLS**
Approved communication platforms: {{communication_tools}}

**9. PERFORMANCE MANAGEMENT**
- Regular check-ins with manager: {{checkin_frequency}}
- Performance metrics remain unchanged
- Deliverables and deadlines must be met

**10. APPROVAL PROCESS**
- Submit WFH request to: {{approval_authority}}
- Advance notice required: {{advance_notice}}
- Emergency WFH: {{emergency_wfh_process}}

**11. POLICY VIOLATIONS**
Non-compliance may result in:
- Verbal warning
- Written warning
- Revocation of WFH privileges
- Disciplinary action

**12. POLICY REVIEW**
This policy will be reviewed {{policy_review_frequency}}.

---

Approved by:

**{{signatory_name}}**
{{signatory_title}}
Date: {{approval_date}}
`;

export const freelancerContractTemplate = `
**FREELANCER SERVICES AGREEMENT**

This Freelancer Services Agreement ("Agreement") is entered into as of **{{agreement_date}}**

**BETWEEN:**

**{{company_name}}** ("Client")
Address: {{company_address}}
Represented by: {{client_representative}}

**AND:**

**{{freelancer_name}}** ("Freelancer")
Address: {{freelancer_address}}
Email: {{freelancer_email}}
Phone: {{freelancer_phone}}

---

**1. SERVICES**
The Freelancer agrees to provide the following services ("Services"):
{{project_description}}

**2. DELIVERABLES**
{{deliverables_list}}

**3. TIMELINE**
- Project Start Date: {{start_date}}
- Project End Date: {{end_date}}
- Milestones:
{{milestones}}

**4. COMPENSATION**
- Total Project Fee: {{total_fee}}
- Payment Structure: {{payment_structure}}
- Payment Terms: {{payment_terms}}
- Payment Method: {{payment_method}}

**5. EXPENSES**
{{#if expenses_covered}}
Client agrees to reimburse the following pre-approved expenses:
{{expense_categories}}
{{else}}
All expenses are included in the project fee.
{{/if}}

**6. INTELLECTUAL PROPERTY**
{{ip_ownership_clause}}

**7. CONFIDENTIALITY**
The Freelancer agrees to maintain confidentiality of all proprietary information shared by the Client during the course of this engagement.

**8. NON-COMPETE**
{{#if non_compete_clause}}
{{non_compete_details}}
{{else}}
No non-compete restrictions apply to this Agreement.
{{/if}}

**9. TERMINATION**
- Either party may terminate with {{termination_notice}} days written notice
- Upon termination, Freelancer will be paid for completed work
- All deliverables completed until termination date shall be delivered to Client

**10. INDEPENDENT CONTRACTOR**
The Freelancer is an independent contractor and not an employee of the Client. The Freelancer is responsible for their own taxes and benefits.

**11. WARRANTIES**
The Freelancer warrants that all work will be original and will not infringe upon any third-party rights.

**12. LIMITATION OF LIABILITY**
{{liability_clause}}

**13. DISPUTE RESOLUTION**
Any disputes shall be resolved through {{dispute_resolution}} in {{jurisdiction}}.

**14. GOVERNING LAW**
This Agreement shall be governed by the laws of {{governing_law}}.

---

**AGREED AND ACCEPTED:**

**For Client:**
Signature: ____________________
Name: {{client_representative}}
Title: {{client_title}}
Date: ____________________

**Freelancer:**
Signature: ____________________
Name: {{freelancer_name}}
Date: ____________________
`;

export const ndaTemplate = `
**NON-DISCLOSURE AGREEMENT**

This Non-Disclosure Agreement ("Agreement") is entered into as of **{{agreement_date}}**

**BETWEEN:**

**{{disclosing_party_name}}** ("Disclosing Party")
Address: {{disclosing_party_address}}

**AND:**

**{{receiving_party_name}}** ("Receiving Party")
Address: {{receiving_party_address}}

---

**1. PURPOSE**
{{purpose}}

**2. DEFINITION OF CONFIDENTIAL INFORMATION**
"Confidential Information" means any and all information disclosed by the Disclosing Party, including but not limited to:
{{confidential_info_categories}}

**3. EXCLUSIONS**
Confidential Information does not include information that:
- Is or becomes publicly available through no fault of the Receiving Party
- Was already known to the Receiving Party prior to disclosure
- Is independently developed by the Receiving Party
- Is disclosed with the written consent of the Disclosing Party

**4. OBLIGATIONS OF RECEIVING PARTY**
The Receiving Party agrees to:
- Maintain strict confidentiality of all Confidential Information
- Use the Confidential Information solely for the Purpose stated above
- Not disclose the Confidential Information to any third party without prior written consent
- Take reasonable measures to protect the confidentiality of the information
- Limit access to individuals with a need to know

**5. TERM**
- This Agreement shall remain in effect for **{{agreement_duration}}**
- Confidentiality obligations survive termination for **{{survival_period}}**

**6. RETURN OF MATERIALS**
Upon termination or request, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.

**7. NO LICENSE**
This Agreement does not grant any license or rights to intellectual property of the Disclosing Party.

**8. NO WARRANTY**
Confidential Information is provided "as is" without any warranty.

**9. REMEDIES**
The Receiving Party acknowledges that breach of this Agreement may cause irreparable harm, and the Disclosing Party shall be entitled to seek injunctive relief in addition to other remedies.

**10. GOVERNING LAW**
This Agreement shall be governed by the laws of {{governing_law}}.

**11. DISPUTE RESOLUTION**
{{dispute_resolution_clause}}

**12. ENTIRE AGREEMENT**
This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof.

**13. AMENDMENTS**
This Agreement may only be amended in writing signed by both parties.

---

**AGREED AND ACCEPTED:**

**Disclosing Party:**
Signature: ____________________
Name: {{disclosing_party_signatory}}
Title: {{disclosing_party_title}}
Date: ____________________

**Receiving Party:**
Signature: ____________________
Name: {{receiving_party_signatory}}
Title: {{receiving_party_title}}
Date: ____________________
`;

export const onboardingPlanTemplate = `
**30-60-90 DAY ONBOARDING PLAN**

**Employee:** {{employee_name}}
**Position:** {{role_title}}
**Department:** {{department}}
**Start Date:** {{start_date}}
**Manager:** {{manager_name}}
**Buddy/Mentor:** {{buddy_name}}

---

## FIRST 30 DAYS: LEARNING & ORIENTATION

**Objectives:**
{{first_30_objectives}}

### Week 1: Welcome & Setup
- [ ] Complete HR onboarding paperwork
- [ ] IT setup and access credentials
- [ ] Workspace/equipment setup
- [ ] Introduction to team members
- [ ] Review company handbook and policies
- [ ] Schedule 1:1 with manager
- [ ] Meet with buddy/mentor

### Week 2-4: Foundation Building
{{first_30_tasks}}

**Key Milestones:**
- Complete all mandatory training
- Understand team structure and key stakeholders
- Review and understand current projects

---

## DAYS 31-60: CONTRIBUTING & INTEGRATING

**Objectives:**
{{days_31_60_objectives}}

### Key Focus Areas:
{{days_31_60_tasks}}

**Key Milestones:**
- Begin contributing to team projects
- Complete role-specific training
- Build cross-functional relationships
- First performance check-in with manager

---

## DAYS 61-90: PERFORMING & GROWING

**Objectives:**
{{days_61_90_objectives}}

### Key Focus Areas:
{{days_61_90_tasks}}

**Key Milestones:**
- Independent ownership of assigned responsibilities
- Measurable contribution to team goals
- 90-day review meeting
- Development plan discussion

---

## SUCCESS METRICS

**30-Day Evaluation:**
{{day_30_metrics}}

**60-Day Evaluation:**
{{day_60_metrics}}

**90-Day Evaluation:**
{{day_90_metrics}}

---

## RESOURCES & CONTACTS

**HR Contact:** {{hr_contact}}
**IT Support:** {{it_support}}
**Manager:** {{manager_name}} - {{manager_email}}
**Buddy:** {{buddy_name}} - {{buddy_email}}

---

**Manager Approval:**
Name: {{signatory_name}}
Date: {{approval_date}}
Signature: ____________________

**Employee Acknowledgment:**
I have reviewed and understand this onboarding plan.
Name: {{employee_name}}
Date: ____________________
Signature: ____________________
`;

export const evpBuilderTemplate = `
**EMPLOYEE VALUE PROPOSITION (EVP)**

**{{company_name}}**
Version: {{version}}
Date: {{creation_date}}

---

## 1. COMPANY OVERVIEW

**Mission:**
{{company_mission}}

**Vision:**
{{company_vision}}

**Core Values:**
{{core_values}}

---

## 2. EVP STATEMENT

**Our Promise to Employees:**
{{evp_statement}}

---

## 3. EVP PILLARS

### 3.1 Compensation & Benefits
{{compensation_pillar}}

### 3.2 Career Growth & Development
{{career_pillar}}

### 3.3 Work-Life Balance
{{work_life_pillar}}

### 3.4 Culture & Community
{{culture_pillar}}

### 3.5 Purpose & Impact
{{purpose_pillar}}

---

## 4. DIFFERENTIATORS

**What Makes Us Unique:**
{{differentiators}}

---

## 5. TARGET AUDIENCES

### Primary Talent Personas:
{{talent_personas}}

### Key Messages by Audience:
{{key_messages}}

---

## 6. PROOF POINTS

**Employee Testimonials:**
{{testimonials}}

**Awards & Recognition:**
{{awards}}

**Statistics:**
{{statistics}}

---

## 7. EVP MESSAGING FRAMEWORK

**Tagline:**
{{tagline}}

**Elevator Pitch (30 seconds):**
{{elevator_pitch}}

**Extended Narrative:**
{{extended_narrative}}

---

## 8. APPLICATION GUIDELINES

**Recruitment:**
{{recruitment_application}}

**Internal Communications:**
{{internal_application}}

**Employer Branding:**
{{branding_application}}

---

Prepared by:
**{{signatory_name}}**
{{signatory_title}}
{{company_name}}
`;

export const brandingPostTemplate = `
**EMPLOYER BRANDING POST**

**Company:** {{company_name}}
**Platform:** {{platform}}
**Post Type:** {{post_type}}
**Campaign:** {{campaign_name}}
**Date:** {{post_date}}

---

## POST CONTENT

### Headline/Hook:
{{headline}}

### Main Copy:
{{main_copy}}

### Call to Action:
{{call_to_action}}

### Hashtags:
{{hashtags}}

---

## VISUAL GUIDELINES

**Recommended Image/Video:**
{{visual_description}}

**Brand Elements:**
- Logo placement: {{logo_placement}}
- Brand colors: {{brand_colors}}
- Font style: {{font_style}}

---

## POST VARIATIONS

**LinkedIn Version:**
{{linkedin_version}}

**Instagram Version:**
{{instagram_version}}

**Twitter/X Version:**
{{twitter_version}}

---

## ENGAGEMENT GUIDELINES

**Respond to comments with:**
{{response_guidelines}}

**Key talking points:**
{{talking_points}}

---

## COMPLIANCE CHECK

- [ ] Approved by Marketing
- [ ] Approved by HR
- [ ] Legal review (if required)
- [ ] Accessibility check complete

---

Created by:
**{{signatory_name}}**
{{signatory_title}}
Date: {{creation_date}}
`;
