import Reveal from "../components/Reveal"
import ParticleWarp from "../components/ParticleWarp"
import ResearchCanvas3D from "../components/ResearchCanvas3D"

const PAPER = {
  title: "myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction",
  type: "Technical Report",
  date: "April 2026",
  abstract: "We present myojam, an open-source surface electromyography (sEMG) gesture classification system achieving 84.85% cross-subject accuracy across six hand gesture classes on the Ninapro DB5 benchmark. The system employs a Random Forest classifier trained on 64-dimensional time-domain feature vectors extracted from 200-sample sliding windows across 16 electrode channels at 200 Hz. Training data comprises 16,269 labelled windows from 10 intact-limb subjects.",
  keywords: ["Surface EMG","Gesture classification","Random Forest","Assistive technology","Ninapro DB5","Signal processing"],
  url: "https://myojam.com/research",
}

const ARTICLES = [
  {
    title: "After EMG: what comes next",
    tag: "Future", date: "September 2025",
    desc: "Surface EMG is one point on a spectrum from skin sensing to direct neural recording. HD-sEMG, peripheral nerve interfaces, and motor cortex decoding.",
    url: "https://myojam.com/education/future-of-bci", likes: 73,
  },
  {
    title: "Build your own EMG sensor for under $60",
    tag: "Hardware", date: "October 2025",
    desc: "A complete weekend project guide: parts list, wiring, Arduino firmware, electrode placement, and signal quality checks.",
    url: "https://myojam.com/education/build-your-own", likes: 89,
  },
  {
    title: "The ghost in the electrode: phantom limb EMG",
    tag: "Neuroscience", date: "December 2025",
    desc: "Amputees generate measurable EMG from limbs they no longer have. What phantom signals reveal about cortical remapping and prosthetic control.",
    url: "https://myojam.com/education/phantom-limb", likes: 61,
  },
  {
    title: "Muscle memory is real — it's just not in your muscles",
    tag: "Neuroscience", date: "January 2026",
    desc: "What neuroscientists actually mean by motor learning, how repetition reshapes the brain's motor cortex, and why gesture consistency matters for classification.",
    url: "https://myojam.com/education/muscle-memory", likes: 52,
  },
  {
    title: "The science of muscle-computer interfaces",
    tag: "Foundations", date: "April 2026",
    desc: "From the biology of muscle contraction to the machine learning that classifies gesture intent — a complete explainer from the ground up.",
    url: "https://myojam.com/education/emg-explainer", likes: 47,
  },
  {
    title: "Why EMG is harder than it looks",
    tag: "Signal Processing", date: "November 2025",
    desc: "Six specific reasons EMG gesture classification keeps failing in real-world deployment — and what research is doing about each one.",
    url: "https://myojam.com/education/why-emg-is-hard", likes: 44,
  },
  {
    title: "Why Random Forest? The classifier behind myojam",
    tag: "Machine Learning", date: "March 2026",
    desc: "Why not a neural network? How ensemble tree methods handle noisy biomedical signals, and what 84.85% cross-subject accuracy actually means.",
    url: "https://myojam.com/education/random-forest-emg", likes: 38,
  },
  {
    title: "Who owns your muscle data?",
    tag: "Ethics", date: "August 2025",
    desc: "EMG signals can identify you and reveal your health status. As biometric gesture interfaces scale, these questions can't wait for regulation.",
    url: "https://myojam.com/education/ethics-of-emg", likes: 38,
  },
  {
    title: "From lab to laptop: democratising EMG",
    tag: "Accessibility", date: "March 2026",
    desc: "EMG prosthetics have existed for 60 years. How open datasets, affordable hardware, and open-source tools are finally making gesture control accessible.",
    url: "https://myojam.com/education/open-source-emg", likes: 31,
  },
  {
    title: "Inside Ninapro DB5: the dataset that trains myojam",
    tag: "Dataset", date: "February 2026",
    desc: "Where the training data comes from. What DB5 contains, how it was recorded, and what decisions went into turning 52 hand movements into a 6-class classifier.",
    url: "https://myojam.com/education/ninapro-db5", likes: 24,
  },
  {
    title: "The art of cutting a signal into pieces",
    tag: "Signal Processing", date: "July 2025",
    desc: "Window size, step size, and overlap are the least glamorous choices in EMG classification — and silently the most consequential.",
    url: "https://myojam.com/education/windowing-explained", likes: 29,
  },
]

