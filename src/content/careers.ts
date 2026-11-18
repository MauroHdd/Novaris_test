/**
 * NOVARIS careers content. Edit freely.
 *
 * IMPORTANT: Employment classification (W-2 employee, 1099 contractor, independent agent)
 * and compensation must be set PER ROLE by NOVARIS, based on proper legal classification.
 * While a value is null, the site shows a neutral "confirmed during the hiring process" message
 * instead of guessing.
 */

export type Arrangement = 'W-2 employee' | '1099 independent contractor' | 'Independent insurance agent'

export type Role = {
  id: string
  title: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  licenseRequired: boolean
  /** Set per role after legal review. null = not published yet. */
  arrangements: Arrangement[] | null
  /** Plain-language compensation description, e.g. "Commission-based". null = not published yet. */
  compensation: string | null
  location: string
  open: boolean
}

export const roles: Role[] = [
  {
    id: 'insurance-agent',
    title: 'Insurance Agent',
    summary: 'Help individuals, families and businesses understand their coverage options as part of a structured, supportive organization.',
    responsibilities: ['Conduct needs-based conversations with clients', 'Follow up on assigned and self-generated leads', 'Maintain accurate records in the NOVARIS CRM'],
    requirements: ['Active state insurance license for the lines you will sell (or willingness to obtain one before selling)', 'Professional communication skills', 'Commitment to compliance and client care'],
    licenseRequired: true,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
  {
    id: 'sales-representative',
    title: 'Sales Representative',
    summary: 'Build relationships, set appointments and move prospects through a disciplined sales process.',
    responsibilities: ['Contact and qualify prospects', 'Schedule appointments for the appropriate licensed professional', 'Track daily activity and follow-ups'],
    requirements: ['Strong phone and in-person communication', 'Self-discipline and consistency', 'Sales experience helpful, not required'],
    licenseRequired: false,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
  {
    id: 'lead-generation-specialist',
    title: 'Lead Generation Specialist',
    summary: 'Develop, verify and organize high-quality, consent-based leads for NOVARIS teams and approved partners.',
    responsibilities: ['Source and qualify leads using approved methods', 'Keep lead records complete and accurate', 'Follow consent and data-handling rules'],
    requirements: ['Attention to detail', 'Comfort with CRM tools and spreadsheets', 'Understanding of (or willingness to learn) consent requirements'],
    licenseRequired: false,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
  {
    id: 'business-development-representative',
    title: 'Business Development Representative',
    summary: 'Open doors with organizations that can benefit from partnering with NOVARIS.',
    responsibilities: ['Research and contact potential partners', 'Present NOVARIS partnership options', 'Coordinate next steps with leadership'],
    requirements: ['B2B communication skills', 'Organized follow-up', 'Business development experience a plus'],
    licenseRequired: false,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
  {
    id: 'sales-manager',
    title: 'Sales Manager / Leadership',
    summary: 'Lead, coach and develop a team, and help build the next generation of NOVARIS leaders.',
    responsibilities: ['Recruit, train and coach team members', 'Manage pipeline and activity reporting', 'Model ethical, compliant selling'],
    requirements: ['Proven sales results', 'Experience leading or mentoring others', 'Applicable licenses where the team sells regulated products'],
    licenseRequired: false,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
  {
    id: 'trainee',
    title: 'Trainee: New to Sales',
    summary: 'No experience? Start with NOVARIS Academy and a structured path into a sales career.',
    responsibilities: ['Complete assigned NOVARIS Academy courses', 'Shadow experienced team members', 'Practice through roleplay and coaching'],
    requirements: ['Coachability and work ethic', 'Reliable availability for training', 'Desire to build a long-term career'],
    licenseRequired: false,
    arrangements: null,
    compensation: null,
    location: '[PLACEHOLDER: location / remote]',
    open: true,
  },
]

export const arrangementOptions: Arrangement[] = ['W-2 employee', '1099 independent contractor', 'Independent insurance agent']

export const hiringSteps = [
  { title: 'Apply', body: 'Complete the online application. It takes about 5 minutes.' },
  { title: 'Review', body: 'Our recruiting team reviews your background and goals.' },
  { title: 'Conversation', body: 'Qualified candidates are invited to an interview.' },
  { title: 'Decision', body: 'We confirm the role, arrangement and next steps in writing.' },
  { title: 'Onboarding', body: 'Complete onboarding and begin NOVARIS Academy.' },
]

export const whyJoin = [
  { title: 'Structured training', body: 'NOVARIS Academy gives you courses, roleplay and assessments from day one.' },
  { title: 'Clear expectations', body: 'Know what success looks like in your role and how it is measured.' },
  { title: 'Real support', body: 'Coaching, tools and organized processes so you can focus on execution.' },
  { title: 'Room to grow', body: 'Leadership paths open up as you consistently deliver results.' },
]

export const applicationOptions = {
  employmentStatus: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Not currently employed', 'Student', 'Other'],
  experienceLevels: ['None', 'Less than 1 year', '1–2 years', '3–5 years', '6–10 years', 'More than 10 years'],
  contactMethods: ['Phone call', 'Text message', 'Email'],
  availability: ['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekends'],
}
