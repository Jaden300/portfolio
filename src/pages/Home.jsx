import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Reveal from "../components/Reveal"
import ChessHero from "../components/ChessHero"
import RoyalCanvas3D from "../components/RoyalCanvas3D"
import ParticleWarp from "../components/ParticleWarp"
import { Bunny, Chick, Bear, Cat, Frog, Panda } from "../components/Critters"

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

const TOP_SKILLS = ["Python","Machine Learning","React","FastAPI","scikit-learn","Signal Processing","PyQt6","Random Forest","XGBoost","Three.js"]

export default function Home() {
  const navigate = useNavigate()
  const hz0 = useRef(null), hz1 = useRef(null), hz2 = useRef(null)

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY
      if (hz0.current) hz0.current.style.transform = `rotate(-6deg) translateY(${y * 0.14}px)`
      if (hz1.current) hz1.current.style.transform = `rotate(4deg) translateY(${y * 0.07}px)`
      if (hz2.current) hz2.current.style.transform = `rotate(-3deg) translateY(${-y * 0.05}px)`
    }
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <ParticleWarp />

      {/* ── Parallax hanzi background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div ref={hz0} style={{ position:"absolute", fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight:900, lineHeight:1, color:"var(--accent)", fontSize:"72vw", top:"-10%", left:"-18%", transform:"rotate(-6deg)", opacity:0.04, userSelect:"none" }}>黃</div>
        <div ref={hz1} style={{ position:"absolute", fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight:900, lineHeight:1, color:"var(--accent)", fontSize:"65vw", top:"28%", left:"42%", transform:"rotate(4deg)", opacity:0.038, userSelect:"none" }}>德</div>
        <div ref={hz2} style={{ position:"absolute", fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight:900, lineHeight:1, color:"var(--accent)", fontSize:"70vw", top:"62%", left:"-8%", transform:"rotate(-3deg)", opacity:0.04, userSelect:"none" }}>治</div>
      </div>

      {/* ── HERO */}
      <section style={{
        position: "relative", zIndex: 1,
        height: "100vh", minHeight: 700,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "visible",
      }}>
        <ChessHero />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:200, background:"linear-gradient(to top,rgba(8,10,15,0.92),transparent)", zIndex:2, pointerEvents:"none" }} />

        {/* Bunny — right of name heading */}
        <Bunny style={{ bottom: 230, right: "7%" }} />
        {/* Chick — left of name heading */}
        <Chick style={{ bottom: 230, left: "7%" }} />

        {/* Hero content */}
        <div style={{ position:"relative", zIndex:3, padding:"0 48px 68px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:14, fontSize:11, fontWeight:500, letterSpacing:"0.34em", textTransform:"uppercase", color:"var(--accent)", marginBottom:16, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            <span style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
            Engineer · Researcher · Builder
            <span style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(60px,8vw,120px)", lineHeight:0.93, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:8, animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.38s both" }}>
            Jaden<br /><em style={{ fontStyle:"italic" }}>Wong.</em>
          </h1>
          <div style={{ fontSize:"clamp(20px,2.8vw,34px)", color:"var(--accent)", letterSpacing:"0.22em", marginBottom:18, opacity:0.9, fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN',serif", animation:"heroSub 1s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}>
            黃 &thinsp; 德 &thinsp; 治
          </div>
          <p style={{ fontSize:13, letterSpacing:"0.06em", color:"var(--text-tertiary)", marginBottom:28, animation:"heroFade 0.9s ease 0.85s both" }}>
            ML Engineering · Signal Processing · Toronto, Ontario
          </p>
          <div style={{ display:"flex", gap:12, animation:"heroFade 0.9s ease 1.05s both" }}>
            <button onClick={() => navigate("/work")} style={{ fontSize:11, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:"#080a0f", padding:"11px 22px", border:"1px solid var(--accent)", borderRadius:3, background:"var(--accent)", cursor: "pointer", fontFamily:"var(--font)", transition:"filter 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
              onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
            >View Work</button>
            <button onClick={() => navigate("/contact")} style={{ fontSize:11, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text)", padding:"11px 22px", border:"1px solid var(--border-dark)", borderRadius:3, background:"transparent", cursor: "pointer", fontFamily:"var(--font)", transition:"border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-dark)"}
            >Get in Touch</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--text-tertiary)" }}>
          <div style={{ width:1, height:34, background:"linear-gradient(to bottom, var(--text-tertiary), transparent)", animation:"tickDrop 1.6s 0.4s infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── SKILLS ROW */}
      <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"16px 48px", background:"var(--bg-2)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
          {TOP_SKILLS.map(skill => (
            <span key={skill} style={{ fontSize:11, fontWeight:500, letterSpacing:"0.14em", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:4, padding:"7px 14px", whiteSpace:"nowrap" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── BIO — Bear sits next to "About" heading label */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px 100px", display:"grid", gridTemplateColumns:"240px 1fr", gap:"0 80px", borderBottom:"1px solid var(--border)", overflow:"visible" }}>
        {/* Bear — next to the "About / 01." label (top of left column) */}
        <Bear style={{ top: 88, left: 256 }} />

        <Reveal>
          <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.36em", textTransform:"uppercase", color:"var(--text-tertiary)", paddingTop:6 }}>
            About
            <span style={{ display:"block", fontFamily:"var(--serif)", fontSize:56, fontWeight:400, letterSpacing:"-0.02em", color:"rgba(237,234,226,0.05)", lineHeight:1, marginTop:4, fontStyle:"italic" }}>01.</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} grand>
          <div>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.7)", marginBottom:24 }}>
              I'm a <strong style={{ color:"var(--text)", fontWeight:500 }}>16-year-old engineer and researcher</strong> from Toronto, Ontario. I build full-stack ML systems, process biomedical signals, and publish educational content — because open access to technology is the point.
            </p>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.7)" }}>
              My flagship project <strong style={{ color:"var(--text)", fontWeight:500 }}>myojam</strong> achieves 84.85% cross-subject accuracy on EMG gesture classification. Previously AI QA intern at <strong style={{ color:"var(--text)", fontWeight:500 }}>Fairly AI</strong>, designing 1,000+ test cases and reducing evaluation pipeline time by 60%.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(108px,1fr))", gap:10, marginTop:44 }}>
              {["Python","React","FastAPI","scikit-learn","PyQt6","Three.js","Signal Processing","Random Forest","XGBoost","LIME","NumPy","Vite"].map(chip => (
                <div key={chip} style={{ display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:500, letterSpacing:"0.14em", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:4, padding:"10px 8px", transition:"border-color 0.2s, color 0.2s", textAlign:"center", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,224,64,0.5)"; e.currentTarget.style.color = "var(--text)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)" }}
                >{chip}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── NUMBERS STRIP */}
      <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid var(--border)", overflow:"visible" }}>
        {[
          { val:84, suffix:".85%", label:"Cross-subject accuracy" },
          { val:1000, suffix:"+", label:"QA test cases designed" },
          { val:11, suffix:"+", label:"Published articles" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ padding:"44px 48px", borderRight: i < 2 ? "1px solid var(--border)" : "none", position:"relative", overflow:"visible" }}>
              <div style={{ fontFamily:"var(--serif)", fontSize:"clamp(42px,5vw,80px)", lineHeight:1, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:10 }}>
                <Counter end={s.val} suffix="" /><span style={{ color:"var(--accent)", fontStyle:"italic" }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize:11, fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-tertiary)" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── ROYAL 3D SHOWCASE */}
      <section style={{ height:"90vh", position:"relative", overflow:"hidden", borderTop:"1px solid var(--border)", zIndex:1 }}>
        <RoyalCanvas3D />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", padding:"0 0 48px", pointerEvents:"none" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:9, color:"rgba(245,224,64,0.3)", textTransform:"uppercase", letterSpacing:"0.3em" }}>Scroll to reveal</div>
            <div style={{ width:1, height:28, background:"linear-gradient(to bottom, rgba(245,224,64,0.25), transparent)" }} />
          </div>
        </div>
      </section>

      {/* ── RESEARCH — Cat sits next to "Research" heading */}
      <section style={{ padding:"100px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1, overflow:"visible" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"240px 1fr", gap:"0 80px", position:"relative" }}>
          {/* Cat — next to "Research / 02." label */}
          <Cat style={{ top: -10, left: 248 }} />

          <Reveal>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.36em", textTransform:"uppercase", color:"var(--text-tertiary)", paddingTop:6 }}>
              Research
              <span style={{ display:"block", fontFamily:"var(--serif)", fontSize:56, fontWeight:400, letterSpacing:"-0.02em", color:"rgba(237,234,226,0.05)", lineHeight:1, marginTop:4, fontStyle:"italic" }}>02.</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} grand>
            <div>
              <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:400, color:"var(--text)", letterSpacing:"-1.5px", fontFamily:"var(--serif)", marginBottom:16, lineHeight:1.2 }}>
                1 technical report.<br />11 published articles.
              </h2>
              <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.7)", marginBottom:32, maxWidth:540 }}>
                A peer-readable technical report on myojam's methodology and eleven articles spanning neuroscience, signal processing, machine learning, hardware, and the ethics of biometric interfaces — openly published on myojam.com.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:32 }}>
                {[
                  ["Technical report","myojam: Open-Source Surface EMG Gesture Classification"],
                  ["Most read","The ghost in the electrode: phantom limb EMG"],
                  ["Latest","The science of muscle-computer interfaces"],
                ].map(([label, title]) => (
                  <div key={label} style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:4, padding:"14px 20px", display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ fontSize:10, color:"var(--accent)", textTransform:"uppercase", letterSpacing:"0.12em", flexShrink:0, minWidth:96 }}>{label}</div>
                    <div style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300 }}>{title}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/research")} style={{ fontSize:11, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--accent)", background:"transparent", border:"1px solid rgba(245,224,64,0.38)", borderRadius:3, padding:"9px 20px", cursor: "pointer", fontFamily:"var(--font)", transition:"background 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#080a0f" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)" }}
              >View all research →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS — Frog sits next to "Projects" heading */}
      <section style={{ padding:"100px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1, overflow:"visible" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"240px 1fr", gap:"0 80px", position:"relative" }}>
          {/* Frog — next to "Projects / 03." label */}
          <Frog style={{ top: -10, left: 248 }} />

          <Reveal>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.36em", textTransform:"uppercase", color:"var(--text-tertiary)", paddingTop:6 }}>
              Projects
              <span style={{ display:"block", fontFamily:"var(--serif)", fontSize:56, fontWeight:400, letterSpacing:"-0.02em", color:"rgba(237,234,226,0.05)", lineHeight:1, marginTop:4, fontStyle:"italic" }}>03.</span>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:4, overflow:"hidden", marginBottom:12, cursor: "pointer" }}
                onClick={() => window.open("https://myojam.com","_blank")}
              >
                <div style={{ padding:"32px 36px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, alignItems:"center" }}>
                  <div>
                    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                      <span style={{ fontSize:10, fontWeight:500, color:"#10B981", background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:2, padding:"3px 10px" }}>Active</span>
                      <span style={{ fontSize:10, fontWeight:300, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:2, padding:"3px 10px" }}>2024–present</span>
                    </div>
                    <h3 style={{ fontSize:28, fontWeight:400, color:"var(--text)", letterSpacing:"-1px", fontFamily:"var(--serif)", marginBottom:12 }}>myojam</h3>
                    <p style={{ fontSize:14, color:"rgba(237,234,226,0.6)", lineHeight:1.8, fontWeight:300, marginBottom:18 }}>
                      Open-source EMG gesture classification. 84.85% cross-subject accuracy on Ninapro DB5. Full-stack platform, education hub, and international competition.
                    </p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {["Python","React","FastAPI","scikit-learn"].map(t => (
                        <span key={t} style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:2, padding:"3px 10px" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {[["84.85%","Accuracy"],["<5ms","Inference"],["16ch","EMG"],["MIT","License"]].map(([v, l]) => (
                      <div key={l} style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:4, padding:"14px", textAlign:"center" }}>
                        <div style={{ fontSize:16, fontWeight:400, color:"var(--accent)", fontStyle:"italic", fontFamily:"var(--serif)", marginBottom:4 }}>{v}</div>
                        <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[
                { title:"Unsupervised Learning", sub:"PCA · t-SNE · KMeans · DBSCAN", url:"https://github.com/Jaden300/Unsupervised-Learning" },
                { title:"Mobile Price Classification", sub:"XGBoost · LIME · GridSearchCV", url:"https://github.com/Jaden300/Mobile-Price-Classification" },
              ].map((p, i) => (
                <Reveal key={p.title} delay={0.15 + i * 0.05}>
                  <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:4, padding:"24px", cursor: "pointer", height:"100%" }}
                    onClick={() => window.open(p.url,"_blank")}
                  >
                    <div style={{ fontSize:10, color:"var(--accent)", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:10 }}>Machine Learning</div>
                    <h3 style={{ fontSize:16, fontWeight:400, color:"var(--text)", letterSpacing:"-0.5px", marginBottom:8, fontFamily:"var(--serif)" }}>{p.title}</h3>
                    <p style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300, marginBottom:14 }}>{p.sub}</p>
                    <span style={{ fontSize:11, color:"var(--accent)", fontWeight:500, letterSpacing:"0.1em" }}>GitHub ↗</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25}>
              <div style={{ marginTop:18, textAlign:"right" }}>
                <span onClick={() => navigate("/work")} className="ink-line" style={{ fontSize:12, color:"var(--text-tertiary)", cursor: "pointer", letterSpacing:"0.1em" }}>All projects →</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE */}
      <section style={{ padding:"100px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"240px 1fr", gap:"0 80px" }}>
          <Reveal>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.36em", textTransform:"uppercase", color:"var(--text-tertiary)", paddingTop:6 }}>
              Experience
              <span style={{ display:"block", fontFamily:"var(--serif)", fontSize:56, fontWeight:400, letterSpacing:"-0.02em", color:"rgba(237,234,226,0.05)", lineHeight:1, marginTop:4, fontStyle:"italic" }}>04.</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:22, fontWeight:400, color:"var(--text)", fontFamily:"var(--serif)", letterSpacing:"-0.5px", marginBottom:4 }}>Fairly AI</div>
                <div style={{ fontSize:12, color:"var(--accent)", fontWeight:400, letterSpacing:"0.04em", marginBottom:2 }}>AI Intern — QA Assistant</div>
                <div style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:300, letterSpacing:"0.06em" }}>Sept 2025 – Jan 2026 · Kitchener, ON</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
                {[["1,000+","test cases"],["60%","workflow reduction"],["70%","classification gain"]].map(([v, l]) => (
                  <div key={l} style={{ padding:"18px", border:"1px solid var(--border)", borderRadius:4, background:"var(--bg-2)" }}>
                    <div style={{ fontSize:22, fontWeight:400, color:"var(--text)", fontFamily:"var(--serif)", letterSpacing:"-1px", marginBottom:4 }}>{v}</div>
                    <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:14, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.6)" }}>
                Designed and executed 1,000+ test cases to investigate model behaviour. Led a benchmarking study across 12+ scenarios over 15 cycles, improving classification by 70%. Developed data workflows reducing project time by 60%.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER — Panda peeks above it */}
      <footer style={{ position:"relative", zIndex:1, padding:"28px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid var(--border)", fontSize:11, letterSpacing:"0.16em", color:"var(--text-tertiary)", overflow:"visible" }}>
        {/* Panda — peeking above the footer bar */}
        <Panda style={{ top: -54, left: "50%", transform: "translateX(-50%)" }} />

        <span>© 2026 Jaden Wong &nbsp;·&nbsp; 黃德治</span>
        <span>Toronto, Ontario</span>
        <a href="mailto:jn.wong.enterprise@gmail.com" style={{ color:"var(--text-tertiary)", textDecoration:"none", transition:"color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
        >jn.wong.enterprise@gmail.com</a>
      </footer>

    </div>
  )
}
