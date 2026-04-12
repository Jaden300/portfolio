import Reveal from "../components/Reveal"

const PAPER = {
  title: "myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction",
  type: "Technical Report",
  date: "April 2026",
  abstract: "We present myojam, an open-source surface electromyography (sEMG) gesture classification system achieving 84.85% cross-subject accuracy across six hand gesture classes on the Ninapro DB5 benchmark. The system employs a Random Forest classifier trained on 64-dimensional time-domain feature vectors extracted from 200-sample sliding windows across 16 electrode channels at 200 Hz. Training data comprises 16,269 labelled windows from 10 intact-limb subjects.",
  keywords: ["Surface EMG","Gesture classification","Random Forest","Assistive technology","Ninapro DB5","Signal processing"],
  citation: `Wong, J. (2026). myojam: Open-Source Surface EMG Gesture Classification for Assistive Human-Computer Interaction. myojam Technical Report. https://myojam.com/research`,
  url: "https://myojam.com/research",
}

const ARTICLES = [
  {
    title: "The science of muscle-computer interfaces",
    tag: "Foundations", date: "April 2026",
    desc: "From the biology of muscle contraction to the machine learning that classifies gesture intent  -  a complete explainer from the ground up.",
    url: "https://myojam.com/education/emg-explainer", likes: 47,
  },
  {
    title: "Why Random Forest? The classifier behind myojam",
    tag: "Machine Learning", date: "March 2026",
    desc: "Why not a neural network? How ensemble tree methods handle noisy biomedical signals, and what 84.85% cross-subject accuracy actually means.",
    url: "https://myojam.com/education/random-forest-emg", likes: 38,
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
    title: "Muscle memory is real  -  it's just not in your muscles",
    tag: "Neuroscience", date: "January 2026",
    desc: "What neuroscientists actually mean by motor learning, how repetition reshapes the brain's motor cortex, and why gesture consistency matters for classification.",
    url: "https://myojam.com/education/muscle-memory", likes: 52,
  },
  {
    title: "The ghost in the electrode: phantom limb EMG",
    tag: "Neuroscience", date: "December 2025",
    desc: "Amputees generate measurable EMG from limbs they no longer have. What phantom signals reveal about cortical remapping and prosthetic control.",
    url: "https://myojam.com/education/phantom-limb", likes: 61,
  },
  {
    title: "Why EMG is harder than it looks",
    tag: "Signal Processing", date: "November 2025",
    desc: "Six specific reasons EMG gesture classification keeps failing in real-world deployment  -  and what research is doing about each one.",
    url: "https://myojam.com/education/why-emg-is-hard", likes: 44,
  },
  {
    title: "After EMG: what comes next",
    tag: "Future", date: "September 2025",
    desc: "Surface EMG is one point on a spectrum from skin sensing to direct neural recording. HD-sEMG, peripheral nerve interfaces, and motor cortex decoding.",
    url: "https://myojam.com/education/future-of-bci", likes: 73,
  },
  {
    title: "Who owns your muscle data?",
    tag: "Ethics", date: "August 2025",
    desc: "EMG signals can identify you and reveal your health status. As biometric gesture interfaces scale, these questions can't wait for regulation.",
    url: "https://myojam.com/education/ethics-of-emg", likes: 38,
  },
  {
    title: "Build your own EMG sensor for under $60",
    tag: "Hardware", date: "October 2025",
    desc: "A complete weekend project guide: parts list, wiring, Arduino firmware, electrode placement, and signal quality checks.",
    url: "https://myojam.com/education/build-your-own", likes: 89,
  },
  {
    title: "The art of cutting a signal into pieces",
    tag: "Signal Processing", date: "July 2025",
    desc: "Window size, step size, and overlap are the least glamorous choices in EMG classification  -  and silently the most consequential.",
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
    title: "EMG Basics  -  full lesson plan",
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
    desc: "Hands-on ML lesson covering feature extraction, decision boundaries, and confusion matrix interpretation  -  using real Ninapro data.",
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

export default function Research() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>

      {/* Header */}
      <section style={{ padding: "100px 48px 80px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "35%", height: "100%", background: "var(--bg-2)", borderLeft: "1px solid var(--border)" }}/>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 20, fontFamily: "var(--serif)" }}>Research & writing</div>
          <h1 style={{ fontSize: "clamp(48px,8vw,80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 0.95, fontFamily: "var(--serif)", color: "var(--text)", marginBottom: 24 }}>
            Research<br/><span className="gold-text">&amp; articles.</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.8, maxWidth: 520 }}>
            A technical report on myojam's methodology, eleven articles on EMG science and assistive technology, and three full lesson plans for classroom use  -  all openly published.
          </p>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
            {[["1","Technical report"],["11","Published articles"],["3","Lesson plans"],["450+","Total likes"]].map(([val,label]) => (
              <div key={label}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-1px", fontFamily: "var(--serif)" }}>{val}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical report */}
      <section style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 40, fontFamily: "var(--serif)" }}>Technical report</div>
          </Reveal>
          <Reveal delay={0.05}>
            <a href={PAPER.url} target="_blank" rel="noreferrer" className="hover-lift" style={{ display: "block", background: "var(--bg-dark)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ padding: "48px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gold-light)", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 100, padding: "4px 12px" }}>{PAPER.type}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "4px 12px", fontWeight: 300 }}>{PAPER.date}</span>
                  <span style={{ fontSize: 11, color: "#10B981", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "4px 12px", fontWeight: 500 }}>Open Access</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "4px 12px", fontWeight: 300 }}>MIT Licence</span>
                </div>

                <h2 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: "white", letterSpacing: "-0.5px", fontFamily: "var(--serif)", lineHeight: 1.3, marginBottom: 20, maxWidth: 720 }}>
                  {PAPER.title}
                </h2>

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "3px solid rgba(245,158,11,0.5)", borderRadius: "0 10px 10px 0", padding: "18px 22px", marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Abstract</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, fontWeight: 300, margin: 0, fontFamily: "var(--serif)", fontStyle: "italic" }}>{PAPER.abstract}</p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {PAPER.keywords.map(k => (
                    <span key={k} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "3px 12px", fontWeight: 300 }}>{k}</span>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "var(--serif)", fontStyle: "italic" }}>
                    Wong, J. (2026). myojam Technical Report. myojam Project.
                  </div>
                  <span style={{ fontSize: 20, color: "var(--gold-light)" }}>Read paper ↗</span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 12, fontFamily: "var(--serif)" }}>Articles</div>
                <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", fontFamily: "var(--serif)" }}>11 published articles.</h2>
              </div>
              <a href="https://myojam.com/education" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--gold)", fontWeight: 400, borderBottom: "1px solid var(--gold)", paddingBottom: 2, whiteSpace: "nowrap" }}>
                All on myojam.com →
              </a>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
            {ARTICLES.map((article, i) => (
              <Reveal key={article.title} delay={i * 0.03}>
                <a href={article.url} target="_blank" rel="noreferrer" style={{
                  display: "block", background: "var(--bg-2)",
                  borderBottom: i < ARTICLES.length - 1 ? "1px solid var(--border)" : "none",
                  padding: "22px 28px", transition: "background 0.15s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg-2)"}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 80px auto", gap: 20, alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: TAG_COLORS[article.tag] || "var(--gold)", background: (TAG_COLORS[article.tag] || "var(--gold)") + "12", border: `1px solid ${(TAG_COLORS[article.tag] || "var(--gold)")}25`, borderRadius: 100, padding: "2px 10px", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>{article.tag}</span>
                      <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 300, textAlign: "center" }}>{article.date}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>{article.title}</div>
                      <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300, lineHeight: 1.5 }}>{article.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>♥ {article.likes}</span>
                    </div>
                    <span style={{ fontSize: 16, color: "var(--text-tertiary)" }}>↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Educational resources */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 12, fontFamily: "var(--serif)" }}>Educational resources</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-1.5px", marginBottom: 12, fontFamily: "var(--serif)" }}>Lesson plans.</h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
              Classroom-ready lesson plans with timed phases, student activities, teacher notes, differentiation strategies, and assessment rubrics. Published on the myojam educators hub.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <a href={r.url} target="_blank" rel="noreferrer" className="hover-lift" style={{ display: "block", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px", height: "100%" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "var(--gold)", background: "var(--gold-soft)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: 100, padding: "3px 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{r.type}</span>
                    <span style={{ fontSize: 10, color: "var(--text-tertiary)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px", fontWeight: 300 }}>{r.duration}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8, lineHeight: 1.3, fontFamily: "var(--serif)" }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 400, marginBottom: 12 }}>{r.audience}</div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>{r.desc}</p>
                  <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500 }}>View lesson plan ↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}