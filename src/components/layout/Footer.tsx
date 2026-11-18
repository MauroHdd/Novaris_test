import { Link } from 'react-router-dom'
import { academyLink, brand, footerDisclosure, legalLinks, nav } from '../../content/site'
import { LogoMark, Wordmark } from '../brand/Logo'
import { demoMode } from '../../lib/env'

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-onyx">
      <div className="mx-auto grid max-w-site gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <Wordmark className="text-sm" />
          </div>
          <p className="mt-5 font-display text-[10px] tracking-brand text-champagne">{brand.tagline}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{footerDisclosure}</p>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[...nav, academyLink].map((n) => (
              <li key={n.to}><Link to={n.to} className="text-silver transition-colors hover:text-platinum">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-silver">
            <li>{brand.email}</li>
            <li>{brand.phone}</li>
            <li>{brand.location}</li>
          </ul>
          <p className="eyebrow mt-10">Legal</p>
          <ul className="mt-5 space-y-3 text-sm">
            {legalLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-silver transition-colors hover:text-platinum">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <div className="mx-auto flex max-w-site flex-col justify-between gap-2 px-6 py-6 text-xs text-mist sm:flex-row">
        <span>© {new Date().getFullYear()} NOVARIS. All rights reserved.</span>
        <span className="flex items-center gap-4">
          {demoMode && <Link to="/admin/recruiting" className="rounded-full border border-champagne/40 px-3 py-1 text-[11px] text-champagne-soft hover:bg-champagne/10">Admin dashboard (demo)</Link>}
          <span className="font-display text-[9px] tracking-wide2">BUILT FOR EXECUTION</span>
        </span>
      </div>
    </footer>
  )
}
