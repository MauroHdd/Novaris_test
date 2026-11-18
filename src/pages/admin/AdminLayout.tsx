import { BarChart3, Briefcase, GraduationCap, Handshake, LayoutDashboard, Lock, LogOut, Menu, Radar, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { LogoMark, Wordmark } from '../../components/brand/Logo'
import { demoMode } from '../../lib/env'

const items = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, stage: 6, end: true },
  { to: '/admin/recruiting', label: 'Recruiting', icon: Briefcase, stage: 3 },
  { to: '/admin/employees', label: 'Employees', icon: Users, stage: 6 },
  { to: '/admin/academy', label: 'Academy', icon: GraduationCap, stage: 5 },
  { to: '/admin/leads', label: 'Leads & CRM', icon: Radar, stage: 7 },
  { to: '/admin/partnerships', label: 'Partnerships', icon: Handshake, stage: 8 },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3, stage: 6 },
]
const BUILT = 3

/**
 * Admin area. Applicant data must only be visible to authorized users:
 * - Demo mode: unlocked with a banner (data never leaves this browser).
 * - Otherwise: locked until Supabase Auth + role checks arrive (Stages 4 & 9).
 */
export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  if (!demoMode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="glass max-w-md rounded-[2rem] p-10 text-center">
          <Lock className="mx-auto text-champagne" />
          <h1 className="mt-6 font-sans text-2xl font-semibold text-platinum">Authorized access only</h1>
          <p className="mt-3 text-sm text-silver">The NOVARIS admin area requires a secure sign-in with the right permissions. Sign-in is enabled in Stage 4.</p>
          <Link to="/" className="btn-ghost mt-8">Back to site</Link>
        </div>
      </div>
    )
  }

  const nav = (
    <nav className="space-y-1" aria-label="Admin">
      {items.map(({ to, label, icon: Icon, stage, end }) => (
        <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
          className={({ isActive }) => `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-white/[0.06] text-platinum' : 'text-silver hover:bg-white/[0.03] hover:text-platinum'}`}>
          <span className="flex items-center gap-3"><Icon size={16} strokeWidth={1.6} />{label}</span>
          {stage > BUILT && <span className="font-display text-[8px] text-mist">S{stage}</span>}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-ink text-platinum">
      <div className="sticky top-0 z-40 border-b border-champagne/20 bg-champagne/[0.07] px-4 py-2 text-center text-[12px] text-champagne-soft backdrop-blur">
        Demo mode: data is stored only in this browser. Secure sign-in and role permissions arrive in Stage 4.
      </div>
      <div className="flex">
        <aside className="sticky top-9 hidden h-[calc(100vh-36px)] w-64 shrink-0 flex-col border-r border-line bg-onyx p-5 lg:flex">
          <Link to="/" className="mb-8 flex items-center gap-3 px-2"><LogoMark size={26} /><Wordmark className="text-[11px]" /></Link>
          <p className="eyebrow mb-3 px-3 text-[9px]">Management</p>
          {nav}
          <div className="mt-auto rounded-2xl border border-line p-4">
            <p className="text-sm font-semibold">Admin (demo)</p>
            <p className="text-xs text-mist">Owner / Super Admin</p>
            <Link to="/" className="mt-3 inline-flex items-center gap-2 text-xs text-silver hover:text-platinum"><LogOut size={13} /> Exit to site</Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-line px-5 py-4 lg:hidden">
            <Link to="/" className="flex items-center gap-2"><LogoMark size={24} /><Wordmark className="text-[10px]" /></Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-2">{open ? <X size={20} /> : <Menu size={20} />}</button>
          </header>
          {open && <div className="border-b border-line bg-onyx p-4 lg:hidden">{nav}</div>}
          <main className="px-5 py-8 sm:px-8 lg:px-10"><Outlet /></main>
        </div>
      </div>
    </div>
  )
}

export function AdminComingSoon({ title, stage }: { title: string; stage: number }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="eyebrow">Stage {stage}</p>
        <h1 className="mt-4 font-sans text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-silver">This module will be built in Stage {stage}.</p>
        <Link to="/admin/recruiting" className="btn-ghost mt-8">Go to Recruiting</Link>
      </div>
    </div>
  )
}
