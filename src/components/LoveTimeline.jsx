import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useRef } from 'react'
import { memories } from '../data/memories'

function MilestoneCard({ memory, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const placeholderClass = `placeholder-art placeholder-art--${memory.placeholder}`

  return (
    <motion.article
      ref={ref}
      className={`glass flex min-w-[280px] max-w-sm shrink-0 flex-col overflow-hidden rounded-3xl md:min-w-[320px] ${
        memory.highlight ? 'ring-2 ring-champagne/50' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={`h-36 w-full ${placeholderClass}`} role="img" aria-label={memory.title} />
      <div className="flex flex-1 flex-col p-6">
        <time className="text-xs font-semibold tracking-wider text-champagne uppercase">{memory.date}</time>
        <h3 className="font-display mt-2 text-xl font-semibold text-plum">{memory.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/75">{memory.description}</p>
        {memory.highlight && (
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-rose-deep">
            <Heart className="h-3.5 w-3.5 fill-current" aria-hidden /> Today&apos;s chapter
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function LoveTimeline() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section id="story" className="section-padding relative overflow-hidden bg-cream" aria-labelledby="story-heading">
      <motion.div
        ref={headerRef}
        className="mx-auto mb-12 max-w-2xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <p className="font-script text-3xl text-rose-deep md:text-4xl">Our Love Story</p>
        <h2 id="story-heading" className="font-display mt-3 text-2xl font-semibold text-plum md:text-3xl">
          A timeline written in heartbeat moments
        </h2>
        <p className="mt-3 text-sm text-plum/65 md:text-base">
          Scroll through the chapters of us — customize each milestone in{' '}
          <code className="rounded bg-lavender/50 px-1.5 py-0.5 text-xs">src/data/memories.js</code>
        </p>
      </motion.div>

      <ul className="mx-auto flex max-w-md flex-col gap-6 md:hidden">
        {memories.map((memory, index) => (
          <li key={memory.id} className="list-none">
            <MilestoneCard memory={memory} index={index} />
          </li>
        ))}
      </ul>

      <div className="relative hidden md:block">
        <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-champagne-soft to-transparent" />
        <ul
          className="flex gap-8 overflow-x-auto px-[max(1rem,calc(50%-640px))] pb-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {memories.map((memory, index) => (
            <li key={memory.id} className="snap-center list-none">
              <MilestoneCard memory={memory} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}