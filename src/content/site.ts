/**
 * NOVARIS – editable site content.
 * Everything a non-developer may need to change lives here.
 * Items marked [PLACEHOLDER] must be confirmed before launch.
 */

export const brand = {
  name: 'NOVARIS',
  tagline: 'WHERE AMBITION MEETS EXECUTION.',
  /** Put the official logo at /public/brand/novaris-logo.png (or .svg) and set the path here.
   *  While empty, a neutral placeholder mark is shown. */
  logoSrc: '' as string,
  email: '[PLACEHOLDER: contact email]',
  phone: '[PLACEHOLDER: phone]',
  location: '[PLACEHOLDER: city, state]',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Partnerships', to: '/partnerships' },
  { label: 'Contact', to: '/contact' },
] as const

export const academyLink = { label: 'Academy Login', to: '/academy/login' }

export const focusAreas = [
  'Insurance-related services',
  'Financial services',
  'Lead generation',
  'Sales development',
  'Business partnerships',
  'Recruiting & professional development',
]

/** How each service is delivered. Keep this accurate: regulated activities must show
 *  that they are carried out by appropriately licensed professionals. */
export type Delivery = 'direct' | 'licensed'

export const services: {
  id: string
  index: string
  title: string
  kicker: string
  summary: string
  points: string[]
  delivery: Delivery
}[] = [
  {
    id: 'insurance',
    index: '01',
    title: 'Insurance Services',
    kicker: 'Coverage, connected',
    summary:
      'NOVARIS supports insurance-related business activity: connecting individuals and businesses with insurance professionals, and building the teams that serve them.',
    points: ['Client introductions & referrals', 'Agent team development', 'Carrier & agency relationships'],
    delivery: 'licensed',
  },
  {
    id: 'financial',
    index: '02',
    title: 'Financial Services',
    kicker: 'Advisory-ready',
    summary:
      'We open the door to financial services and advisory-related opportunities, with every regulated conversation handled by appropriately qualified professionals.',
    points: ['Financial services introductions', 'Advisor partnerships', 'Client education'],
    delivery: 'licensed',
  },
  {
    id: 'leads',
    index: '03',
    title: 'Lead Generation',
    kicker: 'Develop · Qualify · Distribute',
    summary:
      'NOVARIS develops, organizes, qualifies and distributes leads, for our own sales organization and for approved partners, with consent and data separation built in.',
    points: ['Lead sourcing & qualification', 'Organized distribution', 'Partner-separated data'],
    delivery: 'direct',
  },
  {
    id: 'bizdev',
    index: '04',
    title: 'Business Development',
    kicker: 'Organizations that scale',
    summary:
      'We build sales organizations, partnerships and business relationships designed for long-term growth, not short-term volume.',
    points: ['Sales organization design', 'Strategic partnerships', 'Market expansion'],
    delivery: 'direct',
  },
  {
    id: 'talent',
    index: '05',
    title: 'Recruiting & Professional Development',
    kicker: 'Talent, developed',
    summary:
      'We identify, recruit, train and develop new talent through structured onboarding and NOVARIS Academy.',
    points: ['Structured recruiting', 'NOVARIS Academy training', 'Leadership pathways'],
    delivery: 'direct',
  },
]

export const pillars = [
  { title: 'Professional Development', body: 'A defined path from day one, with clear expectations at every stage.' },
  { title: 'Training Opportunities', body: 'NOVARIS Academy: structured courses, assessments and roleplay.' },
  { title: 'Technology-Driven Operations', body: 'One platform for recruiting, training, leads and reporting.' },
  { title: 'Business Relationships', body: 'Partnerships built on transparency and protected data.' },
  { title: 'Sales Development', body: 'Ethical, consultative selling taught and practiced as a discipline.' },
  { title: 'Leadership Opportunities', body: 'Room to grow into management as you prove execution.' },
  { title: 'Long-Term Growth', body: 'Built for careers and organizations that compound over years.' },
]

export const legalLinks = [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms of Service', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
  { label: 'Disclosures', to: '/legal/disclosures' },
]

export const footerDisclosure =
  'NOVARIS is a business development organization. Insurance and financial services are offered only through appropriately licensed professionals and partners where required by law. Nothing on this site is an offer to sell insurance or securities in any jurisdiction where such an offer would be unlawful. [PLACEHOLDER: review with counsel before launch.]'
