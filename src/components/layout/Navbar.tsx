import { AnimatePresence, motion } from 'framer-motion'
import { LockKeyhole, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { academyLink, nav } from '../../content/site'
import { LogoMark, Wordmark } from '../brand/Logo'
import { ease } from '../fx/Reveal'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto mt-3 flex max-w-site items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6 ${
        scrolled ? 'nav-solid mx-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] sm:mx-auto' : 'border border-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-3" aria-label="NOVARIS home">
          <LogoMark size={30} />
          <Wordmark className="text-[13px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${isActive ? 'text-platinum' : 'text-silver hover:text-platinum'}`}>
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-champagne" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to={academyLink.to}
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-platinum transition-colors hover:border-champagne/60 sm:inline-flex">
            <LockKeyhole size={13} className="text-champagne" /> {academyLink.label}
          </Link>
          <button className="rounded-full p-2 text-platinum lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="glass mx-3 mt-2 rounded-3xl p-3 lg:hidden"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }} aria-label="Mobile"
          >
            {[...nav, academyLink].map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}
                className={({ isActive }) => `block rounded-2xl px-4 py-3 text-[15px] ${isActive ? 'bg-white/5 text-platinum' : 'text-silver'}`}>
                {n.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