const TAG_COLORS = {
  "Foundations":      "#FF375F",
  "Machine Learning": "#3B82F6",
  "Accessibility":    "#8B5CF6",
  "Dataset":          "#10B981",
  "Neuroscience":     "#F59E0B",
  "Signal Processing":"#06B6D4",
  "Future":           "#A855F7",
  "Ethics":           "#EC4899",
  "Hardware":         "#84CC16",
}

const RESOURCES = [
  {
    title: "EMG Basics — full lesson plan",
    type: "Lesson Plan",
    audience: "Grades 9–12 · Biology / Physics",
    duration: "75 min",
    desc: "Complete classroom-ready lesson including timed phases, student activities, teacher notes, differentiation strategies, and a 4-point assessment rubric.",
    url: "https://myojam.com/educators/lesson-emg-basics",
  },
  {
    title: "Teaching a machine to read gestures",
    type: "Lesson Plan",
    audience: "Grades 10–12 / Intro university · CS / Data Science",
    duration: "90 min",
    desc: "Hands-on ML lesson covering feature extraction, decision boundaries, and confusion matrix interpretation — using real Ninapro data.",
    url: "https://myojam.com/educators/lesson-gesture-classifier",
  },
  {
    title: "myocode: code with your muscles",
    type: "Lesson Plan",
    audience: "Grades 6–10 · CS / STEM",
    duration: "60 min",
    desc: "Introduces event-driven programming through myocode, myojam's block coding environment where EMG gestures are first-class events.",
    url: "https://myojam.com/educators/lesson-myocode",
  },
]

const FEATURED = ARTICLES.slice(0, 2)
const REST     = ARTICLES.slice(2)

