import { useEffect, useRef } from "react"

export default function Reveal({ children, delay = 0, style = {}, grand = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay * 1000)
        obs.disconnect()
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={grand ? "reveal-grand" : "reveal"} style={style}>{children}</div>
}