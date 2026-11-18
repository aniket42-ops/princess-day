import { motion, useInView } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import { useRef, useState } from 'react'
import { reasons } from '../data/reasons'

function ReasonCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.li
      ref={ref}
      className="list-none"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="group relative h-44 w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne md:h-48"
        aria-pressed={flipped}
        aria-label={`${reason.title}. ${flipped ? reason.detail : 'Click to reveal'}`}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={!flipped ? { scale: 1.02, rotateX: 4 } : {}}
        >
          <div
            className="glass absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-5 text-center shadow-md transition group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Sparkle className="mb-2 h-5 w-5 text-champagne" aria-hidden />
            <span className="font-display text-lg font-semibold text-plum">{reason.title}</span>
            <span className="mt-2 text-xs tracking-wide text-plum/50 uppercase">Tap to reveal</span>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-champagne/40 bg-gradient-to-br from-lavender/80 via-blush/90 to-cream p-5 text-center shadow-inner"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm leading-relaxed text-plum/85">{reason.detail}</p>
          </div>
        </motion.div>
      </button>
    </motion.li>
  )
}

export default function ReasonsCards() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section id="reasons" className="section-padding bg-fairytale" aria-labelledby="reasons-heading">
      <motion.div
        ref={headerRef}
        className="mx-auto mb-12 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <p className="font-script text-3xl text-rose-deep md:text-4xl">Reasons Why</p>
        <h2 id="reasons-heading" className="font-display mt-2 text-2xl font-semibold text-plum">
          You&apos;re My Princess
        </h2>
      </motion.div>

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <ReasonCard key={reason.id} reason={reason} index={index} />
        ))}
      </ul>
    </section>
  )
}