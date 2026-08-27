import { useNavigate } from "react-router-dom"
import Reveal from "../components/Reveal"
import { Owl, Bear, Penguin } from "../components/Critters"

const SKILLS = [
  { cat:"Machine Learning",      color:"#f5e040", items:["scikit-learn","Random Forest","XGBoost","Logistic Regression","KNN","SVM","PCA · t-SNE","LIME","Gradient Boosting","Confusion Matrix","GridSearchCV"] },
  { cat:"Signal Processing",     color:"#fbbf24", items:["Surface EMG","Butterworth filter","Sliding window","MAV · RMS · ZC · WL","Ninapro DB5","Spectral analysis","Arduino","WebSerial API"] },
  { cat:"Full-Stack",            color:"#fef3c7", items:["React","Next.js 15","TypeScript","FastAPI","Python","PostgreSQL","Prisma","Supabase","GPT-4o","Zustand","Tailwind CSS","WordPress","Vercel","REST APIs"] },
  { cat:"Systems & Tools",      color:"#f5e040", items:["PyQt6","Three.js","NumPy","pandas","Pine Script v6","Tkinter","Puppeteer","Matplotlib · Seaborn","Google Apps Script","Constant Contact API","Git"] },
]

const CERTS = [
  { name:"IBM Machine Learning Professional Certificate",       issuer:"IBM",    date:"Dec 2025", logo:"/logos/ibm.png" },
  { name:"IBM Introduction to Machine Learning Specialization", issuer:"IBM",    date:"Dec 2025", logo:"/logos/ibm.png" },
  { name:"Google AI Professional Certificate",                  issuer:"Google", date:"Apr 2026", logo:"/logos/google.png" },
]


export default function About() {
  const navigate = useNavigate()
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--text)" }}>
      {/* ── HERO */}
      <section style={{
        position:"relative", padding:"140px 0 80px", zIndex:1,
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", textAlign:"center", overflow:"hidden",
      }}>
        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--accent)", marginBottom:24, animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both", display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            17 • Toronto • Engineer
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            Jaden<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>Wong</em>
          </h1>
          <p style={{ fontSize:16, fontWeight:300, color:"var(--text-secondary)", maxWidth:500, margin:"28px auto 0", lineHeight:1.75, animation:"heroFade 1s ease 0.75s both" }}>
            I build full-stack ML systems, process biomedical signals, and publish openly - because access to technology is the whole point.
          </p>
        </div>
      </section>

      {/* ── STATEMENT + FACTS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ padding:"80px 64px 80px 48px", borderRight:"1px solid var(--border)" }}>
            <Reveal grand>
              <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(24px,3vw,38px)", fontWeight:400, fontStyle:"italic", color:"var(--text)", lineHeight:1.35, letterSpacing:"-0.5px" }}>
                "Building at the intersection of biology, code, and&nbsp;curiosity."
              </p>
              <div style={{ width:48, height:2, background:"var(--gold)", marginTop:32 }} />
            </Reveal>
          </div>
          <div style={{ padding:"80px 48px 80px 64px" }}>
            <Reveal delay={0.1}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  ["Location",    "Toronto, Ontario"],
                  ["Focus",       "ML • Signal processing • Full-stack"],
                  ["Languages",   "Python, JavaScript, C++"],
                  ["Flagship",    "myojam.com"],
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

      {/* ── WORK STACK */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px", borderBottom:"1px solid var(--border)", overflow:"visible" }}>
        <Bear    style={{ top: 80,  left:  "3%" }} />
        <Owl     style={{ top: 80,  right: "3%" }} />
        <Penguin style={{ top: 600, left:  "3%" }} />
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:64 }}>Work stack</h2>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, marginBottom:48 }}>
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

          {/* Certifications */}
          <Reveal delay={0.15}>
            <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:20 }}>Certifications</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
              {CERTS.map(cert => (
                <div key={cert.name} style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 24px", display:"flex", flexDirection:"column", gap:16 }}>
                  <img src={cert.logo} alt={cert.issuer} style={{ width:40, height:40, objectFit:"contain", background:"white", borderRadius:6, padding:5 }} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--text)", lineHeight:1.4, marginBottom:8 }}>{cert.name}</div>
                    <div style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:300 }}>{cert.issuer} • {cert.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FUN FACTS */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 48px 120px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:48 }}>Passions</h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              { label:"Gaming", title:"Clash Royale", desc:"Been playing since the early seasons. It's basically applied game theory." },
              { label:"Chess", title:"Chess player", desc:"Regular games online. Chess sharpens pattern recognition in ways that transfer. My favourite opening is the Leonardis Variation." },
              { label:"Off the clock", title:"Downtown walks & coffee", desc:"My favourite thing is wandering around busy cities and going for coffees. Let's grab one sometime!" },
            ].map((fact, i) => (
              <Reveal key={fact.title} delay={i * 0.07} grand>
                <div style={{ background:"var(--bg-2)", borderRadius:16, padding:"32px", borderTop:"2px solid var(--gold)", height:"100%", boxSizing:"border-box" }}>
                  <div style={{ fontSize:10, color:"var(--gold)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:12 }}>{fact.label}</div>
                  <div style={{ fontFamily:"var(--serif)", fontSize:20, fontWeight:700, color:"var(--text)", letterSpacing:"-0.5px", marginBottom:12 }}>{fact.title}</div>
                  <p style={{ fontSize:13, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.7, margin:0 }}>{fact.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section style={{ padding: "0 48px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <button onClick={() => navigate("/contact")} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text)", border: "1px solid var(--border-dark)", borderRadius: 4, padding: "12px 28px", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-dark)"}
            >Get in touch</button>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
