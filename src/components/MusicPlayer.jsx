import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { princessConfig } from '../data/princessConfig'
import { useYouTubePlayer } from '../hooks/useYouTubePlayer'

function LocalAudioPlayer({ userHasInteracted }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplaythrough', onCanPlay)
    return () => audio.removeEventListener('canplaythrough', onCanPlay)
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch {
      setPlaying(false)
    }
  }, [playing])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }, [muted])

  return (
  <>
      <audio
        ref={audioRef}
        src={princessConfig.music.src}
        loop
        preload="metadata"
        aria-label="Romantic background music"
      />
      <PlayerChrome
        title={princessConfig.music.title}
        playing={playing}
        muted={muted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        playDisabled={!userHasInteracted && !ready}
      />
    </>
  )
}

function YouTubeMusicPlayer() {
  const videoId = princessConfig.music.youtubeVideoId
  const yt = useYouTubePlayer(videoId, Boolean(videoId))

  const togglePlay = useCallback(() => {
    if (!yt.ready) return
    if (yt.playing) yt.pause()
    else yt.play()
  }, [yt])

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
        <div ref={yt.containerRef} title="Background music player" />
      </div>
      <PlayerChrome
        title={princessConfig.music.title}
        playing={yt.playing}
        muted={yt.muted}
        onTogglePlay={togglePlay}
        onToggleMute={yt.toggleMute}
        playDisabled={!yt.ready}
      />
    </>
  )
}

function PlayerChrome({ title, playing, muted, onTogglePlay, onToggleMute, playDisabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg md:bottom-8 md:right-8 md:gap-3 md:px-4 md:py-3"
    >
      <Music2 className="hidden h-4 w-4 text-plum/70 sm:block" aria-hidden />
      <span className="max-w-[140px] truncate text-[10px] text-plum/60 md:max-w-[220px] md:text-xs">{title}</span>
      <button
        type="button"
        onClick={onTogglePlay}
        disabled={playDisabled}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-champagne-soft to-champagne text-plum shadow transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne disabled:opacity-60"
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
      </button>
      <button
        type="button"
        onClick={onToggleMute}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-soft/50 text-plum/80 transition hover:bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        aria-pressed={muted}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </motion.div>
  )
}

export default function MusicPlayer({ userHasInteracted }) {
  const useYouTube = Boolean(princessConfig.music.youtubeVideoId)

  if (useYouTube) return <YouTubeMusicPlayer />
  return <LocalAudioPlayer userHasInteracted={userHasInteracted} />
}