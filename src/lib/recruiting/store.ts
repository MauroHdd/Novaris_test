/**
 * Recruiting data layer.
 *
 * DEMO MODE (no Supabase configured): data lives only in this browser's localStorage.
 * It is never sent anywhere and is visible only on the device that created it.
 * PRODUCTION (Stage 9): the same functions are re-implemented against Supabase tables
 * protected by Row Level Security (see supabase/migrations/0001_recruiting.sql).
 */
import { useSyncExternalStore } from 'react'
import { DEFAULT_ONBOARDING, type Application, type ApplicationInput, type Interview, type Status } from './types'

const KEY = 'novaris.demo.applications.v1'
export const DEMO_ACTOR = 'Admin (demo)'

let cache: Application[] | null = null
const listeners = new Set<() => void>()

function uid() {
  return (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`)
}
function now() { return new Date().toISOString() }

function load(): Application[] {
  if (cache) return cache
  try { cache = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { cache = [] }
  return cache!
}
function save(next: Application[]) {
  cache = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage unavailable: keep in memory */ }
  listeners.forEach((l) => l())
}
function update(id: string, fn: (a: Application) => Application) {
  save(load().map((a) => (a.id === id ? fn(a) : a)))
}

export function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l) }
export function useApplications() { return useSyncExternalStore(subscribe, load, load) }
export function useApplication(id: string | undefined) {
  const all = useApplications()
  return all.find((a) => a.id === id)
}

export async function createApplication(input: ApplicationInput, opts: { demo?: boolean } = {}): Promise<Application> {
  const app: Application = {
    ...input,
    id: uid(),
    submittedAt: now(),
    status: 'New Application',
    notes: [],
    interviews: [],
    onboarding: DEFAULT_ONBOARDING.map((o) => ({ ...o })),
    history: [{ at: now(), by: 'Applicant', action: 'Application submitted' }],
    arrangement: null,
    demo: opts.demo,
  }
  save([app, ...load()])
  return app
}

export function setStatus(id: string, status: Status, by = DEMO_ACTOR) {
  update(id, (a) => a.status === status ? a : ({ ...a, status, history: [...a.history, { at: now(), by, action: `Status changed: ${a.status} → ${status}` }] }))
}

export function addNote(id: string, body: string, by = DEMO_ACTOR) {
  update(id, (a) => ({ ...a, notes: [...a.notes, { id: uid(), at: now(), author: by, body }], history: [...a.history, { at: now(), by, action: 'Note added' }] }))
}

export function scheduleInterview(id: string, i: Omit<Interview, 'id' | 'outcome' | 'feedback'>, by = DEMO_ACTOR) {
  update(id, (a) => ({
    ...a,
    status: ['New Application', 'Under Review', 'Contacted'].includes(a.status) ? 'Interview Scheduled' : a.status,
    interviews: [...a.interviews, { ...i, id: uid(), outcome: 'Pending', feedback: '' }],
    history: [...a.history, { at: now(), by, action: `Interview scheduled (${i.format}) for ${new Date(i.scheduledFor).toLocaleString()}` }],
  }))
}

export function recordOutcome(id: string, interviewId: string, outcome: Interview['outcome'], feedback: string, by = DEMO_ACTOR) {
  update(id, (a) => ({
    ...a,
    status: a.status === 'Interview Scheduled' && outcome !== 'Pending' && outcome !== 'No show' ? 'Interview Completed' : a.status,
    interviews: a.interviews.map((iv) => (iv.id === interviewId ? { ...iv, outcome, feedback } : iv)),
    history: [...a.history, { at: now(), by, action: `Interview outcome recorded: ${outcome}` }],
  }))
}

export function setArrangement(id: string, arrangement: string, by = DEMO_ACTOR) {
  update(id, (a) => ({ ...a, arrangement, history: [...a.history, { at: now(), by, action: `Arrangement set: ${arrangement}` }] }))
}

export function markHired(id: string, by = DEMO_ACTOR) {
  update(id, (a) => ({ ...a, status: 'Onboarding', history: [...a.history, { at: now(), by, action: 'Marked as hired, onboarding started' }] }))
}

export function toggleOnboarding(id: string, key: string, by = DEMO_ACTOR) {
  update(id, (a) => {
    const onboarding = a.onboarding.map((o) => (o.key === key ? { ...o, done: !o.done, at: !o.done ? now() : undefined } : o))
    const item = onboarding.find((o) => o.key === key)!
    return { ...a, onboarding, history: [...a.history, { at: now(), by, action: `Onboarding: "${item.label}" ${item.done ? 'completed' : 'reopened'}` }] }
  })
}

export function deleteApplication(id: string) { save(load().filter((a) => a.id !== id)) }

/** Clearly-labelled sample records so the dashboard can be explored before real applications exist. */
export async function loadSampleData() {
  const samples: [string, string, string, Status][] = [
    ['Sample', 'Applicant A', 'insurance-agent', 'New Application'],
    ['Sample', 'Applicant B', 'sales-representative', 'Under Review'],
    ['Sample', 'Applicant C', 'lead-generation-specialist', 'Interview Scheduled'],
    ['Sample', 'Applicant D', 'trainee', 'Onboarding'],
  ]
  for (const [firstName, lastName, positionId, status] of samples) {
    const a = await createApplication({
      firstName, lastName, phone: '(555) 010-0000', email: `${lastName.replace(/\s/g, '').toLowerCase()}@example.com`,
      city: 'Sample City', state: 'FL', positionId, previousEmployment: 'Sample previous employer',
      salesExperience: '1–2 years', insuranceExperience: 'None', financialExperience: 'None', currentEmploymentStatus: 'Employed full-time',
      whyNovaris: 'This is sample data for exploring the dashboard.', preferredContact: 'Email', interviewAvailability: ['Weekday afternoons'],
      availabilityNotes: '', consentPrivacy: true, consentContact: true, consentMarketing: false,
    }, { demo: true })
    if (status !== 'New Application') setStatus(a.id, status)
  }
}

export function clearSampleData() { save(load().filter((a) => !a.demo)) }
