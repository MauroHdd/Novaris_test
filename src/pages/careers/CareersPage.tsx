import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Briefcase, ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { hiringSteps, roles, whyJoin } from '../../content/careers'
import { Reveal } from '../../components/fx/Reveal'
import { PageHero, SectionHead } from '../../components/ui/Page'

export function ArrangementLine({ role }: { role: (typeof roles)[number] }) {
  return (
    <span className="text-sm text-silver">
      {role.arrangements?.length ? role.arrangements.join(' · ') : 'Arrangement confirmed during the hiring process'}
    </span>
  )
}

export default function CareersPage() {
  const [open, setOpen] = useState<string | null>(roles[0].id)
  return (
    <>
      <PageHero eyebrow="Careers at NOVARIS" title={<>YOUR NEXT OPPORTUNITY <span className="text-metal">STARTS HERE.</span></>}
        intro="Whether you're licensed and experienced or brand new to sales, NOVARIS offers structure, training and a real path to grow.">
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link to="/careers/apply" className="btn-primary">Apply Now <ArrowRight size={16} /></Link>
          <a href="#roles" className="btn-ghost">View Opportunities</a>
        </div>
      </PageHero>

      {/* Why join */}
      <section className="bg-ink pb-24">
        <div className="mx-auto grid max-w-site gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyJoin.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-line bg-gradient-to-b from-graphite to-onyx p-7">
                <span className="font-display text-[10px] text-champagne">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-sans text-lg font-semibold text-platinum">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-24 border-t border-line bg-onyx py-28">
        <div className="mx-auto max-w-site px-6">
          <SectionHead eyebrow="Opportunities" title={<>Find the role that <span className="text-metal">fits you.</span></>}
            intro="Every role is set up under the employment or contractor arrangement that properly fits it. Arrangement and compensation are confirmed with you in writing before you start." />
          <div className="mt-14 space-y-3">
            {roles.filter((r) => r.open).map((r, i) => {
              const isOpen = open === r.id
              return (
                <Reveal key={r.id} delay={i * 0.04}>
                  <div className={`overflow-hidden rounded-3xl border transition-colors duration-500 ${isOpen ? 'border-champagne/30 bg-graphite/60' : 'border-line bg-ink hover:border-white/15'}`}>
                    <button className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-8" onClick={() => setOpen(isOpen ? null : r.id)} aria-expanded={isOpen}>
                      <span className="flex items-start gap-5">
                        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-line bg-white/[0.03]">
                          <Briefcase size={17} strokeWidth={1.5} className="text-champagne" />
                        </span>
                        <span>
                          <span className="block font-sans text-xl font-semibold text-platinum">{r.title}</span>
                          <span className="mt-1 block text-sm text-silver">{r.summary}</span>
                          {r.licenseRequired && (
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-champagne/30 px-2.5 py-1 text-[11px] text-champagne-soft">
                              <BadgeCheck size={12} /> State license required to sell
                            </span>
                          )}
                        </span>
                      </span>
                      <ChevronDown className={`shrink-0 text-mist transition-transform duration-500 ${isOpen ? 'rotate-180 text-champagne' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="grid gap-8 border-t border-line px-6 py-8 sm:px-8 md:grid-cols-3">
                            <div>
                              <p className="eyebrow">What you'll do</p>
                              <ul className="mt-4 space-y-2 text-sm text-silver">{r.responsibilities.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-champagne/60" />{x}</li>)}</ul>
                            </div>
                            <div>
                              <p className="eyebrow">What you bring</p>
                              <ul className="mt-4 space-y-2 text-sm text-silver">{r.requirements.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-champagne/60" />{x}</li>)}</ul>
                            </div>
                            <div className="space-y-4">
                              <div><p className="eyebrow">Arrangement</p><p className="mt-2"><ArrangementLine role={r} /></p></div>
                              <div><p className="eyebrow">Compensation</p><p className="mt-2 text-sm text-silver">{r.compensation ?? 'Discussed during the interview process'}</p></div>
                              <div><p className="eyebrow">Location</p><p className="mt-2 flex items-center gap-2 text-sm text-silver"><MapPin size={14} className="text-champagne" />{r.location}</p></div>
                              <Link to={`/careers/apply?role=${r.id}`} className="btn-primary !px-5 !py-3">Apply for this role <ArrowRight size={15} /></Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-28">
        <div className="mx-auto max-w-site px-6">
          <SectionHead eyebrow="The Process" title={<>Clear steps. <span className="text-metal">No guesswork.</span></>} />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent lg:block" />
            <div className="grid gap-10 lg:grid-cols-5">
              {hiringSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/40 bg-ink font-display text-[10px] text-champagne">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-6 font-sans text-xl font-semibold text-platinum">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-line bg-onyx p-10 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-sans text-2xl font-semibold text-platinum">Ready to take the next step?</h3>
                <p className="mt-2 text-sm text-silver">The application takes about 5 minutes.</p>
              </div>
              <Link to="/careers/apply" className="btn-primary">Start Your Application <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <p className="mt-8 text-xs leading-relaxed text-mist">
            NOVARIS Academy training is educational and does not represent an insurance license or securities qualification. Roles that involve selling insurance or
            financial products require the appropriate state licenses and appointments before any regulated activity. [PLACEHOLDER: equal opportunity statement, reviewed by counsel]
          </p>
        </div>
      </section>
    </>
  )
}
