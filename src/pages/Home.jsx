import { useNavigate } from "react-router-dom"
import Reveal from "../components/Reveal"
import ChessHero from "../components/ChessHero"
import { GitHubIcon, LinkedInIcon } from "../components/Icons"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>

      {/* ── HERO */}
      <section style={{
        position: "relative", zIndex: 1,
        height: "100vh", minHeight: 700,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "hidden",
      }}>

        {/* Faint cursive "Wong" backdrop */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          pointerEvents:"none",
        }}>
          <span style={{
            fontFamily:"'Dancing Script', cursive",
            fontSize:"clamp(220px, 46vw, 640px)",
            color:"rgba(255,255,255,0.042)",
            fontWeight:700,
            lineHeight:1,
            userSelect:"none",
            letterSpacing:"-0.01em",
          }}>Wong</span>
        </div>

        <div style={{ position:"relative", zIndex:3, padding:"0 48px 68px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <img src="/profile.jpg" alt="Jaden Wong" style={{ width:116, height:116, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(245,224,64,0.4)", marginBottom:20, animation:"heroFade 0.9s ease 0.1s both" }} />
          <div style={{ display:"inline-flex", alignItems:"center", gap:14, fontSize:11, fontWeight:500, letterSpacing:"0.34em", textTransform:"uppercase", color:"var(--accent)", marginBottom:16, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            <span style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
            Engineer • Researcher • Builder
            <span style={{ display:"inline-block", width:28, height:1, background:"var(--accent)", opacity:0.7 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(60px,8vw,120px)", lineHeight:0.93, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:8, animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.38s both" }}>
            Jaden
          </h1>
          <p style={{ fontSize:13, letterSpacing:"0.06em", color:"var(--text-tertiary)", marginBottom:28, animation:"heroFade 0.9s ease 0.85s both" }}>
            ML Engineering • Signal Processing • Toronto, Ontario
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", animation:"heroFade 0.9s ease 1.05s both" }}>
            {(() => {
              const s = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, width:148, fontSize:11, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--gold)", padding:"11px 0", border:"1px solid var(--gold)", borderRadius:3, background:"transparent", cursor:"pointer", fontFamily:"var(--font)", textDecoration:"none", boxSizing:"border-box", transition:"background 0.2s, color 0.2s" }
              const on = e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#080a0f" }
              const off = e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)" }
              return <>
                <button onClick={() => navigate("/projects")} style={s} onMouseEnter={on} onMouseLeave={off}>View Projects</button>
                <button onClick={() => navigate("/contact")} style={s} onMouseEnter={on} onMouseLeave={off}>Get in Touch</button>
                <a href="https://github.com/Jaden300" target="_blank" rel="noreferrer" style={s} onMouseEnter={on} onMouseLeave={off}><GitHubIcon />GitHub</a>
                <a href="https://www.linkedin.com/in/jaden-wong09/" target="_blank" rel="noreferrer" style={s} onMouseEnter={on} onMouseLeave={off}><LinkedInIcon />LinkedIn</a>
              </>
            })()}
          </div>
        </div>
      </section>

      {/* ── BIO */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", display:"grid", gridTemplateColumns:"260px 1fr", gap:"0 80px", borderBottom:"1px solid var(--border)" }}>
        <Reveal>
          <div>
            <div style={{ fontSize:16, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-tertiary)", paddingTop:6 }}>
              About
            </div>
            <div style={{ position:"relative", width:"100%", height:220, marginTop:24, overflow:"hidden", borderRadius:12, opacity:0.35 }}>
              <ChessHero />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} grand>
          <div>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.7)", marginBottom:24 }}>
              I'm a <strong style={{ color:"var(--text)", fontWeight:500 }}>17-year-old engineer and researcher</strong> from Toronto, Ontario. I build full-stack ML systems, AI-powered web platforms, and quantitative trading frameworks - across whatever the problem demands.
            </p>
            <p style={{ fontSize:17, fontWeight:300, lineHeight:1.82, color:"rgba(237,234,226,0.7)" }}>
              Currently volunteering as SWE at <strong style={{ color:"var(--text)", fontWeight:500 }}>One Community</strong> and website manager at <strong style={{ color:"var(--text)", fontWeight:500 }}>The Volunteer Well</strong>. Previously AI intern at <strong style={{ color:"var(--text)", fontWeight:500 }}>Asenion</strong> and co-founder of <strong style={{ color:"var(--text)", fontWeight:500 }}>myojam</strong> - open-source EMG gesture classification, no lab, no funding.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(108px,1fr))", gap:10, marginTop:44 }}>
              {["Python","React","Next.js","TypeScript","FastAPI","PostgreSQL","Prisma","Supabase","GPT-4o","scikit-learn","PyQt6","Three.js","Signal Processing","NumPy","Pine Script v6","Puppeteer"].map(chip => (
                <div key={chip} style={{ display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:500, letterSpacing:"0.14em", color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:4, padding:"10px 8px", transition:"border-color 0.2s, color 0.2s", textAlign:"center", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,224,64,0.5)"; e.currentTarget.style.color = "var(--text)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-tertiary)" }}
                >{chip}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── NUMBERS */}
      <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid var(--border)" }}>
        {[
          { val:"6+", label:"Months of internship experience" },
          { val:7,    label:"Positions" },
          { val:5,    label:"Projects" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ padding:"44px 48px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily:"var(--serif)", fontSize:"clamp(42px,5vw,80px)", lineHeight:1, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:10 }}>
                {s.val}
              </div>
              <div style={{ fontSize:14, fontWeight:400, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--text-tertiary)" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── PROJECTS */}
      <section style={{ padding:"100px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:48 }}>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>Projects</h2>
              <button onClick={() => navigate("/projects")} style={{ fontSize:11, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#080a0f", border:"1px solid white", borderRadius:4, padding:"9px 18px", background:"white", cursor:"pointer", fontFamily:"var(--font)", transition:"filter 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.92)"}
                onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
              >All projects</button>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              {
                label: "Full-Stack AI",
                name: "MyMurry",
                logo: "/logos/mymurry.png",
                desc: "Built the active recall loop end-to-end: note upload, GPT-4o concept sectioning, free-recall session scoring, and a point-by-point breakdown of what you missed. Auth, i18n, and calendar integration included.",
                stack: ["Next.js 15", "TypeScript", "PostgreSQL", "GPT-4o", "Supabase"],
                anchor: "mymurry",
                accent: "#A855F7",
              },
              {
                label: "Quant Research",
                name: "Quant-Trading",
                desc: "Built a backtesting engine, a grid-search optimizer, and a custom scoring formula that penalizes strategies inconsistent across tickers - then promoted the best ones to a live scanner.",
                stack: ["Python", "NumPy", "pandas", "scikit-learn", "Pine Script v6"],
                anchor: "quant-trading",
                accent: "#10B981",
              },
              {
                label: "EMG Research",
                name: "myojam",
                logo: "/logos/myojam.png",
                desc: "Built a signal pipeline from scratch - Arduino sensors through a Butterworth filter, feature extraction, and a Random Forest classifier - then wrapped it in a full-stack web platform with interactive demos.",
                stack: ["Python", "React", "FastAPI", "scikit-learn", "Arduino"],
                anchor: "myojam",
                accent: "#f5e040",
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07} grand>
                <div style={{ background:"var(--bg-2)", borderRadius:16, padding:"32px", height:"100%", display:"flex", flexDirection:"column", borderTop:`2px solid ${p.accent}` }}>
                  <div style={{ fontSize:10, color:p.accent, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:12 }}>{p.label}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    {p.logo && <img src={p.logo} alt="" style={{ width:24, height:24, objectFit:"contain", borderRadius:4, flexShrink:0 }} />}
                    <h3 style={{ fontFamily:"var(--serif)", fontSize:22, fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px", margin:0 }}>{p.name}</h3>
                  </div>
                  <p style={{ fontSize:13, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.7, marginBottom:16, flex:1 }}>{p.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:20 }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ fontSize:11, color:"var(--text-tertiary)", border:"1px solid var(--border)", borderRadius:100, padding:"3px 10px", fontWeight:300 }}>{t}</span>
                    ))}
                  </div>
                  <a href={`/projects#${p.anchor}`} style={{
                    display:"inline-block", alignSelf:"flex-start",
                    fontSize:11, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase",
                    color:p.accent, border:`1px solid ${p.accent}`, borderRadius:4,
                    padding:"8px 16px", textDecoration:"none",
                    transition:"background 0.2s, color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = "#080a0f" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.accent }}
                  >View project</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE */}
      <section style={{ padding:"100px 48px", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:48 }}>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px" }}>Experience</h2>
              <button onClick={() => navigate("/experience")} style={{ fontSize:11, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#080a0f", border:"1px solid white", borderRadius:4, padding:"9px 18px", background:"white", cursor:"pointer", fontFamily:"var(--font)", transition:"filter 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.92)"}
                onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
              >Full experience</button>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              {
                org: "One Community",
                logo: "/logos/onecommunity.png",
                title: "Software Engineer",
                period: "May 2026 - Present",
                type: "Volunteer",
                desc: "Built Garden Management and User Management from scratch. Took over 5+ complex PRs, fixed critical bugs, and resolved SonarQube violations across the codebase.",
                accent: "#3B82F6",
                anchor: "one-community",
              },
              {
                org: "The Volunteer Well",
                logo: "/logos/volunteerwellw.png",
                title: "Website Manager",
                period: "May 2026 - Present",
                type: "Volunteer",
                desc: "UX audit across 5 pages identifying broken CTAs, WCAG contrast failures, and scroll depth issues. Delivered a P1-P4 action list and partner outreach deck.",
                accent: "#8B5CF6",
                anchor: "the-volunteer-well",
              },
              {
                org: "Elevation Athletics",
                logo: "/logos/elevationathletics.png",
                title: "Web Assistant",
                period: "Jun 2026 - Aug 2026",
                type: "Contract",
                desc: "Built 3 production AI chatbots, an auto contact-tagging system, and 2 scraping pipelines. Enriched 13,000+ records across 500+ segments.",
                accent: "#F97316",
                anchor: "elevation-athletics",
              },
            ].map((r, i) => (
              <Reveal key={r.org} delay={i * 0.07} grand>
                <div style={{ background:"var(--bg-2)", borderRadius:16, padding:"32px", height:"100%", display:"flex", flexDirection:"column", borderTop:`2px solid ${r.accent}` }}>
                  <div style={{ fontSize:10, color:r.accent, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:12 }}>{r.type}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    {r.logo && <img src={r.logo} alt="" style={{ width:24, height:24, objectFit:"contain", borderRadius:4, flexShrink:0 }} />}
                    <div style={{ fontFamily:"var(--serif)", fontSize:20, fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px" }}>{r.org}</div>
                  </div>
                  <div style={{ fontSize:12, color:"var(--text-secondary)", fontWeight:400, marginBottom:4 }}>{r.title}</div>
                  <div style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:300, marginBottom:16 }}>{r.period}</div>
                  <p style={{ fontSize:13, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.7, flex:1, marginBottom:20 }}>{r.desc}</p>
                  <a href={`/experience#${r.anchor}`} style={{
                    display:"inline-block", alignSelf:"flex-start",
                    fontSize:11, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase",
                    color:r.accent, border:`1px solid ${r.accent}`, borderRadius:4,
                    padding:"8px 16px", textDecoration:"none",
                    transition:"background 0.2s, color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = r.accent; e.currentTarget.style.color = "#080a0f" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = r.accent }}
                  >View role</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
