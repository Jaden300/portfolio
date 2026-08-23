import { useState, useEffect } from "react"
import Reveal from "../components/Reveal"
import { GitHubIcon } from "../components/Icons"
import { Cat, Frog, Panda, Dog } from "../components/Critters"

const ROTS  = [-6, 3.5, -2]

function ImageStack({ images }) {
  const [hovered, setHovered] = useState(null)
  const CARD_H = 175
  const STEP   = 68
  const count  = images.length
  const containerH = CARD_H + (count - 1) * STEP + 16

  return (
    <div style={{ position:"relative", height:containerH }}>
      {images.map((src, i) => {
        const isHov = hovered === i
        return (
          <img key={i} src={src} alt=""
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:"absolute",
              top:    i * STEP,
              left:   0, right: 0,
              height: CARD_H,
              width:  "100%",
              objectFit:"cover", borderRadius:12,
              border:"1px solid var(--border)",
              zIndex: isHov ? 10 : count - i,
              transform: isHov
                ? "translateY(-16px) scale(1.05) rotate(0deg)"
                : `rotate(${ROTS[i] ?? 0}deg)`,
              transition:"transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease",
              boxShadow: isHov
                ? "0 24px 52px rgba(0,0,0,0.55)"
                : "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
        )
      })}
    </div>
  )
}

