import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../../content/site'
import { AuroraField } from '../../components/fx/AuroraField'
import { ease } from '../../components/fx/Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <AuroraField />
      {/* light architecture */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(ellipse at center, rgba(232,231,228,0.09), transparent 62%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto w-full max-w-site px-6 pt-28 text-center">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}>
          Business Development · Insurance · Financial Services
        </motion.p>

        <motion.h1
          className="mt-8 font-display text-[10.5vw] leading-none sm:text-[9vw] lg:text-[124px]"
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
        >
          <span className="text-metal animate-sheen pl-[0.06em] tracking-[0.06em] sm:pl-[0.12em] sm:tracking-[0.12em]">NOVARIS</span>
        </motion.h1>

        <motion.div className="mx-auto mt-8 flex max-w-xl items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }}>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne/60" />
          <span className="font-display text-[10px] tracking-brand text-champagne sm:text-[11px]">{brand.tagline}</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne/60" />
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-balance font-sans text-lg leading-relaxed text-silver sm:text-xl"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: 1 }}
        >
          A modern organization built to develop talent, generate opportunity and turn ambition into measurable results.
        </motion.p>

        <motion.div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: 1.2 }}>
          <Link to="/careers" className="btn-primary">Explore Opportunities <ArrowRight size={16} /></Link>
          <Link to="/partnerships" className="btn-ghost">Partner With NOVARIS <ArrowUpRight size={16} className="text-champagne" /></Link>
        </motion.div>
      </motion.div>

      <motion.a href="#about" aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-mist"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
        <span className="font-display text-[8px] tracking-wide2">SCROLL</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span className="absolute left-0 top-0 h-4 w-px bg-champagne"
            animate={reduce ? {} : { y: [-16, 40] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.a>
    </section>
  )
}
