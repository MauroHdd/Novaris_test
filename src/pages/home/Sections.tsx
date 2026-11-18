import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Briefcase, Cpu, GraduationCap, Handshake, Landmark,
  LineChart, Network, Radar, ShieldCheck, Sprout, Target, TrendingUp, Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand, focusAreas, pillars, services } from '../../content/site'
import { LogoMark } from '../../components/brand/Logo'
import { AuroraField } from '../../components/fx/AuroraField'
import { Reveal, TiltCard } from '../../components/fx/Reveal'

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-champagne/70" />{eyebrow}</p>
      <h2 className="mt-6 font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-platinum sm:text-5xl">{title}</h2>
      {intro && <p className="mt-6 text-lg leading-relaxed text-silver">{intro}</p>}
    </Reveal>
  )
}

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-ink py-28 sm:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <SectionHead
          eyebrow="About NOVARIS"
          title={<>A business development organization <span className="text-metal">engineered for execution.</span></>}
          intro="NOVARIS brings together insurance-related services, financial services, lead generation, sales development, partnerships and recruiting under one disciplined operating model, built on professionalism, innovation and long-term growth."
        />
        <Reveal delay={0.15}>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {focusAreas.map((f, i) => (
              <li key={f} className="group flex items-center gap-4 bg-onyx px-6 py-5 transition-colors hover:bg-graphite">
                <span className="font-display text-[10px] text-champagne/80">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] text-platinum">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- SERVICES ---------------- */
const serviceIcons: Record<string, typeof Landmark> = {
  insurance: ShieldCheck, financial: Landmark, leads: Radar, bizdev: Network, talent: GraduationCap,
}

function DeliveryBadge({ delivery }: { delivery: 'direct' | 'licensed' }) {
  return delivery === 'direct' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[11px] text-silver">
      <span className="h-1.5 w-1.5 rounded-full bg-platinum" /> Provided by NOVARIS
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/30 px-3 py-1 text-[11px] text-champagne-soft">
      <BadgeCheck size={12} /> Through licensed professionals & partners
    </span>
  )
}

/** Each service gets its own visual motif rather than a repeated card template. */
function ServiceArt({ id }: { id: string }) {
  const reduce = useReducedMotion()
  const spin = reduce ? {} : { rotate: 360 }
  if (id === 'insurance')
    return (
      <div className="relative h-28 w-28">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border border-platinum/15"
            style={{ scale: 1 - i * 0.22 }} animate={reduce ? {} : { opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }} />
        ))}
        <ShieldCheck className="absolute inset-0 m-auto text-platinum" size={30} strokeWidth={1.2} />
      </div>
    )
  if (id === 'financial')
    return (
      <svg viewBox="0 0 160 70" className="h-20 w-44">
        <motion.path d="M0 60 C 30 55, 40 40, 60 42 S 95 20, 115 24 S 145 8, 160 6" fill="none" stroke="url(#fg)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2 }} />
        <defs><linearGradient id="fg" x1="0" x2="1"><stop offset="0" stopColor="#6E727B" /><stop offset="1" stopColor="#D2BC8A" /></linearGradient></defs>
      </svg>
    )
  if (id === 'leads')
    return (
      <div className="relative h-28 w-28 rounded-full border border-platinum/10">
        <motion.div className="absolute inset-0 rounded-full" animate={spin} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'conic-gradient(from 0deg, rgba(210,188,138,0.35), transparent 25%)' }} />
        {[[30, 40], [70, 28], [62, 72], [38, 66]].map(([x, y], i) => (
          <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-platinum" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </div>
    )
  if (id === 'bizdev')
    return (
      <svg viewBox="0 0 120 80" className="h-24 w-36">
        {[[20, 40, 60, 15], [20, 40, 60, 65], [60, 15, 100, 40], [60, 65, 100, 40], [60, 15, 60, 65]].map(([a, b, c, d], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="rgba(232,231,228,0.25)" strokeWidth="1" />
        ))}
        {[[20, 40], [60, 15], [60, 65], [100, 40]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 5 : 3.5} fill={i === 3 ? '#D2BC8A' : '#E8E7E4'} />
        ))}
      </svg>
    )
  return (
    <div className="flex items-end gap-2">
      {[28, 44, 62, 84].map((h, i) => (
        <motion.span key={i} className="w-4 rounded-t-sm bg-gradient-to-t from-steel to-platinum/70"
          initial={{ height: 0 }} whileInView={{ height: h }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.12 }} />
      ))}
    </div>
  )
}

