import Reveal from "../components/Reveal"

const EXPERIENCE = [
  {
    company: "Fairly AI",
    location: "Kitchener, ON",
    role: "AI Intern — QA Assistant (Student Co-op)",
    period: "Sept 2025 – Jan 2026",
    color: "#3B82F6",
    bullets: [
      "Designed and executed 1,000+ test cases to systematically investigate model behaviour, identifying patterns, limitations, and areas for improvement",
      "Developed data workflows that reduced project time by 60%, enabling more efficient iterative study cycles",
      "Led a benchmarking study across 12+ scenarios, refining evaluation approaches over 15 cycles to improve classification by 70%",
      "Produced structured documentation with visualisations and actionable findings to inform stakeholder decisions",
    ],
  },
]

const EDUCATION = [
  {
    school: "Bur Oak Secondary School",
    location: "Markham, ON",
    period: "2023 – present",
    note: "Software Engineering Workshop Club — Lesson Planner · Designed Python curriculum for elementary students",
  },
]

const TIMELINE = [
  { year:"Sept 2024", event:"Started myojam — EMG gesture classification from scratch using public data" },
  { year:"Dec 2024",  event:"Reached 84.85% cross-subject accuracy on Ninapro DB5" },
  { year:"Feb 2025",  event:"Launched myojam.com — full-stack web demo, no hardware required" },
  { year:"Sept 2025", event:"Co-op at Fairly AI as AI QA Intern — designed 1,000+ test cases" },
  { year:"Jan 2026",  event:"Completed Fairly AI co-op; returned to myojam development" },
  { year:"Apr 2026",  event:"Launched ELEVATE — international EMG innovation competition" },
]

const SKILLS = [
  { cat:"Machine Learning", items:["scikit-learn","Random Forest","XGBoost","Logistic Regression","KNN","SVM","Clustering","Dimensionality reduction (PCA, t-SNE)","LIME explainability"] },
  { cat:"Signal Processing", items:["Surface EMG","Butterworth filtering","Sliding window","Feature extraction (MAV, RMS, ZC, WL)","Ninapro DB5","Spectral analysis"] },
  { cat:"Full-Stack Development", items:["React","Vite","FastAPI","Python","Vercel","Render","REST APIs","Three.js","Canvas API"] },
  { cat:"Systems & Hardware", items:["PyQt6","macOS (Quartz CGEventTap)","Arduino","Serial communication","MyoWare 2.0"] },
]

export default function About() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:60 }}>

      {/* Header */}
      <section style={{ padding:"100px 48px 80px", borderBottom:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:0, top:0, width:"40%", height:"100%", background:"var(--bg-2)", borderLeft:"1px solid var(--border)", zIndex:0 }}/>
        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"end" }}>
            <div>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:20, fontFamily:"var(--serif)" }}>About me</div>
              <h1 style={{ fontSize:"clamp(48px,8vw,80px)", fontWeight:800, letterSpacing:"-3px", lineHeight:0.95, marginBottom:32, fontFamily:"var(--serif)", color:"var(--text)" }}>
                Jaden<br/><span className="gold-text">Wong.</span>
              </h1>
              <p style={{ fontSize:17, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.85, marginBottom:16 }}>
                I'm a 16-year-old engineer and researcher based in Toronto, Ontario. I build at the intersection of machine learning, biomedical signal processing, and human-computer interaction.
              </p>
              <p style={{ fontSize:17, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.85 }}>
                My work focuses on assistive technology — systems that expand human capability rather than replace it. Everything I build is open source and thoroughly documented.
              </p>

              <p style={{ fontSize:17, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.85 }}>
                Alongside the engineering work, I write. Eleven articles on myojam.com cover the full spectrum — from the neuroscience of motor learning to the ethics of biometric data, from hardware build guides to the future of brain-computer interfaces. I also authored a technical report on myojam's methodology, openly published and citable.
              </p>
            </div>
            <div>
              <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"var(--radius)", padding:"32px" }}>
                {[
                  ["Location","Toronto, Ontario, Canada"],
                  ["Age","16"],
                  ["Focus","ML · Biomedical signal processing · Full-stack"],
                  ["Languages","Python, JavaScript, C++"],
                  ["Status","Open to internships"],
                  ["Flagship","myojam.com"],
                ].map(([k,v],i)=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", gap:16, padding:"12px 0", borderBottom: i<5?"1px solid var(--border)":"none" }}>
                    <span style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.08em" }}>{k}</span>
                    <span style={{ fontSize:13, color:"var(--text)", fontWeight:500, textAlign:"right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding:"80px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Experience</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:48, fontFamily:"var(--serif)" }}>Where I've worked.</h2>
          </Reveal>
          {EXPERIENCE.map(exp=>(
            <Reveal key={exp.company} delay={0.1}>
              <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:48, padding:"40px 0", borderTop:"1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize:18, fontWeight:700, color:"var(--text)", marginBottom:4 }}>{exp.company}</div>
                  <div style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300, marginBottom:4 }}>{exp.location}</div>
                  <div style={{ fontSize:13, color:"var(--gold)", fontWeight:500, marginBottom:8 }}>{exp.period}</div>
                  <div style={{ fontSize:13, color:"var(--text-secondary)", fontWeight:400, fontStyle:"italic" }}>{exp.role}</div>
                </div>
                <div>
                  {exp.bullets.map((b,i)=>(
                    <div key={i} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                      <span style={{ color:"var(--gold)", fontWeight:600, flexShrink:0, marginTop:2 }}>→</span>
                      <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Education */}
          <Reveal delay={0.15}>
            <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:48, padding:"40px 0", borderTop:"1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize:18, fontWeight:700, color:"var(--text)", marginBottom:4 }}>{EDUCATION[0].school}</div>
                <div style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300, marginBottom:4 }}>{EDUCATION[0].location}</div>
                <div style={{ fontSize:13, color:"var(--gold)", fontWeight:500 }}>{EDUCATION[0].period}</div>
              </div>
              <div>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <span style={{ color:"var(--gold)", fontWeight:600, flexShrink:0, marginTop:2 }}>→</span>
                  <span style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.75 }}>{EDUCATION[0].note}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding:"80px 48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Technical skills</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:48, fontFamily:"var(--serif)" }}>What I work with.</h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {SKILLS.map((skill,i)=>(
              <Reveal key={skill.cat} delay={i*0.08}>
                <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"28px" }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>{skill.cat}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {skill.items.map(item=>(
                      <span key={item} style={{ fontSize:12, color:"var(--text-secondary)", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:100, padding:"5px 12px", fontWeight:300 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding:"80px 48px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Reveal>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Timeline</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"var(--text)", letterSpacing:"-1.5px", marginBottom:56, fontFamily:"var(--serif)" }}>How I got here.</h2>
          </Reveal>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:80, top:0, bottom:0, width:1, background:"linear-gradient(to bottom, var(--gold), transparent)" }}/>
            {TIMELINE.map((item,i)=>(
              <Reveal key={i} delay={i*0.06}>
                <div style={{ display:"flex", gap:32, paddingBottom:36, alignItems:"flex-start" }}>
                  <div style={{ width:160, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:16 }}>
                    <span style={{ fontSize:12, color:"var(--gold)", fontWeight:500, letterSpacing:"0.04em" }}>{item.year}</span>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:"var(--bg)", border:"2px solid var(--gold)", flexShrink:0 }}/>
                  </div>
                  <p style={{ fontSize:15, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.7, paddingTop:0 }}>{item.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}