const PROJECTS = [
  {
    name: "MyMurry",
    logo: "/logos/mymurry.png",
    year: "2026 - present",
    url: "https://mymurry.com",
    accent: "#A855F7",
    summary: "Built the active recall loop end-to-end: users upload notes, GPT-4o sections them into key concepts, then users recall everything they remember and get scored 0-100 with a breakdown of what they missed.",
    bullets: [
      "Designed and built 21+ REST endpoints across Next.js App Router: note CRUD, AI analysis sessions, Google Calendar and Tasks proxy, TOTP MFA recovery, and public browse",
      "Modelled 9 PostgreSQL tables via Prisma ORM. Implemented Supabase auth with Google OAuth 2.0, silent token refresh, and SHA-256-hashed 2FA recovery codes",
      "Built a custom i18n system with no external library: 700+ translation strings across English, French, and Spanish, with Zustand-persisted Pomodoro timer across navigation",
      "Integrated GPT-4o for section generation and recall scoring - each session produces a point-by-point coverage breakdown showing exactly what concepts were missed",
    ],
    metrics: [["21+", "API endpoints"], ["9", "DB models"], ["700+", "i18n strings"], ["MFA", "2-factor auth"]],
    tags: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "GPT-4o", "Supabase", "Vercel"],
    images: ["/work/mymurry-1.jpg", "/work/mymurry-2.jpg", "/work/mymurry-3.jpg"],
  },
  {
    name: "Quant-Trading",
    year: "2025 - present",
    url: "https://github.com/Jaden300/Quant-Trading",
    github: "https://github.com/Jaden300/Quant-Trading",
    accent: "#10B981",
    summary: "Built a backtesting engine, a grid-search parameter optimizer, and a custom scoring formula. Ran each strategy across 10 large-cap tickers, then promoted the best performers to a live scanner.",
    bullets: [
      "Wrote a bar-by-bar backtesting engine from scratch and a multi-parameter optimizer that runs ~2,140 combinations per strategy across a 5.3-year daily bar history",
      "Designed a custom scoring formula: mean_sharpe - 0.5×std_sharpe + 4×(win_rate/100) - specifically penalizes strategies that are inconsistent across tickers, not just low Sharpe",
      "Built a Kalman filter crossover strategy in NumPy from scratch: dual recursive Bayesian estimators tracking two price series, with no signal-processing library dependency",
      "Wrote a live S&P 500 scanner that downloads OHLCV history for ~491 tickers and outputs ranked signals by confidence score in real time",
    ],
    metrics: [["23", "Strategies"], ["5", "Live"], ["~2,140", "Param combos"], ["491", "Tickers"]],
    tags: ["Python", "NumPy", "pandas", "yfinance", "scikit-learn", "Pine Script v6"],
    images: ["/work/quant-1.jpg", "/work/quant-2.jpg"],
  },
  {
    name: "myojam",
    logo: "/logos/myojam.png",
    year: "2024 - present",
    url: "https://myojam.com",
    github: "https://github.com/Jaden300/myojam",
    accent: "#f5e040",
    summary: "Built a full signal pipeline from scratch: Arduino sensors, Butterworth bandpass filtering, 64-feature extraction, and a Random Forest classifier. Deployed as a full-stack web platform with interactive demos - no hardware required.",
    bullets: [
      "Designed the feature extraction stage: 64 features per window (MAV, RMS, Zero Crossing, Waveform Length) across 16 EMG channels, then trained and evaluated using Leave-One-Subject-Out cross-validation",
      "Built the inference layer as a FastAPI service with sub-5ms response time, consumed by a React frontend with 8 interactive browser demos including a signal playground and Scratch-like block-coding interface",
      "Wrote a full PyQt6 desktop app for hardware signal capture, preprocessing, and real-time classification via the same FastAPI backend",
      "Published 11 educational articles, 3 lesson plans, and launched ELEVATE - an international EMG innovation competition",
    ],
    metrics: [["84.85%", "Cross-subject acc"], ["8", "Browser demos"], ["11", "Articles"], ["<5ms", "Inference"]],
    tags: ["Python", "React", "FastAPI", "scikit-learn", "PyQt6", "Three.js", "Arduino"],
    images: ["/work/myojam-1.jpg", "/work/myojam-2.jpg", "/work/myojam-3.jpg"],
  },
  {
    name: "Pip",
    logo: "/work/pip.png",
    year: "2026",
    url: "https://github.com/Jaden300/Verdant",
    github: "https://github.com/Jaden300/Verdant",
    accent: "#22C55E",
    summary: "Built a full-stack garden simulator that turns a natural-language garden description into an explorable 3D world with a live care engine - LLM extracts a structured plant list, World Labs Marble generates the scene, and a server-side growth model drives what the plants actually do.",
    bullets: [
      "Engineered a soil/fertilizer/weather growth model as four independent factors - texture, pH, nutrients (Mitscherlich diminishing returns under Liebig's law of the minimum), and weather (cardinal-temperature response plus a millimetre-accurate water balance) - multiplied and clamped, warping elapsed growing time to keep growth monotonic",
      "Built a forward simulation engine reusing the live garden's hydration logic, running up to 120 Monte Carlo trials over a 365-day horizon and summarizing them as p10/p50/p90 uncertainty bands",
      "Built a custom weather generator - real 7-day forecast, then a two-state Markov chain for rain and a lag-1 autoregressive anomaly for temperature - verified within 0.02°C and 2% of source climate across 300 generated years",
    ],
    metrics: [["120", "Monte Carlo trials"], ["73", "Crop database"], ["7", "Biome classes"], ["0.02°C", "Weather accuracy"]],
    tags: ["React 19", "Vite 7", "TypeScript", "Node", "Express 5", "World Labs Marble", "three.js", "OpenAI/Anthropic"],
    images: ["/work/pip-1.png", "/work/pip-2.png", "/work/pip-3.png"],
  },
  {
    name: "Machine Learning Series",
    year: "2024 - 2025",
    url: "https://github.com/Jaden300/Machine-Learning-Series",
    github: "https://github.com/Jaden300/Machine-Learning-Series",
    accent: "#F97316",
    summary: "4 end-to-end ML notebooks (614 cells, 28,482 lines) across EDA, Classification, Regression, and Unsupervised Learning on real-world Kaggle datasets.",
    bullets: [
      "Benchmarked 10+ classifiers on a 2,000-sample mobile price dataset - stacked ensemble (SVC + KNN + Decision Tree → LR meta-learner) hit 97.0% vs 95.3% best single model",
      "Tuned regression via GridSearchCV (Lasso, Ridge, polynomial degrees) achieving R² = 0.9893; built a 3-layer interpretability pipeline: permutation importance, global surrogate (82.8% fidelity), and LIME",
      "Applied PCA, KernelPCA, t-SNE, DBSCAN, and KMeans across Spotify and Sign Language MNIST; image segmentation via KMeans, GMM, and MeanShift",
    ],
    metrics: [["97.0%", "Ensemble acc"], ["R² 0.989", "Regression"], ["614", "Notebook cells"], ["10+", "Algorithms"]],
    tags: ["Python", "Jupyter", "scikit-learn", "XGBoost", "LIME", "statsmodels", "OpenCV", "pandas", "NumPy"],
    images: ["/work/ml-1.jpg", "/work/ml-2.jpg", "/work/ml-3.jpg"],
  },
]

