import { useState } from "react"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText("hello@jadenwong.dev").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const LINKS = [
    { label: "GitHub",   sub: "github.com/Jaden300",   href: "https://github.com/Jaden300",   color: "#F59E0B" },
    { label: "myojam",   sub: "myojam.com",             href: "https://myojam.com",             color: "#FF375F" },
    { label: "LinkedIn", sub: "Connect with me",        href: "https://linkedin.com",           color: "#3B82F6" },
  ]

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
      <section style={{ padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
        {[["500px","-80px","-60px","rgba(245,158,11,0.12)"],["350px","65%","80px","rgba(255,55,95,0.08)"]].map(([size,x,y,color],i)=>(
          <div key={i} style={{ position:"absolute",width:size,height:size,borderRadius:"50%",background:color,left:x,top:y,filter:"blur(90px)",pointerEvents:"none",animation:`orbFloat 12s ${i*4}s ease-in-out infinite alternate` }}/>
        ))}
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 20, fontFamily: "var(--serif)" }}>Get in touch</div>
          <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 24, fontFamily: "var(--serif)" }}>
            <span className="gold">Let's</span><br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>talk.</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.8, maxWidth: 520, marginBottom: 64 }}>
            I'm open to internship opportunities, research collaborations, and interesting conversations about EMG, ML, and assistive technology.
          </p>

          {/* Email */}
          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: "32px", marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Email</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.5px" }}>hello@jadenwong.dev</div>
              <button onClick={copyEmail} style={{
                background: copied ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                borderRadius: 100, padding: "9px 20px", fontSize: 13, fontWeight: 500,
                color: copied ? "#10B981" : "#F59E0B", cursor: "pointer", fontFamily: "var(--font)",
                transition: "all 0.2s"
              }}>
                {copied ? "✓ Copied" : "Copy address"}
              </button>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 64 }}>
            {LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover-lift" style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                borderRadius: 14, padding: "20px 24px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{link.label}</div>
                  <div style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 300 }}>{link.sub}</div>
                </div>
                <span style={{ fontSize: 18, color: link.color }}>↗</span>
              </a>
            ))}
          </div>

          {/* Availability note */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", flexShrink: 0, marginTop: 6, animation: "pulse 2s infinite" }}/>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>Currently available</div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  Open to summer 2026 internships in ML research, biomedical engineering, and full-stack development. Based in Toronto — remote or hybrid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}