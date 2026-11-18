import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Building2, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serviceDetails } from '../content/pages'
import { services } from '../content/site'
import { Reveal } from '../components/fx/Reveal'
import { PageHero } from '../components/ui/Page'

export default function ServicesPage() {
  const [active, setActive] = useState(services[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    services.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <PageHero eyebrow="Our Services" title={<>Five divisions. <span className="text-metal">One standard of execution.</span></>}
        intro="Every NOVARIS service is built around preparation, transparency and follow-through. Each one shows clearly whether NOVARIS provides it directly or through appropriately licensed professionals and partners." />

      <section className="bg-ink pb-28">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-[240px_1fr]">
          {/* side index */}
          <aside className="hidden lg:block">
            <nav className="sticky top-32 space-y-1" aria-label="Services">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}
                  className={`relative flex items-center gap-4 rounded-2xl px-4 py-3 text-sm transition-colors ${active === s.id ? 'text-platinum' : 'text-mist hover:text-silver'}`}>
                  {active === s.id && <motion.span layoutId="svc-active" className="absolute inset-0 rounded-2xl border border-line bg-white/[0.03]" />}
                  <span className="relative font-display text-[10px] text-champagne/80">{s.index}</span>
                  <span className="relative">{s.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            {services.map((s) => {
              const d = serviceDetails[s.id]
              return (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <Reveal>
                    <article className="glass overflow-hidden rounded-[2rem]">
                      <div className="relative p-8 sm:p-12">
                        <div className="pointer-events-none absolute right-0 top-0 font-display text-[160px] leading-none text-white/[0.025] sm:text-[220px]">{s.index}</div>
                        <p className="eyebrow text-champagne/80">{s.kicker}</p>
                        <h2 className="mt-4 font-sans text-3xl font-semibold text-platinum sm:text-4xl">{s.title}</h2>
                        <div className="mt-5">
                          {s.delivery === 'direct' ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-silver">
                              <Building2 size={13} /> Provided directly by NOVARIS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border border-champagne/30 px-3 py-1.5 text-xs text-champagne-soft">
                              <BadgeCheck size={13} /> Provided through appropriately licensed professionals & partners
                            </span>
                          )}
                        </div>
                        <p className="relative mt-7 max-w-3xl text-base leading-relaxed text-silver sm:text-lg">{d.detail}</p>
                      </div>

                      <div className="grid gap-px border-t border-line bg-line md:grid-cols-[1fr_1.4fr]">
                        <div className="bg-onyx/80 p-8 sm:p-10">
                          <p className="eyebrow">Who it's for</p>
                          <ul className="mt-5 space-y-3">
                            {d.forWho.map((w) => (
                              <li key={w} className="flex items-start gap-3 text-[15px] text-platinum">
                                <Check size={16} className="mt-0.5 shrink-0 text-champagne" /> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-onyx/80 p-8 sm:p-10">
                          <p className="eyebrow">How it works</p>
                          <ol className="mt-5 grid gap-5 sm:grid-cols-3">
                            {d.steps.map((st, i) => (
                              <li key={st.title}>
                                <span className="font-display text-[10px] text-champagne">{String(i + 1).padStart(2, '0')}</span>
                                <p className="mt-2 font-semibold text-platinum">{st.title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-silver">{st.body}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-8 py-6 sm:px-12">
                        <span className="text-sm text-mist">Questions about {s.title.toLowerCase()}?</span>
                        <Link to={`/contact?topic=${encodeURIComponent(s.id)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-platinum">
                          Talk to NOVARIS <ArrowRight size={15} className="text-champagne" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                </section>
              )
            })}

            <Reveal>
              <p className="px-2 pt-4 text-xs leading-relaxed text-mist">
                Insurance and financial services activities that require a license are performed only by appropriately licensed professionals.
                NOVARIS Academy training is educational and is not a license or regulatory qualification. See our{' '}
                <Link to="/legal/disclosures" className="text-silver underline decoration-white/20 underline-offset-4 hover:text-platinum">disclosures</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
