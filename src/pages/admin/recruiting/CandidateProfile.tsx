import { ArrowLeft, Calendar, Check, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, ShieldCheck, Trash2, UserCheck, XCircle } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { arrangementOptions, roles } from '../../../content/careers'
import {
  addNote, deleteApplication, markHired, recordOutcome, scheduleInterview, setArrangement, setStatus, toggleOnboarding, useApplication,
} from '../../../lib/recruiting/store'
import { STATUSES, type Interview, type Status } from '../../../lib/recruiting/types'
import { fmtDate, StatusPill } from './statusStyle'

function Card({ title, icon, children, action }: { title: string; icon?: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-onyx">
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</h2>{action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  )
}
const inputCls = 'w-full rounded-xl border border-line bg-white/[0.02] px-3 py-2.5 text-sm text-platinum placeholder:text-mist focus:border-champagne/60 focus:outline-none'

export default function CandidateProfile() {
  const { id } = useParams()
  const a = useApplication(id)
  const navigate = useNavigate()
  const [note, setNote] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [iv, setIv] = useState({ date: '', time: '10:00', format: 'Video' as Interview['format'], interviewer: '' })
  const [outcomeDraft, setOutcomeDraft] = useState<Record<string, { outcome: Interview['outcome']; feedback: string }>>({})

  if (!a) return (
    <div className="py-20 text-center"><p className="font-semibold">Applicant not found</p><Link to="/admin/recruiting" className="btn-ghost mt-6">Back to applicants</Link></div>
  )

  const role = roles.find((r) => r.id === a.positionId)
  const onboardDone = a.onboarding.filter((o) => o.done).length
  const pct = Math.round((onboardDone / a.onboarding.length) * 100)
  const currentIdx = STATUSES.indexOf(a.status)

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/admin/recruiting" className="inline-flex items-center gap-2 text-sm text-silver hover:text-platinum"><ArrowLeft size={15} /> All applicants</Link>

      {/* header */}
      <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-gradient-to-br from-graphite to-onyx p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-champagne/30 bg-champagne/[0.06] font-display text-lg text-champagne">
            {a.firstName[0]}{a.lastName[0]}
          </div>
          <div>
            <h1 className="font-sans text-2xl font-semibold">{a.firstName} {a.lastName} {a.demo && <span className="ml-2 align-middle text-[10px] text-mist">SAMPLE</span>}</h1>
            <p className="mt-1 text-sm text-silver">{role?.title ?? a.positionId} · Applied {fmtDate(a.submittedAt, true)}</p>
            <div className="mt-2"><StatusPill status={a.status} /></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value as Status)} aria-label="Change status"
            className="rounded-xl border border-line bg-ink px-3 py-2.5 text-sm focus:border-champagne/60 focus:outline-none">
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          {!['Onboarding', 'Active'].includes(a.status) && (
            <button onClick={() => markHired(a.id)} className="inline-flex items-center gap-2 rounded-xl bg-platinum px-4 py-2.5 text-sm font-semibold text-ink hover:bg-white">
              <UserCheck size={15} /> Mark as hired
            </button>
          )}
        </div>
      </div>

      {/* pipeline */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-onyx px-4 py-4">
        <ol className="flex min-w-max items-center gap-2">
          {STATUSES.slice(0, 8).map((s, i) => {
            const done = currentIdx >= i && currentIdx < 8
            return (
              <li key={s} className="flex items-center gap-2">
                <button onClick={() => setStatus(a.id, s)} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-colors ${a.status === s ? 'bg-champagne text-ink' : done ? 'text-platinum' : 'text-mist hover:text-silver'}`}>
                  {done && a.status !== s ? <Check size={12} className="text-champagne" /> : <span className="font-display text-[9px]">{i + 1}</span>}{s}
                </button>
                {i < 7 && <span className={`h-px w-5 ${done ? 'bg-champagne/50' : 'bg-white/10'}`} />}
              </li>
            )
          })}
          <li className="ml-4 flex gap-2">
            {(['Rejected', 'Withdrawn'] as Status[]).map((s) => (
              <button key={s} onClick={() => setStatus(a.id, s)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${a.status === s ? 'border-red-300/40 text-red-200' : 'border-line text-mist hover:text-silver'}`}>
                <XCircle size={12} />{s}
              </button>
            ))}
          </li>
        </ol>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-4">
          <Card title="Contact information">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3"><Mail size={15} className="text-champagne" /><a href={`mailto:${a.email}`} className="hover:underline">{a.email}</a></div>
              <div className="flex items-center gap-3"><Phone size={15} className="text-champagne" /><a href={`tel:${a.phone.replace(/\D/g, '')}`} className="hover:underline">{a.phone}</a></div>
              <div className="flex items-center gap-3"><MapPin size={15} className="text-champagne" />{a.city}, {a.state}</div>
              <div className="flex items-center gap-3"><MessageSquare size={15} className="text-champagne" />Prefers: {a.preferredContact}</div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4 text-xs">
              <span className={`rounded-full border px-2.5 py-1 ${a.consentContact ? 'border-emerald-300/30 text-emerald-200' : 'border-red-300/30 text-red-200'}`}>Contact consent: {a.consentContact ? 'Yes' : 'No'}</span>
              <span className={`rounded-full border px-2.5 py-1 ${a.consentMarketing ? 'border-emerald-300/30 text-emerald-200' : 'border-line text-mist'}`}>Marketing calls/texts: {a.consentMarketing ? 'Consented' : 'Not consented'}</span>
              <span className="rounded-full border border-line px-2.5 py-1 text-mist">Privacy notice: {a.consentPrivacy ? 'Acknowledged' : '—'}</span>
            </div>
          </Card>

          <Card title="Experience">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {[['Sales', a.salesExperience], ['Insurance', a.insuranceExperience], ['Financial services', a.financialExperience], ['Current status', a.currentEmploymentStatus]].map(([k, v]) => (
                <div key={k}><dt className="text-xs text-mist">{k}</dt><dd className="mt-1">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-5"><p className="text-xs text-mist">Previous employment</p><p className="mt-1 whitespace-pre-wrap text-sm text-silver">{a.previousEmployment}</p></div>
            <div className="mt-5"><p className="text-xs text-mist">Why NOVARIS</p><p className="mt-1 whitespace-pre-wrap text-sm text-silver">{a.whyNovaris}</p></div>
            <div className="mt-5"><p className="text-xs text-mist">Interview availability</p><p className="mt-1 text-sm text-silver">{a.interviewAvailability.join(', ')}{a.availabilityNotes && ` · ${a.availabilityNotes}`}</p></div>
            {role?.licenseRequired && <p className="mt-5 flex items-center gap-2 rounded-xl border border-champagne/30 bg-champagne/[0.05] px-3 py-2 text-xs text-champagne-soft"><ShieldCheck size={14} /> This role requires an active state license. Verify before any regulated activity.</p>}
          </Card>

          <Card title="Interviews" icon={<Calendar size={15} className="text-champagne" />}>
            {a.interviews.length > 0 && (
              <ul className="mb-5 space-y-3">
                {a.interviews.map((i) => {
                  const d = outcomeDraft[i.id] ?? { outcome: i.outcome, feedback: i.feedback }
                  return (
                    <li key={i.id} className="rounded-xl border border-line p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="font-medium">{fmtDate(i.scheduledFor, true)} · {i.format}</span>
                        <span className="text-xs text-mist">with {i.interviewer || '—'}</span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-[160px_1fr_auto]">
                        <select className={inputCls} value={d.outcome} onChange={(e) => setOutcomeDraft({ ...outcomeDraft, [i.id]: { ...d, outcome: e.target.value as Interview['outcome'] } })} aria-label="Outcome">
                          {['Pending', 'Advance', 'Hold', 'Do not advance', 'No show'].map((o) => <option key={o}>{o}</option>)}
                        </select>
                        <input className={inputCls} placeholder="Interview feedback" value={d.feedback} onChange={(e) => setOutcomeDraft({ ...outcomeDraft, [i.id]: { ...d, feedback: e.target.value } })} />
                        <button onClick={() => recordOutcome(a.id, i.id, d.outcome, d.feedback)} className="rounded-xl border border-line px-4 py-2 text-sm hover:border-champagne/50">Save</button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
            <form className="grid gap-2 sm:grid-cols-2" onSubmit={(e) => {
              e.preventDefault()
              if (!iv.date) return
              scheduleInterview(a.id, { scheduledFor: new Date(`${iv.date}T${iv.time}`).toISOString(), format: iv.format, interviewer: iv.interviewer })
              setIv({ ...iv, date: '', interviewer: '' })
            }}>
              <input type="date" required className={inputCls} value={iv.date} onChange={(e) => setIv({ ...iv, date: e.target.value })} aria-label="Interview date" />
              <input type="time" required className={inputCls} value={iv.time} onChange={(e) => setIv({ ...iv, time: e.target.value })} aria-label="Interview time" />
              <select className={inputCls} value={iv.format} onChange={(e) => setIv({ ...iv, format: e.target.value as Interview['format'] })} aria-label="Format">
                {['Phone', 'Video', 'In person'].map((f) => <option key={f}>{f}</option>)}
              </select>
              <input className={inputCls} placeholder="Interviewer" value={iv.interviewer} onChange={(e) => setIv({ ...iv, interviewer: e.target.value })} />
              <button className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-semibold hover:bg-white/[0.1] sm:col-span-2">Schedule interview</button>
            </form>
            <p className="mt-2 text-[11px] text-mist">Calendar invites and reminders are sent automatically once email/calendar are connected (Stage 10).</p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Onboarding" icon={<CheckCircle2 size={15} className="text-champagne" />} action={<span className="text-xs text-mist">{pct}%</span>}>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-champagne-deep to-champagne-soft transition-all duration-700" style={{ width: `${pct}%` }} /></div>
            <div className="mt-5">
              <label className="text-xs text-mist" htmlFor="arr">Arrangement (set after legal classification)</label>
              <select id="arr" className={`${inputCls} mt-1`} value={a.arrangement ?? ''} onChange={(e) => setArrangement(a.id, e.target.value)}>
                <option value="" disabled>Not set</option>
                {arrangementOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <ul className="mt-5 space-y-2">
              {a.onboarding.map((o) => (
                <li key={o.key}>
                  <button onClick={() => toggleOnboarding(a.id, o.key)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm hover:bg-white/[0.03]">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${o.done ? 'border-champagne bg-champagne text-ink' : 'border-white/25'}`}>{o.done && <Check size={12} strokeWidth={3} />}</span>
                    <span className={o.done ? 'text-silver line-through decoration-white/20' : ''}>{o.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            {pct === 100 && a.status !== 'Active' && (
              <button onClick={() => setStatus(a.id, 'Active')} className="mt-4 w-full rounded-xl bg-platinum py-2.5 text-sm font-semibold text-ink">Mark as Active</button>
            )}
          </Card>

          <Card title="Internal notes" icon={<MessageSquare size={15} className="text-champagne" />}>
            <form onSubmit={(e) => { e.preventDefault(); if (note.trim()) { addNote(a.id, note.trim()); setNote('') } }}>
              <textarea className={`${inputCls} min-h-[90px]`} placeholder="Add a private note (visible to authorized staff only)…" value={note} onChange={(e) => setNote(e.target.value)} />
              <button className="mt-2 rounded-xl bg-white/[0.06] px-4 py-2 text-sm font-semibold hover:bg-white/[0.1]">Add note</button>
            </form>
            <ul className="mt-5 space-y-3">
              {[...a.notes].reverse().map((n) => (
                <li key={n.id} className="rounded-xl border border-line p-3">
                  <p className="whitespace-pre-wrap text-sm">{n.body}</p>
                  <p className="mt-2 text-[11px] text-mist">{n.author} · {fmtDate(n.at, true)}</p>
                </li>
              ))}
              {a.notes.length === 0 && <li className="text-sm text-mist">No notes yet.</li>}
            </ul>
          </Card>

          <Card title="Activity log" icon={<Clock size={15} className="text-champagne" />}>
            <ol className="relative space-y-4 border-l border-line pl-4">
              {[...a.history].reverse().map((h, i) => (
                <li key={i} className="relative text-sm">
                  <span className="absolute -left-[19.5px] top-1.5 h-1.5 w-1.5 rounded-full bg-champagne/70" />
                  <p>{h.action}</p><p className="text-[11px] text-mist">{h.by} · {fmtDate(h.at, true)}</p>
                </li>
              ))}
            </ol>
          </Card>

          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} className="inline-flex items-center gap-2 text-xs text-mist hover:text-red-200"><Trash2 size={13} /> Delete applicant</button>
          ) : (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-red-200">Delete permanently?</span>
              <button onClick={() => { deleteApplication(a.id); navigate('/admin/recruiting') }} className="rounded-lg border border-red-300/40 px-3 py-1.5 text-red-200">Delete</button>
              <button onClick={() => setConfirmDelete(false)} className="text-mist hover:text-platinum">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
