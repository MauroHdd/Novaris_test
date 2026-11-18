import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AuroraField } from '../components/fx/AuroraField'
import { ease } from '../components/fx/Reveal'

export default function ThankYouPage() {
  const state = (useLocation().state ?? {}) as { name?: string; stored?: boolean }
  return (
    <section className="noise relative flex min-h-[85svh] items-center overflow-hidden bg-ink pt-28">
      <AuroraField density={35} />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne/50 bg-champagne/[0.06] shadow-[0_0_60px_-10px_rgba(210,188,138,0.5)]">
          <Check className="text-champagne" size={32} strokeWidth={1.5} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}
          className="mt-10 font-sans text-4xl font-semibold text-platinum sm:text-5xl">
          Thank you{state.name ? `, ${state.name}` : ''}.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-5 text-lg text-silver">
          Your message has been received. A member of the NOVARIS team will follow up using the contact details you provided.
        </motion.p>
        {state.stored === false && (
          <p className="mt-6 rounded-2xl border border-dashed border-champagne/40 bg-champagne/[0.05] px-4 py-3 text-xs text-champagne-soft">
            Preview mode: the database isn't connected yet, so this message was not stored or sent.
          </p>
        )}
        <Link to="/" className="btn-ghost mt-10"><ArrowLeft size={15} /> Back to home</Link>
      </div>
    </section>
  )
}
