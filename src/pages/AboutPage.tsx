import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { about } from '../content/pages'
import { focusAreas, services } from '../content/site'
import { Reveal, TiltCard } from '../components/fx/Reveal'
import { PageHero, Placeholder, SectionHead } from '../components/ui/Page'

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About NOVARIS" title={<>Ambition, organized. <span className="text-metal">Execution, delivered.</span></>} intro={about.intro} />

      {/* Mission */}
      <section className="bg-ink pb-28">
        <div className="mx-auto max-w-site px-6">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(210,188,138,0.25), transparent 65%)' }} />
              <p className="eyebrow text-champagne">Our Mission</p>
              <p className="mt-6 max-w-4xl font-sans text-2xl font-medium leading-snug text-platinum sm:text-4xl">“{about.mission}”</p>
              <p className="mt-6 text-sm"><Placeholder>{about.missionNote}</Placeholder></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line bg-onyx py-28">
        <div className="mx-auto grid max-w-site gap-14 px-6 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="What We Do" title={<>Six disciplines, <span className="text-metal">one operating model.</span></>}
            intro="Each part of NOVARIS strengthens the others: recruiting feeds training, training improves sales, sales creates partnerships." />
          <Reveal delay={0.1}>
            <ol className="divide-y divide-line border-y border-line">
              {focusAreas.map((f, i) => (
                <li key={f} className="group flex items-center justify-between gap-6 py-5">
                  <span className="flex items-center gap-6">
                    <span className="font-display text-[11px] text-champagne/80">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-lg text-platinum transition-transform duration-500 group-hover:translate-x-1">{f}</span>
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20 transition-all duration-500 group-hover:w-16 group-hover:to-champagne/70" />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-28">
        <div className="mx-auto max-w-site px-6">
          <SectionHead eyebrow="Our Values" title={<>The standard we <span className="text-champagne-metal">hold.</span></>} />
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-line bg-gradient-to-b from-graphite to-onyx p-6 transition-colors duration-500 hover:border-champagne/30">
                  <span className="font-display text-[10px] text-mist">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-8 font-sans text-lg font-semibold text-platinum">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operating model */}
      <section className="relative overflow-hidden border-t border-line bg-onyx py-28">
        <div className="mx-auto max-w-site px-6">
          <SectionHead eyebrow="How We Operate" title={<>From first conversation <span className="text-metal">to long-term growth.</span></>} />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent lg:block" />
            <div className="grid gap-10 lg:grid-cols-5">
              {about.operatingModel.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.08}>
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/40 bg-ink font-display text-[10px] text-champagne">{s.step}</div>
                    <h3 className="mt-6 font-sans text-xl font-semibold text-platinum">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="bg-ink py-28">
        <div className="mx-auto max-w-site px-6">
          <SectionHead eyebrow="Our Divisions" title="Explore each part of NOVARIS." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <TiltCard className="h-full">
                  <Link to={`/services#${s.id}`} className="glass flex h-full min-h-[190px] flex-col justify-between rounded-3xl p-6">
                    <span className="font-display text-[10px] text-mist">{s.index}</span>
                    <span>
                      <span className="block font-sans text-lg font-semibold leading-snug text-platinum">{s.title}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-champagne">View <ArrowUpRight size={14} /></span>
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership: hidden until real bios are added */}
      {about.leadership.length > 0 && (
        <section className="border-t border-line bg-onyx py-28">
          <div className="mx-auto max-w-site px-6">
            <SectionHead eyebrow="Leadership" title="The people behind NOVARIS." />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {about.leadership.map((p) => (
                <div key={p.name} className="glass rounded-3xl p-8">
                  <h3 className="font-sans text-xl font-semibold text-platinum">{p.name}</h3>
                  <p className="eyebrow mt-2 text-champagne">{p.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-silver">{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compliance */}
      <section className="border-t border-line bg-onyx py-24">
        <div className="mx-auto max-w-site px-6">
          <Reveal>
            <div className="flex flex-col gap-8 rounded-[2rem] border border-line bg-ink p-10 sm:flex-row sm:items-start sm:p-12">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-champagne/30 bg-champagne/[0.05]">
                <ShieldCheck className="text-champagne" strokeWidth={1.5} />
              </div>
              <div>
                <p className="eyebrow">Compliance First</p>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-silver">{about.compliance}</p>
                <Link to="/legal/disclosures" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-platinum">
                  Read our disclosures <ArrowRight size={15} className="text-champagne" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-28 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-sans text-4xl font-semibold text-platinum sm:text-5xl">Ready to build with us?</h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/careers" className="btn-primary">Explore Opportunities <ArrowRight size={16} /></Link>
            <Link to="/partnerships" className="btn-ghost">Partner With NOVARIS <ArrowUpRight size={16} className="text-champagne" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
