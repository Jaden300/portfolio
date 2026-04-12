import { useState } from "react"
import Reveal from "../components/Reveal"
import PageBanner from "../components/PageBanner"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("jn.wong.enterprise@gmail.com").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:60 }}>
      <PageBanner
        label="Get in touch"
        title="Let's"
        accent="talk."
        sub="Open to work, research collaborations, and conversations about ML and assistive technology."
      />

      <section style={{ padding:"64px 48px 100px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>

          {/* LEFT — contact info + status */}
          <div>
            <Reveal>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:14, fontFamily:"var(--serif)" }}>Email</div>
              <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"28px", marginBottom:28 }}>
                <div style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Primary contact</div>
                <div style={{ fontSize:18, fontWeight:600, color:"var(--text)", letterSpacing:"-0.3px", marginBottom:20 }}>
                  jn.wong.enterprise@gmail.com
                </div>
                <button onClick={copyEmail} style={{
                  background: copied ? "#10B981" : "var(--text)",
                  color: copied ? "#fff" : "var(--bg)",
                  border:"none", borderRadius:100, padding:"10px 24px",
                  fontSize:13, fontWeight:600, cursor:"pointer",
                  transition:"all 0.2s", fontFamily:"var(--font)"
                }}
                  onMouseEnter={e => { if (!copied) e.currentTarget.style.background = "var(--gold)" }}
                  onMouseLeave={e => { if (!copied) e.currentTarget.style.background = "var(--text)" }}
                >{copied ? "✓ Copied to clipboard" : "Copy email"}</button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div style={{ background:"var(--bg-dark)", borderRadius:16, padding:"28px", marginBottom:28 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }}/>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.12em" }}>Currently</span>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:"white", marginBottom:10, fontFamily:"var(--serif)" }}>Open to work.</div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.75, fontWeight:300, margin:0 }}>
                  Looking for internships in ML research, biomedical engineering, and full-stack development. Toronto-based — remote or hybrid.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"24px" }}>
                <div style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>Response time</div>
                <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7, fontWeight:300, margin:0 }}>
                  I typically respond within 24 hours. LinkedIn is also monitored regularly.
                </p>
                <a href="https://linkedin.com/in/jaden-wong09" target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:14, fontSize:13, fontWeight:500, color:"var(--gold)", borderBottom:"1px solid var(--gold)", paddingBottom:1, textDecoration:"none" }}>
                  Connect on LinkedIn →
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Tally form only */}
          <Reveal delay={0.1}>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Send a message</div>
            <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", padding:"8px 20px 0" }}>
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
    </div>
  )
}