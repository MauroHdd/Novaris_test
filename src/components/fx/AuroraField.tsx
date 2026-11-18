import { useEffect, useRef } from 'react'

/**
 * Interactive background: a slow constellation of platinum points joined by faint lines,
 * with a soft light that follows the pointer. Pauses when off-screen; static if reduced motion.
 */
export function AuroraField({ density = 70, className = '' }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean }
    let pts: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(density * Math.min(1, (w * h) / (1440 * 900)) + 20)
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.3, gold: Math.random() < 0.07,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      if (mouse.x > -1000) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 340)
        g.addColorStop(0, 'rgba(232,231,228,0.07)')
        g.addColorStop(1, 'rgba(232,231,228,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = dx * dx + dy * dy
          if (d < 130 * 130) {
            const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
            const boost = md < 220 ? (1 - md / 220) * 0.18 : 0
            ctx.strokeStyle = `rgba(200,203,210,${(1 - d / (130 * 130)) * 0.07 + boost})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.gold ? 'rgba(214,190,140,0.9)' : 'rgba(232,231,228,0.55)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left; mouse.ty = e.clientY - rect.top
      if (mouse.x < -1000) { mouse.x = mouse.tx; mouse.y = mouse.ty }
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })

    resize(); draw()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [density])

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
