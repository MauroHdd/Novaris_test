import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AuroraField } from '../fx/AuroraField'
import { Reveal, ease } from '../fx/Reveal'

/** Shared top section for inner pages. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <section className="noise relative overflow-hidden bg-ink pb-20 pt-40 sm:pb-28 sm:pt-48">
      <AuroraField density={40} />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,231,228,0.08), transparent 62%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      <div className="relative mx-auto max-w-site px-6">
        <motion.p className="eyebrow flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <span className="h-px w-8 bg-champagne/70" />{eyebrow}
        </motion.p>
        <motion.h1
          className="mt-7 max-w-4xl font-sans text-5xl font-semibold leading-[1.04] tracking-tight text-platinum sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p className="mt-7 max-w-2xl text-lg leading-relaxed text-silver sm:text-xl"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.35 }}>
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.5 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, intro, className = '' }: { eyebrow: string; title: ReactNode; intro?: string; className?: string }) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-champagne/70" />{eyebrow}</p>
      <h2 className="mt-6 font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-platinum sm:text-5xl">{title}</h2>
      {intro && <p className="mt-6 text-lg leading-relaxed text-silver">{intro}</p>}
    </Reveal>
  )
}

/** Visible marker for content the business still has to supply. Never shown as real data. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-dashed border-champagne/40 bg-champagne/[0.06] px-1.5 py-0.5 font-body text-[0.9em] text-champagne-soft">
      {children}
    </span>
  )
}
