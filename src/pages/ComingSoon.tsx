import { ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AuroraField } from '../components/fx/AuroraField'
import { Reveal } from '../components/fx/Reveal'

/** Placeholder for pages scheduled in later build stages. */
export default function ComingSoon({ title, stage }: { title: string; stage: string }) {
  const { pathname } = useLocation()
  return (
    <section className="noise relative flex min-h-[80svh] items-center overflow-hidden bg-ink pt-28">
      <AuroraField density={35} />
      <Reveal className="relative mx-auto max-w-xl px-6 text-center">
        <p className="eyebrow">{stage}</p>
        <h1 className="mt-6 font-sans text-4xl font-semibold text-platinum sm:text-5xl">{title}</h1>
        <p className="mt-5 text-silver">This section of the NOVARIS platform is being built. <span className="text-mist">({pathname})</span></p>
        <Link to="/" className="btn-ghost mt-10"><ArrowLeft size={15} /> Back to home</Link>
      </Reveal>
    </section>
  )
}
