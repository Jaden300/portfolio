import { useState } from "react"
import Reveal from "../components/Reveal"
import PageBanner from "../components/PageBanner"

const SOCIALS = [
  { icon:"fab fa-instagram",   href:"https://instagram.com/YOUR_HANDLE",    label:"Instagram", color:"#E1306C" },
  { icon:"fab fa-linkedin-in",  href:"https://linkedin.com/in/jaden-wong09",label:"LinkedIn",  color:"#0A66C2" },
  { icon:"fab fa-x-twitter",    href:"https://x.com/YOUR_HANDLE",           label:"X",         color:"#000"   },
  { icon:"fab fa-youtube",      href:"https://youtube.com/YOUR_CHANNEL",    label:"YouTube",   color:"#FF0000" },
  { icon:"fab fa-github",       href:"https://github.com/Jaden300",        label:"GitHub",    color:"#24292F" },
  { icon:"fab fa-tiktok",       href:"https://tiktok.com/@YOUR_HANDLE",    label:"TikTok",    color:"#000"   },
]

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

          {/* LEFT */}
          <div>
            <Reveal>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Email</div>
              <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"24px", marginBottom:24 }}>
                <div style={{ fontSize:13, color:"var(--text-tertiary)", fontWeight:300, marginBottom:6 }}>Primary contact</div>
                <div style={{ fontSize:16, fontWeight:600, color:"var(--text)", letterSpacing:"-0.3px", marginBottom:16, wordBreak:"break-all" }}>jn.wong.enterprise@gmail.com</div>
                <button onClick={copyEmail} style={{
                  background: copied ? "#10B981" : "var(--text)", color: copied ? "#fff" : "var(--bg)",
                  border:"none", borderRadius:100, padding:"9px 22px",
                  fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", fontFamily:"var(--font)"
                }}
                  onMouseEnter={e => { if (!copied) e.currentTarget.style.background = "var(--gold)" }}
                  onMouseLeave={e => { if (!copied) e.currentTarget.style.background = "var(--text)" }}
                >{copied ? "✓ Copied" : "Copy address"}</button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:14, fontFamily:"var(--serif)" }}>Socials</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover-lift" style={{
                    background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:12,
                    padding:"12px 14px", display:"flex", alignItems:"center", gap:10, textDecoration:"none"
                  }}>
                    <div style={{ width:30, height:30, borderRadius:"50%", background:s.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:s.color, flexShrink:0 }}>
                      <i className={s.icon}/>
                    </div>
                    <span style={{ fontSize:13, fontWeight:500, color:"var(--text)" }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ background:"var(--bg-dark)", borderRadius:16, padding:"24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }}/>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.12em" }}>Status</span>
                </div>
                <div style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:8, fontFamily:"var(--serif)" }}>Open to work.</div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.75, fontWeight:300, margin:0 }}>
                  ML research, biomedical engineering, full-stack. Toronto-based, remote or hybrid preferred.
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Tally form, constrained */}
          <Reveal delay={0.1}>
            <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, fontFamily:"var(--serif)" }}>Send a message</div>
            <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", padding:"4px 16px 0" }}>
              <iframe
                src="https://tally.so/embed/YOUR_TALLY_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="460"
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