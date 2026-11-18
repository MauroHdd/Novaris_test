export const STATUSES = [
  'New Application',
  'Under Review',
  'Contacted',
  'Interview Scheduled',
  'Interview Completed',
  'Approved',
  'Onboarding',
  'Active',
  'Rejected',
  'Withdrawn',
] as const
export type Status = (typeof STATUSES)[number]

export const CLOSED: Status[] = ['Rejected', 'Withdrawn']

export type ApplicationInput = {
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  state: string
  positionId: string
  previousEmployment: string
  salesExperience: string
  insuranceExperience: string
  financialExperience: string
  currentEmploymentStatus: string
  whyNovaris: string
  preferredContact: string
  interviewAvailability: string[]
  availabilityNotes: string
  consentPrivacy: boolean
  consentContact: boolean
  consentMarketing: boolean
}

export type Note = { id: string; at: string; author: string; body: string }

export type Interview = {
  id: string
  scheduledFor: string // ISO
  format: 'Phone' | 'Video' | 'In person'
  interviewer: string
  outcome: 'Pending' | 'Advance' | 'Hold' | 'Do not advance' | 'No show'
  feedback: string
}

export type HistoryEntry = { at: string; by: string; action: string }

export type OnboardingItem = { key: string; label: string; done: boolean; at?: string }

export type Application = ApplicationInput & {
  id: string
  submittedAt: string
  status: Status
  notes: Note[]
  interviews: Interview[]
  onboarding: OnboardingItem[]
  history: HistoryEntry[]
  /** Set by NOVARIS when hiring, from the role's legal classification. */
  arrangement: string | null
  demo?: boolean
}

export const DEFAULT_ONBOARDING: OnboardingItem[] = [
  { key: 'offer', label: 'Role & arrangement confirmed in writing', done: false },
  { key: 'agreement', label: 'Agreement signed', done: false },
  { key: 'background', label: 'Background check completed (if required)', done: false },
  { key: 'license', label: 'License verified (if role requires it)', done: false },
  { key: 'academy', label: 'NOVARIS Academy account invited', done: false },
  { key: 'orientation', label: 'Orientation completed', done: false },
]