export function Services() {
  const [lead, ...rest] = services
  return (
    <section id="services" className="relative bg-onyx py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead eyebrow="Our Services" title={<>Five divisions. <span className="text-metal">One standard.</span></>} />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-mist">
              Regulated insurance and financial activities are carried out only by appropriately licensed professionals and partners. Each service shows how it is delivered.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-6">
          {[lead, ...rest].map((s, i) => {
            const Icon = serviceIcons[s.id] ?? Briefcase
            const span = i === 0 ? 'lg:col-span-4' : i === 1 ? 'lg:col-span-2' : 'lg:col-span-2'
            return (
              <Reveal key={s.id} delay={i * 0.06} className={span}>
                <TiltCard className="h-full">
                  <article className="glass relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl p-8">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-xs text-mist">{s.index}</span>
                      <Icon size={18} className="text-champagne" strokeWidth={1.5} />
                    </div>
                    <div className="mt-8 flex min-h-[112px] items-center"><ServiceArt id={s.id} /></div>
                    <p className="mt-6 eyebrow text-champagne/80">{s.kicker}</p>
                    <h3 className="mt-3 font-sans text-2xl font-semibold text-platinum">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-silver">{s.summary}</p>
                    <ul className="mt-5 space-y-2 text-sm text-mist">
                      {s.points.map((p) => <li key={p} className="flex items-center gap-2"><span className="h-px w-3 bg-champagne/60" />{p}</li>)}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                      <DeliveryBadge delivery={s.delivery} />
                      <Link to={`/services#${s.id}`} className="group/l inline-flex items-center gap-2 text-sm font-semibold text-platinum">
                        Learn More <ArrowUpRight size={15} className="text-champagne transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- WHY NOVARIS ---------------- */
const pillarIcons = [Sprout, GraduationCap, Cpu, Handshake, Target, Users, TrendingUp]

export function WhyNovaris() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-200px] top-20 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(210,188,138,0.18), transparent 65%)' }} />
      <div className="mx-auto max-w-site px-6">
        <SectionHead eyebrow="Why NOVARIS" title={<>Built for people who <span className="text-champagne-metal">execute.</span></>}
          intro="Ambition is common. Structure, training and follow-through are not. NOVARIS is designed around all three." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? LineChart
            const wide = i === 0
            return (
              <Reveal key={p.title} delay={i * 0.05} className={wide ? 'lg:col-span-2' : ''}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-graphite to-onyx p-7 transition-colors duration-500 hover:border-champagne/30">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/0 to-transparent transition-all duration-700 group-hover:via-champagne/70" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white/[0.03]">
                    <Icon size={19} strokeWidth={1.5} className="text-platinum transition-colors group-hover:text-champagne" />
                  </div>
                  <h3 className="mt-6 font-sans text-lg font-semibold text-platinum">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{p.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FINAL BRAND EXPERIENCE ---------------- */
export function FinalCTA() {
  const reduce = useReducedMotion()
  return (
    <section className="noise relative overflow-hidden bg-ink py-36 sm:py-48">
      <AuroraField density={45} />
      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
        animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne shadow-[0_0_20px_4px_rgba(210,188,138,0.5)]" />
      </motion.div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <div className="mx-auto w-fit animate-float"><LogoMark size={64} /></div>
          <h2 className="mt-10 font-display text-4xl leading-tight sm:text-6xl">
            <span className="text-metal animate-sheen tracking-[0.1em]">NOVARIS</span>
          </h2>
          <p className="mt-6 font-display text-[10px] tracking-brand text-champagne sm:text-xs">{brand.tagline}</p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-silver">
            Whether you're building a career or building a partnership, the next step starts with a conversation.
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/careers" className="btn-primary">Explore Opportunities <ArrowRight size={16} /></Link>
            <Link to="/partnerships" className="btn-ghost">Partner With NOVARIS <ArrowUpRight size={16} className="text-champagne" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
