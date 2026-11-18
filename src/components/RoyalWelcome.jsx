import { motion, useInView } from 'framer-motion'
import { Crown } from 'lucide-react'
import { useRef } from 'react'
import { princessConfig } from '../data/princessConfig'
import CastleSilhouette from './CastleSilhouette'

export default function RoyalWelcome() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="welcome"
      className="section-padding bg-fairytale relative overflow-hidden"
      aria-labelledby="welcome-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-40">
        <CastleSilhouette className="w-full translate-y-12" variant="full" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <motion.div
          className="mx-auto mb-6 flex justify-center"
          animate={
            inView
              ? {
                  y: [0, -8, 0],
                  filter: [
                    'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
                    'drop-shadow(0 0 20px rgba(212,175,55,0.7))',
                    'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
                  ],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Crown className="h-14 w-14 text-champagne md:h-20 md:w-20" strokeWidth={1.2} aria-hidden />
        </motion.div>

        <p className="font-script text-4xl text-rose-deep md:text-5xl">Welcome, Your Highness</p>

        <h2 id="welcome-heading" className="font-display mt-6 text-3xl font-semibold text-plum md:text-4xl">
          {princessConfig.princessName}
        </h2>

        <p className="font-display mt-8 text-lg leading-relaxed text-plum/85 md:text-xl">
          Today, no crown is more beautiful than your smile, no kingdom more precious than your heart, and no
          fairytale more beautiful than our story.
        </p>
      </motion.div>
    </section>
  )
}