export default function Research() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--text)" }}>
      <ParticleWarp />

      {/* ── HERO */}
      <section style={{
        position:"relative", height:"100vh", minHeight:600, zIndex:1,
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", textAlign:"center", overflow:"hidden",
      }}>
        {/* Faded background character */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", userSelect:"none" }}>
          <span style={{ fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight:900, fontSize:"80vw", lineHeight:1, color:"var(--accent)", opacity:0.03 }}>研</span>
        </div>

        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:24, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            Technical report · 11 articles · 3 lesson plans
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Research &<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>writing.</em>
          </h1>
          <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:520, margin:"28px auto 0", lineHeight:1.75, animation:"heroFade 1s ease 0.75s both" }}>
            A peer-readable technical report on myojam's methodology, eleven articles spanning neuroscience, signal processing, and ML ethics, and three educator-ready lesson plans — all openly published.
          </p>
        </div>

        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--text-tertiary)", animation:"heroFade 1s ease 1.1s both", zIndex:1 }}>
          <div style={{ width:1, height:34, background:"linear-gradient(to bottom, var(--text-tertiary), transparent)", animation:"tickDrop 1.6s 1.4s infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          {[
            ["1",    "Technical report"],
            ["11",   "Published articles"],
            ["3",    "Lesson plans"],
            ["450+", "Total reader likes"],
          ].map(([val, label], i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div style={{ padding:"48px 36px", borderRight:i<3?"1px solid var(--border)":"none", textAlign:"center" }}>
                <div style={{ fontFamily:"var(--serif)", fontSize:"clamp(36px,4vw,64px)", fontWeight:700, color:"var(--text)", letterSpacing:"-2px", lineHeight:1, marginBottom:10 }}>{val}</div>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.18em" }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3D PARTICLE CANVAS */}
      <ResearchCanvas3D />

      {/* ── TECHNICAL REPORT */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Technical report</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:56 }}>The paper.</h2>
          </Reveal>

          <Reveal delay={0.08} grand>
            <a href={PAPER.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.querySelector(".report-inner").style.background = "var(--bg)"}
              onMouseLeave={e => e.currentTarget.querySelector(".report-inner").style.background = "var(--bg-2)"}
            >
              <div className="report-inner" style={{ background:"var(--bg-2)", borderRadius:24, overflow:"hidden", transition:"background 0.2s", borderLeft:"3px solid var(--gold)" }}>
                <div style={{ padding:"52px" }}>
                  {/* Badges */}
                  <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
                    {[
                      { label:"Technical Report", color:"var(--gold)", bg:"rgba(245,224,64,0.08)", border:"rgba(245,224,64,0.25)" },
                      { label:"April 2026",       color:"var(--text-tertiary)", bg:"transparent", border:"var(--border)" },
                      { label:"Open Access",      color:"#10B981", bg:"rgba(16,185,129,0.08)", border:"rgba(16,185,129,0.25)" },
                      { label:"MIT Licence",      color:"var(--text-tertiary)", bg:"transparent", border:"var(--border)" },
                    ].map(b => (
                      <span key={b.label} style={{ fontSize:10, fontWeight:600, color:b.color, background:b.bg, border:`1px solid ${b.border}`, borderRadius:100, padding:"4px 14px", letterSpacing:"0.06em", textTransform:"uppercase" }}>{b.label}</span>
                    ))}
                  </div>

                  <h3 style={{ fontFamily:"var(--serif)", fontSize:"clamp(18px,2.4vw,28px)", fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px", lineHeight:1.3, marginBottom:28, maxWidth:740 }}>
                    {PAPER.title}
                  </h3>

                  {/* Abstract */}
                  <div style={{ borderLeft:"2px solid rgba(245,224,64,0.3)", paddingLeft:24, marginBottom:28 }}>
                    <div style={{ fontSize:10, color:"rgba(245,224,64,0.55)", textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:10 }}>Abstract</div>
                    <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.85, fontWeight:300, margin:0, fontStyle:"italic" }}>{PAPER.abstract}</p>
                  </div>

                  {/* Keywords */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:36 }}>
                    {PAPER.keywords.map(k => (
                      <span key={k} style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 14px", fontWeight:300 }}>{k}</span>
                    ))}
                  </div>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid var(--border)", paddingTop:24 }}>
                    <span style={{ fontSize:12, color:"var(--text-tertiary)", fontStyle:"italic" }}>Wong, J. (2026). myojam Technical Report. myojam Project.</span>
                    <span style={{ fontSize:14, fontWeight:600, color:"var(--gold)", letterSpacing:"0.08em" }}>Read paper ↗</span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── ARTICLES */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap", gap:16 }}>
              <div>
                <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Articles</div>
                <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>11 published articles.</h2>
              </div>
              <a href="https://myojam.com/education" target="_blank" rel="noreferrer"
                style={{ fontSize:13, color:"var(--gold)", fontWeight:500, letterSpacing:"0.06em", textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >All on myojam.com ↗</a>
            </div>
          </Reveal>

          {/* Featured 2 — large cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:4 }}>
            {FEATURED.map((article, i) => {
              const tc = TAG_COLORS[article.tag] || "var(--gold)"
              return (
                <Reveal key={article.title} delay={i * 0.07} grand>
                  <a href={article.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none", height:"100%" }}
                    onMouseEnter={e => e.currentTarget.querySelector(".acard").style.background = "var(--bg)"}
                    onMouseLeave={e => e.currentTarget.querySelector(".acard").style.background = "var(--bg-2)"}
                  >
                    <div className="acard" style={{ background:"var(--bg-2)", borderRadius:20, padding:"36px", height:"100%", transition:"background 0.2s", borderTop:`3px solid ${tc}`, boxSizing:"border-box" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                        <span style={{ fontSize:10, fontWeight:700, color:tc, background:`${tc}15`, border:`1px solid ${tc}30`, borderRadius:100, padding:"3px 12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>{article.tag}</span>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <span style={{ fontSize:11, color:"var(--text-tertiary)" }}>♥ {article.likes}</span>
                        </div>
                      </div>
                      <h3 style={{ fontFamily:"var(--serif)", fontSize:"clamp(18px,2vw,22px)", fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px", lineHeight:1.25, marginBottom:14 }}>{article.title}</h3>
                      <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.75, fontWeight:300, marginBottom:20 }}>{article.desc}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:300 }}>{article.date}</span>
                        <span style={{ fontSize:13, color:tc, fontWeight:600 }}>Read ↗</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>

          {/* Rest — clean rows */}
          <div style={{ border:"1px solid var(--border)", borderRadius:20, overflow:"hidden", marginTop:4 }}>
            {REST.map((article, i) => {
              const tc = TAG_COLORS[article.tag] || "var(--gold)"
              return (
                <Reveal key={article.title} delay={i * 0.03}>
                  <a href={article.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--bg-2)"}
                  >
                    <div style={{ background:"var(--bg-2)", borderBottom: i < REST.length - 1 ? "1px solid var(--border)" : "none", padding:"22px 28px", display:"grid", gridTemplateColumns:"auto 1fr auto", gap:24, alignItems:"center", transition:"background 0.15s" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:tc, background:`${tc}15`, border:`1px solid ${tc}30`, borderRadius:100, padding:"3px 12px", textTransform:"uppercase", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{article.tag}</span>
                      <div>
                        <div style={{ fontSize:15, fontWeight:600, color:"var(--text)", marginBottom:3, lineHeight:1.3 }}>{article.title}</div>
                        <div style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300 }}>{article.date} &nbsp;·&nbsp; ♥ {article.likes}</div>
                      </div>
                      <span style={{ fontSize:16, color:"var(--text-tertiary)" }}>↗</span>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LESSON PLANS */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px 120px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Educational resources</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:16 }}>Lesson plans.</h2>
            <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:520, lineHeight:1.75, marginBottom:56 }}>
              Classroom-ready lesson plans with timed phases, student activities, teacher notes, and assessment rubrics. Published on the myojam educators hub.
            </p>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <a href={r.url} target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.querySelector(".rcard").style.background = "var(--bg)"}
                  onMouseLeave={e => e.currentTarget.querySelector(".rcard").style.background = "var(--bg-2)"}
                >
                  <div className="rcard" style={{
                    background:"var(--bg-2)", padding:"36px", transition:"background 0.2s",
                    borderRadius: i===0 ? "20px 0 0 20px" : i===2 ? "0 20px 20px 0" : "0",
                  }}>
                    <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--gold)", background:"rgba(245,224,64,0.08)", border:"1px solid rgba(245,224,64,0.22)", borderRadius:100, padding:"3px 12px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.type}</span>
                      <span style={{ fontSize:10, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 10px", fontWeight:300 }}>{r.duration}</span>
                    </div>
                    <div style={{ fontFamily:"var(--serif)", fontSize:17, fontWeight:700, color:"var(--text)", marginBottom:8, lineHeight:1.3, letterSpacing:"-0.3px" }}>{r.title}</div>
                    <div style={{ fontSize:11, color:"var(--gold)", fontWeight:500, marginBottom:14, letterSpacing:"0.04em" }}>{r.audience}</div>
                    <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.75, fontWeight:300, marginBottom:20 }}>{r.desc}</p>
                    <span style={{ fontSize:12, fontWeight:600, color:"var(--gold)", letterSpacing:"0.06em" }}>View lesson plan ↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING */}
      <div style={{ textAlign:"center", padding:"0 48px 80px", position:"relative", zIndex:1, borderTop:"1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300, letterSpacing:"0.04em", paddingTop:48 }}>
            黃德治 &nbsp;·&nbsp; Toronto, Ontario &nbsp;·&nbsp; 2026
          </p>
        </Reveal>
      </div>
    </div>
  )
}
