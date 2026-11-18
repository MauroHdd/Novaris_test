import { ArrowUpDown, ChevronRight, Database, Inbox, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { roles } from '../../../content/careers'
import { clearSampleData, loadSampleData, useApplications } from '../../../lib/recruiting/store'
import { CLOSED, STATUSES, type Status } from '../../../lib/recruiting/types'
import { fmtDate, StatusPill } from './statusStyle'

const roleTitle = (id: string) => roles.find((r) => r.id === id)?.title ?? id

export default function RecruitingDashboard() {
  const apps = useApplications()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [position, setPosition] = useState('all')
  const [status, setStatus] = useState<'all' | 'open' | Status>('open')
  const [sortNewest, setSortNewest] = useState(true)

  const counts = useMemo(() => {
    const by = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>
    apps.forEach((a) => by[a.status]++)
    const weekAgo = Date.now() - 7 * 864e5
    return {
      total: apps.length,
      newThisWeek: apps.filter((a) => new Date(a.submittedAt).getTime() > weekAgo).length,
      inInterview: by['Interview Scheduled'] + by['Interview Completed'],
      onboarding: by.Onboarding,
      by,
    }
  }, [apps])

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return apps
      .filter((a) => position === 'all' || a.positionId === position)
      .filter((a) => status === 'all' ? true : status === 'open' ? !CLOSED.includes(a.status) : a.status === status)
      .filter((a) => !term || [a.firstName, a.lastName, a.email, a.phone, a.city, roleTitle(a.positionId)].join(' ').toLowerCase().includes(term))
      .sort((a, b) => (sortNewest ? -1 : 1) * (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()))
  }, [apps, q, position, status, sortNewest])

  const hasDemo = apps.some((a) => a.demo)

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Recruiting</p>
          <h1 className="mt-2 font-sans text-3xl font-semibold">Applicants</h1>
        </div>
        <div className="flex gap-2">
          {!hasDemo ? (
            <button onClick={() => loadSampleData()} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-silver hover:border-champagne/50 hover:text-platinum">
              <Database size={13} /> Load sample data
            </button>
          ) : (
            <button onClick={() => clearSampleData()} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-silver hover:border-red-300/40 hover:text-red-200">
              <Trash2 size={13} /> Remove sample data
            </button>
          )}
        </div>
      </div>

      {/* KPIs: computed only from real records */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Total applicants', counts.total],
          ['New in last 7 days', counts.newThisWeek],
          ['In interview stage', counts.inInterview],
          ['Onboarding', counts.onboarding],
        ].map(([label, n]) => (
          <div key={label as string} className="rounded-2xl border border-line bg-onyx p-5">
            <p className="text-xs text-mist">{label}</p>
            <p className="mt-2 font-sans text-3xl font-semibold tabular-nums">{n}</p>
          </div>
        ))}
      </div>

      {/* pipeline strip */}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-onyx p-2">
        <div className="flex min-w-max gap-1">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(status === s ? 'open' : s)}
              className={`rounded-xl px-3 py-2 text-left transition-colors ${status === s ? 'bg-white/[0.07]' : 'hover:bg-white/[0.03]'}`}>
              <p className="text-[11px] text-mist">{s}</p>
              <p className="font-sans text-lg font-semibold tabular-nums">{counts.by[s]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* filters */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <label className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, city…" aria-label="Search applicants"
            className="w-full rounded-xl border border-line bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm placeholder:text-mist focus:border-champagne/60 focus:outline-none" />
        </label>
        <select value={position} onChange={(e) => setPosition(e.target.value)} aria-label="Filter by position"
          className="rounded-xl border border-line bg-onyx px-4 py-2.5 text-sm text-silver focus:border-champagne/60 focus:outline-none">
          <option value="all">All positions</option>
          {roles.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Filter by status"
          className="rounded-xl border border-line bg-onyx px-4 py-2.5 text-sm text-silver focus:border-champagne/60 focus:outline-none">
          <option value="open">Open applications</option>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-onyx py-20 text-center">
            <Inbox className="text-mist" />
            <p className="mt-4 font-semibold">{apps.length === 0 ? 'No applications yet' : 'No applicants match these filters'}</p>
            <p className="mt-1 max-w-sm text-sm text-mist">
              {apps.length === 0 ? <>Applications submitted on the <Link to="/careers/apply" className="text-silver underline underline-offset-4">careers page</Link> appear here. You can also load sample data to explore.</> : 'Try clearing the search or changing the filters.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-onyx text-left text-xs text-mist">
              <tr>
                <th className="px-5 py-3 font-medium">Applicant</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">Position</th>
                <th className="hidden px-5 py-3 font-medium lg:table-cell">Location</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">
                  <button onClick={() => setSortNewest(!sortNewest)} className="inline-flex items-center gap-1 hover:text-platinum">Applied <ArrowUpDown size={12} /></button>
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((a) => (
                <tr key={a.id} onClick={() => navigate(`/admin/recruiting/${a.id}`)} className="cursor-pointer bg-ink transition-colors hover:bg-white/[0.025]">
                  <td className="px-5 py-4">
                    <p className="font-medium text-platinum">{a.firstName} {a.lastName} {a.demo && <span className="ml-1 rounded border border-line px-1.5 py-0.5 text-[10px] text-mist">SAMPLE</span>}</p>
                    <p className="text-xs text-mist">{a.email}</p>
                  </td>
                  <td className="hidden px-5 py-4 text-silver md:table-cell">{roleTitle(a.positionId)}</td>
                  <td className="hidden px-5 py-4 text-silver lg:table-cell">{a.city}, {a.state}</td>
                  <td className="px-5 py-4"><StatusPill status={a.status} /></td>
                  <td className="hidden px-5 py-4 text-silver sm:table-cell">{fmtDate(a.submittedAt)}</td>
                  <td className="pr-4 text-mist"><ChevronRight size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-3 text-xs text-mist">{rows.length} of {apps.length} applicant{apps.length === 1 ? '' : 's'}</p>
    </div>
  )
}
