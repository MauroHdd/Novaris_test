import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogoMark } from '../brand/Logo'
import { brand } from '../../content/site'
import { ease } from '../fx/Reveal'

const KEY = 'novaris-intro-seen'

/** Cinematic opening: light sweep, mark, letter-by-letter wordmark, tagline. Plays once per session. */
export function IntroSequence() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(KEY) } catch { return true }
  })

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => close(), reduce ? 600 : 4200)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  function close() {
    try { sessionStorage.setItem(KEY, '1') } catch { /* private mode */ }
    document.body.style.overflow = ''
    setShow(false)
  }

  const letters = brand.name.split('')

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="noise fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.04 }}
          transition={{ duration: 1.1, ease }}
          onClick={close}
        >
          {/* horizon light */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[80vw] -translate-x-1/2"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,231,228,0.7), rgba(210,188,138,0.6), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, ease, times: [0, 0.5, 1] }}
          />
          <motion.div
            className="absolute h-[60vh] w-[60vh] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,231,228,0.10), transparent 60%)' }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, ease }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
          >
            <LogoMark size={76} />
          </motion.div>

          <div className="mt-9 flex font-display text-3xl sm:text-5xl" aria-label={brand.name}>
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="text-metal animate-sheen px-[0.18em]"
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease, delay: 1.1 + i * 0.09 }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="mt-6 font-display text-[10px] tracking-brand text-champagne sm:text-xs"
            initial={{ opacity: 0, letterSpacing: '0.9em' }}
            animate={{ opacity: 1, letterSpacing: '0.42em' }}
            transition={{ duration: 1.4, ease, delay: 2.1 }}
          >
            {brand.tagline}
          </motion.p>

          <button
            onClick={close}
            className="absolute bottom-8 right-8 font-display text-[9px] uppercase tracking-wide2 text-mist transition-colors hover:text-platinum"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
