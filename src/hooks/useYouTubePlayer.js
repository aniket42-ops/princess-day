import { useEffect, useRef, useState } from 'react'

const API_SRC = 'https://www.youtube.com/iframe_api'

function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${API_SRC}"]`)
    if (existing) {
      const check = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(check)
          resolve(window.YT)
        }
      }, 50)
      setTimeout(() => {
        clearInterval(check)
        if (!window.YT?.Player) reject(new Error('YouTube API timeout'))
      }, 15000)
      return
    }

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT)
    }

    const script = document.createElement('script')
    script.src = API_SRC
    script.async = true
    script.onerror = () => reject(new Error('YouTube API failed to load'))
    document.head.appendChild(script)
  })
}

export function useYouTubePlayer(videoId, enabled) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!enabled || !videoId) return

    let cancelled = false

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !containerRef.current) return

        playerRef.current = new YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              if (!cancelled) setReady(true)
            },
            onStateChange: (event) => {
              if (cancelled) return
              const YTState = window.YT.PlayerState
              if (event.data === YTState.PLAYING) setPlaying(true)
              else if (event.data === YTState.PAUSED || event.data === YTState.ENDED) setPlaying(false)
            },
          },
        })
      })
      .catch(() => setReady(false))

    return () => {
      cancelled = true
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* player may not have mounted */
      }
      playerRef.current = null
      setReady(false)
      setPlaying(false)
    }
  }, [enabled, videoId])

  const play = async () => {
    playerRef.current?.playVideo?.()
  }

  const pause = () => {
    playerRef.current?.pauseVideo?.()
  }

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    if (muted) {
      player.unMute()
      setMuted(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }

  return {
    containerRef,
    ready,
    playing,
    muted,
    play,
    pause,
    toggleMute,
    setPlaying,
  }
}