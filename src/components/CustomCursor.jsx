import { useEffect, useState } from 'react'

export default function CustomCursor({ enabled }) {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })

    const onOver = (e) => {
      const t = e.target
      if (t.closest('button, a, [role="button"]')) setHovering(true)
    }
    const onOut = (e) => {
      const t = e.target
      if (t.closest('button, a, [role="button"]')) setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        className="custom-cursor-ring"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          borderColor: hovering ? 'rgba(212, 175, 55, 0.8)' : undefined,
        }}
        aria-hidden
      />
      <div className="custom-cursor-dot" style={{ left: pos.x, top: pos.y }} aria-hidden />
    </>
  )
}