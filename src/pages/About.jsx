import { useNavigate } from "react-router-dom"

const TIMELINE = [
  { year: "2024", title: "Started myojam", body: "Began building an EMG gesture classification system from scratch using public data and consumer hardware. No funding, no lab — just curiosity and a dataset." },
  { year: "2024", title: "First working classifier", body: "Trained a Random Forest on Ninapro DB5 across 10 subjects. Achieved 71.2% cross-subject accuracy on first attempt. Iterated to 84.85%." },
  { year: "2025", title: "Launched myojam.com", body: "Full-stack web demo deployed on Vercel and Render. FastAPI backend, React frontend, real-time 3D hand model in Three.js. No hardware required for the demo." },
  { year: "2025", title: "Built the macOS desktop app", body: "Native PyQt6 app with EMG sensor integration. Six gestures mapped to real computer actions — cursor movement, click, spacebar." },
  { year: "2026", title: "Education platform & ELEVATE", body: "Expanded myojam into a full education platform: 11 articles, lesson plans, interactive demos, block coding environment. Launched ELEVATE — an international competition." },
]

const VALUES = [
  { icon: "⚡", title: "Build first", body: "I learn by doing. Every concept I understand deeply, I understand because I built something with it." },
  { icon: "🌐", title: "Open by default", body: "Everything I build is public. If it works, it should be available for anyone to use, study, and improve." },
  { icon: "🎯", title: "Impact over novelty", body: "I'm more interested in building things that help people than in being first. Assistive technology is a clear place to do that." },
  { icon: "📚", title: "Document everything", body: "Code without documentation is incomplete. I write about what I build — why the decisions were made, what failed, what worked." },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>

      {/* Header */}
      <section style={{ padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
        {[["500px","-100px","-80px","rgba(245,158,11,0.12)"],["350px","65%","60px","rgba(255,55,95,0.08)"]].map(([size,x,y,color],i)=>(
          <div key={i} style={{ position:"absolute",width:size,height:size,borderRadius:"50%",background:color,left:x,top:y,filter:"blur(90px)",pointerEvents:"none",animation:`orbFloat 12s ${i*4}s ease-in-out infinite alternate` }}/>
        ))}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 20, fontFamily: "var(--serif)" }}>About me</div>
          <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 32, fontFamily: "var(--serif)" }}>
            <span className="gold">Jaden</span><br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Wong.</span>
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 17, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                I'm a 16-year-old engineer and researcher based in Toronto, Ontario. I build at the intersection of machine learning, biomedical signal processing, and human-computer interaction — with a focus on assistive technology.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                My flagship project, myojam, is an open-source system that classifies hand gestures from surface EMG signals in real time, achieving 84.85% cross-subject accuracy on the Ninapro DB5 benchmark. It started as a personal challenge and grew into a full platform — demos, education hub, lesson plans, a block coding environment, and an international competition.
              </p>
              <p style={{ fontSize: 17, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.85 }}>
                I'm particularly interested in ML research, biomedical engineering, and full-stack development. I work in Python, React, FastAPI, and PyQt6 — and I document everything publicly.
              </p>
            </div>
            <div>
              <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: "28px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>Quick facts</div>
                {[
                  ["Age", "16"],
                  ["Location", "Toronto, Ontario, Canada"],
                  ["Focus", "ML · Biomedical signal processing · Full-stack"],
                  ["Languages", "Python, JavaScript, C++"],
                  ["Availability", "Open to internships & collaborations"],
                  ["Flagship project", "myojam (myojam.com)"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 400, textAlign: "right" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "0 40px 80px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>What I believe</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 48, fontFamily: "var(--serif)" }}>How I work.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} className="hover-lift" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{v.title}</div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "0 40px 100px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>History</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 56, fontFamily: "var(--serif)" }}>How I got here.</h2>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 52, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #F59E0B, transparent)" }}/>
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 32, paddingBottom: 48, position: "relative", alignItems: "flex-start" }}>
                <div style={{ width: 104, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#F59E0B", zIndex: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 500 }}>{item.year}</span>
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}