export default function Work() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 175
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }, 400)
    }
  }, [])

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <section style={{ padding:"120px 48px 60px", textAlign:"center" }}>
        <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"center", gap:16, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
          <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          Selected work
          <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
        </div>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(52px,8vw,110px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
          What I've<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>built</em>
        </h1>
      </section>

      <section style={{ padding: "80px 48px 120px", position: "relative", overflow: "visible" }}>
        <Cat   style={{ top:  150, left:  "2%"  }} />
        <Frog  style={{ top:  650, right: "2%"  }} />
        <Panda style={{ top: 1200, left:  "3%"  }} />
        <Dog   style={{ top: 1800, right: "3%"  }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECTS.map((p, i) => (

            <Reveal key={p.name} delay={i * 0.08} grand>
              <div id={p.name.toLowerCase()} style={{ background: "var(--bg-2)", borderRadius: 24, overflow: "hidden", borderLeft: `3px solid ${p.accent}` }}>
                <div style={{ padding: "48px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr minmax(0, 360px)", gap:56, alignItems:"start" }}>

                    {/* Left: content */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
                        <span style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 12px", fontWeight:300 }}>{p.year}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                        {p.logo && <img src={p.logo} alt="" style={{ width:36, height:36, objectFit:"contain", borderRadius:6, flexShrink:0 }} />}
                        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1px", margin:0 }}>{p.name}</h2>
                      </div>
                      <p style={{ fontSize:15, color:"var(--text-secondary)", lineHeight:1.8, fontWeight:300, marginBottom:28, maxWidth:520 }}>{p.summary}</p>

                      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                        {p.bullets.map((b, j) => (
                          <div key={j} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                            <span style={{ color:p.accent, fontWeight:700, flexShrink:0, marginTop:2 }}>•</span>
                            <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:28 }}>
                        {p.metrics.map(([v, l]) => (
                          <div key={l} style={{ background:"var(--bg)", borderRadius:12, padding:"14px", textAlign:"center" }}>
                            <div style={{ fontSize:16, fontWeight:800, color:p.accent, fontFamily:"var(--serif)", letterSpacing:"-0.5px", marginBottom:2 }}>{v}</div>
                            <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{l}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 12px", fontWeight:300 }}>{t}</span>
                        ))}
                      </div>

                      {/* Buttons - bottom-right */}
                    </div>

                    {/* Right: image stack + buttons */}
                    <div style={{ paddingTop:8, display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>
                      <ImageStack images={p.images} />
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ display:"block", textAlign:"center", fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#080a0f", background:p.accent, border:`1px solid ${p.accent}`, borderRadius:8, padding:"14px 0", textDecoration:"none", transition:"filter 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
                        onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
                      >{p.url.includes("github.com") ? "View repo" : "Visit site"}</a>
                      {p.github && p.github !== p.url && (
                        <a href={p.github} target="_blank" rel="noreferrer" style={{ display:"block", textAlign:"center", fontSize:13, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 0", textDecoration:"none", transition:"border-color 0.2s, color 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.color = "var(--text)" }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)" }}
                        >GitHub</a>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <div style={{ background: "var(--bg-2)", borderRadius: 24, padding: "22px 48px", borderLeft: "3px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px", marginBottom: 3 }}>See the full list</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300 }}>All projects on GitHub</div>
              </div>
              <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", border: "1px solid var(--border-dark)", borderRadius: 6, padding: "10px 22px", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.background = "transparent" }}
              ><GitHubIcon />GitHub</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
