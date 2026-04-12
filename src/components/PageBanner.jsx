import { useEffect, useRef } from "react"

export default function PageBanner({ label, title, accent, sub }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let raf
    let phase = 0

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      phase += 0.012

      // Draw 3 offset sine waves
      const waves = [
        { amp: H * 0.09, freq: 0.008, offset: 0,          alpha: 0.25, width: 1.5 },
        { amp: H * 0.06, freq: 0.012, offset: Math.PI*0.7, alpha: 0.15, width: 1   },
        { amp: H * 0.04, freq: 0.006, offset: Math.PI*1.4, alpha: 0.1,  width: 0.8 },
      ]

      waves.forEach(wave => {
        ctx.beginPath()
        for (let x = 0; x <= W; x++) {
          const y = H/2 + Math.sin(x * wave.freq + phase + wave.offset) * wave.amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(201,146,42,${wave.alpha})`
        ctx.lineWidth = wave.width
        ctx.stroke()
      })

      // Subtle dot accents
      for (let i = 0; i < 5; i++) {
        const x = (W / 5) * i + W / 10
        const y = H/2 + Math.sin(x * 0.008 + phase) * H * 0.09
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,146,42,0.5)`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <section style={{ position:"relative", borderBottom:"1px solid var(--border)", overflow:"hidden", background:"var(--bg)", minHeight:280, display:"flex", alignItems:"center" }}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}/>

      {/* Right geometric accent */}
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"30%", background:"linear-gradient(to left, var(--bg-2), transparent)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"8%", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
        {[180,120,70].map((r,i) => (
          <div key={r} style={{ position:"absolute", top:"50%", left:"50%", width:r, height:r, borderRadius:"50%", border:`1px solid rgba(201,146,42,${0.08+i*0.06})`, transform:"translate(-50%,-50%)" }}/>
        ))}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:8, height:8, borderRadius:"50%", background:"var(--gold)", opacity:0.6 }}/>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"100px 48px 60px", position:"relative", zIndex:1, width:"100%" }}>
        <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.3em", marginBottom:16, fontFamily:"var(--serif)" }}>{label}</div>
        <h1 style={{ fontSize:"clamp(48px,8vw,80px)", fontWeight:800, letterSpacing:"-3px", lineHeight:0.95, fontFamily:"var(--serif)", color:"var(--text)", marginBottom: sub ? 16 : 0 }}>
          {title}<br/><span className="gold-text">{accent}</span>
        </h1>
        {sub && <p style={{ fontSize:16, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75, maxWidth:480, marginTop:20 }}>{sub}</p>}
      </div>
    </section>
  )
}