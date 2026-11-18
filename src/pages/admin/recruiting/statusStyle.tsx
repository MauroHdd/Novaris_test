import type { Status } from '../../../lib/recruiting/types'

export const statusStyle: Record<Status, string> = {
  'New Application': 'border-champagne/50 text-champagne-soft bg-champagne/[0.08]',
  'Under Review': 'border-white/20 text-platinum bg-white/[0.04]',
  Contacted: 'border-sky-300/30 text-sky-200 bg-sky-300/[0.06]',
  'Interview Scheduled': 'border-violet-300/30 text-violet-200 bg-violet-300/[0.06]',
  'Interview Completed': 'border-indigo-300/30 text-indigo-200 bg-indigo-300/[0.06]',
  Approved: 'border-emerald-300/30 text-emerald-200 bg-emerald-300/[0.06]',
  Onboarding: 'border-teal-300/30 text-teal-200 bg-teal-300/[0.06]',
  Active: 'border-emerald-400/40 text-emerald-100 bg-emerald-400/[0.1]',
  Rejected: 'border-red-300/25 text-red-200/80 bg-red-300/[0.04]',
  Withdrawn: 'border-white/10 text-mist bg-white/[0.02]',
}

export function StatusPill({ status }: { status: Status }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyle[status]}`}>{status}</span>
}

export function fmtDate(iso: string, withTime = false) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}) })
}
