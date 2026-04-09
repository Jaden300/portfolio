import { useEffect } from "react"

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor")
    const ring = document.getElementById("cursor-ring")
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100

    function onMove(e) {
      mx = e.clientX; my = e.clientY
      dot.style.left  = mx + "px"
      dot.style.top   = my + "px"
    }

    function lerp(a, b, t) { return a + (b - a) * t }

    function animate() {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = rx + "px"
      ring.style.top  = ry + "px"
      requestAnimationFrame(animate)
    }

    function onEnter(e) {
      const el = e.target
      if (el.matches("a, button, [data-cursor='pointer']")) {
        dot.style.width = "20px"
        dot.style.height = "20px"
        ring.style.width = "56px"
        ring.style.height = "56px"
        ring.style.opacity = "0.8"
      }
    }
    function onLeave() {
      dot.style.width = "10px"
      dot.style.height = "10px"
      ring.style.width = "36px"
      ring.style.height = "36px"
      ring.style.opacity = "0.5"
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onEnter)
    document.addEventListener("mouseout", onLeave)
    animate()

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onEnter)
      document.removeEventListener("mouseout", onLeave)
    }
  }, [])

  return (
    <>
      <div id="cursor"/>
      <div id="cursor-ring"/>
    </>
  )
}