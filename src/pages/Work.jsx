import { useNavigate } from "react-router-dom"

const PROJECTS = [
  {
    name: "myojam",
    year: "2024–present",
    status: "Active",
    statusColor: "#10B981",
    role: "Sole developer",
    url: "https://myojam.com",
    github: "https://github.com/Jaden300/myojam",
    tags: ["Python", "React", "FastAPI", "scikit-learn", "PyQt6", "Three.js"],
    summary: "An open-source surface EMG gesture classification system achieving 84.85% cross-subject accuracy on Ninapro DB5. Classifies six hand gestures in real time and maps them to computer actions — cursor movement, click, spacebar.",
    highlights: [
      "84.85% cross-subject accuracy — tested on subjects never seen during training",
      "Full-stack platform: FastAPI backend on Render, React frontend on Vercel",
      "Native macOS desktop app built with PyQt6 and Quartz CGEventTap",
      "11 published educational articles, 5 interactive demos, educators hub with full lesson plans",
      "myocode: a Scratch-like block coding environment where EMG gestures are first-class events",
      "ELEVATE: an international competition for EMG innovation with 4 tracks",
      "16,269 training windows from 10 subjects in the Ninapro DB5 public dataset",
    ],
    metrics: [
      { val: "84.85%", label: "Accuracy" },
      { val: "<5ms",   label: "Inference" },
      { val: "16ch",   label: "EMG input" },
      { val: "MIT",    label: "Licence" },
    ],
  },
]

const OTHER = [
  {
    name: "myocode",
    desc: "Block-based coding environment where EMG gestures trigger events. Built on top of myojam. Canvas drawing, sprite movement, event-driven programming — no hardware required.",
    url: "https://myojam.com/myocode",
    tags: ["React", "Canvas API", "EMG"],
  },
  {
    name: "EMG Frequency Analyzer",
    desc: "Interactive browser tool for exploring EMG signal spectra. Load real Ninapro windows, see bandpass filter effects, switch between 16 electrode channels.",
    url: "https://myojam.com/frequency",
    tags: ["React", "Canvas", "DFT", "Signal processing"],
  },
  {
    name: "Confusion Matrix Explorer",
    desc: "Interactive heatmap of myojam's classifier accuracy. Click any cell to read the biomechanical explanation of why those two gestures are confused.",
    url: "https://myojam.com/confusion",
    tags: ["React", "Data visualisation"],
  },
  {
    name: "Signal Playground",
    desc: "Draw an EMG-like waveform with your mouse and watch MAV, RMS, ZC, and WL compute live. Heuristic gesture prediction, feature explainer, example signals.",
    url: "https://myojam.com/playground",
    tags: ["React", "Canvas API", "Feature extraction"],
  },
]

export default function Work() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>

      {/* Header */}
      <section style={{ padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
        {[["500px","-80px","-60px","rgba(245,158,11,0.12)"],["380px","70%","80px","rgba(255,55,95,0.08)"]].map(([size,x,y,color],i)=>(
          <div key={i} style={{ position:"absolute",width:size,height:size,borderRadius:"50%",background:color,left:x,top:y,filter:"blur(90px)",pointerEvents:"none" }}/>
        ))}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 20, fontFamily: "var(--serif)" }}>Selected work</div>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 20, fontFamily: "var(--serif)" }}>
            <span className="gold">What I've</span><br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>built.</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75, maxWidth: 560 }}>
            One flagship project, multiple tools. All open source. All documented.
          </p>
        </div>
      </section>

      {/* Featured project */}
      {PROJECTS.map(project => (
        <section key={project.name} style={{ padding: "0 40px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 24, overflow: "hidden" }}>

              {/* Project header */}
              <div style={{ padding: "40px 40px 32px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <h2 style={{ fontSize: 32, fontWeight: 800, color: "var(--text)", letterSpacing: "-1.5px", fontFamily: "var(--serif)" }}>{project.name}</h2>
                      <span style={{ fontSize: 11, fontWeight: 600, color: project.statusColor, background: `${project.statusColor}15`, border: `1px solid ${project.statusColor}30`, borderRadius: 100, padding: "3px 10px" }}>{project.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>
                      {project.year} · {project.role}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={project.url} target="_blank" rel="noreferrer" style={{ background: "linear-gradient(135deg, #F59E0B, #92400e)", color: "#0a0000", borderRadius: 100, padding: "9px 20px", fontSize: 13, fontWeight: 700, transition: "transform 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >Live site ↗</a>
                    <a href={project.github} target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: 100, padding: "9px 20px", fontSize: 13, fontWeight: 400, transition: "border-color 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; e.currentTarget.style.color = "#F59E0B" }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)" }}
                    >GitHub</a>
                  </div>
                </div>
                <p style={{ fontSize: 16, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.8, maxWidth: 680, marginBottom: 20 }}>{project.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 12, color: "var(--text-tertiary)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 100, padding: "4px 12px" }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid var(--border)" }}>
                {project.metrics.map((m, i) => (
                  <div key={m.label} style={{ padding: "24px", textAlign: "center", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-1px", marginBottom: 4 }} className="gold">{m.val}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div style={{ padding: "32px 40px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>Key highlights</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {project.highlights.map(h => (
                    <div key={h} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.65 }}>
                      <span style={{ color: "#F59E0B", fontWeight: 600, flexShrink: 0, marginTop: 1 }}>→</span>{h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Other work */}
      <section style={{ padding: "0 40px 100px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>Tools & experiments</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", marginBottom: 48, fontFamily: "var(--serif)" }}>Other things I've built.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {OTHER.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="hover-lift" style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                borderRadius: 16, padding: "24px 28px", display: "block"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{p.name}</div>
                  <span style={{ fontSize: 16, color: "var(--text-tertiary)", flexShrink: 0 }}>↗</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, color: "var(--text-tertiary)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px" }}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}