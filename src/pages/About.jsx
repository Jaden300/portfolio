import Reveal from "../components/Reveal"
import ParticleWarp from "../components/ParticleWarp"
import HelixScene from "../components/HelixScene"

const TIMELINE = [
  { year:"Sept 2024", event:"Started myojam — EMG gesture classification from scratch, no lab, no hardware, just public data" },
  { year:"Dec 2024",  event:"Reached 84.85% cross-subject accuracy on Ninapro DB5" },
  { year:"Feb 2025",  event:"Launched myojam.com — full-stack web demo, no hardware required" },
  { year:"Sept 2025", event:"Co-op at Fairly AI as AI QA Intern — designed 1,000+ test cases" },
  { year:"Jan 2026",  event:"Completed Fairly AI co-op; returned to myojam full-time" },
  { year:"Apr 2026",  event:"Launched ELEVATE — international EMG innovation competition" },
]

const SKILLS = [
  { cat:"Machine Learning",      color:"#f5e040", items:["scikit-learn","Random Forest","XGBoost","Logistic Regression","KNN","SVM","PCA · t-SNE","LIME"] },
  { cat:"Signal Processing",     color:"#fbbf24", items:["Surface EMG","Butterworth filter","Sliding window","MAV · RMS · ZC · WL","Ninapro DB5","Spectral analysis"] },
  { cat:"Full-Stack",            color:"#fef3c7", items:["React","Vite","FastAPI","Python","Vercel","Render","REST APIs","Three.js","Canvas API"] },
  { cat:"Systems & Hardware",    color:"#f5e040", items:["PyQt6","macOS Quartz","Arduino","Serial comms","MyoWare 2.0"] },
]

export default function About() {
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
          <span style={{ fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif", fontWeight:900, fontSize:"80vw", lineHeight:1, color:"var(--accent)", opacity:0.03 }}>黃</span>
        </div>

        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:24, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            16 · Toronto · Engineer
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Jaden<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>Wong.</em>
          </h1>
          <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:500, margin:"28px auto 0", lineHeight:1.75, animation:"heroFade 1s ease 0.75s both" }}>
            I build full-stack ML systems, process biomedical signals, and publish openly — because access to technology is the whole point.
          </p>
        </div>

        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--text-tertiary)", animation:"heroFade 1s ease 1.1s both", zIndex:1 }}>
          <div style={{ width:1, height:34, background:"linear-gradient(to bottom, var(--text-tertiary), transparent)", animation:"tickDrop 1.6s 1.4s infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATEMENT + FACTS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr" }}>

          {/* Left — big editorial statement */}
          <div style={{ padding:"80px 64px 80px 48px", borderRight:"1px solid var(--border)" }}>
            <Reveal grand>
              <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(24px,3vw,38px)", fontWeight:400, fontStyle:"italic", color:"var(--text)", lineHeight:1.35, letterSpacing:"-0.5px" }}>
                "Building at the intersection of biology, code, and&nbsp;curiosity."
              </p>
              <div style={{ width:48, height:2, background:"var(--gold)", marginTop:32 }} />
            </Reveal>
          </div>

          {/* Right — compact facts */}
          <div style={{ padding:"80px 48px 80px 64px" }}>
            <Reveal delay={0.1}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  ["Location",    "Toronto, Ontario"],
                  ["Focus",       "ML · Signal processing · Full-stack"],
                  ["Status",      "Open to work"],
                  ["Languages",   "Python, JavaScript, C++"],
                  ["Flagship",    "myojam.com"],
                  ["Availability","Remote or hybrid"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display:"flex", gap:24, alignItems:"baseline" }}>
                    <span style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:300, minWidth:90, flexShrink:0 }}>{k}</span>
                    <span style={{ fontSize:14, fontWeight:500, color:"var(--text)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HELIX */}
      <HelixScene />

      {/* ── EXPERIENCE */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Experience</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:64 }}>Where I've worked.</h2>
          </Reveal>

          {/* Fairly AI — big card */}
          <Reveal delay={0.08} grand>
            <div style={{ background:"var(--bg-2)", borderRadius:24, padding:"48px", marginBottom:16, borderLeft:"3px solid #3B82F6" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:16 }}>
                <div>
                  <div style={{ fontSize:26, fontWeight:700, color:"var(--text)", fontFamily:"var(--serif)", letterSpacing:"-0.5px", marginBottom:6 }}>Fairly AI</div>
                  <div style={{ fontSize:13, color:"#3B82F6", fontWeight:500, marginBottom:4 }}>AI Intern — QA Assistant (Student Co-op)</div>
                  <div style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300 }}>Sept 2025 – Jan 2026 · Kitchener, ON</div>
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  {[["1,000+","test cases"],["60%","time saved"],["70%","accuracy gain"]].map(([v,l]) => (
                    <div key={l} style={{ textAlign:"center", padding:"14px 20px", background:"var(--bg)", borderRadius:12 }}>
                      <div style={{ fontSize:20, fontWeight:800, color:"var(--gold)", fontFamily:"var(--serif)", letterSpacing:"-0.5px" }}>{v}</div>
                      <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  "Designed and executed 1,000+ test cases to systematically investigate model behaviour",
                  "Developed data workflows reducing project time by 60%",
                  "Led benchmarking across 12+ scenarios over 15 cycles — improved classification by 70%",
                  "Produced structured documentation with visualisations for stakeholder decisions",
                ].map((b, i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)", fontWeight:700, flexShrink:0, marginTop:1 }}>→</span>
                    <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.15}>
            <div style={{ background:"var(--bg-2)", borderRadius:24, padding:"36px 48px", borderLeft:"3px solid var(--gold)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:700, color:"var(--text)", fontFamily:"var(--serif)", marginBottom:4 }}>Bur Oak Secondary School</div>
                  <div style={{ fontSize:13, color:"var(--gold)", fontWeight:500, marginBottom:4 }}>2023 – present · Markham, ON</div>
                  <div style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300 }}>Software Engineering Workshop Club — Lesson Planner · Designed Python curriculum for elementary students</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Technical skills</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:64 }}>What I work with.</h2>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
            {SKILLS.map((skill, i) => (
              <Reveal key={skill.cat} delay={i * 0.07}>
                <div style={{ padding:"36px", background:"var(--bg-2)", borderRadius: i===0?"20px 0 0 0": i===1?"0 20px 0 0": i===2?"0 0 0 20px":"0 0 20px 0" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:skill.color, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:20, height:2, background:skill.color, display:"inline-block" }} />
                    {skill.cat}
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {skill.items.map(item => (
                      <span key={item} style={{ fontSize:12, color:"var(--text-secondary)", background:"rgba(255,255,255,0.04)", borderRadius:6, padding:"5px 11px", fontWeight:300 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px 120px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:8, fontFamily:"var(--serif)" }}>Journey</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:72 }}>How I got here.</h2>
          </Reveal>

          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute", left:0, top:8, bottom:0, width:1, background:"linear-gradient(to bottom, var(--gold), transparent)" }} />

            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ display:"flex", gap:40, paddingBottom:48, paddingLeft:32, position:"relative" }}>
                  {/* Dot */}
                  <div style={{ position:"absolute", left:-5, top:8, width:11, height:11, borderRadius:"50%", background:"var(--bg)", border:"2px solid var(--gold)", flexShrink:0 }} />
                  <div style={{ minWidth:110, flexShrink:0 }}>
                    <span style={{ fontSize:11, color:"var(--gold)", fontWeight:600, letterSpacing:"0.06em" }}>{item.year}</span>
                  </div>
                  <p style={{ fontSize:15, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75, margin:0 }}>{item.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
