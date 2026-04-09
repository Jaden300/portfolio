import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

function Orb({ size, x, y, delay, color }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: color, left: x, top: y, filter: "blur(90px)", opacity: 0.6,
      animation: `orbFloat 12s ${delay}s ease-in-out infinite alternate`, pointerEvents: "none"
    }}/>
  )
}

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1200
        const increment = value / (duration / 16)
        const tick = () => {
          start += increment
          if (start < value) { setCount(Math.floor(start)); requestAnimationFrame(tick) }
          else setCount(value)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

const SKILLS = [
  { cat: "Machine Learning", items: ["scikit-learn", "Random Forest", "Feature engineering", "Cross-subject evaluation"] },
  { cat: "Biomedical Signal Processing", items: ["Surface EMG", "Butterworth filtering", "Sliding window analysis", "Ninapro DB5"] },
  { cat: "Full-Stack", items: ["React", "Vite", "FastAPI", "Python", "Vercel", "Render"] },
  { cat: "Systems", items: ["PyQt6", "macOS (Quartz)", "Arduino", "Serial communication"] },
]

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Orb size="600px" x="-150px"  y="-100px" delay={0}  color="rgba(245,158,11,0.15)" />
        <Orb size="450px" x="60%"     y="100px"  delay={3}  color="rgba(255,55,95,0.12)"  />
        <Orb size="350px" x="75%"     y="350px"  delay={6}  color="rgba(139,92,246,0.1)"  />
        <Orb size="300px" x="10%"     y="55%"    delay={9}  color="rgba(245,158,11,0.08)" />

        {/* Fine vertical line */}
        <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: 100, background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.4))", transform: "translateX(-50%)" }}/>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "160px 40px 120px", position: "relative", zIndex: 1, width: "100%" }}>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 100, padding: "7px 18px",
            fontSize: 12, color: "rgba(245,158,11,0.85)", fontWeight: 400,
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block", animation: "pulse 2s infinite" }}/>
            16 · Toronto · Open to opportunities
          </div>

          {/* Name */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease" }}>
            <div style={{ fontSize: "clamp(11px,1.5vw,13px)", color: "var(--text-tertiary)", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--serif)" }}>
              Portfolio
            </div>
            <h1 style={{ fontSize: "clamp(56px,10vw,120px)", fontWeight: 900, letterSpacing: "-5px", lineHeight: 0.92, marginBottom: 12, fontFamily: "var(--serif)" }}>
              <span className="gold">Jaden</span><br />
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Wong.</span>
            </h1>
            <div style={{ width: 180, height: 1, background: "linear-gradient(to right, rgba(245,158,11,0.6), transparent)", margin: "24px 0" }}/>
            <div style={{ fontSize: "clamp(14px,2vw,18px)", color: "var(--text-secondary)", fontWeight: 300, letterSpacing: "0.06em", marginBottom: 40, fontFamily: "var(--serif)", fontStyle: "italic" }}>
              Engineer · Researcher · Builder
            </div>
          </div>

          <p style={{
            fontSize: "clamp(16px,2.2vw,20px)", color: "var(--text-secondary)", fontWeight: 300,
            lineHeight: 1.8, maxWidth: 620, marginBottom: 52,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease"
          }}>
            I build open-source tools at the intersection of machine learning, biomedical signal processing, and human-computer interaction. My flagship project, <span style={{ color: "#F59E0B", fontWeight: 400 }}>myojam</span>, classifies hand gestures from surface EMG signals in real time.
          </p>

          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease"
          }}>
            <button onClick={() => navigate("/work")} style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #92400e 100%)",
              color: "#0a0000", borderRadius: 100, padding: "15px 40px",
              fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: "0 8px 32px rgba(245,158,11,0.35)", letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(245,158,11,0.55)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.35)" }}
            >View my work</button>
            <button onClick={() => navigate("/contact")} style={{
              background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
              color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100, padding: "15px 32px", fontSize: 15, fontWeight: 300,
              cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"; e.currentTarget.style.color = "#F59E0B" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)" }}
            >Get in touch ↓</button>
            <a href="https://myojam.com" target="_blank" rel="noreferrer" style={{
              background: "transparent", color: "var(--text-tertiary)",
              border: "1px solid var(--border)", borderRadius: 100,
              padding: "15px 28px", fontSize: 15, fontWeight: 300,
              letterSpacing: "0.02em", transition: "color 0.2s, border-color 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#F59E0B"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)" }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.borderColor = "var(--border)" }}
            >myojam.com ↗</a>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 48, left: 40, display: "flex", alignItems: "center", gap: 12, opacity: 0.4 }}>
            <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.6))" }}/>
            <span style={{ fontSize: 10, color: "rgba(245,158,11,0.8)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 300, writingMode: "vertical-rl" }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── STATS */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { val: 84, suffix: ".85%", label: "Cross-subject accuracy", sub: "myojam gesture classifier" },
            { val: 16269, suffix: "", label: "Training windows", sub: "Ninapro DB5 dataset" },
            { val: 11, suffix: "+", label: "Published articles", sub: "EMG education hub" },
            { val: 16, suffix: "", label: "Years old", sub: "Toronto, Ontario" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "40px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 6, fontFamily: "var(--serif)" }} className="gold">
                <AnimatedCounter value={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>Technical skills</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", fontFamily: "var(--serif)" }}>What I work with.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {SKILLS.map((skill, i) => (
              <div key={skill.cat} className="hover-lift" style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "28px"
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>{skill.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skill.items.map(item => (
                    <span key={item} style={{ fontSize: 13, color: "var(--text-secondary)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 100, padding: "5px 14px", fontWeight: 300 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA */}
      <section style={{ padding: "0 40px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(255,55,95,0.04) 100%)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 24, padding: "56px", textAlign: "center" }}>
            <h3 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", marginBottom: 16, fontFamily: "var(--serif)" }}>
              Open to internships & collaborations.
            </h3>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 36px" }}>
              Particularly interested in ML research, biomedical engineering, and full-stack roles at companies working on technology that genuinely helps people.
            </p>
            <button onClick={() => navigate("/contact")} style={{
              background: "linear-gradient(135deg, #F59E0B, #92400e)", color: "#0a0000",
              borderRadius: 100, padding: "14px 36px", fontSize: 15, fontWeight: 700,
              border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(245,158,11,0.5)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.3)" }}
            >Get in touch →</button>
          </div>
        </div>
      </section>
    </div>
  )
}