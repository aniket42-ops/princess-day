import { AnimatePresence, motion, useInView } from 'framer-motion'
import { MailOpen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { princessConfig } from '../data/princessConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'

function TypedLetter({ text, active }) {
  const reduced = useReducedMotion()
  const [displayed, setDisplayed] = useState(reduced ? text : '')

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }
    if (reduced) {
      setDisplayed(text)
      return
    }
    let i = 0
    setDisplayed('')
    const id = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 12)
    return () => clearInterval(id)
  }, [active, text, reduced])

  return (
    <div className="font-display max-h-[50vh] overflow-y-auto whitespace-pre-wrap text-left text-base leading-relaxed text-plum/90 md:text-lg">
      {displayed}
      {active && !reduced && displayed.length < text.length && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-rose-deep" aria-hidden />
      )}
    </div>
  )
}

export default function LoveLetter() {
  const [open, setOpen] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      id="letter"
      className="section-padding bg-gradient-to-b from-lavender/40 to-blush/30"
      aria-labelledby="letter-heading"
    >
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="font-script text-3xl text-rose-deep md:text-4xl">A Royal Love Letter</p>
        <h2 id="letter-heading" className="font-display mt-2 text-2xl font-semibold text-plum">
          Sealed with all my heart
        </h2>

        <div className="perspective-1000 relative mt-12 flex min-h-[320px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="envelope"
                type="button"
                className="group relative w-full max-w-md focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                onClick={() => setOpen(true)}
                initial={{ rotateX: 0 }}
                whileHover={{ y: -4 }}
                aria-expanded={open}
                aria-label="Open your letter"
              >
                <div className="relative mx-auto aspect-[5/3] w-full max-w-sm">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-champagne-soft via-cream to-blush shadow-xl"
                    style={{ transformOrigin: 'top center' }}
                  />
                  <motion.div
                    className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-2xl bg-gradient-to-b from-rose-deep/20 to-transparent"
                    initial={{ rotateX: 0 }}
                    whileHover={{ rotateX: 25 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                    <MailOpen className="h-10 w-10 text-champagne" aria-hidden />
                    <span className="font-display text-lg font-medium text-plum">Open Your Letter</span>
                    <span className="text-xs text-plum/60 group-hover:text-plum/80">Tap to break the royal seal</span>
                  </div>
                  <motion.div
                    className="absolute -top-3 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-2 border-champagne bg-champagne-soft/80 shadow-lg"
                    animate={{ boxShadow: ['0 0 10px rgba(212,175,55,0.3)', '0 0 25px rgba(212,175,55,0.6)', '0 0 10px rgba(212,175,55,0.3)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="font-script flex h-full items-center justify-center text-2xl text-plum">R</span>
                  </motion.div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="letter-paper"
                className="glass w-full max-w-lg rounded-3xl p-8 text-left shadow-2xl md:p-10"
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <TypedLetter text={princessConfig.loveLetter} active={open} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}