import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Reveal from "../components/Reveal"

// Text scramble effect
function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const len = text.length
    const iterations = 18
    const id = setInterval(() => {
      setDisplay(text.split("").map((char, i) => {
        if (char === " ") return " "
        if (frame > i * (iterations / len)) return char
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(""))
      frame++
      if (frame > iterations) { setDisplay(text); clearInterval(id) }
    }, 28)
    return () => clearInterval(id)
  }, [trigger, text])

  return display
}

// Animated number
function Counter({ end, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const step = end / (duration / 16)
        let cur = 0
        const tick = () => {
          cur = Math.min(cur + step, end)
          setVal(Math.floor(cur))
          if (cur < end) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

const MARQUEE_ITEMS = ["Surface EMG","Gesture Classification","Random Forest","Assistive Technology","React","FastAPI","PyQt6","Three.js","Ninapro DB5","Python","Signal Processing","Open Source","myojam"]

export default function Home() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const name1 = useScramble("Jaden", loaded)
  const name2 = useScramble("Wong.", loaded)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 48px" }}>

        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>

        {/* Gold accent circle */}
        <div style={{ position: "absolute", right: "8%", top: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,146,42,0.12) 0%, transparent 70%)", pointerEvents: "none", animation: "float 6s ease-in-out infinite alternate" }}/>
        <div style={{ position: "absolute", right: "15%", top: "25%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,146,42,0.15)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", right: "20%", top: "30%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(201,146,42,0.1)", pointerEvents: "none" }}/>

        <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", paddingTop: 80 }}>
          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }}/>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              16 · Toronto, Ontario · Open to opportunities
            </span>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: "clamp(14px,1.8vw,16px)", color: "var(--text-tertiary)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--serif)", opacity: loaded ? 1 : 0, transition: "opacity 1s 0.2s ease" }}>Portfolio of</div>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-4px", userSelect: "none" }}>
              <div style={{ fontSize: "clamp(80px,13vw,160px)", color: "var(--text)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease" }}>
                {name1}
              </div>
              <div style={{ fontSize: "clamp(80px,13vw,160px)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease" }} className="gold-text">
                {name2}
              </div>
            </h1>
          </div>

          {/* Divider with role */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, margin: "32px 0 40px", opacity: loaded ? 1 : 0, transition: "opacity 0.8s 0.4s ease" }}>
            <div style={{ height: 1, width: 60, background: "var(--gold)" }}/>
            <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 300, fontFamily: "var(--serif)", fontStyle: "italic", letterSpacing: "0.06em" }}>
              Engineer · Researcher · Builder
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.85, opacity: loaded ? 1 : 0, transition: "opacity 0.8s 0.5s ease" }}>
                I build at the intersection of machine learning, biomedical signal processing, and human-computer interaction. My flagship project, <strong style={{ fontWeight: 600, color: "var(--text)" }}>myojam</strong>, classifies hand gestures from EMG signals at 84.85% cross-subject accuracy — and has become a full research and education platform with 11 published articles, lesson plans, and interactive demos.
              </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: loaded ? 1 : 0, transition: "opacity 0.8s 0.6s ease" }}>
              <button onClick={() => navigate("/work")} style={{
                background: "var(--text)", color: "var(--bg)",
                border: "none", borderRadius: 100, padding: "16px 36px",
                fontSize: 15, fontWeight: 600, cursor: "none",
                letterSpacing: "0.02em", textAlign: "center",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,146,42,0.3)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)" }}
              >View my work →</button>
              <button onClick={() => navigate("/contact")} style={{
                background: "transparent", color: "var(--text)",
                border: "1.5px solid var(--border-dark)", borderRadius: 100,
                padding: "16px 36px", fontSize: 15, fontWeight: 400,
                cursor: "none", letterSpacing: "0.02em",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(0)" }}
              >Get in touch</button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Scroll</div>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--text-tertiary), transparent)" }}/>
        </div>
      </section>

      {/* ── MARQUEE */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", overflow: "hidden", background: "var(--bg-2)" }}>
        <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, padding: "0 28px", letterSpacing: "0.06em" }}>
              {item}
              <span style={{ color: "var(--gold)", marginLeft: 28 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {[
              { val: 84, suffix: ".85%", label: "Cross-subject accuracy", sub: "myojam on Ninapro DB5" },
              { val: 1000, suffix: "+", label: "QA test cases", sub: "Fairly AI co-op" },
              { val: 11, suffix: "+", label: "Published articles", sub: "myojam education hub" },
              { val: 60, suffix: "%", label: "Workflow reduction", sub: "Fairly AI evaluation pipeline" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "40px 28px", background: "var(--bg-2)", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-2px", marginBottom: 8, fontFamily: "var(--serif)", color: "var(--text)" }}>
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH HIGHLIGHT */}
      <section style={{ padding: "64px 48px", background: "var(--bg-dark)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>Research & writing</div>
                <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: "white", letterSpacing: "-1.5px", fontFamily: "var(--serif)", marginBottom: 16 }}>
                  1 technical report.<br />11 published articles.
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.8, marginBottom: 28 }}>
                  A peer-readable technical report on myojam's methodology and eleven articles spanning neuroscience, signal processing, machine learning, hardware, and the ethics of biometric interfaces — all openly published on myojam.com.
                </p>
                <button onClick={() => window.location.href = "/research"} style={{ background: "linear-gradient(135deg, #C9922A, #E8B84B)", color: "#0a0000", border: "none", borderRadius: 100, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >View all research →</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Technical report","myojam: Open-Source Surface EMG Gesture Classification"],
                  ["Most read article","Phantom limb EMG — 61 likes"],
                  ["Newest article","The science of muscle-computer interfaces"],
                ].map(([label, title]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ fontSize: 10, color: "rgba(245,158,11,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 400, lineHeight: 1.4 }}>{title}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED WORK */}
      <section style={{ padding: "0 48px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 12, fontFamily: "var(--serif)" }}>Selected work</div>
                <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", fontFamily: "var(--serif)" }}>What I've built.</h2>
              </div>
              <span onClick={() => window.location.href = "/work"} className="ink-line" style={{ fontSize: 14, color: "var(--text-secondary)", cursor: "none", fontWeight: 300 }}>All projects →</span>
            </div>
          </Reveal>

          {/* myojam card */}
          <Reveal delay={0.1}>
            <div className="hover-lift" style={{ background: "var(--bg-dark)", borderRadius: 24, overflow: "hidden", marginBottom: 16, cursor: "none" }}
              onClick={() => window.open("https://myojam.com", "_blank")}
            >
              <div style={{ padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#10B981", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 100, padding: "4px 12px", letterSpacing: "0.06em" }}>Active</span>
                    <span style={{ fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px" }}>2024–present</span>
                  </div>
                  <h3 style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: "-2px", fontFamily: "var(--serif)", marginBottom: 16 }}>myojam</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>
                    Open-source EMG gesture classification system. 84.85% cross-subject accuracy on Ninapro DB5. Full-stack platform with education hub, demos, and an international competition.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Python","React","FastAPI","PyQt6","scikit-learn","Three.js"].map(t => (
                      <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["84.85%","Accuracy"],["<5ms","Inference"],["16ch","EMG input"],["MIT","License"]].map(([val, label]) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px", textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold-light)", letterSpacing: "-1px", fontFamily: "var(--serif)", marginBottom: 4 }}>{val}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 300 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two smaller cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal delay={0.15}>
              <div className="hover-lift" style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px", cursor: "none", height: "100%" }}
                onClick={() => window.open("https://github.com/Jaden300/Unsupervised-Learning", "_blank")}
              >
                <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Machine Learning</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", marginBottom: 12, fontFamily: "var(--serif)" }}>Unsupervised Learning</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>PCA, t-SNE, KMeans, DBSCAN, and more — on Spotify and Sign Language MNIST datasets. Full dimensionality reduction and clustering workflow.</p>
                <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500 }}>GitHub ↗</span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="hover-lift" style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px", cursor: "none", height: "100%" }}
                onClick={() => window.open("https://github.com/Jaden300/Mobile-Price-Classification", "_blank")}
              >
                <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Machine Learning</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", marginBottom: 12, fontFamily: "var(--serif)" }}>Mobile Price Classification</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>Complete ML workflow: Logistic Regression, KNN, SVM, Random Forest, XGBoost, LIME explainability, and ensemble methods.</p>
                <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500 }}>GitHub ↗</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE STRIP */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "64px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
              <div style={{ minWidth: 200 }}>
                <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8, fontFamily: "var(--serif)" }}>Experience</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", fontFamily: "var(--serif)" }}>Fairly AI</div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>AI Intern · Sept 2025 – Jan 2026</div>
              </div>
              <div style={{ width: 1, height: 60, background: "var(--border)", flexShrink: 0 }}/>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                {[
                  ["1,000+", "Test cases designed"],
                  ["60%", "Workflow time reduced"],
                  ["70%", "Classification improvement"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-1px", fontFamily: "var(--serif)", marginBottom: 4 }}>{val}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 24, fontFamily: "var(--serif)" }}>Let's work together</div>
            <h2 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 24, fontFamily: "var(--serif)" }}>
              Open to<br /><span className="gold-text">opportunities.</span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px" }}>
              Particularly interested in ML research, biomedical engineering, and full-stack roles at companies building technology that matters.
            </p>
            <button onClick={() => window.location.href = "/contact"} style={{
              background: "var(--text)", color: "var(--bg)", border: "none",
              borderRadius: 100, padding: "18px 48px", fontSize: 16, fontWeight: 600,
              cursor: "none", letterSpacing: "0.02em",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              transition: "background 0.2s, transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(201,146,42,0.3)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)" }}
            >Get in touch →</button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}