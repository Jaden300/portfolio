import { useState } from "react"
import Reveal from "../components/Reveal"
import ParticleWarp from "../components/ParticleWarp"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("jn.wong.enterprise@gmail.com").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--text)" }}>
      <ParticleWarp />

      {/* ── HERO */}
      <section style={{
        position:"relative", height:"100vh", minHeight:600,
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", textAlign:"center", zIndex:1, overflow:"hidden",
      }}>
        {/* Faded 話 background */}
        <div style={{
          position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
          pointerEvents:"none", userSelect:"none", zIndex:0,
        }}>
          <span style={{
            fontFamily:"'Noto Serif CJK SC','Hiragino Mincho ProN','SimSun',serif",
            fontWeight:900, fontSize:"78vw", lineHeight:1,
            color:"var(--accent)", opacity:0.03,
          }}>話</span>
        </div>

        {/* Content */}
        <div style={{ position:"relative", zIndex:1, padding:"0 48px" }}>
          <div style={{
            fontSize:11, fontWeight:500, letterSpacing:"0.38em", textTransform:"uppercase",
            color:"var(--accent)", marginBottom:24,
            animation:"heroLabel 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            display:"flex", alignItems:"center", gap:16,
          }}>
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
            Open to work · Research · Collaboration
            <span style={{ display:"inline-block", width:32, height:1, background:"var(--accent)", opacity:0.6 }} />
          </div>

          <h1 style={{
            fontFamily:"var(--serif)", fontSize:"clamp(64px,10vw,130px)",
            lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)",
            animation:"heroName 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both",
          }}>
            Let's<br /><em style={{ fontStyle:"italic", color:"var(--accent)" }}>talk.</em>
          </h1>

          <p style={{
            fontSize:16, fontWeight:300, color:"var(--text-secondary)",
            maxWidth:480, margin:"28px auto 0", lineHeight:1.75,
            animation:"heroFade 1s ease 0.75s both",
          }}>
            ML engineering, biomedical signal processing, research collaborations,
            or just a conversation — reach out any time.
          </p>
        </div>

        {/* Scroll hint */}
        <div style={{
          position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8,
          fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase",
          color:"var(--text-tertiary)", animation:"heroFade 1s ease 1.1s both",
          zIndex:1,
        }}>
          <div style={{ width:1, height:34, background:"linear-gradient(to bottom, var(--text-tertiary), transparent)", animation:"tickDrop 1.6s 1.4s infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── CONTACT CONTENT */}
      <section style={{ padding:"80px 48px 120px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:20, fontFamily:"var(--serif)" }}>Direct contact</div>
            </Reveal>

            {/* Email card */}
            <Reveal delay={0.05}>
              <div className="hover-lift" style={{
                background:"var(--bg-2)", borderRadius:20, padding:"32px", marginBottom:16,
                borderLeft:"2px solid var(--gold)",
              }}>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>Email</div>
                <div style={{ fontSize:17, fontWeight:600, color:"var(--text)", letterSpacing:"-0.3px", marginBottom:22 }}>
                  jn.wong.enterprise@gmail.com
                </div>
                <button onClick={copyEmail} style={{
                  background: copied ? "#10B981" : "var(--gold)",
                  color: copied ? "#fff" : "#080a0f",
                  border:"none", borderRadius:100, padding:"10px 24px",
                  fontSize:12, fontWeight:700, cursor:"pointer",
                  transition:"all 0.2s", fontFamily:"var(--font)",
                  letterSpacing:"0.06em", textTransform:"uppercase",
                }}>
                  {copied ? "✓ Copied" : "Copy email"}
                </button>
              </div>
            </Reveal>

            {/* Status card */}
            <Reveal delay={0.1}>
              <div style={{
                background:"var(--bg-dark)", borderRadius:20, padding:"32px", marginBottom:16,
                borderLeft:"2px solid #10B981",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }}/>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.14em" }}>Status</span>
                </div>
                <div style={{ fontSize:22, fontWeight:700, color:"white", marginBottom:10, fontFamily:"var(--serif)", letterSpacing:"-0.5px" }}>Open to work.</div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.8, fontWeight:300, margin:0 }}>
                  Seeking internships in ML research, biomedical engineering, and full-stack development. Toronto-based — remote or hybrid.
                </p>
              </div>
            </Reveal>

            {/* LinkedIn */}
            <Reveal delay={0.15}>
              <div style={{ background:"var(--bg-2)", borderRadius:20, padding:"28px" }}>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", fontWeight:300, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>Also reachable on</div>
                <a href="https://linkedin.com/in/jaden-wong09" target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:15, fontWeight:600, color:"var(--gold)", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}
                >
                  LinkedIn — jaden-wong09 ↗
                </a>
                <p style={{ fontSize:13, color:"var(--text-tertiary)", marginTop:8, fontWeight:300 }}>
                  Typically responds within 24 hours.
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — form */}
          <Reveal delay={0.1}>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:20, fontFamily:"var(--serif)" }}>Send a message</div>
            <div style={{ background:"var(--bg-2)", borderRadius:20, overflow:"hidden", padding:"8px 20px 0" }}>
              <iframe
                src="https://tally.so/embed/9qEW0Q?hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="480"
                frameBorder="0"
                title="Contact form"
                style={{ display:"block" }}
              />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── CLOSING LINE */}
      <div style={{ textAlign:"center", padding:"0 48px 80px", position:"relative", zIndex:1 }}>
        <Reveal>
          <p style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300, letterSpacing:"0.04em" }}>
            黃德治 &nbsp;·&nbsp; Toronto, Ontario &nbsp;·&nbsp; 2026
          </p>
        </Reveal>
      </div>

    </div>
  )
}
