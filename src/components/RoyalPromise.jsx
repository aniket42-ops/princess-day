import { motion, useInView } from 'framer-motion'
import { Crown } from 'lucide-react'
import { useRef } from 'react'
import { princessConfig } from '../data/princessConfig'
import { FloatingHearts } from './FloatingEffects'

export default function RoyalPromise() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="promise"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-blush/50 via-lavender/30 to-cream"
      aria-labelledby="promise-heading"
    >
      <FloatingHearts count={10} />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={
            inView
              ? {
                  scale: [1, 1.06, 1],
                  filter: [
                    'drop-shadow(0 0 12px rgba(212,175,55,0.5))',
                    'drop-shadow(0 0 28px rgba(212,175,55,0.85))',
                    'drop-shadow(0 0 12px rgba(212,175,55,0.5))',
                  ],
                }
              : {}
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-6 flex justify-center"
        >
          <Crown className="h-16 w-16 text-champagne md:h-20 md:w-20" strokeWidth={1} aria-hidden />
        </motion.div>

        <h2 id="promise-heading" className="font-display text-2xl font-semibold text-gradient-gold md:text-3xl">
          {princessConfig.royalPromise.title}
        </h2>

        <div className="glass mt-8 rounded-3xl px-6 py-8 md:px-10">
          <p className="font-display whitespace-pre-line text-lg leading-relaxed text-plum/90">
            {princessConfig.royalPromise.body}
          </p>
        </div>
      </motion.div>
    </section>
  )
}