import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import FinalSurprise from './components/FinalSurprise'
import LoveLetter from './components/LoveLetter'
import LoveTimeline from './components/LoveTimeline'
import MusicPlayer from './components/MusicPlayer'
import OpeningScreen from './components/OpeningScreen'
import ReasonsCards from './components/ReasonsCards'
import RoyalPromise from './components/RoyalPromise'
import RoyalWelcome from './components/RoyalWelcome'
import { useReducedMotion } from './hooks/useReducedMotion'

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()

  const handleEnter = useCallback(() => {
    setUserHasInteracted(true)
    setEntered(true)
  }, [])

  useEffect(() => {
    if (!entered) return
    document.body.style.cursor = finePointer && !reducedMotion ? 'none' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [entered, finePointer, reducedMotion])

  return (
    <>
      <a href="#welcome" className="skip-link">
        Skip to welcome
      </a>

      <AnimatePresence mode="wait">
        {!entered && <OpeningScreen key="opening" onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <main className="bg-fairytale min-h-dvh">
          <RoyalWelcome />
          <LoveTimeline />
          <LoveLetter />
          <ReasonsCards />
          <RoyalPromise />
          <FinalSurprise />
        </main>
      )}

      {entered && <MusicPlayer userHasInteracted={userHasInteracted} />}
      {entered && <CustomCursor enabled={finePointer && !reducedMotion} />}
    </>
  )
}