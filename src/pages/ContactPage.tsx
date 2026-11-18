import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Briefcase, Handshake, HelpCircle, Landmark, Loader2, Mail, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { inquiryTypes } from '../content/pages'
import { brand } from '../content/site'
import { Reveal } from '../components/fx/Reveal'
import { Checkbox, Field, Input, Select, Textarea } from '../components/ui/Form'
import { PageHero } from '../components/ui/Page'
import { formatPhone, submitContact, validators } from '../lib/forms'

const topicMap: Record<string, string> = {
  insurance: 'Insurance-related inquiry', financial: 'Financial services inquiry', leads: 'Business partnership',
  bizdev: 'Business partnership', talent: 'Recruiting question', partnership: 'Business partnership', support: 'Technical support',
}
const typeIcons = [HelpCircle, Handshake, Briefcase, ShieldCheck, Landmark, Wrench]

type Form = { firstName: string; lastName: string; email: string; phone: string; company: string; inquiryType: string; message: string; consentContact: boolean; consentMarketing: boolean }

export default function ContactPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [f, setF] = useState<Form>({
    firstName: '', lastName: '', email: '', phone: '', company: '',
    inquiryType: topicMap[params.get('topic') ?? ''] ?? '', message: '', consentContact: false, consentMarketing: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')
  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }

  function validate() {
    const e: typeof errors = {}
    if (!f.firstName.trim()) e.firstName = 'Please enter your first name.'
    if (!f.lastName.trim()) e.lastName = 'Please enter your last name.'
    if (!f.email.trim()) e.email = 'Please enter your email address.'
    else if (!validators.email(f.email)) e.email = 'Please enter a valid email address.'
    if (f.phone && !validators.phone(f.phone)) e.phone = 'Please enter a valid 10-digit phone number.'
    if (!f.inquiryType) e.inquiryType = 'Please choose what your message is about.'
    if (f.message.trim().length < 10) e.message = 'Please write a short message (at least 10 characters).'
    if (!f.consentContact) e.consentContact = 'We need your permission to reply to you.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    setServerError('')
    if (!validate()) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    setSending(true)
    const res = await submitContact({ ...f, phone: f.phone || undefined, company: f.company || undefined, submittedAt: new Date().toISOString() })
    setSending(false)
    if (!res.ok) return setServerError(res.error)
    navigate('/contact/thank-you', { state: { name: f.firstName, stored: res.stored } })
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let's start the <span className="text-metal">conversation.</span></>}
        intro="Questions about careers, partnerships or our services? Send us a message and the right person at NOVARIS will follow up." />

      <section className="bg-ink pb-28">
        <div className="mx-auto grid max-w-site gap-10 px-6 lg:grid-cols-[1fr_1.5fr]">
          {/* left: topics + details */}
          <Reveal>
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="glass rounded-[2rem] p-8">
                <p className="eyebrow">We can help with</p>
                <ul className="mt-6 space-y-2">
                  {inquiryTypes.map((t, i) => {
                    const Icon = typeIcons[i] ?? HelpCircle
                    const on = f.inquiryType === t
                    return (
                      <li key={t}>
                        <button type="button" onClick={() => set('inquiryType', t)}
                          className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all ${on ? 'border-champagne/50 bg-champagne/[0.06] text-platinum' : 'border-transparent text-silver hover:bg-white/[0.03]'}`}>
                          <Icon size={16} strokeWidth={1.5} className={on ? 'text-champagne' : 'text-mist'} /> {t}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-line p-8">
                <p className="eyebrow">Direct</p>
                <ul className="mt-5 space-y-4 text-sm text-silver">
                  <li className="flex items-center gap-3"><Mail size={16} className="text-champagne" />{brand.email}</li>
                  <li className="flex items-center gap-3"><Phone size={16} className="text-champagne" />{brand.phone}</li>
                  <li className="flex items-center gap-3"><MapPin size={16} className="text-champagne" />{brand.location}</li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal delay={0.1}>
            <form noValidate onSubmit={onSubmit} className="glass rounded-[2rem] p-8 sm:p-10" aria-label="Contact form">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="First name" htmlFor="firstName" required error={errors.firstName}>
                  <Input id="firstName" autoComplete="given-name" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} />
                </Field>
                <Field label="Last name" htmlFor="lastName" required error={errors.lastName}>
                  <Input id="lastName" autoComplete="family-name" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} error={errors.lastName} />
                </Field>
                <Field label="Email" htmlFor="email" required error={errors.email}>
                  <Input id="email" type="email" autoComplete="email" inputMode="email" value={f.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
                </Field>
                <Field label="Phone" htmlFor="phone" error={errors.phone}>
                  <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" value={f.phone} onChange={(e) => set('phone', formatPhone(e.target.value))} error={errors.phone} />
                </Field>
                <Field label="Company" htmlFor="company">
                  <Input id="company" autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} />
                </Field>
                <Field label="Topic" htmlFor="inquiryType" required error={errors.inquiryType}>
                  <Select id="inquiryType" value={f.inquiryType} onChange={(e) => set('inquiryType', e.target.value)} error={errors.inquiryType}>
                    <option value="" disabled>Choose a topic…</option>
                    {inquiryTypes.map((t) => <option key={t} value={t} className="bg-onyx">{t}</option>)}
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Message" htmlFor="message" required error={errors.message}>
                    <Textarea id="message" value={f.message} onChange={(e) => set('message', e.target.value)} error={errors.message} maxLength={3000} />
                  </Field>
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-line pt-8">
                <Checkbox id="consentContact" checked={f.consentContact} onChange={(v) => set('consentContact', v)} error={errors.consentContact}>
                  I agree that NOVARIS may contact me about this inquiry by email or phone, and I have read the{' '}
                  <Link to="/legal/privacy" className="text-platinum underline decoration-white/25 underline-offset-4">Privacy Policy</Link>. <span className="text-champagne">*</span>
                </Checkbox>
                <Checkbox id="consentMarketing" checked={f.consentMarketing} onChange={(v) => set('consentMarketing', v)}>
                  Optional: I would also like to receive marketing calls and text messages from NOVARIS at the number provided. Consent is not a condition of any purchase or service. Message and data rates may apply; reply STOP to opt out. See{' '}
                  <Link to="/legal/marketing-consent" className="text-platinum underline decoration-white/25 underline-offset-4">Marketing Consent</Link>.
                </Checkbox>
              </div>

              <AnimatePresence>
                {serverError && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
                <p className="text-xs text-mist"><span className="text-champagne">*</span> Required</p>
                <button type="submit" disabled={sending} className="btn-primary min-w-[200px] disabled:opacity-70">
                  {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send Message <ArrowRight size={16} /></>}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
