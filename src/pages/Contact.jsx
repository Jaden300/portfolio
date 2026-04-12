import { useState } from "react"
import Reveal from "../components/Reveal"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("jn.wong.enterprise@gmail.com").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const LINKS = [
    { label:"LinkedIn",  sub:"linkedin.com/in/jaden-wong09",  href:"https://www.linkedin.com/in/jaden-wong09/", color:"#0A66C2" },
    { label:"GitHub",    sub:"github.com/Jaden300",           href:"https://github.com/Jaden300",             color:"#24292F" },
    { label:"myojam",    sub:"myojam.com",                    href:"https://myojam.com",                       color:"#FF375F" },
  ]

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:60 }}>

      {/* Header */}
      <section style={{ padding:"100px 48px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:0, top:0, width:"35%", height:"100%", background:"var(--bg-2)", borderLeft:"1px solid var(--border)" }}/>
        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1, paddingBottom:80, borderBottom:"1px solid var(--border)" }}>
          <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:20, fontFamily:"var(--serif)" }}>Get in touch</div>
          <h1 style={{ fontSize:"clamp(56px,10vw,110px)", fontWeight:900, letterSpacing:"-5px", lineHeight:0.9, fontFamily:"var(--serif)", color:"var(--text)", marginBottom:32 }}>
            Let's<br/><span className="gold-text">talk.</span>
          </h1>
          <p style={{ fontSize:18, color:"var(--text-secondary)", fontWeight:300, lineHeight:1.8, maxWidth:480 }}>
            Open to internship opportunities, research collaborations, and interesting conversations about machine learning, biomedical engineering, and assistive technology.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section style={{ padding:"80px 48px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>

          <div>
            <Reveal>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:24, fontFamily:"var(--serif)" }}>Email</div>

              {/* Email card */}
              <div className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:20, padding:"32px", marginBottom:16, cursor:"none" }}>
                <div style={{ fontSize:14, color:"var(--text-tertiary)", fontWeight:300, marginBottom:8, letterSpacing:"0.02em" }}>Primary contact</div>
                <div style={{ fontSize:18, fontWeight:600, color:"var(--text)", letterSpacing:"-0.3px", marginBottom:20, wordBreak:"break-all" }}>
                  jn.wong.enterprise@gmail.com
                </div>
                <button onClick={copyEmail} style={{
                  background: copied ? "#10B981" : "var(--text)",
                  color: copied ? "#fff" : "var(--bg)",
                  border:"none", borderRadius:100, padding:"10px 24px",
                  fontSize:13, fontWeight:600, cursor:"none",
                  transition:"all 0.2s", display:"flex", alignItems:"center", gap:8
                }}
                  onMouseEnter={e=>{ if(!copied) { e.currentTarget.style.background="var(--gold)"; e.currentTarget.style.transform="scale(1.04)" }}}
                  onMouseLeave={e=>{ if(!copied) { e.currentTarget.style.background="var(--text)"; e.currentTarget.style.transform="scale(1)" }}}
                >
                  {copied ? "✓ Copied to clipboard" : "Copy email address"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:16, marginTop:40, fontFamily:"var(--serif)" }}>Links</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {LINKS.map(link=>(
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover-lift" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:14, padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"none" }}>
                    <div>
                      <div style={{ fontSize:15, fontWeight:600, color:"var(--text)", marginBottom:2 }}>{link.label}</div>
                      <div style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:300 }}>{link.sub}</div>
                    </div>
                    <span style={{ fontSize:18, color:"var(--gold)" }}>↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div>
              <div style={{ fontSize:10, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:24, fontFamily:"var(--serif)" }}>Status</div>

              <div style={{ background:"var(--bg-dark)", borderRadius:20, padding:"40px", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }}/>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.1em" }}>Available</span>
                </div>
                <h3 style={{ fontSize:22, fontWeight:700, color:"white", letterSpacing:"-0.5px", marginBottom:16, fontFamily:"var(--serif)" }}>
                  Open to work.
                </h3>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.8, fontWeight:300, marginBottom:24 }}>
                  Looking for internship opportunities in ML research, biomedical engineering, and full-stack development. Based in Toronto  -  remote or hybrid. Let's build something that matters.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["ML Research","Biomedical Engineering","Full-Stack Dev","Assistive Technology"].map(tag=>(
                    <span key={tag} style={{ fontSize:11, color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"4px 12px", fontWeight:300 }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:20, padding:"28px" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--text)", marginBottom:12 }}>Response time</div>
                <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7, fontWeight:300, margin:0 }}>
                  I typically respond to emails within 24–48 hours. For urgent inquiries, LinkedIn is also monitored regularly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
  {/* Tally contact form */}
          <Reveal delay={0.2}>
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 10, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16, fontFamily: "var(--serif)" }}>Send a message</div>
              <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", padding: "0 20px" }}>
                <iframe
                  src="https://tally.so/embed/YOUR_TALLY_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  title="Contact form"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </Reveal>
}