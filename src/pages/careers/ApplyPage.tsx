import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2, Lock } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { applicationOptions, roles } from '../../content/careers'
import { ease } from '../../components/fx/Reveal'
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Form'
import { PageHero } from '../../components/ui/Page'
import { formatPhone, validators } from '../../lib/forms'
import { submitApplication } from '../../lib/recruiting/submit'
import type { ApplicationInput } from '../../lib/recruiting/types'

const US_STATES = 'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA PR RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ')
const STEPS = ['About you', 'Experience', 'Availability & consent'] as const
type Errors = Partial<Record<keyof ApplicationInput, string>>

function Pills({ options, value, onChange, multi = false, error }: { options: string[]; value: string | string[]; onChange: (v: any) => void; multi?: boolean; error?: string }) {
  const sel = (o: string) => (multi ? (value as string[]).includes(o) : value === o)
  return (
    <div className="flex flex-wrap gap-2" role={multi ? 'group' : 'radiogroup'}>
      {options.map((o) => (
        <button key={o} type="button" role={multi ? 'checkbox' : 'radio'} aria-checked={sel(o)}
          onClick={() => multi ? onChange(sel(o) ? (value as string[]).filter((x) => x !== o) : [...(value as string[]), o]) : onChange(o)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all ${
            sel(o) ? 'border-champagne/70 bg-champagne/[0.08] text-platinum' : error ? 'border-red-400/50 text-silver' : 'border-line text-silver hover:border-white/25'}`}>
          {sel(o) && <Check size={13} className="text-champagne" />}{o}
        </button>
      ))}
    </div>
  )
}

export default function ApplyPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initialRole = roles.find((r) => r.id === params.get('role'))?.id ?? ''
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [f, setF] = useState<ApplicationInput>({
    firstName: '', lastName: '', phone: '', email: '', city: '', state: 'FL', positionId: initialRole,
    previousEmployment: '', salesExperience: '', insuranceExperience: '', financialExperience: '', currentEmploymentStatus: '',
    whyNovaris: '', preferredContact: '', interviewAvailability: [], availabilityNotes: '',
    consentPrivacy: false, consentContact: false, consentMarketing: false,
  })
  const set = <K extends keyof ApplicationInput>(k: K, v: ApplicationInput[K]) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }
  const role = useMemo(() => roles.find((r) => r.id === f.positionId), [f.positionId])

  function validate(s: number): boolean {
    const e: Errors = {}
    const req = (k: keyof ApplicationInput, msg: string) => { const v = f[k]; if (typeof v === 'string' ? !v.trim() : Array.isArray(v) ? v.length === 0 : !v) e[k] = msg }
    if (s === 0) {
      req('firstName', 'Please enter your first name.'); req('lastName', 'Please enter your last name.')
      req('phone', 'Please enter your phone number.'); if (f.phone && !validators.phone(f.phone)) e.phone = 'Please enter a valid 10-digit phone number.'
      req('email', 'Please enter your email address.'); if (f.email && !validators.email(f.email)) e.email = 'Please enter a valid email address.'
      req('city', 'Please enter your city.'); req('state', 'Please choose your state.')
      req('positionId', 'Please choose the position you are interested in.')
    }
    if (s === 1) {
      req('previousEmployment', 'Please describe your recent work history.')
      req('salesExperience', 'Please choose one.'); req('insuranceExperience', 'Please choose one.'); req('financialExperience', 'Please choose one.')
      req('currentEmploymentStatus', 'Please choose one.')
      if (f.whyNovaris.trim().length < 30) e.whyNovaris = 'Please tell us a little more (at least 30 characters).'
    }
    if (s === 2) {
      req('preferredContact', 'Please choose how we should contact you.')
      req('interviewAvailability', 'Please choose at least one time that works.')
      if (!f.consentPrivacy) e.consentPrivacy = 'Please confirm you have read the Applicant Privacy Notice.'
      if (!f.consentContact) e.consentContact = 'We need your permission to contact you about your application.'
    }
    setErrors(e)
    if (Object.keys(e).length) setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 50)
    return Object.keys(e).length === 0
  }

  function go(n: number) {
    if (n > step && !validate(step)) return
    setDir(n > step ? 1 : -1); setStep(n)
    window.scrollTo({ top: document.getElementById('apply-card')!.offsetTop - 110, behavior: 'smooth' })
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (step < 2) return go(step + 1)
    if (!validate(2)) return
    setSending(true); setServerError('')
    const res = await submitApplication(f)
    setSending(false)
    if (!res.ok) return setServerError(res.error)
    navigate('/careers/submitted', { state: { name: f.firstName, role: role?.title, stored: res.stored } })
  }

  return (
    <>
      <PageHero eyebrow="Application" title={<>Apply to <span className="text-metal">NOVARIS.</span></>}
        intro="Three short steps, about 5 minutes. Your information is used only to evaluate your application." />
      <section className="bg-ink pb-28">
        <div className="mx-auto max-w-3xl px-6">
          {/* stepper */}
          <ol className="mb-8 grid grid-cols-3 gap-3" aria-label="Application progress">
            {STEPS.map((s, i) => (
              <li key={s}>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div className="h-full bg-gradient-to-r from-champagne-deep to-champagne-soft" initial={false} animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }} transition={{ duration: 0.6, ease }} />
                </div>
                <p className={`mt-3 text-xs ${i === step ? 'text-platinum' : 'text-mist'}`}><span className="font-display text-[9px] text-champagne">0{i + 1}</span>&nbsp; {s}</p>
              </li>
            ))}
          </ol>

          <form id="apply-card" noValidate onSubmit={onSubmit} className="glass overflow-hidden rounded-[2rem]" aria-label="Job application">
            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir}
                  initial={{ opacity: 0, x: 40 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * dir }} transition={{ duration: 0.4, ease }}>
                  {step === 0 && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="First name" htmlFor="firstName" required error={errors.firstName}><Input id="firstName" autoComplete="given-name" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} /></Field>
                      <Field label="Last name" htmlFor="lastName" required error={errors.lastName}><Input id="lastName" autoComplete="family-name" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} error={errors.lastName} /></Field>
                      <Field label="Phone number" htmlFor="phone" required error={errors.phone}><Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" value={f.phone} onChange={(e) => set('phone', formatPhone(e.target.value))} error={errors.phone} /></Field>
                      <Field label="Email address" htmlFor="email" required error={errors.email}><Input id="email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} error={errors.email} /></Field>
                      <Field label="City" htmlFor="city" required error={errors.city}><Input id="city" autoComplete="address-level2" value={f.city} onChange={(e) => set('city', e.target.value)} error={errors.city} /></Field>
                      <Field label="State" htmlFor="state" required error={errors.state}>
                        <Select id="state" value={f.state} onChange={(e) => set('state', e.target.value)} error={errors.state}>{US_STATES.map((s) => <option key={s} className="bg-onyx">{s}</option>)}</Select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Position of interest" htmlFor="positionId" required error={errors.positionId}>
                          <Select id="positionId" value={f.positionId} onChange={(e) => set('positionId', e.target.value)} error={errors.positionId}>
                            <option value="" disabled>Choose a position…</option>
                            {roles.filter((r) => r.open).map((r) => <option key={r.id} value={r.id} className="bg-onyx">{r.title}</option>)}
                          </Select>
                        </Field>
                        {role?.licenseRequired && <p className="mt-3 text-xs text-champagne-soft">This role requires an active state license before selling. You can still apply if you're working toward one.</p>}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-7">
                      <Field label="Previous employment" htmlFor="previousEmployment" required error={errors.previousEmployment} hint="Your most recent roles, companies and how long you were there.">
                        <Textarea id="previousEmployment" value={f.previousEmployment} onChange={(e) => set('previousEmployment', e.target.value)} error={errors.previousEmployment} maxLength={2000} />
                      </Field>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Sales experience" htmlFor="salesExperience" required error={errors.salesExperience}>
                          <Select id="salesExperience" value={f.salesExperience} onChange={(e) => set('salesExperience', e.target.value)} error={errors.salesExperience}><option value="" disabled>Choose…</option>{applicationOptions.experienceLevels.map((o) => <option key={o} className="bg-onyx">{o}</option>)}</Select>
                        </Field>
                        <Field label="Insurance experience" htmlFor="insuranceExperience" required error={errors.insuranceExperience}>
                          <Select id="insuranceExperience" value={f.insuranceExperience} onChange={(e) => set('insuranceExperience', e.target.value)} error={errors.insuranceExperience}><option value="" disabled>Choose…</option>{applicationOptions.experienceLevels.map((o) => <option key={o} className="bg-onyx">{o}</option>)}</Select>
                        </Field>
                        <Field label="Financial services experience" htmlFor="financialExperience" required error={errors.financialExperience}>
                          <Select id="financialExperience" value={f.financialExperience} onChange={(e) => set('financialExperience', e.target.value)} error={errors.financialExperience}><option value="" disabled>Choose…</option>{applicationOptions.experienceLevels.map((o) => <option key={o} className="bg-onyx">{o}</option>)}</Select>
                        </Field>
                        <Field label="Current employment status" htmlFor="currentEmploymentStatus" required error={errors.currentEmploymentStatus}>
                          <Select id="currentEmploymentStatus" value={f.currentEmploymentStatus} onChange={(e) => set('currentEmploymentStatus', e.target.value)} error={errors.currentEmploymentStatus}><option value="" disabled>Choose…</option>{applicationOptions.employmentStatus.map((o) => <option key={o} className="bg-onyx">{o}</option>)}</Select>
                        </Field>
                      </div>
                      <Field label="Why do you want to join NOVARIS?" htmlFor="whyNovaris" required error={errors.whyNovaris}>
                        <Textarea id="whyNovaris" value={f.whyNovaris} onChange={(e) => set('whyNovaris', e.target.value)} error={errors.whyNovaris} maxLength={2000} />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-8">
                      <div>
                        <p className="mb-3 text-[13px] font-medium text-silver">Preferred contact method <span className="text-champagne">*</span></p>
                        <Pills options={applicationOptions.contactMethods} value={f.preferredContact} onChange={(v) => set('preferredContact', v)} error={errors.preferredContact} />
                        {errors.preferredContact && <p className="mt-2 text-xs text-red-300" role="alert">{errors.preferredContact}</p>}
                      </div>
                      <div>
                        <p className="mb-3 text-[13px] font-medium text-silver">Interview availability <span className="text-champagne">*</span> <span className="text-mist">(choose all that apply)</span></p>
                        <Pills multi options={applicationOptions.availability} value={f.interviewAvailability} onChange={(v) => set('interviewAvailability', v)} error={errors.interviewAvailability} />
                        {errors.interviewAvailability && <p className="mt-2 text-xs text-red-300" role="alert">{errors.interviewAvailability}</p>}
                      </div>
                      <Field label="Anything else about your availability?" htmlFor="availabilityNotes">
                        <Input id="availabilityNotes" value={f.availabilityNotes} onChange={(e) => set('availabilityNotes', e.target.value)} maxLength={300} />
                      </Field>

                      <div className="rounded-3xl border border-line bg-ink/60 p-6">
                        <p className="flex items-center gap-2 text-[13px] font-semibold text-platinum"><Lock size={14} className="text-champagne" /> Privacy notice</p>
                        <p className="mt-2 text-xs leading-relaxed text-mist">
                          NOVARIS uses the information in this application only to evaluate you for opportunities, contact you about your application and meet legal obligations.
                          Access is limited to authorized recruiting staff. See the <Link to="/legal/applicant-privacy" className="text-silver underline decoration-white/25 underline-offset-4">Applicant Privacy Notice</Link> for how long we keep it and your choices.
                        </p>
                        <div className="mt-5 space-y-4">
                          <Checkbox id="consentPrivacy" checked={f.consentPrivacy} onChange={(v) => set('consentPrivacy', v)} error={errors.consentPrivacy}>
                            I have read the Applicant Privacy Notice and confirm the information I provided is accurate. <span className="text-champagne">*</span>
                          </Checkbox>
                          <Checkbox id="consentContact" checked={f.consentContact} onChange={(v) => set('consentContact', v)} error={errors.consentContact}>
                            I agree that NOVARIS may contact me about my application by phone, email or text using the details above. <span className="text-champagne">*</span>
                          </Checkbox>
                          <Checkbox id="consentMarketing" checked={f.consentMarketing} onChange={(v) => set('consentMarketing', v)}>
                            Optional: I also agree to receive marketing calls and text messages from NOVARIS about other opportunities and events, including by automated means.
                            Consent is not required to apply. Message and data rates may apply. Reply STOP to opt out. See <Link to="/legal/marketing-consent" className="text-silver underline decoration-white/25 underline-offset-4">Marketing Consent</Link>.
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {serverError && <p className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">{serverError}</p>}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line px-8 py-6 sm:px-10">
              {step > 0 ? (
                <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 text-sm font-semibold text-silver hover:text-platinum"><ArrowLeft size={15} /> Back</button>
              ) : <span className="text-xs text-mist"><span className="text-champagne">*</span> Required</span>}
              <button type="submit" disabled={sending} className="btn-primary min-w-[190px] disabled:opacity-70">
                {sending ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : step < 2 ? <>Continue <ArrowRight size={16} /></> : <>Submit Application <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
