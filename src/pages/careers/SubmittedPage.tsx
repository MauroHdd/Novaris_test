import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { hiringSteps } from '../../content/careers'
import { AuroraField } from '../../components/fx/AuroraField'
import { ease } from '../../components/fx/Reveal'

export default function SubmittedPage() {
  const s = (useLocation().state ?? {}) as { name?: string; role?: string; stored?: 'backend' | 'demo' | 'none' }
  return (
    <section className="noise relative flex min-h-[90svh] items-center overflow-hidden bg-ink pb-20 pt-32">
      <AuroraField density={35} />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne/50 bg-champagne/[0.06] shadow-[0_0_60px_-10px_rgba(210,188,138,0.5)]">
          <Check className="text-champagne" size={32} strokeWidth={1.5} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}
          className="mt-10 font-sans text-4xl font-semibold text-platinum sm:text-5xl">
          Application received{s.name ? `, ${s.name}` : ''}.
        </motion.h1>
        <p className="mt-5 text-lg text-silver">
          Thank you for applying{s.role ? <> for <span className="text-platinum">{s.role}</span></> : ''}. Our recruiting team will review your application and contact you using your preferred method.
        </p>
        {s.stored === 'demo' && (
          <p className="mt-6 rounded-2xl border border-dashed border-champagne/40 bg-champagne/[0.05] px-4 py-3 text-xs text-champagne-soft">
            Demo mode: this application was saved only in this browser. Open the <Link to="/admin/recruiting" className="underline underline-offset-4">recruiting dashboard</Link> to see it.
          </p>
        )}
        {s.stored === 'none' && (
          <p className="mt-6 rounded-2xl border border-dashed border-champagne/40 bg-champagne/[0.05] px-4 py-3 text-xs text-champagne-soft">
            Preview mode: the database isn't connected yet, so this application was not stored or sent.
          </p>
        )}
        <div className="mx-auto mt-12 max-w-md text-left">
          <p className="eyebrow">What happens next</p>
          <ol className="mt-5 space-y-3">
            {hiringSteps.slice(1).map((h, i) => (
              <li key={h.title} className="flex gap-4 rounded-2xl border border-line bg-onyx/70 p-4">
                <span className="font-display text-[10px] text-champagne">0{i + 2}</span>
                <span><span className="block text-sm font-semibold text-platinum">{h.title}</span><span className="text-sm text-silver">{h.body}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <Link to="/" className="btn-ghost mt-12"><ArrowLeft size={15} /> Back to home</Link>
      </div>
    </section>
  )
}
