import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { princessConfig } from '../data/princessConfig'
import CastleSilhouette from './CastleSilhouette'
import { ParticleCanvas } from './FloatingEffects'
import { useReducedMotion } from '../hooks/useReducedMotion'

function FireworksCanvas() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame
    let w = 0
    let h = 0
    const bursts = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnBurst = () => {
      if (bursts.length > 6) return
      const colors = ['#f4e4bc', '#f48fb1', '#e1bee7', '#fff8e1', '#d4af37']
      const x = w * (0.2 + Math.random() * 0.6)
      const y = h * (0.15 + Math.random() * 0.35)
      const particles = Array.from({ length: 24 }, (_, i) => ({
        x,
        y,
        vx: Math.cos((i / 24) * Math.PI * 2) * (2 + Math.random() * 3),
        vy: Math.sin((i / 24) * Math.PI * 2) * (2 + Math.random() * 3),
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
      bursts.push({ particles })
    }

    let tick = 0
    const draw = () => {
      tick++
      if (tick % 90 === 0) spawnBurst()
      ctx.clearRect(0, 0, w, h)
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b]
        let alive = false
        for (const p of burst.particles) {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.04
          p.life -= 0.012
          if (p.life <= 0) continue
          alive = true
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
        if (!alive) bursts.splice(b, 1)
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />
}

export default function FinalSurprise() {
  const [showSecret, setShowSecret] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reveal = useCallback(() => setShowSecret(true), [])

  return (
    <section
      ref={ref}
      id="finale"
      className="section-padding relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-lavender/60 via-blush/40 to-cream pb-32"
      aria-labelledby="finale-heading"
    >
      <ParticleCanvas />
      <FireworksCanvas />

      <div className="pointer-events-none absolute inset-x-0 bottom-8 opacity-70">
        <CastleSilhouette className="mx-auto w-full max-w-4xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl px-2 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="font-display text-xl text-plum/90 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          And if I had to choose one fairytale to live forever…
        </motion.p>
        <motion.p
          className="font-script mt-6 text-4xl text-rose-deep md:text-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          I would choose ours. Again and again.
        </motion.p>

        <h2 id="finale-heading" className="font-display mt-10 text-2xl font-semibold text-gradient-gold md:text-3xl">
          Happy Princess Day, My Beautiful Girl.
        </h2>

        <p className="font-display mt-10 text-lg text-plum/85">
          With all my love,
          <br />
          <span className="text-gradient-gold font-semibold">{princessConfig.princeName}</span>
        </p>

        <motion.button
          type="button"
          onClick={reveal}
          className="mt-12 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-plum uppercase shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          style={{
            background: 'linear-gradient(135deg, #f7e4ea, #f4e4bc)',
            boxShadow: '0 0 24px rgba(201, 123, 138, 0.25)',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          One Last Surprise
        </motion.button>

        <AnimatePresence>
          {showSecret && (
            <motion.div
              className="glass mt-10 rounded-3xl px-6 py-8 text-left md:px-10"
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0 }}
              role="region"
              aria-label="Personal surprise message"
            >
              <p className="font-display text-base leading-relaxed whitespace-pre-line text-plum/90 md:text-lg">
                {princessConfig.finalSurpriseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}