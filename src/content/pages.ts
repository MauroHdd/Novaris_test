/**
 * NOVARIS – copy for inner pages (Stage 2). Edit freely.
 * Anything in [PLACEHOLDER: …] must be supplied or confirmed by NOVARIS before launch.
 * Nothing here states history, licenses, partners or results that NOVARIS has not provided.
 */

export const about = {
  intro:
    'NOVARIS is a modern business development organization. We bring talent, training, technology and partnerships together so that ambitious people and organizations can execute at a higher standard.',
  mission:
    'To build disciplined, ethical sales and business development organizations by developing people, generating opportunity and executing with consistency.',
  missionNote: '[PLACEHOLDER: confirm or replace the mission statement]',
  values: [
    { title: 'Professionalism', body: 'We prepare, we follow through, and we represent every client and partner with care.' },
    { title: 'Innovation', body: 'We use technology to remove friction from recruiting, training, lead management and reporting.' },
    { title: 'Execution', body: 'Plans are only as good as the work that follows. We measure what we finish.' },
    { title: 'Integrity', body: 'Honest communication, informed customers, and compliance built into how we work.' },
    { title: 'Long-Term Growth', body: 'We invest in people and relationships designed to last for years, not quarters.' },
  ],
  operatingModel: [
    { step: '01', title: 'Recruit', body: 'Identify motivated people and match them with the right role and arrangement.' },
    { step: '02', title: 'Develop', body: 'Train through NOVARIS Academy with structured courses, roleplay and assessments.' },
    { step: '03', title: 'Equip', body: 'Provide organized leads, tools and clear processes through one platform.' },
    { step: '04', title: 'Execute', body: 'Support consistent daily activity with coaching, accountability and reporting.' },
    { step: '05', title: 'Grow', body: 'Open leadership paths and long-term partnerships as results compound.' },
  ],
  compliance:
    'Some of the industries we work in are regulated. Insurance and financial services activities that require a license are performed only by appropriately licensed professionals or through licensed partners. Training completed through NOVARIS Academy is educational and does not by itself qualify anyone to sell insurance or securities.',
  /** Add real leadership bios here. The section stays hidden while this list is empty. */
  leadership: [] as { name: string; role: string; bio: string }[],
}

/** Extra detail for the Services page, keyed by service id from site.ts. */
export const serviceDetails: Record<string, { detail: string; forWho: string[]; steps: { title: string; body: string }[] }> = {
  insurance: {
    detail:
      'NOVARIS supports insurance-related business activity by connecting people and businesses with insurance professionals and by recruiting, training and organizing the teams that serve them. Quoting, advising on and selling insurance is done only by appropriately licensed agents, either within NOVARIS or through licensed partner agencies.',
    forWho: ['Individuals and families looking for guidance', 'Business owners exploring coverage', 'Licensed agents seeking a structured organization'],
    steps: [
      { title: 'Introduction', body: 'A client or business is connected with the right licensed professional.' },
      { title: 'Needs conversation', body: 'The licensed professional reviews needs and explains options.' },
      { title: 'Ongoing service', body: 'Follow-up and service continue through the licensed agent or partner.' },
    ],
  },
  financial: {
    detail:
      'We open the door to financial services and advisory-related opportunities. Any regulated financial advice, product recommendation or securities activity is handled exclusively by appropriately qualified and registered professionals. NOVARIS does not provide investment advice directly unless and until it holds the required registrations.',
    forWho: ['People starting to plan their financial future', 'Clients referred from other NOVARIS services', 'Qualified advisors interested in partnership'],
    steps: [
      { title: 'Education', body: 'General financial concepts are explained in plain language.' },
      { title: 'Referral', body: 'Interested clients are introduced to a qualified professional.' },
      { title: 'Professional guidance', body: 'Suitability-based recommendations come only from that professional.' },
    ],
  },
  leads: {
    detail:
      'Lead generation is a core NOVARIS discipline. We develop leads, verify and qualify them, organize them in our CRM and distribute them to our own sales organization or to approved external partners. Every lead keeps a record of its source and consent, and partner data is kept separate.',
    forWho: ['NOVARIS sales teams', 'Approved insurance and financial services partners', 'Sales organizations that need qualified opportunities'],
    steps: [
      { title: 'Develop', body: 'Leads are generated from consent-based sources.' },
      { title: 'Qualify', body: 'Each lead is checked, categorized and scored for fit.' },
      { title: 'Distribute', body: 'Leads go to the right team or partner, with full tracking.' },
    ],
  },
  bizdev: {
    detail:
      'We help build sales organizations from the ground up: structure, roles, training paths, lead flow and reporting. We also form business partnerships that create value on both sides and are built to last.',
    forWho: ['Organizations building or rebuilding a sales team', 'Companies seeking strategic partners', 'Leaders expanding into new markets'],
    steps: [
      { title: 'Assess', body: 'Understand goals, current structure and gaps.' },
      { title: 'Design', body: 'Define roles, processes, training and lead flow.' },
      { title: 'Execute', body: 'Launch, measure and refine together.' },
    ],
  },
  talent: {
    detail:
      'We identify, recruit, train and develop new talent, from people new to sales to experienced professionals ready to lead. Every role is set up under the employment or contractor arrangement that properly fits it, and development continues through NOVARIS Academy.',
    forWho: ['People starting a sales career', 'Experienced sales and insurance professionals', 'Future managers and leaders'],
    steps: [
      { title: 'Apply', body: 'Candidates apply through the NOVARIS careers portal.' },
      { title: 'Onboard', body: 'Approved candidates complete onboarding and required steps.' },
      { title: 'Develop', body: 'Training, coaching and leadership paths through NOVARIS Academy.' },
    ],
  },
}

