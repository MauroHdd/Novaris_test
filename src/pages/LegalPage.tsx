import { FileText } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { legalDocs } from '../content/pages'
import { Reveal } from '../components/fx/Reveal'
import { PageHero, Placeholder } from '../components/ui/Page'

function LegalNav() {
  return (
    <nav className="space-y-1" aria-label="Legal documents">
      {legalDocs.map((d) => (
        <NavLink key={d.slug} to={`/legal/${d.slug}`}
          className={({ isActive }) => `block rounded-xl px-4 py-2.5 text-sm transition-colors ${isActive ? 'bg-white/[0.04] text-platinum' : 'text-mist hover:text-silver'}`}>
          {d.title}
        </NavLink>
      ))}
    </nav>
  )
}

export function LegalIndex() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Policies & disclosures" intro="The documents that govern how NOVARIS operates, protects information and communicates." />
      <section className="bg-ink pb-28">
        <div className="mx-auto grid max-w-site gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {legalDocs.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.04}>
              <Link to={`/legal/${d.slug}`} className="glass flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-champagne/30">
                <FileText size={18} strokeWidth={1.5} className="text-champagne" />
                <h2 className="mt-5 font-sans text-lg font-semibold text-platinum">{d.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-silver">{d.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

export default function LegalPage() {
  const { slug } = useParams()
  const doc = legalDocs.find((d) => d.slug === slug)
  if (!doc) return <LegalIndex />
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={doc.summary} />
      <section className="bg-ink pb-28">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block"><div className="sticky top-28"><LegalNav /></div></aside>
          <article className="max-w-3xl">
            <div className="rounded-2xl border border-dashed border-champagne/40 bg-champagne/[0.05] p-5 text-sm leading-relaxed text-champagne-soft">
              <strong className="text-champagne">Draft placeholder.</strong> This document has not been written yet. It must be prepared or reviewed by
              qualified legal counsel for NOVARIS's actual practices and jurisdictions before the site goes live.
            </div>
            <p className="mt-8 text-sm text-mist">Effective date: <Placeholder>[PLACEHOLDER: date]</Placeholder> · Last updated: <Placeholder>[PLACEHOLDER: date]</Placeholder></p>
            <div className="mt-10 space-y-10">
              {doc.sections.map((s, i) => (
                <section key={s}>
                  <h2 className="font-sans text-xl font-semibold text-platinum">{i + 1}. {s}</h2>
                  <p className="mt-3 leading-relaxed text-silver"><Placeholder>[PLACEHOLDER: {s.toLowerCase()} — text to be provided by counsel]</Placeholder></p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
