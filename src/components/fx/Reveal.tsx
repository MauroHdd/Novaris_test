import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Card that tilts slightly toward the pointer and shows a moving highlight. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div
      className={`group relative [perspective:1200px] ${className}`}
      onPointerMove={(e) => {
        if (reduce) return
        const el = e.currentTarget.firstElementChild as HTMLElement
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        el.style.transform = `rotateY(${(px - 0.5) * 6}deg) rotateX(${(0.5 - py) * 6}deg)`
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
      }}
      onPointerLeave={(e) => {
        const el = e.currentTarget.firstElementChild as HTMLElement
        el.style.transform = ''
      }}
    >
      <div className="relative h-full rounded-3xl transition-transform duration-500 ease-out [transform-style:preserve-3d]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(232,231,228,0.08), transparent 60%)' }}
        />
        {children}
      </div>
    </div>
  )
}
