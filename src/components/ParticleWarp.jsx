import { useEffect, useRef } from "react"

export default function ParticleWarp() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let W, H, raf, scrollVel = 0, lastY = window.scrollY

    const stars = Array.from({ length: 260 }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      vy: 0.00012 + Math.random() * 0.00032,
      vx: (Math.random() - 0.5) * 0.00007,
      r:  0.28 + Math.pow(Math.random(), 2.4) * 2.1,
      a:  0.04 + Math.random() * 0.42,
      ph: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resize)
    resize()

    const onScroll = () => {
      scrollVel += (window.scrollY - lastY)
      lastY = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    let t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t++
      scrollVel *= 0.84

      ctx.clearRect(0, 0, W, H)
      const vel = scrollVel * 0.00013

      for (const s of stars) {
        s.y += s.vy + vel * (0.45 + s.r * 0.28)
        s.x += s.vx + Math.sin(t * 0.0035 + s.ph) * 0.000028
        if (s.y > 1.02) { s.y = -0.02; s.x = Math.random() }
        if (s.y < -0.02) { s.y = 1.02; s.x = Math.random() }
        s.x = ((s.x % 1) + 1) % 1

        const px = s.x * W
        const py = s.y * H
        const streak = Math.min(Math.abs(scrollVel) * 0.15, 38)

        ctx.globalAlpha = s.a
        if (streak > 5) {
          const dir = scrollVel > 0 ? 1 : -1
          const g = ctx.createLinearGradient(px, py, px, py + streak * dir)
          g.addColorStop(0, "rgba(245,224,64,1)")
          g.addColorStop(1, "rgba(245,224,64,0)")
          ctx.strokeStyle = g
          ctx.lineWidth = Math.max(0.5, s.r * 0.5)
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(px, py + streak * dir)
          ctx.stroke()
        } else {
          ctx.fillStyle = "#f5e040"
          ctx.beginPath()
          ctx.arc(px, py, s.r, 0, 6.2832)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }
    requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    }} />
  )
}