export const inquiryTypes = [
  'General inquiry',
  'Business partnership',
  'Recruiting question',
  'Insurance-related inquiry',
  'Financial services inquiry',
  'Technical support',
] as const

export type LegalDoc = { slug: string; title: string; summary: string; sections: string[] }

/** Placeholder legal documents. Each must be written or approved by qualified counsel before launch. */
export const legalDocs: LegalDoc[] = [
  { slug: 'privacy', title: 'Privacy Policy', summary: 'How NOVARIS collects, uses, shares and protects personal information.',
    sections: ['Information we collect', 'How we use information', 'How we share information', 'Your choices and rights', 'Data security', 'Children’s privacy', 'Changes to this policy', 'Contact us'] },
  { slug: 'terms', title: 'Terms of Service', summary: 'The rules for using the NOVARIS website and platform.',
    sections: ['Acceptance of terms', 'Use of the site', 'Accounts and access', 'Intellectual property', 'Disclaimers', 'Limitation of liability', 'Governing law', 'Contact us'] },
  { slug: 'cookies', title: 'Cookie Policy', summary: 'How NOVARIS uses cookies and similar technologies.',
    sections: ['What cookies are', 'Cookies we use', 'Analytics', 'Managing cookies', 'Updates'] },
  { slug: 'applicant-privacy', title: 'Applicant Privacy Notice', summary: 'How information submitted with a job or contractor application is handled.',
    sections: ['Information collected from applicants', 'Why we collect it', 'Who can access it', 'How long we keep it', 'Your rights', 'Contact us'] },
  { slug: 'marketing-consent', title: 'Marketing Consent', summary: 'How NOVARIS asks for and records consent for marketing calls, texts and emails.',
    sections: ['What you are agreeing to', 'Calls and text messages', 'Email', 'How to opt out', 'Record keeping'] },
  { slug: 'data-retention', title: 'Data Retention Policy', summary: 'How long NOVARIS keeps different kinds of information and how it is deleted.',
    sections: ['Scope', 'Retention periods', 'Deletion and anonymization', 'Legal holds', 'Review schedule'] },
  { slug: 'disclosures', title: 'Insurance & Financial Services Disclosures', summary: 'Required disclosures about licensed activities and partners.',
    sections: ['Licensed activities', 'Licensing information', 'Partner relationships', 'No offer where prohibited', 'Educational content'] },
]
