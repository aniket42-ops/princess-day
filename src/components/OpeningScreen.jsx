import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import CastleSilhouette from './CastleSilhouette'
import FloatingEffects from './FloatingEffects'

export default function OpeningScreen({ onEnter }) {
  return (
    <motion.div
      className="bg-fairytale fixed inset-0 z-50 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingEffects petals clouds>
        <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-2"
          >
            <Sparkles className="mx-auto h-6 w-6 text-champagne" aria-hidden />
            <p className="font-script mt-2 text-3xl text-plum md:text-4xl">To My Princess</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-full max-w-2xl px-2"
          >
            <CastleSilhouette className="mx-auto w-full opacity-90" />
          </motion.div>

          <div className="glass mt-6 w-full max-w-xl rounded-3xl px-6 py-8 md:px-10 md:py-10">
            <motion.p
              className="font-display text-lg leading-relaxed text-plum/90 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Once upon a time, there was a beautiful girl…
            </motion.p>
            <motion.p
              className="font-display mt-4 text-base italic text-plum/75 md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Little did she know, someone considered her his entire universe.
            </motion.p>
            <motion.div
              className="my-6 h-px w-full bg-gradient-to-r from-transparent via-champagne-soft to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
            <motion.p
              className="font-display text-base text-plum/85 md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Today, the kingdom celebrates its most precious princess.
            </motion.p>
            <motion.h1
              className="font-display mt-4 text-2xl font-semibold text-gradient-gold md:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              Happy Princess Day, My Love!
            </motion.h1>
          </div>

          <motion.button
            type="button"
            onClick={onEnter}
            className="group relative mt-10 overflow-hidden rounded-full px-10 py-4 font-body text-sm font-semibold tracking-widest text-plum uppercase shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, #f4e4bc, #e8d5a3, #f7e4ea)',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.35)',
            }}
          >
            <span className="relative z-10">Enter Your Kingdom</span>
            <motion.span
              className="absolute inset-0 bg-white/30"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>
      </FloatingEffects>
    </motion.div>
  )
}