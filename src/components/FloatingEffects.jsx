import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const PETAL_COUNT = 18
const STAR_COUNT = 40

function PetalLayer({ intensity = 1 }) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
  <>
      {Array.from({ length: PETAL_COUNT * intensity }).map((_, i) => (
        <motion.span
          key={`petal-${i}`}
          className="pointer-events-none absolute h-3 w-4 rounded-[50%] bg-rose-deep/30"
          style={{
            left: `${(i * 17) % 100}%`,
            top: '-5%',
            rotate: `${i * 23}deg`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(i) * 60],
            rotate: [0, 180 + i * 20],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 12 + (i % 6),
            repeat: Infinity,
            delay: (i % 8) * 0.8,
            ease: 'linear',
          }}
          aria-hidden
        />
      ))}
    </>
  )
}

export function FloatingHearts({ count = 6 }) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={`heart-${i}`}
          className="absolute text-lg text-rose-deep/40"
          style={{ left: `${10 + i * 14}%`, bottom: '10%' }}
          animate={{
            y: [0, -120, -240],
            opacity: [0, 0.8, 0],
            scale: [0.6, 1, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

export function ParticleCanvas({ className = '' }) {
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

    const particles = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.00025 + 0.00008,
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y -= p.speed
        if (p.y < 0) {
          p.y = 1
          p.x = Math.random()
        }
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.002 + p.phase))
        const x = p.x * w
        const y = p.y * h
        ctx.beginPath()
        ctx.arc(x, y, p.r * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 248, 220, ${0.35 * twinkle})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, y, p.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 213, 163, ${0.08 * twinkle})`
        ctx.fill()
      }
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

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  )
}

export function CloudDrift() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-16 w-40 rounded-full bg-white/40 blur-md md:h-24 md:w-64"
          style={{ top: `${12 + i * 18}%`, left: '-20%' }}
          animate={{ x: ['0vw', '130vw'] }}
          transition={{
            duration: 45 + i * 15,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 8,
          }}
        />
      ))}
    </div>
  )
}

export default function FloatingEffects({ petals = true, particles = true, clouds = true, children }) {
  return (
    <div className="relative">
      {particles && <ParticleCanvas />}
      {clouds && <CloudDrift />}
      {petals && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <PetalLayer />
        </div>
      )}
      {children}
    </div>
  )
}