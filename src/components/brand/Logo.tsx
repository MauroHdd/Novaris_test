import { brand } from '../../content/site'

/**
 * The official NOVARIS logo goes in /public/brand and its path in content/site.ts (brand.logoSrc).
 * Until then this neutral faceted mark stands in. It is NOT the official logo.
 */
export function LogoMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  if (brand.logoSrc) {
    return <img src={brand.logoSrc} alt="NOVARIS logo" width={size} height={size} className={className} />
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="NOVARIS logo placeholder" role="img">
      <defs>
        <linearGradient id="nv-plat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#a9adb5" />
          <stop offset="0.7" stopColor="#f2f1ed" />
          <stop offset="1" stopColor="#7d8088" />
        </linearGradient>
        <linearGradient id="nv-gold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#9C8657" />
          <stop offset="1" stopColor="#E6D6B0" />
        </linearGradient>
      </defs>
      <path d="M32 3 L59 18.5 V45.5 L32 61 L5 45.5 V18.5 Z" fill="none" stroke="url(#nv-plat)" strokeWidth="1.4" />
      <path d="M21 44 V20 L43 44 V20" fill="none" stroke="url(#nv-plat)" strokeWidth="3.2" strokeLinejoin="miter" />
      <circle cx="43" cy="20" r="2.2" fill="url(#nv-gold)" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`font-display tracking-brand text-metal ${className}`}>NOVARIS</span>
}
